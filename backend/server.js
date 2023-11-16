const process = require('process');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.VITE_REACT_APP_DB_CONNECTION_STRING;
const veryfiClientID = process.env.VITE_REACT_APP_VERYFI_CLIENT_ID;
const veryfiAuth = process.env.VITE_REACT_APP_VERYFI_AUTHORIZATION;
const dbName = 'test';
// Create a MongoClient 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const axios = require("axios");
const express = require('express');
const cors = require('cors');
const Receipt = require('./models/Receipt'); // Import the Mongoose model
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

app.post('/api/itemizeReceipt', async (req, res) => {
  try {
    const { imgUrl } = req.body;

    // UNCOMMENT THESE LINES AND THE FIRST LINE IN THE TRY BLOCK TO ACTUALLY GET THE DATA 
    const options = {
      method: 'POST',
      url: 'https://api.veryfi.com/api/v8/partner/documents',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CLIENT-ID': veryfiClientID,
        AUTHORIZATION: veryfiAuth
      },
      data: {
        file_url: imgUrl
      }
    };

    try {
    const { data } = await axios.request(options);
     
      try {
        // Connect the client to the server
        await client.connect();
        // Specify a database to access
        const db = client.db(dbName);
        // Reference a particular collection
        const col = db.collection('images');
    
        // Create a new instance of the Receipt model
        const receipt = new Receipt({ imgUrl, data });
        console.log(receipt);
    
        // Save the image to the database
        const result = await col.insertOne(receipt);
        console.log(result);
        const insertedId = result.insertedId; // Store the ID for future use
        console.log('Receipt saved to the database. ID:', insertedId);
    
        // Return the insertedId in the response
        res.status(201).json({ message: 'Data stored successfully', insertedId });
      } catch (error) {
        console.error('Error handling receipt upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch (error) {
      console.error(error);
    }

  } catch (error) {
    console.error('Error handling receipt itemizer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
