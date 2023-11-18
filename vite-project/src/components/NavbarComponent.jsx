import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import './navBar.css';
import UploadPage from './UploadPage';


const NavBarComponent = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            <Nav.Link href="#home" style={customLinkStyle}className="navBarLink">Dashboard</Nav.Link>
                            <Nav.Link href="#link" style={customLinkStyle}>Profiles</Nav.Link>
                            <Button className="uploadReceiptButton" variant="outline-warning" onClick={handleShow} >Upload a Receipt</Button>

                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Upload Receipt Here</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <UploadPage />
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBarComponent;