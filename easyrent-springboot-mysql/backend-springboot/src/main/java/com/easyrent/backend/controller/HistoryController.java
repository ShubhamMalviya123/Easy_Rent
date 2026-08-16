package com.easyrent.backend.controller;

import com.easyrent.backend.dto.HistoryRequest;
import com.easyrent.backend.entity.History;
import com.easyrent.backend.repository.HistoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final HistoryRepository historyRepository;

    public HistoryController(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    // NOTE: no auth middleware here in the original app either.
    @PostMapping("/{relationId}")
    public ResponseEntity<?> createHistory(@PathVariable String relationId, @RequestBody HistoryRequest body) {
        try {
            History history = new History();
            history.setRelationId(relationId);
            history.setRentPaid(body.getRentPaid());
            history.setDate(parseDate(body.getDate()));
            if (body.getPaymentMethod() != null) {
                history.setPaymentMethod(History.PaymentMethod.valueOf(body.getPaymentMethod()));
            }
            history.setRemarks(body.getRemarks());
            history.setStripeSessionId(body.getStripeSessionId());
            history.setStripePaymentIntentId(body.getStripePaymentIntentId());
            if (body.getPaymentStatus() != null) {
                history.setPaymentStatus(History.PaymentStatus.valueOf(body.getPaymentStatus()));
            }

            History saved = historyRepository.save(history);
            return ResponseEntity.ok(Map.of("success", true, "history", saved));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", err.getMessage()));
        }
    }

    @GetMapping("/{relationId}")
    public ResponseEntity<?> getRenterHistory(@PathVariable String relationId) {
        try {
            List<History> history = historyRepository.findByRelationIdOrderByDateDesc(relationId);
            return ResponseEntity.ok(Map.of("success", true, "history", history));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", err.getMessage()));
        }
    }

    @PatchMapping("/{historyId}")
    public ResponseEntity<?> updateRenterHistory(@PathVariable String historyId, @RequestBody HistoryRequest body) {
        try {
            Optional<History> historyOpt = historyRepository.findById(historyId);
            if (historyOpt.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "updatedHistory", (Object) null));
            }
            History history = historyOpt.get();
            if (body.getRentPaid() != null) history.setRentPaid(body.getRentPaid());
            if (body.getDate() != null) history.setDate(parseDate(body.getDate()));
            if (body.getPaymentMethod() != null) history.setPaymentMethod(History.PaymentMethod.valueOf(body.getPaymentMethod()));
            if (body.getRemarks() != null) history.setRemarks(body.getRemarks());
            if (body.getPaymentStatus() != null) history.setPaymentStatus(History.PaymentStatus.valueOf(body.getPaymentStatus()));

            History updated = historyRepository.save(history);
            return ResponseEntity.ok(Map.of("success", true, "updatedHistory", updated));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", err.getMessage()));
        }
    }

    @DeleteMapping("/{historyId}")
    public ResponseEntity<?> deleteHistory(@PathVariable String historyId) {
        try {
            Optional<History> historyOpt = historyRepository.findById(historyId);
            historyOpt.ifPresent(historyRepository::delete);
            return ResponseEntity.ok(Map.of("success", true, "deltedHistory", historyOpt.orElse(null)));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", err.getMessage()));
        }
    }

    private LocalDateTime parseDate(String date) {
        if (date == null) return LocalDateTime.now();
        try {
            return LocalDateTime.parse(date);
        } catch (Exception e) {
            try {
                return OffsetDateTime.parse(date).toLocalDateTime();
            } catch (Exception e2) {
                return LocalDateTime.now();
            }
        }
    }
}
