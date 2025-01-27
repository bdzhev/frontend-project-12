import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../../utils/routes';
import useCheckAuthentication from '../../utils/isAuth';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuth = useCheckAuthentication();

  // if not authed readdress to login and pass current location as origin
  if (!isAuth) {
    return <Navigate to={routes.login} state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
