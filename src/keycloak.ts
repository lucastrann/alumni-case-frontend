import Keycloak, {
  KeycloakError,
  KeycloakInitOptions,
  KeycloakTokenParsed,
} from 'keycloak-js';
// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak("/keycloak.json");
/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 * @returns { Promise<void> } Promise
 */
export const initialize = (): Promise<boolean> => {
  const config: KeycloakInitOptions = {
    checkLoginIframe: false,
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri:
      window.location.origin + '/silent-check-sso.html',
  };
  return keycloak.init(config);
};

/** @type { Keycloak } keycloak */
interface KeycloakInstance extends Keycloak {
  tokenParsed?: KeycloakTokenParsedExtended;
}

interface KeycloakTokenParsedExtended extends KeycloakTokenParsed {
  // Extend with Additional Properties
  'allowed-origins': string[];
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  given_name?: string;
  jti?: string;
  name?: string;
  preferred_username?: string;
  roles?: string[];
  scope?: string;
  sid?: string;
  typ?: string;
}
export default keycloak;