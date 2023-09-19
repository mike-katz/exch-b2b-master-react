import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state?.persist);

  const { token } = useSelector((state) => state?.persist);

  let userData;

  if (token) {
    userData = jwtDecode(token);
  }

  const role = userData?.roles?.toString();

  if (isLoggedIn && window.location.pathname === "/") {
    return <Navigate to="/down-list-master" />;
  }

  if (isLoggedIn && role === "Agent") {
    if (window.location.pathname === "/down-list-master") {
      return <Navigate to="/down-list-user" />;
    }

    if (window.location.pathname === "/banking-master") {
      return <Navigate to="/banking-user" />;
    }

    if (window.location.pathname === "/") {
      return <Navigate to="/down-list-user" />;
    }
  }

  if (window.location.pathname === "/") {
    return <Navigate to="/down-list-master" />;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state?.persist);

  return !isLoggedIn ? children : <Navigate to="/down-list-master" />;
};
