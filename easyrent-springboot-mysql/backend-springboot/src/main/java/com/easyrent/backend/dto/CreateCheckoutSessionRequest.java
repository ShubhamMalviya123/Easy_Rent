package com.easyrent.backend.dto;

import lombok.Data;

@Data
public class CreateCheckoutSessionRequest {
    private String relationId;
    private Double amount;
    private String renterId;
    private String ownerId;
    private String roomId;
}
