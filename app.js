const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

// routes
const app = express();
const auth = require('./routes/auth');
const post = require('./routes/post');

// Connect Database
connectDB();

//cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded());

// use Routes
app.use('/auth', auth);
app.use('/post', post);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
