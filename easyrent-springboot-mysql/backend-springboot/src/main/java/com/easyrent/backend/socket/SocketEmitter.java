package com.easyrent.backend.socket;

public interface SocketEmitter {
    /**
     * Mirrors emitToUser() from socket.config.js: sends `event` with `data`
     * to the socket registered for `userId`, if currently connected.
     */
    boolean emitToUser(String userId, String event, Object data);
}
