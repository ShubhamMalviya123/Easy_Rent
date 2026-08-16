package com.easyrent.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${app.frontend-url:}")
    private String frontendUrl;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        List<String> origins = Arrays.asList(
                "http://localhost:5173",
                "https://easyrent-nu.vercel.app",
                "https://easyrent-red.vercel.app",
                "http://13.201.30.59",
                "https://13.201.30.59",
                "https://easyrentify.xyz",
                "https://www.easyrentify.xyz"
        );
        origins.forEach(config::addAllowedOrigin);
        if (frontendUrl != null && !frontendUrl.isBlank()) {
            config.addAllowedOrigin(frontendUrl);
        }

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("Content-Type", "Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
