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
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error(`${err}, could not connect.`));

// Prevent CORS errors!
app.use(cors());
// Body parser to JSON format
app.use(express.json());

// Routers

// Starting the server
const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
