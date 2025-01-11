import { useSelector } from "react-redux";

const checkAuthentication = () => {
  const user = useSelector((state) => state.auth.user);
  return !!user;
};

export default checkAuthentication;
