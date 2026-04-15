import { useState, useEffect } from 'react';
import api from '../../api';
import { Trash2, Edit } from 'lucide-react';

const ManageAmenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [form, setForm] = useState({ name: '', icon: '' });
  const [editId, setEditId] = useState(null);

  const fetchAmenities = async () => {
    try {
      const { data } = await api.get('/admin/amenities');
      setAmenities(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAmenities(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/admin/amenities/${editId}`, form);
      else await api.post('/admin/amenities', form);
      setForm({ name: '', icon: '' });
      setEditId(null);
      fetchAmenities();
    } catch (err) { alert('Error saving amenity'); }
  };

  const editAmenity = (c) => {
    setEditId(c.id);
    setForm({ name: c.name, icon: c.icon || '' });
  };

  const deleteAmenity = async (id) => {
    if(!window.confirm('Delete amenity?')) return;
    try {
      await api.delete(`/admin/amenities/${id}`);
      fetchAmenities();
    } catch (err) { alert('Error deleting amenity'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Manage Amenities</h1>
      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        <input type="text" className="input-field" placeholder="Amenity Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="text" className="input-field" placeholder="Lucide Icon Name (e.g. Wifi, Coffee)" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} />
        <button type="submit" className="btn-primary">{editId ? 'Update' : 'Create'}</button>
        {editId && <button type="button" className="btn-outline" onClick={() => { setEditId(null); setForm({ name: '', icon: '' }); }}>Cancel</button>}
      </form>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th>Name</th>
              <th>Icon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {amenities.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.icon}</td>
                <td style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                  <button onClick={() => editAmenity(c)} className="btn-primary" style={{ padding: '0.4rem', borderRadius: '4px' }}><Edit size={16}/></button>
                  <button onClick={() => deleteAmenity(c.id)} style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageAmenities;
