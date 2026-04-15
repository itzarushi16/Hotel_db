import { useState, useEffect } from 'react';
import api from '../../api';
import { Trash2, Edit } from 'lucide-react';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/admin/categories');
      setCategories(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/admin/categories/${editId}`, form);
      else await api.post('/admin/categories', form);
      setForm({ name: '', description: '' });
      setEditId(null);
      fetchCategories();
    } catch (err) { alert('Error saving category'); }
  };

  const editCategory = (c) => {
    setEditId(c.id);
    setForm({ name: c.name, description: c.description || '' });
  };

  const deleteCategory = async (id) => {
    if(!window.confirm('Delete category?')) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      fetchCategories();
    } catch (err) { alert('Error deleting category'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Manage Categories</h1>
      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        <input type="text" className="input-field" placeholder="Category Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <textarea className="input-field" placeholder="Description" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <button type="submit" className="btn-primary">{editId ? 'Update' : 'Create'}</button>
        {editId && <button type="button" className="btn-outline" onClick={() => { setEditId(null); setForm({ name: '', description: '' }); }}>Cancel</button>}
      </form>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                  <button onClick={() => editCategory(c)} className="btn-primary" style={{ padding: '0.4rem', borderRadius: '4px' }}><Edit size={16}/></button>
                  <button onClick={() => deleteCategory(c.id)} style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageCategories;
