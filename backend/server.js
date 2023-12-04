const process = require('process')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const uri = process.env.VITE_REACT_APP_DB_CONNECTION_STRING
const veryfiClientID = process.env.VITE_REACT_APP_VERYFI_CLIENT_ID
const veryfiAuth = process.env.VITE_REACT_APP_VERYFI_AUTHORIZATION
const dbName = 'test'
// Create a MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

const axios = require('axios')
const express = require('express')
const cors = require('cors')
const Receipt = require('./models/Receipt') // Import the Mongoose model
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3001 // Choose a port

// Allows CORS from any origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

// Handle POST request for image upload
app.post('/api/storeImageUrl', async (req, res) => {
    try {
        // Connect the client to the server
        await client.connect()
        // Specify a database to access
        const db = client.db(dbName)
        // Reference a particular collection
        const col = db.collection('images')
        const { imgUrl } = req.body

        // Create a new instance of the Image model
        const image = new Image({ imgUrl })
        //console.log(image);

        // Save the image to the database
        await col.insertOne(image)

        console.log('Image URL saved to the database:', imgUrl)

        res.status(201).json({ message: 'Image URL saved successfully' })
    } catch (error) {
        console.error('Error handling image upload:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.post('/api/itemizeReceipt', async (req, res) => {
    try {
        const { imgUrl } = req.body

        // UNCOMMENT THESE LINES AND THE FIRST LINE IN THE TRY BLOCK TO ACTUALLY GET THE DATA
        // const options = {
        //   method: 'POST',
        //   url: 'https://api.veryfi.com/api/v8/partner/documents',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json',
        //     'CLIENT-ID': veryfiClientID,
        //     AUTHORIZATION: veryfiAuth
        //   },
        //   data: {
        //     file_url: imgUrl
        //   }
        // };

        try {
            // const { data } = await axios.request(options);

            try {
                // Connect the client to the server
                // await client.connect();
                // // Specify a database to access
                // const db = client.db(dbName);
                // // Reference a particular collection
                // const col = db.collection('images');

                // // Create a new instance of the Receipt model
                // const receipt = new Receipt({ imgUrl, data });
                // // console.log(receipt);

                // // Save the image to the database
                // const result = await col.insertOne(receipt);
                // // console.log(result);
                // // const insertedId = result.insertedId; // Store the ID for future use
                // // console.log('Receipt saved to the database. ID:', insertedId);

                //     //Uncomment this line to actually save the data to the database
                const insertedId = '656d2b3c43e468ee60f8334b'
                // Return the insertedId in the response
                res.status(201).json({
                    message: 'Data stored successfully',
                    insertedId,
                })
            } catch (error) {
                console.error('Error handling receipt upload:', error)
                res.status(500).json({ error: 'Internal Server Error' })
            }
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error('Error handling receipt itemizer:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.get('/api/getReceipt/:id', async (req, res) => {
    console.log('getReceipt', req.params)
    if (req.params.id == 'null' || req.params.id == 'undefined') {
        console.log('bro is here')
        return // res.status(400).json({ error: 'Missing ID parameter' });
    }
    try {
        // Connect the client to the server
        await client.connect()
        // Specify a database to access
        const db = client.db(dbName)
        // Reference a particular collection
        const col = db.collection('images')

        const id = req.params.id

        // Use ObjectId to create a valid MongoDB ObjectId from the provided string ID
        console.log('server get receipt', id)
        const objectId = new ObjectId(id)

        // Find the document by ID
        const document = await col.findOne({ _id: objectId })

        //console.log(document);
        if (!document) {
            return res.status(404).json({ error: 'Receipt not found' })
        }

        res.json({ data: document })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.put('/api/storeSplitInput/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { checkedItems, peopleNamesArr } = req.body
        // console.log("storeSplitInput", id, checkedItems, peopleNamesArr);

        // Connect the client to the server
        await client.connect()
        // Specify a database to access
        const db = client.db(dbName)
        // Reference a particular collection
        const col = db.collection('images')
        const objectId = new ObjectId(id)
        // Find the document by ID
        const doc = await col.findOne({ _id: objectId })
        // Update the document
        if (!doc.inputData) {
            doc.inputData = {} // If data is null, create a new data object
        }
        if (!doc.inputData.people) {
            doc.inputData.people = [] // If people is null, create a new people array
        }
        if (!doc.inputData.checkboxes) {
            doc.inputData.checkboxes = {} // If checkboxes is null, create a new checkboxes object
        }

        // Replace existing data with new values
        doc.inputData.people = peopleNamesArr
        doc.inputData.checkboxes = checkedItems
        // console.log("inpdata", doc.inputData);
        // Save the updated document
        const result = await col.replaceOne({ _id: objectId }, doc)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Internal Server Error store split table input',
        })
    }
})

app.put('/api/updateOwedAmount', async (req, res) => {
    try {
        const { id, username, person, collector, amount } = req.body
        console.log('updateOwedAmount', person, collector, amount)
        if (
            !id ||
            id == 'null' ||
            !username ||
            !person ||
            !collector ||
            isNaN(amount)
        ) {
            return res
                .status(400)
                .json({
                    error: 'Missing required fields to update owed amount',
                })
        }
        // Connect the client to the server
        await client.connect()
        // Specify a database to access
        const db = client.db(dbName)
        // Reference a particular collection
        const col = db.collection('people')
        const objectId = new ObjectId(id)
        // Find the document by ID
        const existingDoc = await col.findOne({ _id: objectId })
        // Update the document
        if (!existingDoc) {
            // Assuming all owed amounts are stored in a predetermined doc in the people collection
            await col.insertOne({
                user: {
                    username: username,
                    amounts: [
                        { person, collector, amount: parseFloat(amount) },
                    ],
                },
            })
        } else {
            // If the document exists, update the amounts array
            const currUser = existingDoc.user
            const amounts = currUser.amounts || []
            const existingPairIndex = amounts.findIndex(
                (item) => item.person === person && item.collector === collector
            )

            if (existingPairIndex !== -1) {
                // If the pair already exists, update the amount
                amounts[existingPairIndex].amount += parseFloat(amount)
            } else {
                // If the pair doesn't exist, add a new entry
                amounts.push({ person, collector, amount: parseFloat(amount) })
            }

            // Update the document with the new amounts array
            currUser.amounts = amounts
            existingDoc.username = currUser
            const result = await col.replaceOne({ _id: objectId }, existingDoc)
            // await col.updateOne({ userID }, { $set: { amounts } });
        }
        res.status(201).json({ message: 'Owed amount updated successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Internal Server Error update owed amount',
        })
    }
})

app.get('/api/getOwedAmounts/:id/:username', async (req, res) => {
    try {
        const { id, username } = req.params
        console.log('getOwedAmount', id)
        // Connect the client to the server
        await client.connect()
        // Specify a database to access
        const db = client.db(dbName)
        // Reference a particular collection
        const col = db.collection('people')
        const objectId = new ObjectId(id)
        // Find the document by ID
        const doc = await col.findOne({ _id: objectId })
        // Update the document
        if (!doc) {
            return res.status(404).json({ error: 'Owed amount not found' })
        }
        res.json({ data: doc })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error get owed amount' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
