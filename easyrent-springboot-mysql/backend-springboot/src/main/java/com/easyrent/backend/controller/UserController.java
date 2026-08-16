package com.easyrent.backend.controller;

import com.easyrent.backend.dto.EditProfileRequest;
import com.easyrent.backend.dto.LoginRequest;
import com.easyrent.backend.dto.MiscRequests;
import com.easyrent.backend.dto.RegisterRequest;
import com.easyrent.backend.entity.User;
import com.easyrent.backend.repository.UserRepository;
import com.easyrent.backend.security.AdminAuth;
import com.easyrent.backend.security.AuthInterceptor;
import com.easyrent.backend.security.CookieUtil;
import com.easyrent.backend.security.JwtAuth;
import com.easyrent.backend.security.JwtUtil;
import com.easyrent.backend.util.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final EmailService emailService;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil, CookieUtil cookieUtil, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
        this.emailService = emailService;
    }

    // GET /api/users -> adminAuth (always 404 in original, see AuthInterceptor)
    @AdminAuth
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ok(Map.of("success", true, "users", users));
    }

    @AdminAuth
    @GetMapping("/landowners-list")
    public ResponseEntity<?> getAllLandlords() {
        List<User> landlords = userRepository.findByUserType(User.UserType.landowner);
        return ok(Map.of("success", true, "message", landlords));
    }

    @AdminAuth
    @GetMapping("/renters-list")
    public ResponseEntity<?> getAllRenters() {
        List<User> renters = userRepository.findByUserType(User.UserType.renter);
        return ok(Map.of("success", true, "message", renters));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest body) {
        try {
            if (userRepository.findByEmail(body.getEmail().toLowerCase().trim()).isPresent()) {
                return status(401, Map.of("success", false, "message", "Email already registered!"));
            }

            User user = new User();
            user.setName(body.getName());
            user.setHouseName(body.getHouseName());
            user.setPassword(passwordEncoder.encode(body.getPassword()));
            try {
                user.setUserType(User.UserType.valueOf(body.getUserType()));
            } catch (Exception e) {
                return status(400, Map.of("success", false, "message", "Validation error(s): Invalid userType"));
            }
            user.setEmail(body.getEmail().toLowerCase().trim());
            user.setPhoneNumber(body.getPhoneNumber());
            user.setDateOfBirth(LocalDate.parse(body.getDateOfBirth()));
            user.setHomeAddress(body.getHomeAddress());
            user.setAadharCardNumber(body.getAadharCardNumber());

            User saved = userRepository.save(user);
            emailService.sendWelcomeEmail(saved);

            return ok(Map.of("success", true, "registeredUser", saved));
        } catch (Exception err) {
            return status(500, Map.of("success", false, "message",
                    err.getMessage() == null ? "Something went wrong with the database" : err.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest body, HttpServletResponse response) {
        Optional<User> userOpt = userRepository.findByEmail(body.getEmail());
        if (userOpt.isEmpty()) {
            return status(401, Map.of("success", false, "message", "User not found! Register yourself now!!"));
        }
        User user = userOpt.get();

        if (!passwordEncoder.matches(body.getPassword(), user.getPassword())) {
            return status(401, Map.of("success", false, "message", "Invalid Username or Password"));
        }

        String jwtToken = jwtUtil.generateToken(user.getId());
        cookieUtil.setCookie(response, "token", jwtToken, 7 * 24 * 60 * 60);
        cookieUtil.setCookie(response, "userId", user.getId(), 7 * 24 * 60 * 60);

        // Mirrors the original bug where the login response includes the
        // (hashed) password because it was fetched with .select("+password").
        Map<String, Object> userJson = userAsMap(user, true);
        return ok(Map.of("success", true, "user", userJson));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        cookieUtil.clearCookie(response, "token");
        cookieUtil.clearCookie(response, "userData");
        cookieUtil.clearCookie(response, "userId");
        return ok(Map.of("success", true, "message", "Logout Successfully!"));
    }

    @JwtAuth
    @PutMapping("/editprofile")
    public ResponseEntity<?> editProfile(@RequestBody EditProfileRequest body, HttpServletRequest request) {
        try {
            String id = AuthInterceptor.currentUserId(request);
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isEmpty()) {
                return status(404, Map.of("success", false, "message", "User not found"));
            }
            User user = userOpt.get();
            if (body.getName() != null) user.setName(body.getName());
            if (body.getPhoneNumber() != null) user.setPhoneNumber(body.getPhoneNumber());
            if (body.getDateOfBirth() != null) user.setDateOfBirth(LocalDate.parse(body.getDateOfBirth()));
            if (body.getHomeAddress() != null) user.setHomeAddress(body.getHomeAddress());
            if (body.getHouseName() != null) user.setHouseName(body.getHouseName());
            if (body.getAadharCardNumber() != null) user.setAadharCardNumber(body.getAadharCardNumber());

            User updated = userRepository.save(user);
            return ok(Map.of("success", true, "message", "updated successfully!", "user", updated));
        } catch (Exception err) {
            return status(500, Map.of("success", false, "message", "Failed to update profile"));
        }
    }

    @AdminAuth
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        if (!userRepository.existsById(id)) {
            return status(400, Map.of("success", false, "message", "No user found with provided id"));
        }
        userRepository.deleteById(id);
        return ok(Map.of("success", true, "message", "User deleted successfully!"));
    }

    @PostMapping("/password/forget")
    public ResponseEntity<?> forgetPassword(@RequestBody MiscRequests.ForgetPasswordRequest body) {
        Optional<User> userOpt = userRepository.findByEmail(body.getEmail());
        if (userOpt.isEmpty()) {
            return status(400, Map.of("success", false, "message", "User not found!"));
        }
        User user = userOpt.get();
        String resetToken = generateResetToken(user);
        userRepository.save(user);
        emailService.sendPasswordResetEmail(user, resetToken);
        return ok(Map.of("success", true, "message", "The reset link is send to your gmail!"));
    }

    @PostMapping("/password/reset/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable String token, @RequestBody MiscRequests.ResetPasswordRequest body) {
        String hashedToken = sha256Hex(token);
        Optional<User> userOpt = userRepository.findByResetPasswordToken(hashedToken);
        if (userOpt.isEmpty() || userOpt.get().getResetPasswordExpire() == null
                || userOpt.get().getResetPasswordExpire() < System.currentTimeMillis()) {
            return status(401, Map.of("success", false, "message", "Invalid token!"));
        }
        User user = userOpt.get();

        if (body.getPassword() == null || !body.getPassword().equals(body.getConfirmPassword())) {
            return status(401, Map.of("success", false, "message", "mismatch new password and confirm password!"));
        }

        user.setPassword(passwordEncoder.encode(body.getPassword()));
        user.setResetPasswordToken(null);
        user.setResetPasswordExpire(null);
        userRepository.save(user);

        return ok(Map.of("success", true, "message", "Password changed successfully!"));
    }

    @PutMapping("/password/update")
    public ResponseEntity<?> updatePassword() {
        // Mirrors the original endpoint, which never actually completes an
        // update (req.users is never populated in the Node app either).
        return status(401, Map.of("success", false, "message", "Please enter current password"));
    }

    // ---------- helpers ----------

    private String generateResetToken(User user) {
        String resetToken = randomHex(20);
        user.setResetPasswordToken(sha256Hex(resetToken));
        user.setResetPasswordExpire(System.currentTimeMillis() + 10 * 60 * 1000);
        return resetToken;
    }

    private String randomHex(int numBytes) {
        byte[] bytes = new byte[numBytes];
        new java.security.SecureRandom().nextBytes(bytes);
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) sb.append(String.format("%02x", b));
        return sb.toString();
    }

    private String sha256Hex(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(value.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }

    private Map<String, Object> userAsMap(User user, boolean includePassword) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("_id", user.getId());
        map.put("name", user.getName());
        map.put("houseName", user.getHouseName());
        if (includePassword) map.put("password", user.getPassword());
        map.put("userType", user.getUserType());
        map.put("email", user.getEmail());
        map.put("phoneNumber", user.getPhoneNumber());
        map.put("dateOfBirth", user.getDateOfBirth());
        map.put("homeAddress", user.getHomeAddress());
        map.put("aadharCardNumber", user.getAadharCardNumber());
        map.put("createdAt", user.getCreatedAt());
        return map;
    }

    private ResponseEntity<?> ok(Object body) {
        return ResponseEntity.status(200).body(body);
    }

    private ResponseEntity<?> status(int code, Object body) {
        return ResponseEntity.status(code).body(body);
    }
}
