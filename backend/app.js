const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const convertRoutes = require('./routes/convertRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/convert', convertRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Converter API is running' });
});

app.use(errorHandler);

module.exports = app;
