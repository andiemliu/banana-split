// components/ReceiptPreprocessPage.jsx

import React from 'react';

const DisplayDataPage = ({ data }) => {
  // Your code to render the data goes here
  return (
    <div>
      <h1>Receipt Display Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DisplayDataPage;
