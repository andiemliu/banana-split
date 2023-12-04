import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const PersonComponent = ({name, others}) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{name}</Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
            <Card.Text>{others.map((item, index) => (
                <p key={index}>{item}</p>))}</Card.Text>
            </Card.Body>
        </Card>
    )
};

PersonComponent.propTypes = {
    name: PropTypes.string,
    others: PropTypes.array,
  };

export default PersonComponent;