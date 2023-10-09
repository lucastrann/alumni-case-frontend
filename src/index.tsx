import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Loading from "./components/loading/Loading";
import KeycloakService from "./services/KeycloakService";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Display a loading screen when connecting to Keycloak
root.render(<Loading message="Loading..." />);

//KeycloakService.initKeycloak(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
