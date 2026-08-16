package com.easyrent.backend.repository;

import com.easyrent.backend.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, String> {
    List<History> findByRelationIdOrderByDateDesc(String relationId);

    List<History> findByRelationIdInOrderByDateDesc(List<String> relationIds);
}
