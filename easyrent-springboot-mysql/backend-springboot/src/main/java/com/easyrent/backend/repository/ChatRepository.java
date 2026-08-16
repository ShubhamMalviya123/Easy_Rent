package com.easyrent.backend.repository;

import com.easyrent.backend.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, String> {
    List<Chat> findByRelationIdOrderByCreatedAtAsc(String relationId);

    long countByRelationIdAndSenderIdNotAndIsReadFalse(String relationId, String senderId);

    @Modifying
    @Query("update Chat c set c.isRead = true where c.relationId = :relationId and c.senderId <> :userId and c.isRead = false")
    int markAsRead(@Param("relationId") String relationId, @Param("userId") String userId);
}
