import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import GeminiActions from './GeminiActions';

function MeetingForm({ db, appId, userId, setMessage }) {
  const [form, setForm] = useState({ topic: '', numberOfPeople: '', startTime: '', date: '' });
  const [invitation, setInvitation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!db || !userId || userId === 'Loading...') return setMessage('Database not ready.');
    try {
      await addDoc(collection(db, `artifacts/${appId}/users/${userId}/meetings`), {
        topic: form.topic,
        numberOfPeople: parseInt(form.numberOfPeople),
        startTime: form.startTime,
        date: form.date,
        createdAt: serverTimestamp(),
      });
      setForm({ topic: '', numberOfPeople: '', startTime: '', date: '' });
      setInvitation('');
      setMessage('Meeting scheduled successfully!');
    } catch {
      setMessage('Failed to schedule meeting.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
      <h2>Schedule Meeting</h2>
      <input name="topic" placeholder="Topic" value={form.topic} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
      <input name="numberOfPeople" type="number" placeholder="Number of People" value={form.numberOfPeople} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
      <input name="date" type="date" value={form.date} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
      <input name="startTime" type="time" value={form.startTime} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
      <button type="submit" style={{ marginRight: 8 }}>Schedule</button>
      <GeminiActions
        type="meeting"
        form={form}
        setResult={setInvitation}
        loading={loading}
        setLoading={setLoading}
        setMessage={setMessage}
      />
      {invitation && <div style={{ marginTop: 10, background: '#f5f5f5', padding: 10 }}>{invitation}</div>}
    </form>
  );
}
export default MeetingForm;
