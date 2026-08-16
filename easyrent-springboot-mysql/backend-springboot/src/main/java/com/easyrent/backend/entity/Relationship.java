package com.easyrent.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "relationships")
@Data
@NoArgsConstructor
public class Relationship {

    @Id
    @Column(name = "id", length = 24, nullable = false, updatable = false)
    @JsonProperty("_id")
    private String id;

    @Column(name = "owner_id", length = 24, nullable = false)
    private String ownerId;

    @Column(name = "renter_id", length = 24, nullable = false)
    private String renterId;

    @Column(name = "room_id", length = 24, nullable = false)
    private String roomId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.active;

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

    public enum Status {
        active, archive
    }
}
