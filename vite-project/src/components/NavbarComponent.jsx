import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import './navBar.css';
import UploadPage from './UploadPage';
import { Link } from 'react-router-dom';
import UserInputModal from './UserInputModal';

const NavBarComponent = () => {

    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);

    const handleShowFirstModal = () => setShowFirstModal(true);
    const handleCloseFirstModal = () => setShowFirstModal(false);

    const handleShowSecondModal = () => {
        setShowFirstModal(false); // Close the first modal
        setShowSecondModal(true); // Open the second modal
    };
    
    const handleCloseSecondModal = () => setShowSecondModal(false);

    const customBrandStyle = {
        fontSize: '40px',
      };

    const customLinkStyle = {
        fontSize: '20px',
        paddingTop: 20,
    };

    return (
        <div>
            <Navbar fixed="top" bg="light" className='navBar' expand="lg">
                <Container className='container'>
                    <Navbar.Brand href="#home" className='brand' style={customBrandStyle}>BananaSplit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" style={customLinkStyle} className="navBarLink">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/profiles" style={customLinkStyle}>Profiles</Nav.Link>
                        <Button className="uploadReceiptButton" variant="outline-primary" onClick={handleShowFirstModal} >Upload a Receipt</Button>

                        <Modal show={showFirstModal} onHide={handleCloseFirstModal} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Upload Receipt Here</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <UploadPage />
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseFirstModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleShowSecondModal}>
                                Next
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        <UserInputModal show={showSecondModal} onHide={handleCloseSecondModal} id={'6555a1f2bea95e6d64c85140'} />

                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBarComponent;