import ReceiptBody from './ReceiptBody'
import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const InitializedTableModal = ({
    title,
    showThird,
    onHideThird,
    id,
    peopleNamesArr,
    onCardSave,
}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [checkedItems, setCheckedItems] = useState({})

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            if (id && id != 'undefined') {
                try {
                    // await new Promise(resolve => setTimeout(resolve, 500));
                    // Make a request to your backend API with the provided ID
                    const response = await axios.get(
                        `http://localhost:3001/api/getReceipt/${id}`
                    )
                    console.log(response)

                    // Parse the JSON response
                    const data = response.data.data.data
                    const lineItems = response.data.data.data.line_items
                    const checkedItems = response.data.data.inputData.checkboxes
                    if (isMounted) {
                        // Update state with the fetched data
                        setData(data)
                        setCheckedItems(checkedItems)
                    }
                } catch (error) {
                    // Handle errors
                    if (isMounted) {
                        setError(error.message)
                        setLoading(false)
                    }
                } finally {
                    // Update loading state regardless of success or failure
                    setLoading(false)
                }
            }
        }

        // Call the fetchData function when the component mounts
        fetchData()
        return () => {
            isMounted = false
        }
    }, [id]) // Only re-run the effect if the 'id' prop changes

    if (loading) {
        return // <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    if (!data) {
        return <p>No data found</p>
    }

    const handleCheckboxChange = (personIndex, itemIndex) => {
        setCheckedItems((prevCheckedItems) => {
            const key = `${personIndex}-${itemIndex}`
            console.log(checkedItems)
            return { ...prevCheckedItems, [key]: !prevCheckedItems[key] }
        })
        sendDataToBackend()
    }

    const sendDataToBackend = async () => {
        // Save checkedItems, peopleNamesArr to DB
        const response = await axios.put(
            `http://localhost:3001/api/storeSplitInput/${id}`,
            { checkedItems, peopleNamesArr }
        )
    }

    const calculateOwedAmount = (personIndex) => {
        return data.line_items
            .reduce((total, item, itemIndex) => {
                const key = `${personIndex}-${itemIndex}`
                const isChecked = checkedItems[key]

                // Count the number of people who checked this checkbox
                const numberOfPeopleChecked = peopleNamesArr.reduce(
                    (count, _, currentIndex) =>
                        checkedItems[`${currentIndex}-${itemIndex}`]
                            ? count + 1
                            : count,
                    0
                )

                // Calculate the owed amount based on the number of people checked
                const amountToAdd =
                    isChecked &&
                    numberOfPeopleChecked !== 0 &&
                    personIndex != peopleNamesArr.length - 1
                        ? item.total / numberOfPeopleChecked
                        : 0

                return total + amountToAdd
            }, 0)
            .toFixed(2)
    }

    return (
        <Modal show={showThird} onHide={onHideThird} size="lg">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReceiptBody
                    editable={false}
                    id={id}
                    peopleNamesArr={peopleNamesArr}
                    handleCheckboxChange={handleCheckboxChange}
                    calculateOwedAmount={calculateOwedAmount}
                    checkedItems={checkedItems}
                    data={data}
                ></ReceiptBody>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHideThird}>
                    Close
                </Button>
                <Button variant="primary" onClick={onCardSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

InitializedTableModal.propTypes = {
    onCardSave: PropTypes.func,
    peopleNamesArr: PropTypes.array,
}

export default InitializedTableModal
