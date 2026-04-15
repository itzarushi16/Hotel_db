package com.hotel.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PromotionRequest {
    @NotBlank(message = "Promo code is required")
    private String code;

    @NotNull(message = "Discount percentage is required")
    private Integer discountPercentage;

    private LocalDate validFrom;
    private LocalDate validUntil;
    private Boolean isActive;
}
