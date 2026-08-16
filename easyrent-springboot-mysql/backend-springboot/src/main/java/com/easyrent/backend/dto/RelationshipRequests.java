package com.easyrent.backend.dto;

import lombok.Data;

public class RelationshipRequests {

    @Data
    public static class AcceptRequest {
        private String roomId;
        private String renterId;
    }

    @Data
    public static class RejectRequest {
        private String renterId;
        private String roomId;
    }

    @Data
    public static class RoomIdRequest {
        private String roomId;
    }

    @Data
    public static class RelationIdRequest {
        private String relationId;
    }
}
