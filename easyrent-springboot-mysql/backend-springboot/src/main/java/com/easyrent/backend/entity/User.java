package com.easyrent.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "id", length = 24, nullable = false, updatable = false)
    @JsonProperty("_id")
    private String id;

    @Column(nullable = false)
    private String name;

    private String houseName;

    // Hidden by default, exactly like Mongoose's `select: false`.
    // Only the login endpoint intentionally echoes it back (mirrors the
    // original Node behaviour where findUserByEmail(..., true) results
    // were returned as-is in the login response).
    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Embedded
    private HomeAddress homeAddress;

    @Column(unique = true)
    private String aadharCardNumber;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @JsonIgnore
    private String resetPasswordToken;

    @JsonIgnore
    private Long resetPasswordExpire;

    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = com.easyrent.backend.util.ObjectIdGenerator.generate();
        }
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public enum UserType {
        landowner, renter, admin
    }
}
