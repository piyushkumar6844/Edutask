const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import routes
const authRoutes = require('./routes/auth');
const homeworkRoutes = require('./routes/homework');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/homework', homeworkRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
