package com.easyrent.backend.repository;

import com.easyrent.backend.entity.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavouriteRepository extends JpaRepository<Favourite, String> {
    Optional<Favourite> findByUserIdAndRoomId(String userId, String roomId);

    List<Favourite> findByUserId(String userId);

    void deleteByUserIdAndRoomId(String userId, String roomId);
}
