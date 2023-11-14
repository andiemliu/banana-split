const process = require('process');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.VITE_REACT_APP_DB_CONNECTION_STRING;
const dbName = 'test';
// Create a MongoClient 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const express = require('express');
const cors = require('cors');
const Image = require('./models/Image'); // Import the Mongoose model
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001; // Choose a port

// Allows CORS from any origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Handle POST request for image upload
app.post('/api/storeImageUrl', async (req, res) => {
  try {
    // Connect the client to the server
    await client.connect();
    // Specify a database to access
    const db = client.db(dbName);
    // Reference a particular collection
    const col = db.collection('images');
    const { imgUrl } = req.body;

    // Create a new instance of the Image model
    const image = new Image({ imgUrl });
    console.log(image);

    // Save the image to the database
    await col.insertOne(image);

    console.log('Image URL saved to the database:', imgUrl);

    res.status(201).json({ message: 'Image URL saved successfully' });
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
