function ClientList({ clients }) {
  return (
    <div>
      <h3>Clients</h3>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <b>{client.name}</b> — {client.email} {client.address && `(${client.address})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ClientList;
