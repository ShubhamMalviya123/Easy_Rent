package com.easyrent.backend.repository;

import com.easyrent.backend.entity.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RelationshipRepository extends JpaRepository<Relationship, String> {
    List<Relationship> findByOwnerId(String ownerId);

    Optional<Relationship> findByRoomId(String roomId);

    Optional<Relationship> findByRenterIdAndStatus(String renterId, Relationship.Status status);

    Optional<Relationship> findByRenterId(String renterId);

    Optional<Relationship> findByOwnerIdAndId(String ownerId, String id);

    List<Relationship> findByRenterIdOrOwnerId(String renterId, String ownerId);
}
