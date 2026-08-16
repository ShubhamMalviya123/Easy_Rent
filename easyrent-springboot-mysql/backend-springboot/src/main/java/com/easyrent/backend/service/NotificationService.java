package com.easyrent.backend.service;

import com.easyrent.backend.entity.Notification;
import com.easyrent.backend.repository.NotificationRepository;
import com.easyrent.backend.socket.SocketEmitter;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SocketEmitter socketEmitter;

    public NotificationService(NotificationRepository notificationRepository, SocketEmitter socketEmitter) {
        this.notificationRepository = notificationRepository;
        this.socketEmitter = socketEmitter;
    }

    public Notification createAndEmit(String userId, Notification.NotificationType type, String message,
                                       String roomId, String roomNumber) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setType(type);
        notification.setMessage(message);
        notification.setRoomId(roomId);
        notification.setRoomNumber(roomNumber);
        Notification saved = notificationRepository.save(notification);

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("type", type.name());
        payload.put("message", saved.getMessage());
        payload.put("roomId", roomId);
        payload.put("roomNumber", roomNumber);
        payload.put("createdAt", saved.getCreatedAt());

        socketEmitter.emitToUser(userId, "notification", payload);
        return saved;
    }
}
