package com.hotel.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class HotelRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Location/Address is required")
    private String address;

    private String description;
    private String city;
    private String country;
    private Double rating;
    private String imageUrl;
    
    private List<Long> amenityIds;
}
