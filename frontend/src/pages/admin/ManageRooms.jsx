import { useState, useEffect } from 'react';
import api from '../../api';
import { Trash2, Edit } from 'lucide-react';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ roomNumber: '', pricePerNight: '', capacity: '', isAvailable: true, imageUrl: '', hotelId: '', roomCategoryId: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const [rRes, hRes, cRes] = await Promise.all([
        api.get('/admin/rooms'),
        api.get('/hotels'),
        api.get('/admin/categories')
      ]);
      setRooms(rRes.data.content || rRes.data);
      setHotels(hRes.data);
      setCategories(cRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/admin/rooms/${editId}`, form);
      else await api.post('/admin/rooms', form);
      setForm({ roomNumber: '', pricePerNight: '', capacity: '', isAvailable: true, imageUrl: '', hotelId: '', roomCategoryId: '' });
      setEditId(null);
      fetchData();
    } catch (err) { alert('Error saving room'); }
  };

  const editRoom = (r) => {
    setEditId(r.id);
    setForm({ roomNumber: r.roomNumber, pricePerNight: r.pricePerNight, capacity: r.capacity, isAvailable: r.isAvailable, imageUrl: r.imageUrl || '', hotelId: r.hotel?.id || '', roomCategoryId: r.roomCategory?.id || '' });
  };

  const deleteRoom = async (id) => {
    if(!window.confirm('Delete room?')) return;
    try {
      await api.delete(`/admin/rooms/${id}`);
      fetchData();
    } catch (err) { alert('Error deleting room'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Manage Rooms</h1>
      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select className="input-field" style={{flex:1}} required value={form.hotelId} onChange={e => setForm({...form, hotelId: e.target.value})}>
            <option value="">Select Hotel</option>
            {hotels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
          <select className="input-field" style={{flex:1}} required value={form.roomCategoryId} onChange={e => setForm({...form, roomCategoryId: e.target.value})}>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" className="input-field" placeholder="Room Number" required value={form.roomNumber} onChange={e => setForm({...form, roomNumber: e.target.value})} />
          <input type="number" step="0.01" className="input-field" placeholder="Price Per Night" required value={form.pricePerNight} onChange={e => setForm({...form, pricePerNight: parseFloat(e.target.value)})} />
          <input type="number" className="input-field" placeholder="Capacity" required value={form.capacity} onChange={e => setForm({...form, capacity: parseInt(e.target.value)})} />
        </div>
        <input type="url" className="input-field" placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
          <input type="checkbox" checked={form.isAvailable} onChange={e => setForm({...form, isAvailable: e.target.checked})} /> Is Available
        </label>
        <button type="submit" className="btn-primary">{editId ? 'Update Room' : 'Create Room'}</button>
        {editId && <button type="button" className="btn-outline" onClick={() => { setEditId(null); setForm({ roomNumber: '', pricePerNight: '', capacity: '', isAvailable: true, imageUrl: '', hotelId: '', roomCategoryId: '' }); }}>Cancel</button>}
      </form>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th>Room #</th>
              <th>Category</th>
              <th>Price</th>
              <th>Avail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rooms || []).map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{r.id}</td>
                <td>{r.roomNumber}</td>
                <td>{r.roomCategory?.name}</td>
                <td>${r.pricePerNight}</td>
                <td>{r.isAvailable ? 'Yes' : 'No'}</td>
                <td style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                  <button onClick={() => editRoom(r)} className="btn-primary" style={{ padding: '0.4rem', borderRadius: '4px' }}><Edit size={16}/></button>
                  <button onClick={() => deleteRoom(r.id)} style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageRooms;
