import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import './receiptBody.css'

const ReceiptBody = ({
    id,
    peopleNamesArr,
    checkAll,
    handleCheckAllChange,
    handleCheckboxChange,
    calculateOwedAmount,
    data,
    checkedItems,
    editable,
}) => {
    const filteredData = data.line_items.filter((item) => item.total > 0)

    return (
        <div className="modalBody">
            <div className="receiptTable">
                <div className="receiptHeader">
                    <p>
                        ${data.total} spent at {data.vendor.name}{' '}
                    </p>
                    <p>Date: {data.date}</p>
                    <p className="add-margin">
                        Location: {data.vendor.address}
                    </p>
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Items</th>
                            {peopleNamesArr?.map((person, personIndex) => (
                                <th key={personIndex}>{person}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                                <td>
                                    {item.description} (${item.total})
                                </td>
                                {peopleNamesArr?.map(
                                    (
                                        person,
                                        personIndex //inputData.peopleNamesArr
                                    ) => (
                                        <td key={personIndex}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={
                                                    checkedItems[
                                                        `${personIndex}-${itemIndex}`
                                                    ] || false
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        personIndex,
                                                        itemIndex
                                                    )
                                                }
                                                disabled={!editable}
                                            />
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total Owed</td>
                            {peopleNamesArr?.map((person, personIndex) => (
                                <td key={personIndex}>
                                    {calculateOwedAmount(personIndex)}
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </Table>
            </div>
        </div>
    )
}

ReceiptBody.propTypes = {
    id: PropTypes.string,
    peopleNamesArr: PropTypes.array,
    data: PropTypes.object,
}

export default ReceiptBody
