package com.easyrent.backend.controller;

import com.easyrent.backend.entity.Notification;
import com.easyrent.backend.repository.NotificationRepository;
import com.easyrent.backend.security.AuthInterceptor;
import com.easyrent.backend.security.JwtAuth;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @JwtAuth
    @GetMapping
    public ResponseEntity<?> getNotifications(HttpServletRequest request) {
        String userId = AuthInterceptor.currentUserId(request);
        List<Notification> notifications = notificationRepository
                .findByUserIdOrderByCreatedAtDesc(userId, PageRequest.of(0, 50));
        return ResponseEntity.ok(Map.of("success", true, "notifications", notifications));
    }

    @JwtAuth
    @GetMapping("/unread")
    public ResponseEntity<?> getUnreadCount(HttpServletRequest request) {
        String userId = AuthInterceptor.currentUserId(request);
        long count = notificationRepository.countByUserIdAndIsRead(userId, false);
        return ResponseEntity.ok(Map.of("success", true, "count", count));
    }

    @JwtAuth
    @PatchMapping("/read-all")
    public ResponseEntity<?> markAllAsRead(HttpServletRequest request) {
        String userId = AuthInterceptor.currentUserId(request);
        notificationRepository.markAllAsRead(userId);
        return ResponseEntity.ok(Map.of("success", true, "message", "All notifications marked as read"));
    }

    @JwtAuth
    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable String id) {
        Optional<Notification> notifOpt = notificationRepository.findById(id);
        if (notifOpt.isEmpty()) {
            return ResponseEntity.ok(Map.of("success", true, "notification", (Object) null));
        }
        Notification notification = notifOpt.get();
        notification.setIsRead(true);
        Notification saved = notificationRepository.save(notification);
        return ResponseEntity.ok(Map.of("success", true, "notification", saved));
    }
}
