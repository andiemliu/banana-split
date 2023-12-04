import PropTypes from 'prop-types'
import './lineItemComponent.css'

const LineItemComponent = ({ lineItem }) => {
    const { description, quantity, total } = lineItem
    const roundedQuantity = Math.round(quantity)

    return (
        <tr>
            <td>{description}</td>
            <td>{roundedQuantity}</td>
            <td>${total}</td>
        </tr>
    )
}

LineItemComponent.propTypes = {
    lineItem: PropTypes.shape({
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
}

export default LineItemComponent
