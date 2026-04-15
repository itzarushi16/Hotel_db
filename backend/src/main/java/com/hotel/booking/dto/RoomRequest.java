package com.hotel.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class RoomRequest {
    @NotBlank(message = "Room number is required")
    private String roomNumber;

    @NotNull(message = "Price per night is required")
    private BigDecimal pricePerNight;

    @NotNull(message = "Capacity is required")
    private Integer capacity;

    private Boolean isAvailable;
    
    private String imageUrl;

    @NotNull(message = "Hotel ID is required")
    private Long hotelId;

    @NotNull(message = "Room Category ID is required")
    private Long roomCategoryId;
}
