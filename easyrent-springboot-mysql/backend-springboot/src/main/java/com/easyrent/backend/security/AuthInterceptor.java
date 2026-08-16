package com.easyrent.backend.security;

import com.easyrent.backend.entity.User;
import com.easyrent.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Optional;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    public static final String USER_ID_ATTR = "userId";

    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final UserRepository userRepository;

    public AuthInterceptor(JwtUtil jwtUtil, CookieUtil cookieUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
        this.userRepository = userRepository;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        if (handlerMethod.hasMethodAnnotation(AdminAuth.class)) {
            // Faithful port of adminAuth.js: it checks payload.user?.userType,
            // a field that is never present on tokens minted by this app
            // (they only carry { id }). So the check always fails with 404,
            // exactly like the original — kept as-is per "no changes" request.
            writeText(response, 404, "Only accessed to admin!");
            return false;
        }

        if (handlerMethod.hasMethodAnnotation(LandOwnerAuth.class)) {
            String token = cookieUtil.readCookie(request, "token");
            String userId = jwtUtil.verifyAndGetUserId(token);
            if (userId == null) {
                writeText(response, 401, "Authentication failed!");
                return false;
            }
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                writeText(response, 401, "Authentication failed!");
                return false;
            }
            User user = userOpt.get();
            if (user.getUserType() != User.UserType.landowner) {
                writeText(response, 401, "Only landowner can access this route");
                return false;
            }
            request.setAttribute(USER_ID_ATTR, userId);
            return true;
        }

        if (handlerMethod.hasMethodAnnotation(JwtAuth.class)) {
            String token = cookieUtil.readCookie(request, "token");
            String userId = jwtUtil.verifyAndGetUserId(token);
            if (userId == null) {
                writeText(response, 401, "Unauthorized!");
                return false;
            }
            request.setAttribute(USER_ID_ATTR, userId);
            return true;
        }

        return true;
    }

    private void writeText(HttpServletResponse response, int status, String body) throws Exception {
        response.setStatus(status);
        response.setContentType("text/plain");
        response.getWriter().write(body);
    }

    public static String currentUserId(HttpServletRequest request) {
        Object v = request.getAttribute(USER_ID_ATTR);
        return v == null ? null : v.toString();
    }
}
