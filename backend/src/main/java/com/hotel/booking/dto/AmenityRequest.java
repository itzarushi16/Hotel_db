package com.hotel.booking.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AmenityRequest {
    @NotBlank(message = "Amenity name is required")
    private String name;

    private String icon;
}
