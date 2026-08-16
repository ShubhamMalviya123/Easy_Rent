package com.easyrent.backend.repository;

import com.easyrent.backend.entity.RentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RentRequestRepository extends JpaRepository<RentRequest, String> {
    Optional<RentRequest> findByRenterIdAndRoomId(String renterId, String roomId);

    List<RentRequest> findByRoomId(String roomId);

    void deleteByRoomId(String roomId);

    void deleteByRenterIdAndRoomId(String renterId, String roomId);

    long countByRoomIdAndStatus(String roomId, RentRequest.Status status);
}
