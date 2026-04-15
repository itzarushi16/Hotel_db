import { useState, useEffect } from 'react';
import api from '../../api';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/admin/bookings');
      setBookings(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) { alert('Error updating status'); }
  };

  const deleteBooking = async (id) => {
    if(!window.confirm('Delete booking completely?')) return;
    try {
      await api.delete(`/admin/bookings/${id}`);
      fetchBookings();
    } catch (err) { alert('Error deleting booking'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Manage Bookings</h1>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>ID / Ref</th>
              <th>User</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(bookings || []).map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                <td style={{ padding: '1rem' }}>{b.id}<br/><small style={{color:'var(--text-muted)'}}>{b.reservationNumber?.substring(0,8)}</small></td>
                <td>{b.user?.email}</td>
                <td>Room {b.room?.roomNumber}</td>
                <td>{b.checkInDate} to {b.checkOutDate}</td>
                <td>
                    <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: b.status === 'CONFIRMED' ? 'rgba(16,185,129,0.2)' : b.status === 'CANCELLED' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)', color: b.status === 'CONFIRMED' ? '#10b981' : b.status === 'CANCELLED' ? '#ef4444' : '#fff' }}>
                        {b.status}
                    </span>
                </td>
                <td>${b.totalPrice}</td>
                <td style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem' }}>
                  {b.status !== 'CONFIRMED' && <button onClick={() => updateStatus(b.id, 'CONFIRMED')} className="btn-primary" style={{ padding: '0.3rem', borderRadius: '4px' }} title="Confirm"><CheckCircle size={16}/></button>}
                  {b.status !== 'CANCELLED' && <button onClick={() => updateStatus(b.id, 'CANCELLED')} className="btn-outline" style={{ padding: '0.3rem', borderRadius: '4px' }} title="Cancel"><XCircle size={16}/></button>}
                  <button onClick={() => deleteBooking(b.id)} style={{ padding: '0.3rem', borderRadius: '4px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }} title="Delete"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageBookings;
