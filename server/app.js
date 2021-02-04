// Local modules
const restRoutes = require('./routes/restRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Store development variable in .env file
const dotenv = require('dotenv').config();

const app = express();

// Connct to DB
mongoose
  .connect('mongodb://localhost/misEda', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error(`${err}, could not connect.`));

// Prevent CORS errors!
app.use(cors());

// Body parser to JSON format
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
app.use('/', userRoutes);
app.use('/restaurants', restRoutes);
app.use('/reviews', reviewRoutes);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
