package com.easyrent.backend.controller;

import com.easyrent.backend.entity.Notification;
import com.easyrent.backend.entity.RentRequest;
import com.easyrent.backend.entity.Room;
import com.easyrent.backend.entity.User;
import com.easyrent.backend.repository.RentRequestRepository;
import com.easyrent.backend.repository.RoomRepository;
import com.easyrent.backend.repository.UserRepository;
import com.easyrent.backend.security.AuthInterceptor;
import com.easyrent.backend.security.JwtAuth;
import com.easyrent.backend.security.LandOwnerAuth;
import com.easyrent.backend.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/request")
public class RentRequestController {

    private final RentRequestRepository rentRequestRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public RentRequestController(RentRequestRepository rentRequestRepository, RoomRepository roomRepository,
                                  UserRepository userRepository, NotificationService notificationService) {
        this.rentRequestRepository = rentRequestRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @JwtAuth
    @PostMapping("/{id}")
    public ResponseEntity<?> toggleRequest(@PathVariable String id, HttpServletRequest request) {
        try {
            String userId = AuthInterceptor.currentUserId(request);
            String roomId = id;

            Optional<RentRequest> existing = rentRequestRepository.findByRenterIdAndRoomId(userId, roomId);
            RentRequest result;
            String action;

            if (existing.isEmpty()) {
                RentRequest newRequest = new RentRequest();
                newRequest.setRenterId(userId);
                newRequest.setRoomId(roomId);
                result = rentRequestRepository.save(newRequest);
                action = "created";
            } else {
                result = existing.get();
                rentRequestRepository.delete(result);
                action = "deleted";
            }

            Optional<User> userOpt = userRepository.findById(userId);
            String userName = userOpt.map(User::getName).orElse("Someone");

            Optional<Room> roomOpt = roomRepository.findById(roomId);
            if (roomOpt.isPresent()) {
                Room room = roomOpt.get();
                String roomNumber = room.getRoomNumber() != null ? room.getRoomNumber().toString() : "N/A";

                Notification.NotificationType type = null;
                String message = null;
                if ("created".equals(action)) {
                    type = Notification.NotificationType.request_received;
                    message = userName + " is requested for the room " + roomNumber;
                } else if ("deleted".equals(action)) {
                    type = Notification.NotificationType.request_withdrawn;
                    message = userName + " withdrew the request for room " + roomNumber;
                }

                if (type != null) {
                    notificationService.createAndEmit(room.getOwner(), type, message, roomId, roomNumber);
                }
            }

            return ResponseEntity.ok(Map.of("success", true, "request", result));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @JwtAuth
    @GetMapping("/{id}")
    public ResponseEntity<?> getRequest(@PathVariable String id, HttpServletRequest request) {
        try {
            String userId = AuthInterceptor.currentUserId(request);
            boolean exists = rentRequestRepository.findByRenterIdAndRoomId(userId, id).isPresent();
            return ResponseEntity.ok(Map.of("success", true, "message", exists));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @LandOwnerAuth
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUsers(@PathVariable String id) {
        try {
            List<RentRequest> requests = rentRequestRepository.findByRoomId(id);
            List<User> users = requests.stream()
                    .map(r -> userRepository.findById(r.getRenterId()).orElse(null))
                    .filter(u -> u != null)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(Map.of("success", true, "users", users));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }
}
