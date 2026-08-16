package com.easyrent.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomAddress {

    @Column(name = "addr_street")
    private String street;

    @Column(name = "addr_city")
    private String city;

    @Column(name = "addr_state")
    private String state;

    @Column(name = "addr_zip_code")
    private String zipCode;
}
