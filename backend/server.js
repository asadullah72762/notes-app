const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware — ye browser se requests allow karta hai
app.use(cors());
app.use(express.json());

// In-memory notes (abhi ke liye database ki jagah)
let notes = [
  { id: 1, title: "Pehla Note", content: "Ye mera pehla note hai" },
  { id: 2, title: "DevOps Seekhna", content: "Docker, Kubernetes, CI/CD" }
];

// GET /api/notes — sab notes fetch karo
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST /api/notes — naya note add karo
app.post('/api/notes', (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE /api/notes/:id — note delete karo
app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(n => n.id !== parseInt(req.params.id));
  res.json({ message: "Note delete ho gaya!" });
});

app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} par`);
});