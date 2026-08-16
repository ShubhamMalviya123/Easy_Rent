package com.easyrent.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
public class Notification {

    @Id
    @Column(name = "id", length = 24, nullable = false, updatable = false)
    @JsonProperty("_id")
    private String id;

    @Column(name = "user_id", length = 24, nullable = false)
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    @Column(nullable = false, length = 1000)
    private String message;

    @Column(name = "room_id", length = 24, nullable = false)
    private String roomId;

    @Column(nullable = false)
    private String roomNumber;

    @Column(nullable = false)
    private Boolean isRead = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = com.easyrent.backend.util.ObjectIdGenerator.generate();
        }
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public enum NotificationType {
        request_received, request_accepted, request_rejected, request_withdrawn, rent_paid
    }
}
