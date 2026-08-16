package com.easyrent.backend.dto;

import com.easyrent.backend.entity.RoomAddress;
import lombok.Data;

@Data
public class RoomRequest {
    private Integer roomNumber;
    private RoomAddress address;
    private Double rentPrice;
    private String roomType;
    private Integer numberOfRooms;
    private Integer numberOfBathrooms;
    private Boolean isAvailable;
}
