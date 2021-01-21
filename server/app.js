// Local modules
const restRoutes = require('./routes/restRoutes');
const userRoutes = require('./routes/userRoutes');

// 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Store development variable in .env file
const dotenv = require('dotenv').config();

const app = express();

// Connct to DB
mongoose
  .connect('mongodb://localhost/misEda', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error(`${err}, could not connect.`));

// Prevent CORS errors!
app.use(cors());
// Body parser to JSON format
app.use(express.json());

// Routers
app.use('/restaurants', restRoutes);
app.use('/users', userRoutes);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
