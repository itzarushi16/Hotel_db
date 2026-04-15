package com.hotel.booking.controller;

import com.hotel.booking.dto.*;
import com.hotel.booking.entity.*;
import com.hotel.booking.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    // --- Hotels ---
    @PostMapping("/hotels")
    public ResponseEntity<Hotel> createHotel(@Valid @RequestBody HotelRequest req) {
        return new ResponseEntity<>(adminService.createHotel(req), HttpStatus.CREATED);
    }

    @PutMapping("/hotels/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @Valid @RequestBody HotelRequest req) {
        return ResponseEntity.ok(adminService.updateHotel(id, req));
    }

    @DeleteMapping("/hotels/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        adminService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }

    // --- Rooms ---
    @GetMapping("/rooms")
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(adminService.getAllRooms());
    }

    @PostMapping("/rooms")
    public ResponseEntity<Room> createRoom(@Valid @RequestBody RoomRequest req) {
        return new ResponseEntity<>(adminService.createRoom(req), HttpStatus.CREATED);
    }

    @PutMapping("/rooms/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @Valid @RequestBody RoomRequest req) {
        return ResponseEntity.ok(adminService.updateRoom(id, req));
    }

    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        adminService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    // --- Room Categories ---
    @GetMapping("/categories")
    public ResponseEntity<List<RoomCategory>> getAllCategories() {
        return ResponseEntity.ok(adminService.getAllCategories());
    }

    @PostMapping("/categories")
    public ResponseEntity<RoomCategory> createCategory(@Valid @RequestBody RoomCategoryRequest req) {
        return new ResponseEntity<>(adminService.createCategory(req), HttpStatus.CREATED);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<RoomCategory> updateCategory(@PathVariable Long id, @Valid @RequestBody RoomCategoryRequest req) {
        return ResponseEntity.ok(adminService.updateCategory(id, req));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        adminService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // --- Amenities ---
    @GetMapping("/amenities")
    public ResponseEntity<List<Amenity>> getAllAmenities() {
        return ResponseEntity.ok(adminService.getAllAmenities());
    }

    @PostMapping("/amenities")
    public ResponseEntity<Amenity> createAmenity(@Valid @RequestBody AmenityRequest req) {
        return new ResponseEntity<>(adminService.createAmenity(req), HttpStatus.CREATED);
    }

    @PutMapping("/amenities/{id}")
    public ResponseEntity<Amenity> updateAmenity(@PathVariable Long id, @Valid @RequestBody AmenityRequest req) {
        return ResponseEntity.ok(adminService.updateAmenity(id, req));
    }

    @DeleteMapping("/amenities/{id}")
    public ResponseEntity<Void> deleteAmenity(@PathVariable Long id) {
        adminService.deleteAmenity(id);
        return ResponseEntity.noContent().build();
    }

    // --- Promotions ---
    @GetMapping("/promotions")
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        return ResponseEntity.ok(adminService.getAllPromotions());
    }

    @PostMapping("/promotions")
    public ResponseEntity<Promotion> createPromotion(@Valid @RequestBody PromotionRequest req) {
        return new ResponseEntity<>(adminService.createPromotion(req), HttpStatus.CREATED);
    }

    @PutMapping("/promotions/{id}")
    public ResponseEntity<Promotion> updatePromotion(@PathVariable Long id, @Valid @RequestBody PromotionRequest req) {
        return ResponseEntity.ok(adminService.updatePromotion(id, req));
    }

    @DeleteMapping("/promotions/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        adminService.deletePromotion(id);
        return ResponseEntity.noContent().build();
    }

    // --- Bookings ---
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(adminService.getAllBookings());
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @Valid @RequestBody BookingStatusRequest req) {
        return ResponseEntity.ok(adminService.updateBookingStatus(id, req.getStatus()));
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        adminService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
