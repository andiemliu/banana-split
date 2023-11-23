import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import LineItemComponent from './LineItemComponent'; 
import { FormControl, ListGroup } from 'react-bootstrap';
import './userInputModal.css';


const UserInputModal = ({ show, onHide, id }) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [inputText, setInputText] = useState('');
    const [payerName, setPayerName] = useState('');
    const [people, setPeople] = useState([]);

    const handlePayerInputChange = (event) => {
        setPayerName(event.target.value);
    };

    const handlePayerEnterPress = (event) => {
        if (event.key === 'Enter' && inputText.trim() !== '') {
        setPayerName(payerName);
        setInputText(''); // Clear the input after pressing Enter
        }
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter' && inputText.trim() !== '') {
        setPeople((prevPeople) => [...prevPeople, inputText]);
        setInputText(''); // Clear the input after pressing Enter
        }
    };

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


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Second Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='receiptNamesSeparator'>
                    <div className='receiptItems'>
                        {data.map((lineItem, index) => (
                            <div key={index} className='itemBlock'>
                                <LineItemComponent key={index} lineItem={lineItem} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>Payer</h3>
                        <FormControl
                            type="text"
                            value={payerName}
                            onChange={handlePayerInputChange}
                            onKeyDown={handlePayerEnterPress}
                            placeholder="Press Enter to add item"
                        />
                        <h3>Others</h3>
                        <FormControl
                            type="text"
                            value={inputText}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterPress}
                            placeholder="Press Enter to add item"
                        />
                        <ListGroup>
                            {people.map((item, index) => (
                            <ListGroup.Item key={index}>{item}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
    };

export default UserInputModal;