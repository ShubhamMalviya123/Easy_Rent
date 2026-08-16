package com.easyrent.backend.controller;

import com.easyrent.backend.dto.RelationshipRequests.*;
import com.easyrent.backend.entity.*;
import com.easyrent.backend.repository.*;
import com.easyrent.backend.security.AuthInterceptor;
import com.easyrent.backend.security.CookieUtil;
import com.easyrent.backend.security.JwtAuth;
import com.easyrent.backend.security.LandOwnerAuth;
import com.easyrent.backend.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/relationship")
public class RelationshipController {

    private final RelationshipRepository relationshipRepository;
    private final RentRequestRepository rentRequestRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final HistoryRepository historyRepository;
    private final NotificationService notificationService;
    private final CookieUtil cookieUtil;

    public RelationshipController(RelationshipRepository relationshipRepository, RentRequestRepository rentRequestRepository,
                                   RoomRepository roomRepository, UserRepository userRepository,
                                   HistoryRepository historyRepository, NotificationService notificationService,
                                   CookieUtil cookieUtil) {
        this.relationshipRepository = relationshipRepository;
        this.rentRequestRepository = rentRequestRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
        this.historyRepository = historyRepository;
        this.notificationService = notificationService;
        this.cookieUtil = cookieUtil;
    }

    @LandOwnerAuth
    @PostMapping("/accept")
    public ResponseEntity<?> accept(@RequestBody AcceptRequest body, HttpServletRequest request) {
        try {
            String ownerId = AuthInterceptor.currentUserId(request);
            String roomId = body.getRoomId();
            String renterId = body.getRenterId();

            List<RentRequest> allRequests = rentRequestRepository.findByRoomId(roomId);
            List<RentRequest> rejectedRequests = allRequests.stream()
                    .filter(r -> !r.getRenterId().equals(renterId))
                    .collect(Collectors.toList());

            Relationship relationship = new Relationship();
            relationship.setOwnerId(ownerId);
            relationship.setRoomId(roomId);
            relationship.setRenterId(renterId);

            Optional<Room> roomOpt = roomRepository.findById(roomId);
            roomOpt.ifPresent(room -> {
                room.setIsAvailable(false);
                roomRepository.save(room);
            });

            rentRequestRepository.deleteByRoomId(roomId);
            relationshipRepository.save(relationship);

            if (roomOpt.isPresent()) {
                Room room = roomOpt.get();
                String roomNumber = room.getRoomNumber() != null ? room.getRoomNumber().toString() : "N/A";

                notificationService.createAndEmit(renterId, Notification.NotificationType.request_accepted,
                        "Your request for Room " + roomNumber + " was accepted", roomId, roomNumber);

                for (RentRequest r : rejectedRequests) {
                    notificationService.createAndEmit(r.getRenterId(), Notification.NotificationType.request_rejected,
                            "Your request for Room " + roomNumber + " was rejected because the room has been rented.",
                            roomId, roomNumber);
                }
            }

            return ResponseEntity.ok(Map.of("success", true, "message", "Added to your room"));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @LandOwnerAuth
    @PostMapping("/reject")
    public ResponseEntity<?> rejectRequest(@RequestBody RejectRequest body) {
        try {
            String renterId = body.getRenterId();
            String roomId = body.getRoomId();

            Optional<RentRequest> reqOpt = rentRequestRepository.findByRenterIdAndRoomId(renterId, roomId);
            reqOpt.ifPresent(rentRequestRepository::delete);

            Optional<Room> roomOpt = roomRepository.findById(roomId);
            if (roomOpt.isPresent()) {
                Room room = roomOpt.get();
                String roomNumber = room.getRoomNumber() != null ? room.getRoomNumber().toString() : "N/A";
                notificationService.createAndEmit(renterId, Notification.NotificationType.request_rejected,
                        "Your request for Room " + roomNumber + " was rejected", roomId, roomNumber);
            }

            return ResponseEntity.ok(Map.of("success", true, "message", reqOpt.orElse(null)));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @LandOwnerAuth
    @GetMapping("/getRenters")
    public ResponseEntity<?> getRenters(HttpServletRequest request) {
        try {
            String ownerId = AuthInterceptor.currentUserId(request);
            List<Relationship> relations = relationshipRepository.findByOwnerId(ownerId);

            List<Map<String, Object>> extracted = relations.stream().map(rel -> {
                Map<String, Object> map = new LinkedHashMap<>();
                map.put("renterStatus", rel.getStatus());
                map.put("relationId", rel.getId());
                map.put("renterDetails", userRepository.findById(rel.getRenterId()).orElse(null));

                Room room = roomRepository.findById(rel.getRoomId()).orElse(null);
                Map<String, Object> roomDetails = new LinkedHashMap<>();
                if (room != null) {
                    roomDetails.put("roomNumber", room.getRoomNumber());
                    roomDetails.put("roomId", room.getId());
                    roomDetails.put("roomType", room.getRoomType());
                    roomDetails.put("rentPrice", room.getRentPrice());
                }
                map.put("roomDetails", roomDetails);
                return map;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(Map.of("success", true, "renters", extracted));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @LandOwnerAuth
    @PostMapping("/isRelationship")
    public ResponseEntity<?> isRoomAvailable(@RequestBody RoomIdRequest body) {
        try {
            Optional<Relationship> relOpt = relationshipRepository.findByRoomId(body.getRoomId());
            boolean result = relOpt.isPresent() && relOpt.get().getStatus() == Relationship.Status.active;
            return ResponseEntity.ok(Map.of("success", true, "renters", result));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @LandOwnerAuth
    @PostMapping("/removeRenter")
    public ResponseEntity<?> removeRenter(@RequestBody RelationIdRequest body) {
        try {
            Optional<Relationship> relOpt = relationshipRepository.findById(body.getRelationId());
            relOpt.ifPresent(rel -> {
                rel.setStatus(Relationship.Status.archive);
                relationshipRepository.save(rel);
            });
            return ResponseEntity.ok(Map.of("success", true, "relation", "Renter Archived!"));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @LandOwnerAuth
    @DeleteMapping("/deleteRenter/{id}")
    public ResponseEntity<?> deleteRenter(@PathVariable String id) {
        try {
            Optional<Relationship> relOpt = relationshipRepository.findById(id);
            relOpt.ifPresent(relationshipRepository::delete);
            List<History> histories = historyRepository.findByRelationIdOrderByDateDesc(id);
            historyRepository.deleteAll(histories);
            return ResponseEntity.ok(Map.of("success", true, "deletedRelation", relOpt.orElse(null)));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @JwtAuth
    @GetMapping("/getRoomDetails")
    public ResponseEntity<?> getRoomDetailsByRenterId(HttpServletRequest request) {
        try {
            String userId = cookieUtil.readCookie(request, "userId");
            Optional<Relationship> relOpt = relationshipRepository.findByRenterIdAndStatus(userId, Relationship.Status.active);
            if (relOpt.isEmpty()) {
                return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
            }
            Relationship rel = relOpt.get();
            Room room = roomRepository.findById(rel.getRoomId()).orElse(null);
            User owner = userRepository.findById(rel.getOwnerId()).orElse(null);

            Map<String, Object> extracted = new LinkedHashMap<>();
            extracted.put("relationId", rel.getId());
            extracted.put("renterId", rel.getRenterId());
            if (owner != null) {
                extracted.put("ownerId", owner.getId());
                extracted.put("houseName", owner.getHouseName());
                extracted.put("ownerNumber", owner.getPhoneNumber());
                extracted.put("ownerName", owner.getName());
                extracted.put("ownerEmail", owner.getEmail());
            }
            extracted.put("roomDetails", room);

            return ResponseEntity.ok(Map.of("success", true, "room", extracted));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @JwtAuth
    @GetMapping("/historyOfRenter")
    public ResponseEntity<?> getHistoryOfRenter(HttpServletRequest request) {
        try {
            String userId = cookieUtil.readCookie(request, "userId");
            Optional<Relationship> relOpt = relationshipRepository.findByRenterIdAndStatus(userId, Relationship.Status.active);
            if (relOpt.isEmpty()) {
                return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
            }
            List<History> histories = historyRepository.findByRelationIdOrderByDateDesc(relOpt.get().getId());
            return ResponseEntity.ok(Map.of("success", true, "histories", histories));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @JwtAuth
    @GetMapping("/engaged")
    public ResponseEntity<?> engaged(HttpServletRequest request) {
        try {
            String userId = cookieUtil.readCookie(request, "userId");
            Optional<Relationship> relOpt = relationshipRepository.findByRenterId(userId);
            boolean isEngaged = relOpt.isPresent() && relOpt.get().getStatus() == Relationship.Status.active;
            return ResponseEntity.ok(Map.of("success", true, "message", isEngaged));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @LandOwnerAuth
    @PostMapping("/isArchieve")
    public ResponseEntity<?> isArchieve(@RequestBody RelationIdRequest body, HttpServletRequest request) {
        try {
            String userId = cookieUtil.readCookie(request, "userId");
            Optional<Relationship> relOpt = relationshipRepository.findByOwnerIdAndId(userId, body.getRelationId());
            if (relOpt.isEmpty()) {
                return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
            }
            boolean isActive = relOpt.get().getStatus() == Relationship.Status.active;
            // Matches the original's (slightly confusing) inverted naming.
            return ResponseEntity.ok(Map.of("success", true, "message", !isActive));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @LandOwnerAuth
    @PostMapping("/relationByRoomId")
    public ResponseEntity<?> relationByRoomId(@RequestBody RoomIdRequest body) {
        try {
            boolean exists = relationshipRepository.findByRoomId(body.getRoomId()).isPresent();
            return ResponseEntity.ok(Map.of("success", true, "message", exists));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }
}
