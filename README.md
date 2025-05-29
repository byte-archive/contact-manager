# Contact List Manager

## 📋 Overview
Contact List Manager is a full-stack web application that allows users to:
- ✅ Add new contacts with a name and email
- 📝 Edit existing contacts
- 🗑️ Delete contacts from the list
- 🔍 Search for contacts by name or email
- 💾 Store contact data persistently using `lowdb` (local JSON file)

The application is built using **Node.js (Express)** for the backend and **vanilla React with Webpack & Babel** for the frontend.

---

## 🚀 Getting Started

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
4. Open your browser at `http://localhost:3000`

---

## 🛠️ Features

### 1. Add Contact
- Users can enter a name and email.
- Validation ensures name is alphabetical and email is unique.

### 2. Delete Contact
- Contacts can be removed with a single click.
- Delete buttons are aligned neatly in each contact row.

### 3. Edit Contact
- Users can update existing contact details.
- Duplicate detection prevents overwriting another contact’s data.

### 4. Search Contacts
- Dynamic search filters contacts by name or email.
- Case-insensitive and real-time filtering.

### 5. Persistent Storage
- Data is stored locally using `lowdb`, which writes to a `contacts.json` file.
- Easy to understand and lightweight JSON-based storage.

---

## ⚙️ Trade-offs and Decisions

- **lowdb** was chosen for simplicity and quick setup instead of a full database like MongoDB or PostgreSQL.
- The app uses custom Webpack+Babel setup instead of Create React App to demonstrate manual config capabilities.
- No authentication or cloud deployment was included, focusing on core CRUD functionality and data persistence.

---

## 📄 License
This project is open-sourced for educational purposes.
