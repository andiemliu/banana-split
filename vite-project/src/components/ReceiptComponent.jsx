import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReceiptBody from './ReceiptBody';
import TableModal from './tableModal';
import InitializedTableModal from './InitializedTableModal';

const ReceiptComponent = ({initialized, id, title, peopleNamesArr}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInit, setShowInit] = useState(false);
  const handleCloseInit = () => setShowInit(false);
  const handleShowInit = () => setShowInit(true);

  // const [checkedItems, setCheckedItems] = useState({});

  // const handleCheckboxChange = (personIndex, itemIndex) => {
  //   setCheckedItems((prevCheckedItems) => {
  //     const key = `${personIndex}-${itemIndex}`;
  //     return { ...prevCheckedItems, [key]: !prevCheckedItems[key] };
  //   });
  // };
  // const [fullscreen, setFullscreen] = useState(true);
  // if peopleNamesArr not initialized, set to empty array
  if (!peopleNamesArr) {
    peopleNamesArr = ['Bro'];
  }
  const peopleNamesString = peopleNamesArr.join(', ');


  return (

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
          <Card.Text>{peopleNamesString}</Card.Text>
          {title == "No Receipts Yet" || !id ? 
            <p></p>
            : 
            <Button variant="outline-warning" onClick={handleShowInit}>Receipt Overview</Button>
          }

          {title != "No Receipts Yet" && id && id != "undefined" ?
                      // <TableModal title={"Initialized Receipt Overview"} showThird={showInit} onHideThird={handleCloseInit} id={id} peopleNamesArr={peopleNamesArr} onCardSave={handleCloseInit}></TableModal>
            <InitializedTableModal title={"Initialized Receipt Overview"} showThird={showInit} onHideThird={handleCloseInit} id={id} peopleNamesArr={peopleNamesArr} onCardSave={handleCloseInit} ></InitializedTableModal>
          :
          <p>Click Upload a Receipt above to get started!</p>
        }
        </Card.Body>
        
      </Card>
      );
}

ReceiptComponent.propTypes = {
  initialized: PropTypes.bool,
  title: PropTypes.string,
  // content: PropTypes.array,
  peopleNamesArr: PropTypes.array
};

export default ReceiptComponent;