package com.easyrent.backend.dto;

import com.easyrent.backend.entity.HomeAddress;
import lombok.Data;

@Data
public class EditProfileRequest {
    private String name;
    private String phoneNumber;
    private String dateOfBirth;
    private HomeAddress homeAddress;
    private String houseName;
    private String aadharCardNumber;
}
