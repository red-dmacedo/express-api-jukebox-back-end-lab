const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const trackRouter = require('./controllers/tracks.js');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Conncted to MongoDB ${mongoose.connection.name}`);
});

app.use(cors({ origin: ['http://127.0.0.1:5173', 'http://localhost:5173'] }));
app.use(express.json());
app.use('/tracks', trackRouter);
app.use(morgan('dev'));

// Routes

app.listen(3000, () => {
  console.log('The express app is ready!');
});
