import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { MainPage } from "./pages/Main";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/signin" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};
