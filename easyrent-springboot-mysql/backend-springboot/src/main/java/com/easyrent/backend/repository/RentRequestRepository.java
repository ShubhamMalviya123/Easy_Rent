package com.easyrent.backend.repository;

import com.easyrent.backend.entity.RentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface RentRequestRepository extends JpaRepository<RentRequest, String> {
    Optional<RentRequest> findByRenterIdAndRoomId(String renterId, String roomId);

    List<RentRequest> findByRoomId(String roomId);

    @Transactional
    void deleteByRoomId(String roomId);

    @Transactional
    void deleteByRenterIdAndRoomId(String renterId, String roomId);

    long countByRoomIdAndStatus(String roomId, RentRequest.Status status);
}