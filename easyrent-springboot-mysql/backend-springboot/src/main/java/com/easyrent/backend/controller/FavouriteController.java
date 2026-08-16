package com.easyrent.backend.controller;

import com.easyrent.backend.entity.Favourite;
import com.easyrent.backend.entity.Room;
import com.easyrent.backend.repository.FavouriteRepository;
import com.easyrent.backend.repository.RoomRepository;
import com.easyrent.backend.security.AuthInterceptor;
import com.easyrent.backend.security.JwtAuth;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favourite")
public class FavouriteController {

    private final FavouriteRepository favouriteRepository;
    private final RoomRepository roomRepository;

    public FavouriteController(FavouriteRepository favouriteRepository, RoomRepository roomRepository) {
        this.favouriteRepository = favouriteRepository;
        this.roomRepository = roomRepository;
    }

    @JwtAuth
    @GetMapping("/myfavourite")
    public ResponseEntity<?> getFavourite(HttpServletRequest request) {
        String userId = AuthInterceptor.currentUserId(request);
        List<Favourite> favourites = favouriteRepository.findByUserId(userId);

        List<Room> rooms = favourites.stream()
                .map(f -> roomRepository.findById(f.getRoomId()).orElse(null))
                .filter(r -> r != null)
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of("success", true, "rooms", rooms));
    }

    @JwtAuth
    @GetMapping("/toggle/{id}")
    public ResponseEntity<?> toggleFavourite(@PathVariable String id, HttpServletRequest request) {
        String userId = AuthInterceptor.currentUserId(request);
        Optional<Favourite> existing = favouriteRepository.findByUserIdAndRoomId(userId, id);

        if (existing.isEmpty()) {
            Favourite favourite = new Favourite();
            favourite.setUserId(userId);
            favourite.setRoomId(id);
            favouriteRepository.save(favourite);
            return ResponseEntity.ok(Map.of("success", true, "message", "Room is added to Favourite"));
        } else {
            favouriteRepository.delete(existing.get());
            return ResponseEntity.ok(Map.of("success", true, "message", "Room is removed from Favourite"));
        }
    }

    @JwtAuth
    @GetMapping("/isFabRoom/{id}")
    public ResponseEntity<?> isFabRoom(@PathVariable String id, HttpServletRequest request) {
        String userId = AuthInterceptor.currentUserId(request);
        Optional<Favourite> favourite = favouriteRepository.findByUserIdAndRoomId(userId, id);
        return ResponseEntity.ok(favourite.orElse(null));
    }
}
