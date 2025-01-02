import { Navbar, Container } from "react-bootstrap";
/*
TODO
Add a logout button that will use the state from state manager
display a version of interface with logoutButton if the user is signed in
*/

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
      </Container>
    </Navbar>
  )
};

export default Header;
