import React from 'react';
import  { useState } from 'react';
import axios from 'axios';
import ReceiptBody from './ReceiptBody';
import PayerInputComponent from './PayerInputComponent';
import './imageUpload.css';

function ImageUpload() {
  const [fileInputMode, setFileInputMode] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const imgbbToken = import.meta.env.VITE_REACT_APP_IMGBB_TOKEN;
  var storedId = '6555a1f2bea95e6d64c85140';
  // Handle file select by saving image to state
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (refresh)
    if (selectedFile) {
      const data = new FormData();
      data.append('image', selectedFile);
  
      // await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbToken}`,
      //   data, { headers: { "Content-Type": "multipart/form-data",},})
      //   .then(async (response) => {
      //     // Send the imgUrl to backend to store in the database
      //     let imgUrl = response.data.data.url;
      //     await axios.post('http://localhost:3001/api/itemizeReceipt', { imgUrl }).then(async (backendResponse) => {
      //     console.log(backendResponse);
      
      //     // Parse the JSON response
      //     const responseData = backendResponse.data;
      
      //     // Access the stored ID
      //     storedId = responseData.insertedId;
      
      //     console.log('Data stored successfully with ID:', storedId);

      //   // Send API request to store imgUrl to MongoDB
      //   //   axios.post('http://localhost:3001/api/storeImageUrl', { imgUrl })})
      //   //   .catch((err) => {
      //   //     console.log("API error ↓");
      //   //     console.log(err);
      //   //     if (err.response.data.error) {
      //   //       console.log(err.response.data.error);
      //   });
      // });
        
      // Send the imgUrl to Veryfi API
      // let imgUrl = 'https://veryfi-testing-public.s3.us-west-2.amazonaws.com/receipt.jpg';
      // axios.post('http://localhost:3001/api/itemizeReceipt', { imgUrl })
      //     .catch((err) => {
      //       console.log("API error ↓");
      //       console.log(err);
      //       if (err.response.data.error) {
      //         console.log(err.response.data.error);
      //   }});
      setFileInputMode(false);
    } else {
      console.log('No image selected');
    }
  };

  return (
    <div style={{ width: fileInputMode ? '1000px' : '1000px' }} className="modal-container">
      {fileInputMode ? (
        // Take in receipt file
        <div>
          <h1>Select file to upload</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileSelect} />
            <button type="submit">Upload</button>
          </form>
        </div>
      ) : (
        // Display receipt details
        <div className="two-column-layout">
          <div className="left-column">
            <h1>Receipt from {storedId}</h1>
            <ReceiptBody id={storedId}></ReceiptBody>
          </div>
          <div className='right-column'>
            <PayerInputComponent />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
