import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import keycloak from "../keycloak";

interface KeycloakRouteProps {
  children: ReactNode;
  role: string;
  redirectTo?: string;
}

/**
 * Protect routes based on a given role and authenticated status of a Keycloak Session.
 * @description Default redirect is to the base path: "/"
 * @param {KeycloakRouteProps} props
 * @returns {JSX.Element}
 */
function KeycloakRoute({ children, role, redirectTo = "/" }: KeycloakRouteProps): JSX.Element {
  if (!keycloak.authenticated) {
    return <Navigate replace to={redirectTo} />;
  }

  return (
    <>
      {children}
    </>
  );
}

export default KeycloakRoute;
