package com.easyrent.backend.security;

import java.lang.annotation.*;

/**
 * Mirrors the original landOwnerAuth Express middleware: requires a valid
 * "token" cookie belonging to a user with userType == landowner.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LandOwnerAuth {
}
