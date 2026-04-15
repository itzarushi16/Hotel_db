package com.hotel.booking.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RoomCategoryRequest {
    @NotBlank(message = "Category name is required")
    private String name;

    private String description;
}
