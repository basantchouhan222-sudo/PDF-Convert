const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const convertRoutes = require('./routes/convertRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/convert', convertRoutes);

app.use(errorHandler);

module.exports = app;
