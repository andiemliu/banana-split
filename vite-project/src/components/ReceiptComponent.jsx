import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const ReceiptComponent = () => {
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Receipt #1</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Receipt Overview</Button>
          </Card.Body>
        </Card>
      );
}

export default ReceiptComponent;