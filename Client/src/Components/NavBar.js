import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Searchbar from './Searchbar';

const NavBar = (props) =>{

    return(
<Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Place HOlder</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
        </Container>
      </Navbar>
    );

}

export default NavBar;