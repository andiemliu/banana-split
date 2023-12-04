import ReceiptBody from "./ReceiptBody";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const InitializedTableModal = ({ title, showThird, onHideThird, id, peopleNamesArr, onCardSave }) => {
    // const [inputData, setInputData] = useState({ checkedItems: {}, peopleNamesArr: []});
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         // Make a request to your backend API with the provided ID
    //         const response = await axios.get(`http://localhost:3001/api/getReceipt/${id}`);        
   
    //        // Parse the JSON response
    //        console.log(response.data.data.inputData);
    //        const checkedItems = response.data.data.inputData.checkboxes;
    //        //const peopleNamesArr = response.data.data.inputData.people;
   
    //        // Update state with the fetched data
    //        setInputData({ checkedItems, peopleNamesArr });
    //      } catch (error) {
    //        // Handle errors
    //        setError(error.message);
    //      } finally {
    //        // Update loading state regardless of success or failure
    //        setLoading(false);
    //      }
    //    };
   
    //    // Call the fetchData function when the component mounts
    //    fetchData();
    //  }, [id]); // Only re-run the effect if the 'id' prop changes   

    // added
    // const [formData, setFormData] = useState();
    // const [formData, setFormData] = useState({ title: "Receipt", people: peopleNamesArr });
    // useEffect(() => {
    //     console.log("After (inside useEffect)", formData, checkedItems, peopleNamesArr);
    //     const fetchData = async () => {
    //         // Save checkedItems, peopleNamesArr to DB
    //         const response = await axios.get(`http://localhost:3001/api/getReceipt/${id}`);
    //         console.log(response);
    //         const owedAmounts = peopleNamesArr.map((person, personIndex) => calculateOwedAmount(personIndex));
    //         console.log("Save owed amts", owedAmounts);
    //         axios.put(`http://localhost:3001/api/storeSplitInput/${id}`, { checkedItems, peopleNamesArr })
    //         // Other actions you want to perform after the state update
    //         onCardSave(formData);
    //         onHideThird();
    //     }
    //     fetchData();
    //   }, [formData]);

    // const handleSave = () => {
    //     // setFormData({ title: "Receipt" , people: peopleNamesArr });
    //     console.log("Before", formData)
    //     setFormData((prevData) => (
    //         { ...prevData, title: "Receipt", people: peopleNamesArr }));
    //     console.log("after", formData);
    //     // onCardSave(formData);
    //     // onHideThird();
    // };

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {

        try {
            // TODO: CHECK IF THIS IS CAUSING THE LAST CHECKBOX CHANGE TO NOT BE SAVED!
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Make a request to your backend API with the provided ID
            const response = await axios.get(`http://localhost:3001/api/getReceipt/${id}`);
            console.log(response);
            
            // Parse the JSON response
            const data = response.data.data.data;
            const lineItems = response.data.data.data.line_items;
            const checkedItems = response.data.data.inputData.checkboxes;
            console.log("checkeditems in Initializedtablemodal:", checkedItems);
            if (isMounted) {
                // Update state with the fetched data
                // setData(lineItems);
                setData(data);
                setCheckedItems(checkedItems);
            }
        } catch (error) {
            // Handle errors
            if (isMounted) {

                setError(error.message);
                setLoading(false);

            }
        } finally {
            // Update loading state regardless of success or failure
            setLoading(false);
        }
        };

        // Call the fetchData function when the component mounts
        fetchData();
        return () => {
            isMounted = false;
          };
    }, [id]); // Only re-run the effect if the 'id' prop changes

    if (loading) {
        return // <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data) {
        return <p>No data found</p>;
    }


    const handleCheckboxChange = (personIndex, itemIndex) => {
        setCheckedItems(  (prevCheckedItems) => {

        const key = `${personIndex}-${itemIndex}`;
        console.log(checkedItems);
        const newCheckedItems = { ...prevCheckedItems, [key]: !prevCheckedItems[key] } || checkedItems;
        console.log("storing updates checkboxes frm inittable", newCheckedItems);
        setCheckedItems(newCheckedItems);
        console.log("checkedItems after setCheckedItems", checkedItems);
        sendCheckboxesBackend();
        return newCheckedItems;
        });

    };

    const sendCheckboxesBackend = () => {
        axios.put(`http://localhost:3001/api/storeSplitInput/${id}`, { checkedItems, peopleNamesArr })

    }

    const calculateOwedAmount = (personIndex) => {
         
        return data.line_items.reduce((total, item, itemIndex) => {
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
        //console.log("calcOwedAmt", result);
        //return result;
    };
    console.log("checkedItems before pass to receiptbody", checkedItems);
    console.log("Data before pass to receiptbody", data);

    return (
        <Modal show={showThird} onHide={onHideThird} size="lg">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReceiptBody id={id} peopleNamesArr={peopleNamesArr} handleCheckboxChange={handleCheckboxChange} calculateOwedAmount={calculateOwedAmount} checkedItems={checkedItems} data={data}></ReceiptBody>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHideThird}>Close</Button>
                <Button variant="primary" onClick={onCardSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

InitializedTableModal.propTypes = {
    onCardSave: PropTypes.func,
    peopleNamesArr: PropTypes.array
  };

export default InitializedTableModal;