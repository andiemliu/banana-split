
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PayerInputComponent = () => {
  const [payer, setPayer] = useState('');
  const [others, setOthers] = useState(['']);

  const handlePayerChange = (e) => {
    setPayer(e.target.value);
  };

  const handleOthersChange = (e, index) => {
    const updatedOthers = [...others];
    updatedOthers[index] = e.target.value;
    setOthers(updatedOthers);
  };

  const handleAddOther = () => {
    setOthers([...others, '']);
  };

  return (
    <div>
      <Form.Group controlId="payerInput">
        <Form.Label>Payer</Form.Label>
        <Form.Control type="text" value={payer} onChange={handlePayerChange} />
      </Form.Group>
      <div style={{marginTop: '25px'}}>
        <p>Others</p>
        </div>
    
      {others.map((other, index) => (
        <Form.Group controlId={`otherInput${index}`} key={index}>
          {/*<Form.Label>Others</Form.Label>*/}
          <Form.Control
            type="text"
            value={other}
            onChange={(e) => handleOthersChange(e, index)}
          />
        </Form.Group>
      ))}

      <Button variant="primary" onClick={handleAddOther}>
        Add
      </Button>
    </div>
  );
};

export default PayerInputComponent;
