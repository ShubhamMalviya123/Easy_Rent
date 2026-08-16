package com.easyrent.backend.controller;

import com.easyrent.backend.entity.Room;
import com.easyrent.backend.repository.RoomRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
public class SearchRoomsController {

    private final RoomRepository roomRepository;

    public SearchRoomsController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping("/state")
    public ResponseEntity<?> search(@RequestParam(required = false) String state,
                                     @RequestParam(required = false) String city) {
        if ((state == null || state.isBlank()) && (city == null || city.isBlank())) {
            return ResponseEntity.status(400).body(Map.of("success", false,
                    "message", "Please provide at least a state or a city to search."));
        }
        // Mirrors the original: this endpoint validates input but never
        // actually queries or responds with results.
        return ResponseEntity.ok().build();
    }

    @GetMapping("/district-state")
    public ResponseEntity<?> searchByDistrictAndState(@RequestParam(required = false) String district,
                                                        @RequestParam(required = false) String state) {
        if ((district == null || district.isBlank()) && (state == null || state.isBlank())) {
            return ResponseEntity.status(400).body(Map.of("success", false,
                    "message", "Please provide at least a district or a state to search."));
        }
        try {
            List<Room> rooms;
            if (district != null && !district.isBlank() && state != null && !state.isBlank()) {
                rooms = roomRepository.findByIsAvailableTrueAndAddress_CityAndAddress_State(district, state);
            } else if (district != null && !district.isBlank()) {
                rooms = roomRepository.findByIsAvailableTrueAndAddress_City(district);
            } else {
                rooms = roomRepository.findByIsAvailableTrueAndAddress_State(state);
            }
            return ResponseEntity.ok(Map.of("success", true, "rooms", rooms));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false,
                    "message", "Database error during search.", "error", err.getMessage()));
        }
    }
}
