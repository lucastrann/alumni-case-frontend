import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KeycloakService from "../services/KeycloakService";

const withKeycloak = (Component) => (props) => {
  const navigate = useNavigate();
  const isLoggedIn = KeycloakService.isLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      // Use the navigate function to redirect to the "/login" route
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <Component {...props} />;
  } else {
    return null; // or any loading/fallback UI if needed
  }
};

export default withKeycloak;
