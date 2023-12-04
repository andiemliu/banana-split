import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import PropTypes from 'prop-types'
import InitializedTableModal from './InitializedTableModal'

const ReceiptComponent = ({ initialized, id, title, peopleNamesArr }) => {
    const [showInit, setShowInit] = useState(false)
    const handleCloseInit = () => setShowInit(false)
    const handleShowInit = () => setShowInit(true)

    if (!peopleNamesArr) {
        peopleNamesArr = ['Bro']
    }
    const peopleNamesString = peopleNamesArr.join(', ')

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                <Card.Text>{peopleNamesString}</Card.Text>
                {title == 'No Receipts Yet' || !id ? (
                    <p></p>
                ) : (
                    <Button variant="outline-warning" onClick={handleShowInit}>
                        Receipt Overview
                    </Button>
                )}

                {title != 'No Receipts Yet' && id && id != 'undefined' ? (
                    <InitializedTableModal
                        title={'Receipt Overview'}
                        showThird={showInit}
                        onHideThird={handleCloseInit}
                        id={id}
                        peopleNamesArr={peopleNamesArr}
                        onCardSave={handleCloseInit}
                    ></InitializedTableModal>
                ) : (
                    <p>Click Upload a Receipt above to get started!</p>
                )}
            </Card.Body>
        </Card>
    )
}

ReceiptComponent.propTypes = {
    initialized: PropTypes.bool,
    title: PropTypes.string,
    peopleNamesArr: PropTypes.array,
}

export default ReceiptComponent
