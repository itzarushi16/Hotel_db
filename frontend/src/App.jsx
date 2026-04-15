import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HotelDetails from './pages/HotelDetails';
import MyBookings from './pages/MyBookings';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageHotels from './pages/admin/ManageHotels';
import ManageRooms from './pages/admin/ManageRooms';
import ManageCategories from './pages/admin/ManageCategories';
import ManageAmenities from './pages/admin/ManageAmenities';
import ManageBookings from './pages/admin/ManageBookings';
import ManagePromotions from './pages/admin/ManagePromotions';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="hotels" element={<ManageHotels />} />
              <Route path="rooms" element={<ManageRooms />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="amenities" element={<ManageAmenities />} />
              <Route path="bookings" element={<ManageBookings />} />
              <Route path="promotions" element={<ManagePromotions />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
