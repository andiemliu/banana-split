import ReceiptBody from "./ReceiptBody";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const TableModal = ({ showThird, onHideThird, id, peopleNamesArr }) => {

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
                <Button variant="primary">Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TableModal;