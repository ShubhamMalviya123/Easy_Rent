package com.easyrent.backend.controller;

import com.easyrent.backend.dto.CreateCheckoutSessionRequest;
import com.easyrent.backend.entity.History;
import com.easyrent.backend.entity.Notification;
import com.easyrent.backend.entity.Relationship;
import com.easyrent.backend.entity.Room;
import com.easyrent.backend.entity.User;
import com.easyrent.backend.repository.HistoryRepository;
import com.easyrent.backend.repository.RelationshipRepository;
import com.easyrent.backend.repository.RoomRepository;
import com.easyrent.backend.repository.UserRepository;
import com.easyrent.backend.security.JwtAuth;
import com.easyrent.backend.service.NotificationService;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final HistoryRepository historyRepository;
    private final RelationshipRepository relationshipRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final NotificationService notificationService;

    @Value("${app.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    @Value("${app.stripe.webhook-secret:}")
    private String webhookSecret;

    public PaymentController(HistoryRepository historyRepository, RelationshipRepository relationshipRepository,
                              UserRepository userRepository, RoomRepository roomRepository,
                              NotificationService notificationService) {
        this.historyRepository = historyRepository;
        this.relationshipRepository = relationshipRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.notificationService = notificationService;
    }

    @JwtAuth
    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody CreateCheckoutSessionRequest body,
                                                     HttpServletRequest request) {
        try {
            if (body.getAmount() == null || body.getAmount() <= 0) {
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "Invalid payment amount"));
            }

            String origin = request.getHeader("Origin");
            String effectiveFrontendUrl = (frontendUrl != null && !frontendUrl.isBlank())
                    ? frontendUrl
                    : (origin != null ? origin : "http://localhost:5173");

            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(effectiveFrontendUrl + "/payment-success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(effectiveFrontendUrl + "/payment-cancelled")
                    .addLineItem(SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("inr")
                                    .setUnitAmount(Math.round(body.getAmount() * 100))
                                    .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName("Rent Payment")
                                            .setDescription("Monthly rent payment for room")
                                            .build())
                                    .build())
                            .build())
                    .putMetadata("relationId", body.getRelationId())
                    .putMetadata("renterId", body.getRenterId())
                    .putMetadata("ownerId", body.getOwnerId())
                    .putMetadata("roomId", body.getRoomId())
                    .putMetadata("amount", String.valueOf(body.getAmount()))
                    .build();

            Session session = Session.create(params);

            return ResponseEntity.ok(Map.of("success", true, "sessionId", session.getId(), "url", session.getUrl()));
        } catch (StripeException e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to create payment session", "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to create payment session", "error", e.getMessage()));
        }
    }

    @JwtAuth
    @GetMapping("/verify/{sessionId}")
    public ResponseEntity<?> verifyPayment(@PathVariable String sessionId) {
        try {
            Session session = Session.retrieve(sessionId);

            if ("paid".equals(session.getPaymentStatus())) {
                Map<String, String> metadata = session.getMetadata();

                History history = new History();
                history.setRelationId(metadata.get("relationId"));
                history.setRentPaid(Double.parseDouble(metadata.get("amount")));
                history.setDate(LocalDateTime.now());
                history.setPaymentMethod(History.PaymentMethod.Online);
                history.setRemarks("Stripe Payment ID: " + session.getPaymentIntent());
                history.setStripeSessionId(sessionId);
                history.setStripePaymentIntentId(session.getPaymentIntent());
                History saved = historyRepository.save(history);

                notifyLandowner(metadata);

                return ResponseEntity.ok(Map.of("success", true, "paid", true, "history", saved));
            }

            return ResponseEntity.ok(Map.of("success", true, "paid", false, "status", session.getPaymentStatus()));
        } catch (StripeException e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to verify payment", "error", e.getMessage()));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(HttpServletRequest request, @RequestBody String payload) {
        String sigHeader = request.getHeader("Stripe-Signature");
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (Exception err) {
            return ResponseEntity.status(400).body("Webhook Error: " + err.getMessage());
        }

        if ("checkout.session.completed".equals(event.getType())) {
            event.getDataObjectDeserializer().getObject().ifPresent(obj -> {
                if (obj instanceof Session session && "paid".equals(session.getPaymentStatus())) {
                    Map<String, String> metadata = session.getMetadata();

                    History history = new History();
                    history.setRelationId(metadata.get("relationId"));
                    history.setRentPaid(Double.parseDouble(metadata.get("amount")));
                    history.setDate(LocalDateTime.now());
                    history.setPaymentMethod(History.PaymentMethod.Online);
                    history.setRemarks("Stripe Payment - Session: " + session.getId());
                    history.setStripeSessionId(session.getId());
                    history.setStripePaymentIntentId(session.getPaymentIntent());
                    historyRepository.save(history);

                    notifyLandowner(metadata);
                }
            });
        }

        return ResponseEntity.ok(Map.of("received", true));
    }

    @JwtAuth
    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getPaymentHistory(@PathVariable String userId) {
        try {
            List<Relationship> relationships = relationshipRepository.findByRenterIdOrOwnerId(userId, userId);
            List<String> relationIds = relationships.stream().map(Relationship::getId).collect(Collectors.toList());
            List<History> payments = historyRepository.findByRelationIdInOrderByDateDesc(relationIds);
            return ResponseEntity.ok(Map.of("success", true, "payments", payments));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to retrieve payment history", "error", e.getMessage()));
        }
    }

    private void notifyLandowner(Map<String, String> metadata) {
        try {
            User renter = userRepository.findById(metadata.get("renterId")).orElse(null);
            Room room = roomRepository.findById(metadata.get("roomId")).orElse(null);
            if (renter != null && room != null) {
                notificationService.createAndEmit(metadata.get("ownerId"), Notification.NotificationType.rent_paid,
                        renter.getName() + " paid you the rent.", metadata.get("roomId"),
                        room.getRoomNumber() != null ? room.getRoomNumber().toString() : "N/A");
            }
        } catch (Exception ignored) {
        }
    }
}
