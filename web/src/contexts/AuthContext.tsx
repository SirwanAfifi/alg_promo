import { createContext, useState } from "react";
import { State, Auth } from "../types/_index";

const AuthContext = createContext<State>({} as State);
const { Provider } = AuthContext;

const AuthProvider: React.FC = ({ children }) => {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");

  const [authState, setAuthState] = useState<Auth>({
    token: token,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, userInfo }: Auth) => {
    localStorage.setItem("token", token!);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setAuthState({
      token,
      userInfo,
    });
  };

  const isAuthenticated = () => {
    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo: Auth) => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
