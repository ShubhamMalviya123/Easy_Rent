package com.easyrent.backend.dto;

import lombok.Data;

public class MiscRequests {

    @Data
    public static class ForgetPasswordRequest {
        private String email;
    }

    @Data
    public static class ResetPasswordRequest {
        private String password;
        private String confirmPassword;
    }

    @Data
    public static class DeleteUserRequest {
        private String id;
    }
}
