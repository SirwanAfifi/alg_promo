import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { LoginPage } from "./pages/Login";
import { MainPage } from "./pages/Main";

const AuthenticatedRoute: React.FC<{ to: string; exact?: boolean }> = ({
  children,
  ...rest
}) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth && auth.isAuthenticated() ? (
          <>{children}</>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/signin" component={LoginPage} />
          <AuthenticatedRoute exact to="/">
            <MainPage />
          </AuthenticatedRoute>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};
