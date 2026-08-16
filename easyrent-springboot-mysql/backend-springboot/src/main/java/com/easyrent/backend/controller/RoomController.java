package com.easyrent.backend.controller;

import com.easyrent.backend.dto.RoomRequest;
import com.easyrent.backend.entity.Room;
import com.easyrent.backend.entity.User;
import com.easyrent.backend.repository.RentRequestRepository;
import com.easyrent.backend.repository.RoomRepository;
import com.easyrent.backend.repository.UserRepository;
import com.easyrent.backend.security.AdminAuth;
import com.easyrent.backend.security.CookieUtil;
import com.easyrent.backend.security.JwtAuth;
import com.easyrent.backend.security.LandOwnerAuth;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final RentRequestRepository rentRequestRepository;
    private final CookieUtil cookieUtil;

    public RoomController(RoomRepository roomRepository, UserRepository userRepository,
                           RentRequestRepository rentRequestRepository, CookieUtil cookieUtil) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
        this.rentRequestRepository = rentRequestRepository;
        this.cookieUtil = cookieUtil;
    }

    @JwtAuth
    @GetMapping("/roomDetails/{id}")
    public ResponseEntity<?> getRoomDetails(@PathVariable String id) {
        Optional<Room> roomOpt = roomRepository.findById(id);
        if (roomOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", "Room not found"));
        }
        Room room = roomOpt.get();
        Optional<User> ownerOpt = userRepository.findById(room.getOwner());

        Map<String, Object> cleanedOwner = new LinkedHashMap<>();
        ownerOpt.ifPresent(owner -> {
            cleanedOwner.put("homeAddress", owner.getHomeAddress());
            cleanedOwner.put("name", owner.getName());
            cleanedOwner.put("houseName", owner.getHouseName());
        });

        Map<String, Object> roomMap = roomAsMap(room);
        roomMap.put("owner", cleanedOwner);

        return ResponseEntity.ok(Map.of("success", true, "room", roomMap));
    }

    @LandOwnerAuth
    @PostMapping
    public ResponseEntity<?> registerRoom(@RequestBody RoomRequest body, HttpServletRequest request) {
        try {
            Room room = new Room();
            room.setRoomNumber(body.getRoomNumber());
            room.setAddress(body.getAddress());
            room.setRentPrice(body.getRentPrice());
            room.setRoomType(Room.RoomType.valueOf(body.getRoomType()));
            room.setNumberOfRooms(body.getNumberOfRooms());
            room.setNumberOfBathrooms(body.getNumberOfBathrooms());
            // Mirrors the original: owner comes straight from the "userId" cookie.
            room.setOwner(cookieUtil.readCookie(request, "userId"));
            if (body.getIsAvailable() != null) room.setIsAvailable(body.getIsAvailable());

            Room saved = roomRepository.save(room);
            return ResponseEntity.ok(Map.of("success", true, "room", saved));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }

    @AdminAuth
    @GetMapping("/getAllRoomsDetails")
    public ResponseEntity<?> getAllRoom() {
        List<Room> rooms = roomRepository.findAll();
        return ResponseEntity.ok(Map.of("success", true, "rooms", rooms));
    }

    @LandOwnerAuth
    @GetMapping("/myRoom")
    public ResponseEntity<?> getRoomsByOwnerId(HttpServletRequest request) {
        String ownerId = cookieUtil.readCookie(request, "userId");
        List<Room> rooms = roomRepository.findByOwner(ownerId);

        List<Map<String, Object>> withCounts = rooms.stream().map(room -> {
            Map<String, Object> map = roomAsMap(room);
            long pendingCount = rentRequestRepository.countByRoomIdAndStatus(
                    room.getId(), com.easyrent.backend.entity.RentRequest.Status.pending);
            map.put("requestCount", pendingCount);
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(Map.of("success", true, "message", withCounts));
    }

    @LandOwnerAuth
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable String id) {
        if (!roomRepository.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("success", true, "message", "Room not found!"));
        }
        roomRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Room deleted successfully!"));
    }

    @LandOwnerAuth
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable String id, @RequestBody RoomRequest body) {
        Optional<Room> roomOpt = roomRepository.findById(id);
        if (roomOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", "Room not found"));
        }
        Room room = roomOpt.get();
        if (body.getRoomNumber() != null) room.setRoomNumber(body.getRoomNumber());
        if (body.getAddress() != null) room.setAddress(body.getAddress());
        if (body.getRentPrice() != null) room.setRentPrice(body.getRentPrice());
        if (body.getRoomType() != null) room.setRoomType(Room.RoomType.valueOf(body.getRoomType()));
        if (body.getNumberOfRooms() != null) room.setNumberOfRooms(body.getNumberOfRooms());
        if (body.getNumberOfBathrooms() != null) room.setNumberOfBathrooms(body.getNumberOfBathrooms());
        if (body.getIsAvailable() != null) room.setIsAvailable(body.getIsAvailable());

        Room saved = roomRepository.save(room);
        return ResponseEntity.ok(Map.of("success", true, "message", saved));
    }

    @LandOwnerAuth
    @PostMapping("/toggle-room/{roomId}")
    public ResponseEntity<?> toggleRoomAssign(@PathVariable String roomId) {
        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", "Room not found"));
        }
        Room room = roomOpt.get();
        room.setIsAvailable(!room.getIsAvailable());
        roomRepository.save(room);
        return ResponseEntity.ok(Map.of("success", true, "message", "Room is toggled!"));
    }

    @GetMapping("/availableRoom")
    public ResponseEntity<?> getAvailableRoom(@RequestParam(required = false) Integer limit,
                                               @RequestParam(required = false) Integer offset) {
        int lim = limit == null ? 25 : limit;
        int off = offset == null ? 0 : offset;
        int page = off / Math.max(lim, 1);
        var pageResult = roomRepository.findByIsAvailable(true, PageRequest.of(page, lim));
        long totalCount = roomRepository.countByIsAvailable(true);
        return ResponseEntity.ok(Map.of("message", pageResult.getContent(), "totalCount", totalCount));
    }

    @AdminAuth
    @GetMapping("/unAvailableRoom")
    public ResponseEntity<?> getUnAvailableRoom() {
        List<Room> rooms = roomRepository.findByIsAvailable(false);
        return ResponseEntity.ok(Map.of("success", true, "message", rooms));
    }

    private Map<String, Object> roomAsMap(Room room) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("_id", room.getId());
        map.put("roomNumber", room.getRoomNumber());
        map.put("address", room.getAddress());
        map.put("rentPrice", room.getRentPrice());
        map.put("roomType", room.getRoomType());
        map.put("numberOfRooms", room.getNumberOfRooms());
        map.put("numberOfBathrooms", room.getNumberOfBathrooms());
        map.put("owner", room.getOwner());
        map.put("isAvailable", room.getIsAvailable());
        map.put("createdAt", room.getCreatedAt());
        map.put("updatedAt", room.getUpdatedAt());
        return map;
    }
}
