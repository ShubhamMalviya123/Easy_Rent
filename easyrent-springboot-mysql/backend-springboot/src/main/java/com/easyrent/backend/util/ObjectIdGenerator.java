package com.easyrent.backend.util;

import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Generates 24-character hex ids that look exactly like Mongo ObjectIds
 * (4-byte timestamp + 5-byte random + 3-byte counter). The frontend only
 * ever treats "_id" as an opaque string, so this keeps every response
 * shape identical to the original Mongoose-backed API without needing
 * Mongo itself.
 */
public final class ObjectIdGenerator {

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final byte[] RANDOM_VALUE = new byte[5];
    private static final AtomicInteger COUNTER = new AtomicInteger(RANDOM.nextInt());

    static {
        RANDOM.nextBytes(RANDOM_VALUE);
    }

    private ObjectIdGenerator() {
    }

    public static String generate() {
        ByteBuffer buffer = ByteBuffer.allocate(12);
        int timestamp = (int) (System.currentTimeMillis() / 1000L);
        buffer.putInt(timestamp);
        buffer.put(RANDOM_VALUE);
        int count = COUNTER.getAndIncrement() & 0xFFFFFF;
        buffer.put((byte) (count >> 16));
        buffer.put((byte) (count >> 8));
        buffer.put((byte) count);

        StringBuilder sb = new StringBuilder(24);
        for (byte b : buffer.array()) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
