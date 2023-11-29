import ReceiptBody from "./ReceiptBody";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const TableModal = ({ showThird, onHideThird, id, peopleNamesArr, onCardSave }) => {

    // added
    // const [formData, setFormData] = useState();
    const [formData, setFormData] = useState({ title: "Receipt", people: peopleNamesArr });

    useEffect(() => {
        console.log("After (inside useEffect)", formData);
    
        // Other actions you want to perform after the state update
        onCardSave(formData);
        onHideThird();
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

    return (
        <Modal show={showThird} onHide={onHideThird} size="lg">
            <Modal.Header>
                <Modal.Title>3. Assign Amounts For Each Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReceiptBody id={id} peopleNamesArr={peopleNamesArr}></ReceiptBody>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHideThird}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TableModal;