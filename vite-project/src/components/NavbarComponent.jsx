import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBarComponent = () => {
    return (
        <>
        <Navbar fixed="top">
            <Container>
                <Navbar.Brand href="#home">BananaSplit</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Dashboard</Nav.Link>
                    <Nav.Link href="#link">Profiles</Nav.Link>
                    <Nav.Link href="#uploadReceipt">Upload a Receipt</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}

export default NavBarComponent;