import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import GeminiActions from './GeminiActions';

function ClientForm({ db, appId, userId, setMessage }) {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', repeatPassword: '' });
  const [suggestedInfo, setSuggestedInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.repeatPassword) return setMessage('Passwords do not match.');
    if (!db || !userId || userId === 'Loading...') return setMessage('Database not ready.');
    try {
      await addDoc(collection(db, `artifacts/${appId}/users/${userId}/clients`), {
        name: form.name,
        email: form.email,
        address: form.address,
        createdAt: serverTimestamp(),
      });
      setForm({ name: '', email: '', address: '', password: '', repeatPassword: '' });
      setSuggestedInfo('');
      setMessage('Client created successfully!');
    } catch {
      setMessage('Failed to create client.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
      <h2>Create Client</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
      <input name="repeatPassword" type="password" placeholder="Repeat Password" value={form.repeatPassword} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
      <button type="submit" style={{ marginRight: 8 }}>Create</button>
      <GeminiActions
        type="client"
        form={form}
        setResult={setSuggestedInfo}
        loading={loading}
        setLoading={setLoading}
        setMessage={setMessage}
      />
      {suggestedInfo && <div style={{ marginTop: 10, background: '#f5f5f5', padding: 10 }}>{suggestedInfo}</div>}
    </form>
  );
}
export default ClientForm;
