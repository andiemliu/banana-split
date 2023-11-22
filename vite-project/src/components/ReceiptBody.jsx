import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineItemComponent from './LineItemComponent'; 
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './receiptBody.css';

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
    <div className='modalBody'>
      {/* {data.map((lineItem, index) => (
        <LineItemComponent key={index} lineItem={lineItem} />
      ))} */}
      <div className='receiptTable'>
        <Table responsive>
          <thead>
            <tr>
              <th>Receipt</th>
              {Array.from({ length: 4 }).map((_, index) => (
                <th key={index}>Person {index}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((content, index) => (
              <tr key={index}>
                <td>{content.description} - ${content.total}</td>
                {Array.from({ length: 4 }).map((_, index) => (
                  <td key={index}>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <Form.Check // prettier-ignore
                            type={type}
                            id={`default-${type}`}                        />
                        </div>
                      ))}
                    </Form>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="last-div">
        <div>
          <h2 className="totalToPayer">Total to Payer</h2>
        </div>
        <div className='middle-div'>
          {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="person">
                <div>
                  Person {index}:
                </div>
                <div className="amount">
                  $5.00
                </div>
              </div>
            ))}
        </div>
        <div>
          <Button variant="primary">Calculate</Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptBody;
