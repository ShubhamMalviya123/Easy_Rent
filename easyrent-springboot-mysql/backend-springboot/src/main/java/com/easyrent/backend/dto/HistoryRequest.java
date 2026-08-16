package com.easyrent.backend.dto;

import lombok.Data;

@Data
public class HistoryRequest {
    private Double rentPaid;
    private String date; // ISO date-time string
    private String paymentMethod;
    private String remarks;
    private String stripeSessionId;
    private String stripePaymentIntentId;
    private String paymentStatus;
}
