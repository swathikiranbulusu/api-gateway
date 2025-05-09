const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

/* ===== USER SERVICE (Port: 5000) ===== */

// Register
app.post('/users/register', (req, res) => {
  axios.post('http://localhost:5000/api/users/register', req.body, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json({ error: err.message }));
});

// Login
app.post('/users/login', (req, res) => {
  axios.post('http://localhost:5000/api/users/login', req.body, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json({ error: err.message }));
});

// Profile (requires JWT in headers)
app.get('/users/profile', (req, res) => {
  axios.get('http://localhost:5000/api/users/profile', {
    headers: { Authorization: req.headers.authorization },
    timeout: 10000
  })
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json({ error: err.message }));
});

/* ===== MOVIE SERVICE (Port: 5001) ===== */

// Get all movies
app.get('/movies', (req, res) => {
  axios.get('http://localhost:5001/api/movies', { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Add new movie
app.post('/movies', (req, res) => {
  axios.post('http://localhost:5001/api/movies', req.body, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json({ error: err.message }));
});

// Get movie by ID
app.get('/movies/:id', (req, res) => {
  axios.get(`http://localhost:5001/api/movies/${req.params.id}`, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update movie
app.put('/movies/:id', (req, res) => {
  axios.put(`http://localhost:5001/api/movies/${req.params.id}`, req.body, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete movie
app.delete('/movies/:id', (req, res) => {
  axios.delete(`http://localhost:5001/api/movies/${req.params.id}`, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* ===== REVIEW SERVICE (Port: 5003) ===== */

// Post review
app.post('/reviews', (req, res) => {
  axios.post('http://localhost:5003/api/reviews', req.body, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json({ error: err.message }));
});

// Get reviews for movie
app.get('/reviews/:movieId', (req, res) => {
  axios.get(`http://localhost:5003/api/reviews/${req.params.movieId}`, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* ===== RECOMMENDATION SERVICE (Port: 5002) ===== */

// Get recommendations
app.get('/recommendations/:userId', (req, res) => {
  axios.get(`http://localhost:5002/api/recommendations/${req.params.userId}`, { timeout: 10000 })
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* ===== START GATEWAY ===== */
const PORT = 5005;
app.listen(PORT, () => console.log(`🚪 API Gateway running on port ${PORT}`));
