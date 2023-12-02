import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import LineItemComponent from './LineItemComponent'; 
import { FormControl, ListGroup } from 'react-bootstrap';
import TableModal from './tableModal';
import './userInputModal.css';
import Table from 'react-bootstrap/Table';

const UserInputModal = ({ showSecond, onHideSecond, showThird, onHideThird, handleShowThirdModal, id, onCardSave }) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [inputText, setInputText] = useState('');
    const [payerName, setPayerName] = useState('');
    const [peopleNames, setPeopleNames] = useState([]);

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
        setPeopleNames((prevPeople) => [...prevPeople, inputText]);
        setInputText(''); // Clear the input after pressing Enter
        }
    };

    const handleDelete = (index) => {
        setPeopleNames((prevPeople) => prevPeople.filter((_, i) => i !== index));
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a request to your backend API with the provided ID
                console.log(id)
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
        <>
            <Modal show={showSecond} onHide={onHideSecond} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>2. Enter Names</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    <div className='receiptNamesSeparator'>
                        <div className='receiptItems'>
                            <h3>Receipt Items</h3>

                            {/* {data.map((lineItem, index) => (
                                <div key={index} className='itemBlock'>
                                    <LineItemComponent key={index} lineItem={lineItem} />
                                </div>
                            ))} */}
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((lineItem, index) => (
                                    <LineItemComponent key={index} lineItem={lineItem} />
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <h3>Payer</h3>
                            <FormControl
                                type="text"
                                value={payerName}
                                onChange={handlePayerInputChange}
                                onKeyDown={handlePayerEnterPress}
                                placeholder="Type in payer's name"
                            />
                            <h3 id="others">Others</h3>
                            <FormControl
                                type="text"
                                value={inputText}
                                onChange={handleInputChange}
                                onKeyDown={handleEnterPress}
                                placeholder="Press Enter to add a new name"
                                className="otherInput"
                            />
                            <ListGroup>
                                {peopleNames.map((person, index) => (
                                <ListGroup.Item key={index} className="nameList" style={{
                                    outline: 'none',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    position: 'relative',
                                  }}>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(index)} className="deleteButton">Delete</Button>
                                    {person}
                                </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ position: 'sticky', bottom: 0, background: 'white' }}>
                    <Button variant="secondary" onClick={onHideSecond}>Close</Button>
                    <Button variant="primary" onClick={handleShowThirdModal}>Next</Button>
                    {/* <Button variant="primary" onClick={handleShowThirdModal}>Create Card</Button> */}
                </Modal.Footer>
            </Modal>

            <TableModal title={"3. Assign Amounts For Each Person"} showThird={showThird} onHideThird={onHideThird} id={id} peopleNamesArr={[...peopleNames, payerName + " (Payer)"]} onCardSave={onCardSave} ></TableModal>
        </>
        );
    };

export default UserInputModal;