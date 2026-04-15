import { useState, useEffect } from 'react';
import api from '../../api';
import { Trash2, Edit } from 'lucide-react';

const ManagePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [form, setForm] = useState({ code: '', discountPercentage: '', validFrom: '', validUntil: '', isActive: true });
  const [editId, setEditId] = useState(null);

  const fetchPromotions = async () => {
    try {
      const { data } = await api.get('/admin/promotions');
      setPromotions(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPromotions(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/admin/promotions/${editId}`, form);
      else await api.post('/admin/promotions', form);
      setForm({ code: '', discountPercentage: '', validFrom: '', validUntil: '', isActive: true });
      setEditId(null);
      fetchPromotions();
    } catch (err) { alert('Error saving promotion'); }
  };

  const editPromo = (p) => {
    setEditId(p.id);
    setForm({ code: p.code, discountPercentage: p.discountPercentage, validFrom: p.validFrom || '', validUntil: p.validUntil || '', isActive: p.isActive });
  };

  const deletePromo = async (id) => {
    if(!window.confirm('Delete promotion?')) return;
    try {
      await api.delete(`/admin/promotions/${id}`);
      fetchPromotions();
    } catch (err) { alert('Error deleting promotion'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Manage Promotions</h1>
      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" className="input-field" placeholder="Code (e.g. SUMMER20)" required value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} style={{flex:1}} />
            <input type="number" className="input-field" placeholder="Discount %" required value={form.discountPercentage} onChange={e => setForm({...form, discountPercentage: parseInt(e.target.value)})} style={{flex:1}} />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="date" className="input-field" required value={form.validFrom} onChange={e => setForm({...form, validFrom: e.target.value})} style={{flex:1}} />
            <input type="date" className="input-field" required value={form.validUntil} onChange={e => setForm({...form, validUntil: e.target.value})} style={{flex:1}} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
          <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} /> Is Active
        </label>
        <button type="submit" className="btn-primary">{editId ? 'Update Promotion' : 'Create Promotion'}</button>
        {editId && <button type="button" className="btn-outline" onClick={() => { setEditId(null); setForm({ code: '', discountPercentage: '', validFrom: '', validUntil: '', isActive: true }); }}>Cancel</button>}
      </form>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Validity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{p.id}</td>
                <td>{p.code}</td>
                <td>{p.discountPercentage}%</td>
                <td>{p.validFrom} - {p.validUntil}</td>
                <td style={{ color: p.isActive ? '#10b981' : '#ef4444' }}>{p.isActive ? 'Active' : 'Inactive'}</td>
                <td style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                  <button onClick={() => editPromo(p)} className="btn-primary" style={{ padding: '0.4rem', borderRadius: '4px' }}><Edit size={16}/></button>
                  <button onClick={() => deletePromo(p.id)} style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManagePromotions;
