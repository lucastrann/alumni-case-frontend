import Keycloak, { KeycloakInstance } from "keycloak-js";

const _keycloak: KeycloakInstance = new Keycloak("keycloak.json");

const initKeycloak = (onAuthenticated: () => void): Promise<void> => {
  return _keycloak
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      pkceMethod: "S256",
    })
    .then(onAuthenticated)
    .catch(() => {
      console.log('here');
    });
};

/**
 * Execute Keycloak Login
 */
const doLogin = (): void => {
  _keycloak.login();
};

/**
 * Execute Keycloak Logout.
 */
const doLogout = (): void => {
  _keycloak.logout();
};

/**
 * Get the current token
 * @returns string | undefined
 */
const getToken = (): string | undefined => _keycloak.token;

/**
 * Check for an existing session
 * @returns boolean
 */
const isLoggedIn = (): boolean => !!_keycloak.token;

/**
 * Update the token
 * @param {() => void} successCallback
 */
const updateToken = (successCallback: () => void): void => {
  _keycloak.updateToken(5)
    .then(successCallback)
    .catch(doLogin);
};

/**
 * Get the current user's username
 * @returns string | undefined
 */
const getUsername = (): string | undefined => _keycloak.tokenParsed?.preferred_username;

const getName = (): string | undefined => _keycloak.tokenParsed?.name;

/**
 * Check if the user has any of the given roles
 * @param {Array<string>} roles
 * @returns boolean
 */
const hasRole = (roles: string[]): boolean => roles.some((role) => _keycloak.hasRealmRole(role));


const KeycloakService = {
  getName,
  initKeycloak,
  doLogin,
  doLogout,
  getToken,
  isLoggedIn,
  updateToken,
  getUsername,
  hasRole,
};

export default KeycloakService;
