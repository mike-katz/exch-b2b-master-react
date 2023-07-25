import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state?.persist);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state?.persist);

  return !isLoggedIn ? children : <Navigate to="/" />;
};
