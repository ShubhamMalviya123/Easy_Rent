package com.easyrent.backend.security;

import java.lang.annotation.*;

/**
 * Mirrors the original jwtAuth Express middleware: requires a valid
 * "token" cookie and exposes the decoded user id to the controller.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface JwtAuth {
}
