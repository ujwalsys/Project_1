import React, { useEffect, useState } from 'react';
import './app.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [clients, setClients] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    repeatPassword: '',
  });
  const [meetingForm, setMeetingForm] = useState({
    topic: '',
    numberOfPeople: '',
    startTime: '',
    date: '',
  });
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  // Theme toggle
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Fetch clients and meetings on mount
  useEffect(() => {
    fetch(`${API_URL}/clients`)
      .then((res) => res.json())
      .then(setClients);
    fetch(`${API_URL}/meetings`)
      .then((res) => res.json())
      .then(setMeetings);
  }, []);

  // Add client
  const handleClientChange = (e) =>
    setClientForm({ ...clientForm, [e.target.name]: e.target.value });

  const handleClientSubmit = (e) => {
    e.preventDefault();
    if (clientForm.password !== clientForm.repeatPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: clientForm.name,
        email: clientForm.email,
        address: clientForm.address,
        password: clientForm.password,
      }),
    })
      .then((res) => res.json())
      .then((newClient) => {
        setClients([...clients, newClient]);
        setClientForm({
          name: '',
          email: '',
          address: '',
          password: '',
          repeatPassword: '',
        });
        setMessage('Client created successfully!');
      });
  };

  // Add meeting
  const handleMeetingChange = (e) =>
    setMeetingForm({ ...meetingForm, [e.target.name]: e.target.value });

  const handleMeetingSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: meetingForm.topic,
        numberOfPeople: meetingForm.numberOfPeople,
        startTime: meetingForm.startTime,
        date: meetingForm.date,
      }),
    })
      .then((res) => res.json())
      .then((newMeeting) => {
        setMeetings([...meetings, newMeeting]);
        setMeetingForm({
          topic: '',
          numberOfPeople: '',
          startTime: '',
          date: '',
        });
        setMessage('Meeting scheduled successfully!');
      });
  };

  // Message close
  const handleCloseMessage = () => setMessage('');

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="overlay">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
        <h1>Client & Meeting Manager</h1>
        {message && (
          <div className="message-box">
            {message}
            <button onClick={handleCloseMessage} title="Close">
              &times;
            </button>
          </div>
        )}
        <div className="flex-row">
          <div className="box">
            <form onSubmit={handleClientSubmit}>
              <h2>Create Client</h2>
              <input
                name="name"
                placeholder="Name"
                value={clientForm.name}
                onChange={handleClientChange}
                required
              />
              <input
                name="email"
                placeholder="Email"
                value={clientForm.email}
                onChange={handleClientChange}
                required
              />
              <input
                name="address"
                placeholder="Address"
                value={clientForm.address}
                onChange={handleClientChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={clientForm.password}
                onChange={handleClientChange}
                required
              />
              <input
                name="repeatPassword"
                type="password"
                placeholder="Repeat Password"
                value={clientForm.repeatPassword}
                onChange={handleClientChange}
                required
              />
              <button type="submit">Create</button>
            </form>
            <h3>Clients</h3>
            <ul>
              {clients.map((client) => (
                <li key={client.id}>
                  {client.name} — {client.email}{' '}
                  {client.address && `(${client.address})`}
                </li>
              ))}
            </ul>
          </div>
          <div className="box">
            <form onSubmit={handleMeetingSubmit}>
              <h2>Schedule Meeting</h2>
              <input
                name="topic"
                placeholder="Topic"
                value={meetingForm.topic}
                onChange={handleMeetingChange}
                required
              />
              <input
                name="numberOfPeople"
                type="number"
                placeholder="Number of People"
                value={meetingForm.numberOfPeople}
                onChange={handleMeetingChange}
              />
              <input
                name="date"
                type="date"
                value={meetingForm.date}
                onChange={handleMeetingChange}
                required
              />
              <input
                name="startTime"
                type="time"
                value={meetingForm.startTime}
                onChange={handleMeetingChange}
                required
              />
              <button type="submit">Schedule</button>
            </form>
            <h3>Meetings</h3>
            <ul>
              {meetings.map((meeting) => (
                <li key={meeting.id}>
                  {meeting.topic} — {meeting.date} {meeting.startTime} (
                  {meeting.numberOfPeople || 'N/A'} people)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
