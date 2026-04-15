-- Insert Roles
INSERT IGNORE INTO roles (id, name) VALUES (1, 'ROLE_USER');
INSERT IGNORE INTO roles (id, name) VALUES (2, 'ROLE_ADMIN');

-- Provide the admin user with exactly 'admin@hotel.com'. Password is 'admin123' hashed with BCrypt.
-- The hashed password for 'admin123' is '$2a$10$eEwB2gV.L8R2.D5n2B8c/..C/w3f1h3Q4rY1/m/6y4jY4b1wZzRkS'
INSERT IGNORE INTO users (id, email, password, first_name, last_name, loyalty_points, role_id, phone_number, created_at)
VALUES (
    1, 
    'admin@hotel.com', 
    '$2a$10$eEwB2gV.L8R2.D5n2B8c/..C/w3f1h3Q4rY1/m/6y4jY4b1wZzRkS', 
    'System', 
    'Admin', 
    0, 
    2, 
    '1234567890', 
    NOW()
);

-- Insert Room Categories
INSERT IGNORE INTO room_categories (id, name, description) VALUES (1, 'Standard Room', 'A cozy room with basic amenities.');
INSERT IGNORE INTO room_categories (id, name, description) VALUES (2, 'Deluxe Room', 'A larger room with a city view.');
INSERT IGNORE INTO room_categories (id, name, description) VALUES (3, 'Suite', 'A luxury suite with a living area.');

-- Insert Amenities
INSERT IGNORE INTO amenities (id, name, icon) VALUES (1, 'Free Wi-Fi', 'Wifi');
INSERT IGNORE INTO amenities (id, name, icon) VALUES (2, 'Swimming Pool', 'Droplets');
INSERT IGNORE INTO amenities (id, name, icon) VALUES (3, 'Gym', 'Dumbbell');
INSERT IGNORE INTO amenities (id, name, icon) VALUES (4, 'Spa', 'Coffee');
INSERT IGNORE INTO amenities (id, name, icon) VALUES (5, 'Restaurant', 'UtensilsCrossed');
INSERT IGNORE INTO amenities (id, name, icon) VALUES (6, 'Room Service', 'Bell');

-- Insert Hotels
INSERT IGNORE INTO hotels (id, name, description, address, city, country, rating, image_url, created_at) VALUES 
(1, 'Grand Luxury Resort', 'A five-star resort with all amenities.', '123 Beachfront Ave', 'Miami', 'USA', 5.0, 'https://images.unsplash.com/photo-1566073771259-6a8506099945', NOW()),
(2, 'City Central Hotel', 'Conveniently located in the city center.', '456 Main St', 'New York', 'USA', 4.2, 'https://images.unsplash.com/photo-1551882547-ff40c0d5b5df', NOW()),
(3, 'Mountain View Lodge', 'Peaceful retreat in the mountains.', '789 Alpine Rd', 'Denver', 'USA', 4.8, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', NOW());

-- Map Hotel Amenities
INSERT IGNORE INTO hotel_amenities (hotel_id, amenity_id) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6);
INSERT IGNORE INTO hotel_amenities (hotel_id, amenity_id) VALUES (2, 1), (2, 3), (2, 5);
INSERT IGNORE INTO hotel_amenities (hotel_id, amenity_id) VALUES (3, 1), (3, 4), (3, 5);

-- Insert Rooms
INSERT IGNORE INTO rooms (id, room_number, price_per_night, capacity, is_available, hotel_id, room_category_id, image_url) VALUES 
(1, '101', 150.00, 2, 1, 1, 1, 'https://images.unsplash.com/photo-1618773928121-c32242e63f39'),
(2, '102', 150.00, 2, 1, 1, 1, 'https://images.unsplash.com/photo-1618773928121-c32242e63f39'),
(3, '201', 250.00, 3, 1, 1, 2, 'https://images.unsplash.com/photo-1590490360182-c33d57733427'),
(4, '301', 500.00, 4, 1, 1, 3, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'),
(5, '101', 100.00, 2, 1, 2, 1, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304'),
(6, '201', 180.00, 2, 1, 2, 2, 'https://images.unsplash.com/photo-1590490360182-c33d57733427'),
(7, '101', 120.00, 2, 1, 3, 1, 'https://images.unsplash.com/photo-1618773928121-c32242e63f39'),
(8, '201', 200.00, 4, 1, 3, 3, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b');

-- Insert Promotions
INSERT IGNORE INTO promotions (id, code, discount_percentage, valid_from, valid_until, is_active) VALUES 
(1, 'WELCOME10', 10, '2023-01-01', '2030-12-31', 1),
(2, 'SUMMER20', 20, '2024-06-01', '2030-08-31', 1),
(3, 'FLASH50', 50, '2024-01-01', '2024-01-02', 0);
