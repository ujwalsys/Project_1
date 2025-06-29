function MessageBox({ message, setMessage }) {
  if (!message) return null;
  return (
    <div style={{ background: '#e3f2fd', padding: 10, margin: '10px 0', borderRadius: 6, color: '#1565c0' }}>
      {message}
      <button onClick={() => setMessage('')} style={{ float: 'right', background: 'none', border: 'none', color: '#1565c0', cursor: 'pointer' }}>✖</button>
    </div>
  );
}
export default MessageBox;
