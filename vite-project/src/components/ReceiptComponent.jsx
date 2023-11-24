import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReceiptBody from './ReceiptBody';

const ReceiptComponent = ({title, content, peopleNamesArr}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [checkedItems, setCheckedItems] = useState({});

  // const handleCheckboxChange = (personIndex, itemIndex) => {
  //   setCheckedItems((prevCheckedItems) => {
  //     const key = `${personIndex}-${itemIndex}`;
  //     return { ...prevCheckedItems, [key]: !prevCheckedItems[key] };
  //   });
  // };
  // const [fullscreen, setFullscreen] = useState(true);

  return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
          <Card.Text>{content}</Card.Text>
          <Button variant="outline-warning" onClick={handleShow}>Receipt Overview</Button>

          <Modal show={show} onHide={handleClose} keyboard={false} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ReceiptBody id={'6555a1f2bea95e6d64c85140'} peopleNamesArr={peopleNamesArr}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    );
}

ReceiptComponent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  peopleNamesArr: PropTypes.array
};

export default ReceiptComponent;