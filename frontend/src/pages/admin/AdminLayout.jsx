import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2, BedDouble, Tag, List, CalendarCheck, Home, LogOut } from 'lucide-react';
import { useEffect } from 'react';

const AdminLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== 'ROLE_ADMIN') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'ROLE_ADMIN') return null;

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <Home size={20} /> },
    { name: 'Hotels', path: '/admin/hotels', icon: <Building2 size={20} /> },
    { name: 'Rooms', path: '/admin/rooms', icon: <BedDouble size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <List size={20} /> },
    { name: 'Amenities', path: '/admin/amenities', icon: <List size={20} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { name: 'Promotions', path: '/admin/promotions', icon: <Tag size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
      <aside style={{ width: '250px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--primary-color)', textAlign: 'center' }}>Admin Center</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '8px',
                  backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
              >
                {item.icon} {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
