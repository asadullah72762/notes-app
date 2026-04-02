import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


// Ab environment variable se lo:
const API_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api` 
  : 'http://localhost:5000/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Page load hone par sab notes fetch karo
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(`${API_URL}/notes`);
    setNotes(response.data);
  };

  const addNote = async () => {
    if (!title || !content) return;
    await axios.post(`${API_URL}/notes`, { title, content });
    setTitle('');
    setContent('');
    fetchNotes(); // List refresh karo
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1>Meri Notes App</h1>

      {/* Note add karne ka form */}
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <input
          placeholder="Note ka title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Note ka content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', height: '80px' }}
        />
        <button onClick={addNote} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Note Add Karo
        </button>
      </div>

      {/* Notes ki list */}
      <div style={{ marginTop: '20px' }}>
        {notes.map(note => (
          <div key={note.id} style={{ background: 'white', border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
