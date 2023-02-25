import { createContext, ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import { UserProps } from "../types/userTypes";
import { useNavigate } from "react-router-dom";

interface AccountContextValueProps {
  getUser: () => Promise<void>;
  setPriceVisible: (visible: boolean) => void;
  priceIsVisible: boolean;
  searchUserLoading: boolean;
  user: UserProps;
}

export const AccountContext = createContext({} as AccountContextValueProps);

export function AccountContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as UserProps);
  const [priceIsVisible, setPriceIsVisible] = useState(true);
  const [searchUserLoading, setSearchUserLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const userLoggedIn = JSON.parse(
    localStorage.getItem("@benini-login-auth:1.0.0")!
  );

  function setPriceVisible(visible: boolean) {
    setPriceIsVisible(visible);
  }

  async function getUser() {
    try {
      const response = await api.get(`/user/${id}`);

      if (userLoggedIn.userLoggedIn.id === response.data.id) {
        setUser(response.data);
        setSearchUserLoading(false);
      } else {
        navigate(`/login`);
        localStorage.removeItem("@benini-login-auth:1.0.0");
        setSearchUserLoading(false);
      }
    } catch (err) {
      console.log(err);
      setSearchUserLoading(false);
    } finally {
      setSearchUserLoading(false);
    }
  }

  return (
    <AccountContext.Provider
      value={{ getUser, user, priceIsVisible, setPriceVisible, searchUserLoading }}
    >
      {children}
    </AccountContext.Provider>
  );
}
