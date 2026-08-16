package com.easyrent.backend.security;

import java.lang.annotation.*;

/**
 * Mirrors the original adminAuth Express middleware exactly, including its
 * behaviour: it checks payload.user?.userType === "admin", but tokens are
 * only ever signed with { id }, so this check never passes in the
 * original app either. Kept as-is since the request was to change nothing.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AdminAuth {
}
