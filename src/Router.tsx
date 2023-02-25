import { ReactElement, ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AccountContextProvider } from "./context/AccountContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export function Router() {
  return (
    <Routes>
      <Route
        path="/user"
        element={
          <ProtectedRouter>
            <AccountContextProvider>
              <DefaultLayout />
            </AccountContextProvider>
          </ProtectedRouter>
        }
      >
        <Route
          path=":id"
          element={
            <ProtectedRouter>
              <Dashboard />
            </ProtectedRouter>
          }
        />
      </Route>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

interface ProtectedRouterProps {
  children: ReactNode;
}

export function ProtectedRouter({
  children,
}: ProtectedRouterProps): ReactElement | any {
  const navigate = useNavigate();

  if (
    localStorage.getItem("@benini-login-auth:1.0.0") ||
    sessionStorage.getItem("@benini-login-auth:1.0.0")
  ) {
    return children;
  } else {
    return navigate("/login");
  }
}
