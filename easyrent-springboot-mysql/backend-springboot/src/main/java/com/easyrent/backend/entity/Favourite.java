package com.easyrent.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "favourites")
@Data
@NoArgsConstructor
public class Favourite {

    @Id
    @Column(name = "id", length = 24, nullable = false, updatable = false)
    @JsonProperty("_id")
    private String id;

    @Column(name = "user_id", length = 24, nullable = false)
    private String userId;

    @Column(name = "room_id", length = 24, nullable = false)
    private String roomId;

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
}
