package com.easyrent.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey secretKey;
    private final long expireMillis;

    public JwtUtil(@Value("${app.jwt.secret}") String secret,
                    @Value("${app.jwt.expire:7d}") String expire) {
        // Node's jsonwebtoken accepts any UTF-8 string as an HMAC secret,
        // so we hash it into a 256-bit key to satisfy jjwt's key-size rules.
        this.secretKey = Keys.hmacShaKeyFor(sha256(secret));
        this.expireMillis = parseDuration(expire);
    }

    private static byte[] sha256(String value) {
        try {
            return java.security.MessageDigest.getInstance("SHA-256")
                    .digest(value.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    private static long parseDuration(String expire) {
        try {
            if (expire.endsWith("d")) {
                return Duration.ofDays(Long.parseLong(expire.replace("d", ""))).toMillis();
            } else if (expire.endsWith("h")) {
                return Duration.ofHours(Long.parseLong(expire.replace("h", ""))).toMillis();
            } else if (expire.endsWith("m")) {
                return Duration.ofMinutes(Long.parseLong(expire.replace("m", ""))).toMillis();
            }
            return Long.parseLong(expire) * 1000L;
        } catch (NumberFormatException e) {
            return Duration.ofDays(7).toMillis();
        }
    }

    public String generateToken(String userId) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expireMillis);
        return Jwts.builder()
                .claim("id", userId)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(secretKey)
                .compact();
    }

    /**
     * @return the "id" claim if the token is valid, otherwise null.
     */
    public String verifyAndGetUserId(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.get("id", String.class);
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}
