import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContact, setEditingContact] = useState(null);

  // Fetch contacts from backend
  const fetchContacts = async (search = '') => {
    try {
      const res = await axios.get(`http://localhost:5050/contacts?search=${search}`);
      setContacts(res.data);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = (newContact) => {
    setContacts(prev => [...prev, newContact]);
  };

  const handleDeleteContact = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:5050/contacts/${id}`);
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (err) {
      console.error('Failed to delete contact:', err);
    }
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    fetchContacts(term);
  };

  const handleUpdateContact = (updatedContact) => {
    setContacts(prev =>
      prev.map(c => (c.id === updatedContact.id ? updatedContact : c))
    );
    setEditingContact(null);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Contact List Manager</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <ContactForm
        onAdd={handleAddContact}
        onUpdate={handleUpdateContact}
        editingContact={editingContact}
        cancelEdit={() => setEditingContact(null)}
      />
      <ContactList contacts={contacts} onDelete={handleDeleteContact} onEdit={setEditingContact} />
    </div>
  );
}

export default App;