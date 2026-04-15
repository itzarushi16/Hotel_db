package com.hotel.booking.config;

import com.hotel.booking.entity.Amenity;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Role;
import com.hotel.booking.entity.RoomCategory;
import com.hotel.booking.entity.Room;
import com.hotel.booking.entity.User;
import com.hotel.booking.entity.Promotion;
import com.hotel.booking.repository.AmenityRepository;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.PromotionRepository;
import com.hotel.booking.repository.RoleRepository;
import com.hotel.booking.repository.RoomCategoryRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AmenityRepository amenityRepository;
    private final HotelRepository hotelRepository;
    private final RoomCategoryRepository roomCategoryRepository;
    private final RoomRepository roomRepository;
    private final PromotionRepository promotionRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Roles
        Role userRole = createRoleIfNotFound("ROLE_USER");
        Role adminRole = createRoleIfNotFound("ROLE_ADMIN");

        // 2. Seed Admin User
        if (!userRepository.existsByEmail("admin@hotel.com")) {
            User admin = User.builder()
                    .email("admin@hotel.com")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("System")
                    .lastName("Admin")
                    .role(adminRole)
                    .build();
            userRepository.save(admin);
            System.out.println("Admin user seeded: admin@hotel.com / admin123");
        }

        // 3. Seed Amenities
        Amenity wifi = createAmenityIfNotFound("Free Wi-Fi", "wifi");
        Amenity pool = createAmenityIfNotFound("Swimming Pool", "pool");
        Amenity gym = createAmenityIfNotFound("Gym", "dumbbell");
        Amenity spa = createAmenityIfNotFound("Spa", "spa");
        Amenity restaurant = createAmenityIfNotFound("Restaurant", "utensils");

        // 4. Seed Categories
        RoomCategory standard = createCategoryIfNotFound("Standard", "Basic comfortable room");
        RoomCategory deluxe = createCategoryIfNotFound("Deluxe", "Spacious room with a view");
        RoomCategory suite = createCategoryIfNotFound("Suite", "Luxurious suite with separate living area");

        // 5. Seed Hotels and Rooms (Only if no hotels exist)
        if (hotelRepository.count() == 0) {
            Set<Amenity> grandAmenities = new HashSet<>(List.of(wifi, pool, spa, restaurant));
            Hotel grandResort = Hotel.builder()
                    .name("Grand Luxury Resort")
                    .description("Experience ultimate luxury at our beachfront resort.")
                    .address("123 Ocean Drive")
                    .city("Miami")
                    .country("USA")
                    .rating(4.8)
                    .imageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")
                    .amenities(grandAmenities)
                    .build();
            hotelRepository.save(grandResort);

            Set<Amenity> cityAmenities = new HashSet<>(List.of(wifi, gym, restaurant));
            Hotel cityInn = Hotel.builder()
                    .name("City Center Inn")
                    .description("Conveniently located in the heart of downtown.")
                    .address("456 Main St")
                    .city("New York")
                    .country("USA")
                    .rating(4.2)
                    .imageUrl("https://images.unsplash.com/photo-1551882547-ff40c0d129fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")
                    .amenities(cityAmenities)
                    .build();
            hotelRepository.save(cityInn);

            // Add Rooms
            roomRepository.save(Room.builder().hotel(grandResort).roomCategory(standard).roomNumber("101").pricePerNight(new BigDecimal("150.00")).capacity(2).isAvailable(true).imageUrl("https://images.unsplash.com/photo-1611892440504-42a792e24d32").build());
            roomRepository.save(Room.builder().hotel(grandResort).roomCategory(deluxe).roomNumber("201").pricePerNight(new BigDecimal("250.00")).capacity(3).isAvailable(true).imageUrl("https://images.unsplash.com/photo-1582719478250-c89404bb8a0e").build());
            roomRepository.save(Room.builder().hotel(grandResort).roomCategory(suite).roomNumber("301").pricePerNight(new BigDecimal("500.00")).capacity(4).isAvailable(true).imageUrl("https://images.unsplash.com/photo-1631049307264-da0ec9d70304").build());

            roomRepository.save(Room.builder().hotel(cityInn).roomCategory(standard).roomNumber("1A").pricePerNight(new BigDecimal("100.00")).capacity(2).isAvailable(true).imageUrl("https://images.unsplash.com/photo-1611892440504-42a792e24d32").build());
            roomRepository.save(Room.builder().hotel(cityInn).roomCategory(deluxe).roomNumber("2A").pricePerNight(new BigDecimal("180.00")).capacity(2).isAvailable(true).imageUrl("https://images.unsplash.com/photo-1582719478250-c89404bb8a0e").build());
            System.out.println("Dummy hotels and rooms seeded successfully.");
        }

        // 6. Seed Promotions
        if (promotionRepository.count() == 0) {
            Promotion summerPromo = Promotion.builder()
                .code("SUMMER26")
                .discountPercentage(15)
                .validFrom(LocalDate.now())
                .validUntil(LocalDate.now().plusMonths(3))
                .isActive(true)
                .build();
            
            Promotion welcomePromo = Promotion.builder()
                .code("WELCOME10")
                .discountPercentage(10)
                .validFrom(LocalDate.now())
                .validUntil(LocalDate.now().plusYears(1))
                .isActive(true)
                .build();
                
            promotionRepository.save(summerPromo);
            promotionRepository.save(welcomePromo);
            System.out.println("Dummy promotions seeded successfully.");
        }
    }

    private Role createRoleIfNotFound(String name) {
        Optional<Role> roleOpt = roleRepository.findByName(name);
        if (roleOpt.isEmpty()) {
            Role role = new Role();
            role.setName(name);
            return roleRepository.save(role);
        }
        return roleOpt.get();
    }

    private Amenity createAmenityIfNotFound(String name, String icon) {
        // Assuming Amenity Repository can find by name (requires method, let's just cheat / try-catch or assume we are building sequentially)
        // Since we don't have findByName in AmenityRepo, we'll fetch all and filter to be safe.
        Optional<Amenity> amenityOpt = amenityRepository.findAll().stream().filter(a -> a.getName().equals(name)).findFirst();
        if (amenityOpt.isEmpty()) {
            Amenity a = new Amenity();
            a.setName(name);
            a.setIcon(icon);
            return amenityRepository.save(a);
        }
        return amenityOpt.get();
    }

    private RoomCategory createCategoryIfNotFound(String name, String desc) {
        Optional<RoomCategory> catOpt = roomCategoryRepository.findAll().stream().filter(c -> c.getName().equals(name)).findFirst();
        if (catOpt.isEmpty()) {
            RoomCategory rc = new RoomCategory();
            rc.setName(name);
            rc.setDescription(desc);
            return roomCategoryRepository.save(rc);
        }
        return catOpt.get();
    }
}
