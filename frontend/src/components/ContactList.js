// Component to display list of contacts
import React from 'react';

function ContactList({ contacts, onDelete, onEdit }) {
  if (contacts.length === 0) {
    return <p>No contacts to display.</p>;
  }

  return (
    <div>
      <h2>Contact List</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>{contact.name}</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => onEdit(contact)} style={{ marginRight: '8px' }}>Edit</button>
                <button onClick={() => onDelete(contact.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;