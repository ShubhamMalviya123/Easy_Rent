package com.easyrent.backend.socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import com.easyrent.backend.entity.Chat;
import com.easyrent.backend.repository.ChatRepository;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Faithful port of socket.config.js: same event names (register, join_chat,
 * send_message, receive_message, disconnect) and the same userId -> socket
 * bookkeeping used by emitToUser().
 */
@Component
public class ChatSocketHandler implements SocketEmitter {

    private static final Logger log = LoggerFactory.getLogger(ChatSocketHandler.class);

    private final SocketIOServer server;
    private final ChatRepository chatRepository;
    private final Map<String, UUID> userSockets = new ConcurrentHashMap<>();

    public ChatSocketHandler(SocketIOServer server, ChatRepository chatRepository) {
        this.server = server;
        this.chatRepository = chatRepository;
        server.addListeners(this);
    }

    @PostConstruct
    public void start() {
        server.start();
        log.info("Socket.IO server started on port {}", server.getConfiguration().getPort());
    }

    @PreDestroy
    public void stop() {
        server.stop();
    }

    @OnConnect
    public void onConnect(SocketIOClient client) {
        log.info("New client connected: {}", client.getSessionId());
    }

    @OnEvent("register")
    public void onRegister(SocketIOClient client, String userId) {
        userSockets.put(userId, client.getSessionId());
        log.info("User {} registered with socket {}", userId, client.getSessionId());
    }

    @OnEvent("join_chat")
    public void onJoinChat(SocketIOClient client, String relationId) {
        client.joinRoom(relationId);
        log.info("Socket {} joined room {}", client.getSessionId(), relationId);
    }

    @OnEvent("send_message")
    public void onSendMessage(SocketIOClient client, Map<String, Object> data) {
        try {
            String relationId = String.valueOf(data.get("relationId"));
            String senderId = String.valueOf(data.get("senderId"));
            String message = String.valueOf(data.get("message"));

            Chat chat = new Chat();
            chat.setRelationId(relationId);
            chat.setSenderId(senderId);
            chat.setMessage(message);
            Chat saved = chatRepository.save(chat);

            server.getRoomOperations(relationId).sendEvent("receive_message", saved);
        } catch (Exception e) {
            log.error("Error sending message: {}", e.getMessage());
        }
    }

    @OnDisconnect
    public void onDisconnect(SocketIOClient client) {
        userSockets.entrySet().removeIf(entry -> {
            boolean match = entry.getValue().equals(client.getSessionId());
            if (match) log.info("User {} disconnected", entry.getKey());
            return match;
        });
    }

    @Override
    public boolean emitToUser(String userId, String event, Object data) {
        UUID sessionId = userSockets.get(userId);
        if (sessionId == null) {
            log.info("User {} not connected", userId);
            return false;
        }
        SocketIOClient client = server.getClient(sessionId);
        if (client == null) {
            log.info("User {} not connected", userId);
            return false;
        }
        client.sendEvent(event, data);
        log.info("Emitted {} to user {}", event, userId);
        return true;
    }
}
