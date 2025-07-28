const express = require('express');
// const connectDB = require('./config/db'); // Remove this line
const contactRoutes = require('./routes/contacts');
const errorHandler = require('./middleware/errorHandler');

const app = express();

//you can remove mongodb and  i use local host 
//and use THUNDER CLIENT to post it 

// sakht Middleware
app.use(express.json({ extended: false }));

// Define Routes v test it
app.use('/api/contacts', contactRoutes);

// Error handling middleware (should be last middleware)
app.use(errorHandler);

module.exports = app;