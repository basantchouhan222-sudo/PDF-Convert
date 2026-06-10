require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Use a different PORT in .env or stop the process occupying it.`);
    process.exit(1);
  }
  throw error;
});
