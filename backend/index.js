const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL;
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to TestProject Database');
  } catch (error) {
    console.log('Database connection error:', error);
  }
}
connectToDatabase();

const authRoute = require('./routes/auth');

app.use('/api', authRoute);

// Default Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
