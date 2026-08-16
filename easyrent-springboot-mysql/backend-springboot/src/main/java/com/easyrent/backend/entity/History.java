package com.easyrent.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "history")
@Data
@NoArgsConstructor
public class History {

    @Id
    @Column(name = "id", length = 24, nullable = false, updatable = false)
    @JsonProperty("_id")
    private String id;

    @Column(name = "relation_id", length = 24, nullable = false)
    private String relationId;

    @Column(nullable = false)
    private Double rentPaid;

    @Column(nullable = false)
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod = PaymentMethod.other;

    @Column(length = 500)
    private String remarks;

    private String stripeSessionId;

    private String stripePaymentIntentId;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.completed;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = com.easyrent.backend.util.ObjectIdGenerator.generate();
        }
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum PaymentMethod {
        Cash, Online, other
    }

    public enum PaymentStatus {
        pending, completed, failed, refunded
    }
}
