// app.js
const express = require('express');
const path = require('path');
// const dotenv = require('dotenv'); // این خط رو کامنت یا حذف کنید
// const connectDB = require('./config/db'); //  **این خط رو کامنت یا حذف کنید**

const todoRoutes = require('./routes/todoRoutes');

// این بلوک رو کامنت یا حذف کنید، چون دیگه نیازی به dotenv و اتصال به دیتابیس نداریم
// dotenv.config();
// connectDB();

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// سرو کردن فایل‌های استاتیک از پوشه 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Home route can now just send the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Todo routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000; // اگه فایل .env رو هم حذف کردید، میتونید 5000 رو مستقیماً بنویسید

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});