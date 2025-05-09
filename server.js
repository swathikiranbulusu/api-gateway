const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Example: Forward request to User Service
app.post('/users/register', (req, res) => {
  axios.post('http://localhost:5000/api/users/register', req.body)
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json({ error: err.message }));
});

// Example: Fetch all movies
app.get('/movies', (req, res) => {
  axios.get('http://localhost:5001/api/movies')
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Example: Get recommendations
app.get('/recommendations/:userId', (req, res) => {
  axios.get(`http://localhost:5002/api/recommendations/${req.params.userId}`)
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Example: Get reviews for a movie
app.get('/reviews/:movieId', (req, res) => {
  axios.get(`http://localhost:5003/api/reviews/${req.params.movieId}`)
    .then(response => res.json(response.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = 5005;
app.listen(PORT, () => console.log(`🚪 API Gateway running on port ${PORT}`));
