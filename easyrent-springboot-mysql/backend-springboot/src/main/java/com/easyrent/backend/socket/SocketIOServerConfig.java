package com.easyrent.backend.socket;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class SocketIOServerConfig {

    @Value("${app.socketio.host:0.0.0.0}")
    private String host;

    @Value("${app.socketio.port:9092}")
    private int port;

    @Bean
    public SocketIOServer socketIOServer() {
        Configuration config = new Configuration();
        config.setHostname(host);
        config.setPort(port);
        config.setOrigin(null); // allow all; CORS for the REST API is already restricted in CorsConfig
        return new SocketIOServer(config);
    }
}
