import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Loading from "./components/loading/Loading";
import KeycloakService from "./services/KeycloakService";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Display a loading screen when connecting to Keycloak
root.render(<Loading message="Connecting to Keycloak..." />);

// Initialize Keycloak with a callback function
KeycloakService.initKeycloak(() => {
  // Render the actual application when Keycloak is initialized
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
