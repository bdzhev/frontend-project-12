import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../utils/routes";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  // const auth = useAuth();
  // const { user } = auth;
  const user = useSelector((state) => state.auth.user);

  //if not authed readdress to login and pass current location as origin
  if (!user) {
    return <Navigate to={routes.login} state={{from: location}}/>;
  }

  return children;
};

export { RequireAuth };
