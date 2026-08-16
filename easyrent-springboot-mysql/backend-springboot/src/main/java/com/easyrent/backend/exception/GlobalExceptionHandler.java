package com.easyrent.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Thrown when the request path doesn't match any controller/static
    // resource (e.g. hitting "/" or a typo'd path). This is NOT a database
    // error, so it gets its own honest response instead of being swallowed
    // by the generic handler below.
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<?> handleNotFound(NoResourceFoundException ex) {
        return ResponseEntity.status(404).body(Map.of(
                "success", false,
                "message", "No matching endpoint for this URL. Check the path (e.g. /api/users/register)."
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAny(Exception ex) {
        return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Something went wrong with database",
                "error", ex.getMessage() == null ? "" : ex.getMessage()
        ));
    }
}