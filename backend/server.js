const express = require('express');
const multer = require('multer');
const app = express();
const port = 3001; // Choose a port

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Handle POST request for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    console.log(req); // Log information about the uploaded file

    // The uploaded file can be accessed through req.file
    const { filename, path } = req.file;
    res.json({ filename, path });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
