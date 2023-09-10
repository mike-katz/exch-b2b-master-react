import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, userData } = useSelector((state) => state?.persist);

  if (window.location.pathname === "/") {
    return <Navigate to="/down-list-master" />;
  }

  if (userData?.roles?.toString() === "Agent") {
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
