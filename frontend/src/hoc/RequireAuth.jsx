import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../utils/routes";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  const { user } = auth;

  //if not authed readdress to login and pass current location as origin
  if (!user) {
    return <Navigate to={routes.login} state={{from: location}}/>;
  }

  return children;
};

export { RequireAuth };
