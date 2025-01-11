import { Navbar, Container, Button } from "react-bootstrap";
import { resetCredentials } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import checkAuthentication from "../../utils/isAuth";

const Header = () => {
  const isAuth = checkAuthentication();
  const dispatch = useDispatch();
  const signOut = () => dispatch(resetCredentials());
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
        { isAuth ? <Button variant="secondary" className="mr-4" onClick={signOut}>Sign out</Button> : null }
      </Container>
    </Navbar>
  )
};

export default Header;
