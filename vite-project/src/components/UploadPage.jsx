// components/UploadPage.jsx

import React from 'react';
import ImageUpload from './ImageUpload';

const DisplayDataPage = ({ data }) => {
  // Your code to render the data goes here
  return (
    <div>
        <h1>Select file to upload</h1>
        <ImageUpload />
    </div>
  );
};

export default DisplayDataPage;
