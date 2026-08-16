package com.easyrent.backend.repository;

import com.easyrent.backend.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, String> {
    List<Room> findByOwner(String owner);

    List<Room> findByIsAvailable(Boolean isAvailable);

    Page<Room> findByIsAvailable(Boolean isAvailable, Pageable pageable);

    long countByIsAvailable(Boolean isAvailable);

    List<Room> findByIsAvailableTrueAndAddress_CityAndAddress_State(String city, String state);

    List<Room> findByIsAvailableTrueAndAddress_City(String city);

    List<Room> findByIsAvailableTrueAndAddress_State(String state);
}
