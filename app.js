const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const app = express();
const auth = require('./routes/auth');

// Connect Database
connectDB();

//cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded());

// use Routes
app.use('/auth', auth);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
