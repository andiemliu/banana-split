import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineItemComponent from './LineItemComponent'; 

const ReceiptBody = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a request to your backend API with the provided ID
        const response = await axios.get(`http://localhost:3001/api/getReceipt/${id}`);
        console.log(response);
        

        // Parse the JSON response
        console.log(response);
        const lineItems = response.data.data.data.line_items;

        // Update state with the fetched data
        setData(lineItems);
      } catch (error) {
        // Handle errors
        setError(error.message);
      } finally {
        // Update loading state regardless of success or failure
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [id]); // Only re-run the effect if the 'id' prop changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No data found</p>;
  }

  // Render your component with the fetched data
  return (
    <div>
      {data.map((lineItem, index) => (
        <LineItemComponent key={index} lineItem={lineItem} />
      ))}
    </div>
  );
};

export default ReceiptBody;
