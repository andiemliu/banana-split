import ReceiptBody from "./ReceiptBody";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TableModal = ({ title, showThird, onHideThird, id, peopleNamesArr, onCardSave }) => {
    // added
    // const [formData, setFormData] = useState();
    // Create receipt?
    const [formData, setFormData] = useState({ title: "Receipt", people: peopleNamesArr, id: id });
    useEffect(() => {
        console.log("After (inside useEffect)", formData, checkedItems, peopleNamesArr);
        const fetchData = async () => {
            if (!id){
                return; 
            }
            // Save checkedItems, peopleNamesArr to DB
            const response = await axios.get(`http://localhost:3001/api/getReceipt/${id}`);
            console.log(response);
            axios.put(`http://localhost:3001/api/storeSplitInput/${id}`, { checkedItems, peopleNamesArr })

            try {
                const id = '656bb44e730a0709c0107c00'
                const username = 'andieliu'
                const owedAmounts = peopleNamesArr.map((person, personIndex) => calculateOwedAmount(personIndex));
                console.log("Save owed amts", owedAmounts);    

                // Save owedAmounts to DB for each person owes collector amount
                const collector = peopleNamesArr[peopleNamesArr.length - 1].replace(/\s*\([^)]*\)\s*/, '');
                console.log("people",peopleNamesArr);
                for (let i = 0; i < peopleNamesArr.length-1; i++) {
                    const person = peopleNamesArr[i];
                    const amount = owedAmounts[i];
                    console.log("person, amount:", person, amount);
                    await axios.put(`http://localhost:3001/api/updateOwedAmount/`, { id, username, person, collector, amount });
                }

            } catch (error) {
                console.log("owedAmounts not initialized yet", error);
            }
            // Other actions you want to perform after the state update
            onCardSave(formData);
            onHideThird();
        }
        fetchData();
      }, [formData, id]);

    const handleSave = () => {
        // setFormData({ title: "Receipt" , people: peopleNamesArr });
        console.log("Before", formData)
        setFormData((prevData) => (
            { ...prevData, title: "Receipt", people: peopleNamesArr, id: id }));
        console.log("after", formData);
        // onCardSave(formData);
        // onHideThird();
    };

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});
    const [checkAll, setCheckAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Make a request to your backend API with the provided ID
            const response = await axios.get(`http://localhost:3001/api/getReceipt/${id}`);
            console.log("second get receipt", response);
            
            // Parse the JSON response
            const data = response.data.data.data;
            const lineItems = response.data.data.data.line_items;

            // Update state with the fetched data
            setData(data);
            // setData(lineItems);
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
    const handleCheckAllChange = () => {
        const newCheckAllState = !checkAll;
        setCheckAll(newCheckAllState);
    
        const newCheckedItems = {};
        data.line_items.forEach((item, itemIndex) => {
            peopleNamesArr.forEach((person, personIndex) => {
                newCheckedItems[`${personIndex}-${itemIndex}`] = newCheckAllState;
            });        
        });
    
        setCheckedItems(newCheckedItems);
      };

    const handleCheckboxChange = (personIndex, itemIndex) => {
        setCheckedItems((prevCheckedItems) => {
        const key = `${personIndex}-${itemIndex}`;
        console.log(checkedItems);
        return { ...prevCheckedItems, [key]: !prevCheckedItems[key] };
        });
    };

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
    console.log("hi my id ", id);
    console.log("hi my data", data);
    return (
        <Modal show={showThird} onHide={onHideThird} size="lg">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <ReceiptBody checkAll={checkAll} handleCheckAllChange={handleCheckAllChange} id={id} peopleNamesArr={peopleNamesArr} handleCheckboxChange={handleCheckboxChange} calculateOwedAmount={calculateOwedAmount} checkedItems={checkedItems} data={data}></ReceiptBody>
            </Modal.Body>
            <div style={{paddingLeft: 650, paddingBottom: 20}}>
            <label> 
                <input type="checkbox" checked={checkAll} onChange={handleCheckAllChange} />
                Select All
            </label>
            </div>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHideThird}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
            
        </Modal>
    )
}

TableModal.propTypes = {
    onCardSave: PropTypes.func,
    peopleNamesArr: PropTypes.array
  };

export default TableModal;