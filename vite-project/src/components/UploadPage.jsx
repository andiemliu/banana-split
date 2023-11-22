// components/UploadPage.jsx

import React from 'react';
import ImageUpload from './ImageUpload';
import './uploadPage.css';

const DisplayDataPage = ({ data }) => {
  // Your code to render the data goes here
  return (
    <div>
        <h2 className="uploadFile">Select file to upload</h2>
        <ImageUpload />
    </div>
  );
};

export default DisplayDataPage;
