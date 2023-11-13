const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://andieliu:zKgn4y9aaR@receipts.r95pysw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const express = require('express');
const cors = require('cors');
const Image = require('./models/Image'); // Import the Mongoose model

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001; // Choose a port

// Handle GET request for image upload  
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handle POST request for image upload
app.post('/api/storeImageUrl', async (req, res) => {
  try {
    const { imgUrl } = req.body;

    // Create a new instance of the Image model
    const image = new Image({ imgUrl });
    console.log(image);
    // Save the image to the database
    await image.save();

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
