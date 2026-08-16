package com.easyrent.backend.controller;

import com.easyrent.backend.entity.Chat;
import com.easyrent.backend.repository.ChatRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatRepository chatRepository;

    public ChatController(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    // NOTE: no auth middleware here in the original app either.
    @GetMapping("/{relationId}")
    public ResponseEntity<?> getChatHistory(@PathVariable String relationId) {
        try {
            List<Chat> messages = chatRepository.findByRelationIdOrderByCreatedAtAsc(relationId);
            return ResponseEntity.ok(Map.of("success", true, "messages", messages));
        } catch (Exception err) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Something went wrong with database"));
        }
    }
}
