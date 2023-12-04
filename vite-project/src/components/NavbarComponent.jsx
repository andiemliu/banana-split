import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import './navBar.css'
import ImageUpload from './ImageUpload'
import { Link } from 'react-router-dom'
import UserInputModal from './UserInputModal'

const NavBarComponent = ({ page, onCardSave }) => {
    const [id, setId] = useState(null)
    const [isUploaded, setIsUploaded] = useState(false)

    const [showFirstModal, setShowFirstModal] = useState(false)
    const [showSecondModal, setShowSecondModal] = useState(false)
    const [showThirdModal, setShowThirdModal] = useState(false)

    const handleShowFirstModal = () => setShowFirstModal(true)
    const handleCloseFirstModal = () => setShowFirstModal(false)

    const handleImageUpload = (imageId, uploaded) => {
        setId(imageId)
        setIsUploaded(uploaded)
    }

    const handleShowSecondModal = () => {
        setIsUploaded(false)
        setShowFirstModal(false)
        setShowSecondModal(true)
    }

    const handleShowThirdModal = () => {
        setShowSecondModal(false)
        setShowThirdModal(true)
    }

    const handleCloseSecondModal = () => setShowSecondModal(false)
    const handleCloseThirdModal = () => setShowThirdModal(false)

    const customBrandStyle = {
        fontSize: '40px',
    }

    const customLinkStyle = {
        fontSize: '16px',
        paddingTop: 20,
        textTransform: 'uppercase',
    }

    return (
        <div>
            <Navbar fixed="top" bg="light" className="navBar" expand="lg">
                <Container className="container">
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        className="brand"
                        style={customBrandStyle}
                    >
                        BananaSplit
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                as={Link}
                                to="/dashboard"
                                style={customLinkStyle}
                                className="navBarLink"
                            >
                                Dashboard
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/profiles"
                                style={customLinkStyle}
                            >
                                Profiles
                            </Nav.Link>
                            {page == 1 ? (
                                <>
                                    <Button
                                        className="uploadReceiptButton"
                                        variant="outline-primary"
                                        onClick={handleShowFirstModal}
                                    >
                                        Upload a Receipt
                                    </Button>

                                    <Modal
                                        show={showFirstModal}
                                        onHide={handleCloseFirstModal}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                1. Upload Receipt Here
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h2 className="uploadFile">
                                                Select file to upload
                                            </h2>
                                            <ImageUpload
                                                onImageUpload={
                                                    handleImageUpload
                                                }
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="secondary"
                                                onClick={handleCloseFirstModal}
                                            >
                                                Close
                                            </Button>
                                            {isUploaded && (
                                                <Button
                                                    variant="primary"
                                                    onClick={
                                                        handleShowSecondModal
                                                    }
                                                >
                                                    Next
                                                </Button>
                                            )}
                                        </Modal.Footer>
                                    </Modal>

                                    <UserInputModal
                                        showSecond={showSecondModal}
                                        onHideSecond={handleCloseSecondModal}
                                        showThird={showThirdModal}
                                        onHideThird={handleCloseThirdModal}
                                        handleShowThirdModal={
                                            handleShowThirdModal
                                        }
                                        id={id}
                                        onCardSave={onCardSave}
                                    />
                                </>
                            ) : (
                                <div></div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBarComponent
