import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './imageUpload.css';

const ImageUpload = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loadingText, setLoadingText] = useState('Uploading');
  const [imageId, setStoredId] = useState(null);
  const imgbbToken = import.meta.env.VITE_REACT_APP_IMGBB_TOKEN;


  useEffect(() => {
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText((prevText) => {
          return prevText === 'Uploading...' ? 'Uploading' : prevText + '.';
        });
      }, 500);
    } else {
      clearInterval(interval);
      setLoadingText('Uploading');
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  // Handle file select by saving image to state
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsUploaded(false);
  };

  // Handle file upload
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (refresh)
    if (selectedFile) {
      setIsLoading(true);
      try {
        const data = new FormData();
        data.append('image', selectedFile);
    
        await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbToken}`,
          data, { headers: { "Content-Type": "multipart/form-data",},})
          .then(async (response) => {
            // Send the imgUrl to backend to store in the database
            let imgUrl = response.data.data.url;
            await axios.post('http://localhost:3001/api/itemizeReceipt', { imgUrl }).then(async (backendResponse) => {
            console.log(backendResponse);
        
            // Parse the JSON response
            const responseData = backendResponse.data;
        
            // Access the stored ID
            const storedId = responseData.insertedId;

            // Set the stored ID to state
            setStoredId(storedId);

            // Pass the image ID to the parent component NavbarComponent
            onImageUpload(storedId, true);
        
            console.log('Data stored successfully with ID:', storedId);
          // Send API request to store imgUrl to MongoDB
          //   axios.post('http://localhost:3001/api/storeImageUrl', { imgUrl })})
          //   .catch((err) => {
          //     console.log("API error ↓");
          //     console.log(err);
          //     if (err.response.data.error) {
          //       console.log(err.response.data.error);
          });
        });

        setIsUploaded(true);
      } catch (error) {
        console.error("Error uploading image", error);
      } finally {
        setIsLoading(false);
      }

      // Send the imgUrl to Veryfi API
      // let imgUrl = 'https://veryfi-testing-public.s3.us-west-2.amazonaws.com/receipt.jpg';
      // axios.post('http://localhost:3001/api/itemizeReceipt', { imgUrl })
      //     .catch((err) => {
      //       console.log("API error ↓");
      //       console.log(err);
      //       if (err.response.data.error) {
      //         console.log(err.response.data.error);
      //   }});
    } else {
      console.log('No image selected');
    }
  };

  return (
    // <form onSubmit={handleSubmit}> 
    //   <input type="file" onChange={handleFileSelect} />
    //   <Button type="submit">Upload</Button>
    // </form>
    <form onSubmit={handleSubmit}>
    {isLoading && <p>{loadingText}</p>}
    {!isLoading && !isUploaded && (
      <div>
        <input type="file" onChange={handleFileSelect} />
        <Button type="submit" disabled={isLoading || isUploaded} className="uploadButton">
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    )}
    {isUploaded && <p>Uploaded!</p>}
    </form>
  );
}

export default ImageUpload;
