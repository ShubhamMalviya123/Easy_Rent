package com.easyrent.backend.repository;

import com.easyrent.backend.entity.Notification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(String userId, Pageable pageable);

    long countByUserIdAndIsRead(String userId, boolean isRead);

    @Modifying
    @Query("update Notification n set n.isRead = true where n.userId = :userId")
    int markAllAsRead(@Param("userId") String userId);
}
