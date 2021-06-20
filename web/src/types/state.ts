import { Auth } from "./auth";

export interface State {
  authState: Auth;
  setAuthState: (authInfo: Auth) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
}
