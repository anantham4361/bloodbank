const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Import Routes
const donorRoutes = require('./routes/donorRoutes');
const requestRoutes = require('./routes/requestRoutes');
const stockRoutes = require('./routes/stockRoutes');
const authRoutes = require('./routes/authRoutes');

// Import routes and pass the pool
app.use('/donors', donorRoutes(pool));
app.use('/requests', requestRoutes(pool));
app.use('/stock', stockRoutes(pool));
app.use('/auth', authRoutes(pool));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

