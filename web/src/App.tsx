import React, { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotificationsSystem, {
  atalhoTheme,
  setUpNotifications,
  useNotifications,
} from "reapop";
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
  const { notifications, dismissNotification } = useNotifications();

  useEffect(() => {
    setUpNotifications({
      defaultProps: {
        position: "top-right",
        dismissible: true,
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dismissNotification(id)}
        theme={atalhoTheme}
      />
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
