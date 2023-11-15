import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import './navBar.css';

const NavBarComponent = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navbar fixed="top" bg="light">
                <Container>
                    <Navbar.Brand href="#home">BananaSplit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Dashboard</Nav.Link>
                        <Nav.Link href="#link">Profiles</Nav.Link>
                        <Button variant="primary" onClick={handleShow}>Upload a Receipt</Button>

                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Upload Receipt Here</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                **upload receipt button here**
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary">Upload</Button>
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