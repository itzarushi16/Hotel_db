import { useEffect, useState } from 'react';
import api from '../../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ hotels: 0, rooms: 0, bookings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [hotels, rooms, bookings] = await Promise.all([
          api.get('/hotels'),
          api.get('/admin/rooms'),
          api.get('/admin/bookings')
        ]);
        setStats({
          hotels: hotels.data.length || 0,
          rooms: rooms.data.length || 0,
          bookings: bookings.data.length || 0
        });
      } catch (err) {
        console.error('Error fetching stats', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Welcome to the admin control center.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Total Hotels</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: '1rem 0' }}>{stats.hotels}</p>
        </div>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Active Bookings</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981', margin: '1rem 0' }}>{stats.bookings}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
