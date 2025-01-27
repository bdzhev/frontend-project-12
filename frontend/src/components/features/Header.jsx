import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetCredentials } from '../../../store/slices/authSlice';
import checkAuthentication from '../../../utils/isAuth';

const Header = () => {
  const { t } = useTranslation();
  const isAuth = checkAuthentication();
  const dispatch = useDispatch();
  const signOut = () => {
    localStorage.removeItem('authData');
    dispatch(resetCredentials());
  };
  return (
    <Navbar className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('navBar.title')}</Navbar.Brand>
        { isAuth
          ? <Button variant="secondary" className="mr-4" onClick={signOut}>{t('navBar.signout')}</Button>
          : null }
      </Container>
    </Navbar>
  );
};

export default Header;
