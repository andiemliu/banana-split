import ReceiptBody from "./ReceiptBody";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TableModal = ({ title, showThird, onHideThird, id, peopleNamesArr, onCardSave }) => {

    // added
    // const [formData, setFormData] = useState();
    const [formData, setFormData] = useState({ title: "Receipt", people: peopleNamesArr });

    useEffect(() => {
        console.log("After (inside useEffect)", formData);
        console.log(peopleNamesArr)
        if (peopleNamesArr[0] != ' (Payer)') {
            // Other actions you want to perform after the state update
            onCardSave(formData);
            onHideThird();
        }
      }, [formData]);

    const handleSave = () => {
        // setFormData({ title: "Receipt" , people: peopleNamesArr });
        console.log("Before", formData)
        setFormData((prevData) => (
            { ...prevData, title: "Receipt", people: peopleNamesArr }));
        // console.log("after", formData);
        // onCardSave(formData);
        // onHideThird();
    };

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});

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


    const handleCheckboxChange = (personIndex, itemIndex) => {
        setCheckedItems((prevCheckedItems) => {
        const key = `${personIndex}-${itemIndex}`;
        console.log(checkedItems);
        return { ...prevCheckedItems, [key]: !prevCheckedItems[key] };
        });
    };

    const calculateOwedAmount = (personIndex) => {
        return data.reduce((total, item, itemIndex) => {
        const key = `${personIndex}-${itemIndex}`;
        const isChecked = checkedItems[key];
    
        // Count the number of people who checked this checkbox
        const numberOfPeopleChecked = peopleNamesArr.reduce(
            (count, _, currentIndex) =>
            checkedItems[`${currentIndex}-${itemIndex}`] ? count + 1 : count,
            0
        );
    
        // Calculate the owed amount based on the number of people checked
        const amountToAdd = isChecked && numberOfPeopleChecked !== 0 && personIndex != peopleNamesArr.length - 1
            ? item.total / numberOfPeopleChecked
            : 0;
    
        return total + amountToAdd;
        }, 0).toFixed(2);
    };

    return (
        <>
        {title == "Receipt Card Created!" ? 
            <Modal show={showThird} onHide={onHideThird} dialogClassName="modal-80w">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>A new receipt card has successfully been created! Please check the dashboard page to edit the card and assign items to every person in your group.</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>Okay</Button>
            </Modal.Footer>
        </Modal>
            :
            <Modal show={showThird} onHide={onHideThird} size="lg">
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    <ReceiptBody id={id} peopleNamesArr={peopleNamesArr} handleCheckboxChange={handleCheckboxChange} calculateOwedAmount={calculateOwedAmount} checkedItems={checkedItems} data={data}></ReceiptBody>
                </Modal.Body>
                <Modal.Footer style={{ position: 'sticky', bottom: 0, background: 'white' }}>
                    {/* <Button variant="secondary" onClick={onHideThird}>Close</Button> */}
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        }
        </>
    )
}

TableModal.propTypes = {
    onCardSave: PropTypes.func,
    peopleNamesArr: PropTypes.array
  };

export default TableModal;