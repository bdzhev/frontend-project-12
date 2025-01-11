import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../utils/routes";
import checkAuthentication from "../../utils/isAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuth = checkAuthentication();

  //if not authed readdress to login and pass current location as origin
  if (!isAuth) {
    return <Navigate to={routes.login} state={{from: location}}/>;
  }

  return children;
};

export { RequireAuth };
