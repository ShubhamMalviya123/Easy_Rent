package com.easyrent.backend.dto;

import com.easyrent.backend.entity.HomeAddress;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String houseName;
    private String password;
    private String userType; // "landowner" | "renter" | "admin"
    private String email;
    private String phoneNumber;
    private String dateOfBirth; // yyyy-MM-dd
    private HomeAddress homeAddress;
    private String aadharCardNumber;
}
