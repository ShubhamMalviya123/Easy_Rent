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
public class HomeAddress {

    @Column(name = "home_street")
    private String street;

    @Column(name = "home_city")
    private String city;

    @Column(name = "home_state")
    private String state;

    @Column(name = "home_zip_code")
    private String zipCode;
}
