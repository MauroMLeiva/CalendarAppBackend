const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create express server
const app = express();

// DataBase
dbConnection();

// CORS
app.use(cors());

// Public Directory
app.use(express.static('public'));

// Parsing body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Listen to petitions
app.listen(process.env.PORT, () => {
    console.log(`server runing on port ${process.env.PORT}`);
});
