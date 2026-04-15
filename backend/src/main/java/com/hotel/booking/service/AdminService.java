package com.hotel.booking.service;

import com.hotel.booking.dto.*;
import com.hotel.booking.entity.*;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final RoomCategoryRepository roomCategoryRepository;
    private final AmenityRepository amenityRepository;
    private final BookingRepository bookingRepository;
    private final PromotionRepository promotionRepository;

    // --- Hotel CRUD ---
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Transactional
    public Hotel createHotel(HotelRequest req) {
        Hotel hotel = Hotel.builder()
                .name(req.getName())
                .address(req.getAddress())
                .description(req.getDescription())
                .city(req.getCity())
                .country(req.getCountry())
                .rating(req.getRating())
                .imageUrl(req.getImageUrl())
                .amenities(getAmenitiesByIds(req.getAmenityIds()))
                .build();
        return hotelRepository.save(hotel);
    }

    @Transactional
    public Hotel updateHotel(Long id, HotelRequest req) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
        hotel.setName(req.getName());
        hotel.setAddress(req.getAddress());
        hotel.setDescription(req.getDescription());
        hotel.setCity(req.getCity());
        hotel.setCountry(req.getCountry());
        hotel.setRating(req.getRating());
        hotel.setImageUrl(req.getImageUrl());
        hotel.setAmenities(getAmenitiesByIds(req.getAmenityIds()));
        return hotelRepository.save(hotel);
    }

    @Transactional
    public void deleteHotel(Long id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
        // First delete associated rooms to prevent referential integrity errors
        List<Room> rooms = roomRepository.findAll();
        for (Room r : rooms) {
            if (r.getHotel().getId().equals(id)) {
                roomRepository.delete(r);
            }
        }
        hotelRepository.delete(hotel);
    }

    // --- Room CRUD ---
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Transactional
    public Room createRoom(RoomRequest req) {
        Hotel hotel = hotelRepository.findById(req.getHotelId()).orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
        RoomCategory category = roomCategoryRepository.findById(req.getRoomCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        Room room = Room.builder()
                .roomNumber(req.getRoomNumber())
                .pricePerNight(req.getPricePerNight())
                .capacity(req.getCapacity())
                .isAvailable(req.getIsAvailable() != null ? req.getIsAvailable() : true)
                .imageUrl(req.getImageUrl())
                .hotel(hotel)
                .roomCategory(category)
                .build();
        return roomRepository.save(room);
    }

    @Transactional
    public Room updateRoom(Long id, RoomRequest req) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        Hotel hotel = hotelRepository.findById(req.getHotelId()).orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
        RoomCategory category = roomCategoryRepository.findById(req.getRoomCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        
        room.setRoomNumber(req.getRoomNumber());
        room.setPricePerNight(req.getPricePerNight());
        room.setCapacity(req.getCapacity());
        room.setIsAvailable(req.getIsAvailable() != null ? req.getIsAvailable() : true);
        room.setImageUrl(req.getImageUrl());
        room.setHotel(hotel);
        room.setRoomCategory(category);
        return roomRepository.save(room);
    }

    @Transactional
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    // --- Room Category CRUD ---
    public List<RoomCategory> getAllCategories() {
        return roomCategoryRepository.findAll();
    }

    @Transactional
    public RoomCategory createCategory(RoomCategoryRequest req) {
        RoomCategory cat = RoomCategory.builder()
                .name(req.getName())
                .description(req.getDescription())
                .build();
        return roomCategoryRepository.save(cat);
    }

    @Transactional
    public RoomCategory updateCategory(Long id, RoomCategoryRequest req) {
        RoomCategory cat = roomCategoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        cat.setName(req.getName());
        cat.setDescription(req.getDescription());
        return roomCategoryRepository.save(cat);
    }

    @Transactional
    public void deleteCategory(Long id) {
        roomCategoryRepository.deleteById(id);
    }

    // --- Amenity CRUD ---
    public List<Amenity> getAllAmenities() {
        return amenityRepository.findAll();
    }

    @Transactional
    public Amenity createAmenity(AmenityRequest req) {
        Amenity amenity = Amenity.builder()
                .name(req.getName())
                .icon(req.getIcon())
                .build();
        return amenityRepository.save(amenity);
    }

    @Transactional
    public Amenity updateAmenity(Long id, AmenityRequest req) {
        Amenity amenity = amenityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Amenity not found"));
        amenity.setName(req.getName());
        amenity.setIcon(req.getIcon());
        return amenityRepository.save(amenity);
    }

    @Transactional
    public void deleteAmenity(Long id) {
        amenityRepository.deleteById(id);
    }

    // --- Promotion CRUD ---
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    @Transactional
    public Promotion createPromotion(PromotionRequest req) {
        Promotion promo = Promotion.builder()
                .code(req.getCode())
                .discountPercentage(req.getDiscountPercentage())
                .validFrom(req.getValidFrom())
                .validUntil(req.getValidUntil())
                .isActive(req.getIsActive() != null ? req.getIsActive() : true)
                .build();
        return promotionRepository.save(promo);
    }

    @Transactional
    public Promotion updatePromotion(Long id, PromotionRequest req) {
        Promotion promo = promotionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Promotion not found"));
        promo.setCode(req.getCode());
        promo.setDiscountPercentage(req.getDiscountPercentage());
        promo.setValidFrom(req.getValidFrom());
        promo.setValidUntil(req.getValidUntil());
        if (req.getIsActive() != null) promo.setIsActive(req.getIsActive());
        return promotionRepository.save(promo);
    }

    @Transactional
    public void deletePromotion(Long id) {
        promotionRepository.deleteById(id);
    }

    // --- Booking Oversight ---
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllWithUserAndRoom();
    }

    @Transactional
    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    @Transactional
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // Helper
    private Set<Amenity> getAmenitiesByIds(List<Long> ids) {
        Set<Amenity> set = new HashSet<>();
        if (ids != null) {
            for (Long aid : ids) {
                amenityRepository.findById(aid).ifPresent(set::add);
            }
        }
        return set;
    }
}
