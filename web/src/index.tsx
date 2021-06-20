import ReactDOM from "react-dom";
import "./styles.css";
import { App } from "./App";
import { NotificationsProvider } from "reapop";

ReactDOM.render(
  <NotificationsProvider>
    <App />
  </NotificationsProvider>,
  document.getElementById("root")
);
