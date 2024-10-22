// backend/app.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create MySQL connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Routes
app.get('/api/getAllBooks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

app.post('/api/createBooks', async (req, res) => {
  const { title, author, genre, year } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)', [title, author, genre, year]);
    res.json({ id: result.insertId, title, author, genre, year });
  } catch (error) {
    res.status(500).json({ error: 'Error adding book' });
  }
});

app.delete('/api/deleteBooks/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM books WHERE id = ?', [id]);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});

app.put('/api/updateBooks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year } = req.body;

  try {
    // First, retrieve the existing book data
    const [existingBook] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);

    if (existingBook.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Use existing values if fields are not provided in the request body
    const updatedTitle = title || existingBook[0].title;
    const updatedAuthor = author || existingBook[0].author;
    const updatedGenre = genre || existingBook[0].genre;
    const updatedYear = year || existingBook[0].year;

    // Update the book in the database
    const [result] = await pool.query(
      'UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?',
      [updatedTitle, updatedAuthor, updatedGenre, updatedYear, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ 
      message: 'Book updated successfully', 
      id, 
      title: updatedTitle, 
      author: updatedAuthor, 
      genre: updatedGenre, 
      year: updatedYear 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
