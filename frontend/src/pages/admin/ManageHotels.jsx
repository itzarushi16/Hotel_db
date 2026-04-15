import { useState, useEffect } from 'react';
import api from '../../api';
import { Trash2, Edit } from 'lucide-react';

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', city: '', country: '', description: '', rating: 5.0, imageUrl: '' });
  const [editId, setEditId] = useState(null);

  const fetchHotels = async () => {
    try {
      const { data } = await api.get('/hotels');
      setHotels(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchHotels(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/admin/hotels/${editId}`, form);
      else await api.post('/admin/hotels', form);
      setForm({ name: '', address: '', city: '', country: '', description: '', rating: 5.0, imageUrl: '' });
      setEditId(null);
      fetchHotels();
    } catch (err) { alert('Error saving hotel'); }
  };

  const editHotel = (h) => {
    setEditId(h.id);
    setForm({ name: h.name, address: h.address, city: h.city, country: h.country, description: h.description, rating: h.rating, imageUrl: h.imageUrl || '' });
  };

  const deleteHotel = async (id) => {
    if(!window.confirm('Delete hotel?')) return;
    try {
      await api.delete(`/admin/hotels/${id}`);
      fetchHotels();
    } catch (err) { alert('Error deleting hotel'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Manage Hotels</h1>
      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        <input type="text" className="input-field" placeholder="Hotel Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="text" className="input-field" placeholder="Address" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" className="input-field" placeholder="City" style={{flex:1}} required value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          <input type="text" className="input-field" placeholder="Country" style={{flex:1}} required value={form.country} onChange={e => setForm({...form, country: e.target.value})} />
        </div>
        <input type="number" step="0.1" className="input-field" placeholder="Rating" required value={form.rating} onChange={e => setForm({...form, rating: parseFloat(e.target.value)})} />
        <input type="url" className="input-field" placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
        <textarea className="input-field" placeholder="Description" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <button type="submit" className="btn-primary">{editId ? 'Update Hotel' : 'Create Hotel'}</button>
        {editId && <button type="button" className="btn-outline" onClick={() => { setEditId(null); setForm({ name: '', address: '', city: '', country: '', description: '', rating: 5.0, imageUrl: '' }); }}>Cancel</button>}
      </form>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(h => (
              <tr key={h.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{h.id}</td>
                <td>{h.name}</td>
                <td>{h.city}</td>
                <td>{h.rating}⭐</td>
                <td style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                  <button onClick={() => editHotel(h)} className="btn-primary" style={{ padding: '0.4rem', borderRadius: '4px' }}><Edit size={16}/></button>
                  <button onClick={() => deleteHotel(h.id)} style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageHotels;
