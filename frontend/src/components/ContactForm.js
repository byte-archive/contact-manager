// Form to add new contact
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactForm({ onAdd, onDelete, editingContact, onUpdate, cancelEdit }) {
  const [name, setName] = useState(editingContact ? editingContact.name : '');
  const [email, setEmail] = useState(editingContact ? editingContact.email : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setEmail(editingContact.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name to allow only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      setError('Name must contain only letters and spaces.');
      return;
    }

    if (!name || !email) {
      setError('Both name and email are required.');
      return;
    }

    try {
      if (editingContact) {
        const response = await axios.put(`http://localhost:5050/contacts/${editingContact.id}`, { name, email });
        onUpdate(response.data);
      } else {
        const response = await axios.post('http://localhost:5050/contacts', { name, email });
        onAdd(response.data);
      }
      setName('');
      setEmail('');
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Contact with this email already exists.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <h2>{editingContact ? 'Edit Contact' : 'Add Contact'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit">{editingContact ? 'Update' : 'Add'}</button>
        {editingContact && (
          <button
            type="button"
            onClick={() => {
              setName('');
              setEmail('');
              setError('');
              cancelEdit();
            }}
            style={{ backgroundColor: '#6c757d' }}
          >
            Cancel
          </button>
        )}
        {error && <p className="error-message">{error}</p>}
      </form>
      <style>
        {`
          .contact-form input {
            padding: 10px;
            margin: 6px 0;
            width: 250px;
            border-radius: 6px;
            border: 1px solid #ccc;
            font-size: 14px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .contact-form button {
            padding: 10px 24px;
            margin-top: 12px;
            border: none;
            border-radius: 6px;
            background-color: #007BFF;
            color: white;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .contact-form button:hover {
            background-color: #0056b3;
          }

          .contact-form h2 {
            margin-bottom: 12px;
            font-size: 24px;
            color: #333;
            text-align: center;
          }

          .error-message {
            color: #d9534f;
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
          }

          .contact-list {
            max-width: 500px;
            margin: 40px auto;
            padding: 20px;
            border-radius: 8px;
            background-color: #f8f9fa;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }

          .contact-list h3 {
            font-size: 22px;
            margin-bottom: 12px;
            color: #333;
            text-align: center;
          }

          .contact-list ul {
            list-style: none;
            padding-left: 0;
          }

          .contact-list li {
            font-size: 16px;
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
          }

          .contact-list li:last-child {
            border-bottom: none;
          }

          .contact-list strong {
            font-weight: 600;
            color: #000;
          }
        `}
      </style>
    </div>
  );
}

export default ContactForm;