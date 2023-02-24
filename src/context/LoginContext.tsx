import { createContext, ReactNode, useState } from "react";

interface LoginContextValueProps {
  isLoading: boolean;
  isOpen: boolean;
  setLoginOpen: (isOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const LoginContext = createContext(
  {} as LoginContextValueProps
);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function setLoginOpen(isOpen: boolean){
    setIsOpen(isOpen);
  }

  function setLoading(isLoading: boolean) {
    setIsLoading(isLoading);
  }

  return (
    <LoginContext.Provider
      value={{ setLoading, setLoginOpen, isLoading, isOpen }}
    >
      {children}
    </LoginContext.Provider>
  );
}
