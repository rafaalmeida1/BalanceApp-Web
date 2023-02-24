import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";
import { Router } from "./Router";

export function App() {
  return (
    <LoginProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </LoginProvider>
  );
}
