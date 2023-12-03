import React from 'react';
import PropTypes from 'prop-types';
import './lineItemComponent.css';

const LineItemComponent = ({ lineItem }) => {
    const { description, quantity, total } = lineItem;
    const roundedQuantity = Math.round(quantity);

    return (
        // <div className="line-item">
        //     <h3>{description}</h3>
        //     <p>Quantity: {quantity}</p>
        //     <p>Price: ${total}</p>
        // </div>
        <tr>
            <td>{description}</td>
            <td>{roundedQuantity}</td>
            <td>${total}</td>
        </tr>
    );
};

LineItemComponent.propTypes = {
    lineItem: PropTypes.shape({
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
};

export default LineItemComponent;