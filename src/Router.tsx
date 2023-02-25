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
            <AccountContextProvider>
              <DefaultLayout />
            </AccountContextProvider>
        }
      >
        <Route
          path=":id"
          element={
              <Dashboard />
          }
        />
      </Route>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}