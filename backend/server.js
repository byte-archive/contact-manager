import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const adapter = new JSONFile('contacts.json');
const db = new Low(adapter, { contacts: [] });

const initializeDb = async () => {
  await db.read();
  // db.data ||= { contacts: [] };
  // await db.write();
};

const startServer = async () => {
  await initializeDb();

  const app = express();

  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type']
  }));

  app.use(express.json());

  app.options('/contacts', cors());

  app.post('/contacts', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith('.com')) {
      return res.status(400).json({ error: 'Email must be valid and end with .com' });
    }

    await db.read();
    const duplicate = db.data.contacts.find(c => c.email === email);
    if (duplicate) return res.status(409).json({ error: 'Contact already exists' });

    const newContact = { id: Date.now(), name, email };
    db.data.contacts.push(newContact);
    await db.write();
    res.status(201).json(newContact);
  });

  app.get('/contacts', async (req, res) => {
    await db.read();
    const search = req.query.search?.toLowerCase() || '';
    const filtered = db.data.contacts.filter(c =>
      c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search)
    );
    res.json(filtered);
  });

  app.delete('/contacts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await db.read();
    const index = db.data.contacts.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Contact not found' });

    db.data.contacts.splice(index, 1);
    await db.write();
    res.status(204).send();
  });

  app.put('/contacts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith('.com')) {
      return res.status(400).json({ error: 'Email must be valid and end with .com' });
    }

    await db.read();
    const duplicate = db.data.contacts.find(c => c.email === email && c.id !== id);
    if (duplicate) {
      return res.status(409).json({ error: 'Contact with this email already exists.' });
    }
    const contact = db.data.contacts.find(c => c.id === id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contact.name = name;
    contact.email = email;

    await db.write();
    res.json(contact);
  });

  if (process.env.NODE_ENV !== 'test') {
    const PORT = 5050;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  }
};

startServer();