import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginComponents/LoginForm";
import { RegisterForm } from "../components/LoginComponents/Register";
import { LoginContext } from "../context/LoginContext";

export interface RegisterUserDataProps {
  email: string;
  password: string;
}

export function Login() {
  const [userData, setUserData] = useState({} as RegisterUserDataProps);
  const { setLoginOpen, isOpen } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = JSON.parse(
      localStorage.getItem("@benini-login-auth:1.0.0")!
    );

    userLoggedIn?.userLoggedIn?.id
      ? navigate(`/user/${userLoggedIn.userLoggedIn.id}`)
      : navigate("/login");
  }, []);

  function setUser(user: RegisterUserDataProps) {
    setUserData(user);
  }

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 transition-all duration-200">
      <div className="min-h-screen flex items-center justify-center transition-all duration-200">
        <div className="pt-20 min-h-screen flex flex-col bg-transparent text-white">
          <nav
            className="shrink-0 flex border-b border-gray-500"
            aria-label="Manage your account"
          >
            <button
              className={classNames(
                "text-black bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 outline-none cursor-default",
                {
                  "text-violet11 shadow-[inset_0_-1px_0_0,0_2px_0_0] shadow-violet-500 focus:relative":
                    isOpen,
                }
              )}
              onClick={() => setLoginOpen(true)}
            >
              Sign In
            </button>
            <button
              className={classNames(
                "text-black bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 outline-none cursor-default",
                {
                  "text-violet11 shadow-[inset_0_-1px_0_0,0_2px_0_0] shadow-violet-500 focus:relative":
                    !isOpen,
                }
              )}
              onClick={() => setLoginOpen(false)}
            >
              Sign Up
            </button>
          </nav>
          <div
            className={classNames("grow min-w-full w-full sm:w-[375px] p-5 rounded-b-md outline-none", {
              hidden: !isOpen,
            })}
          >
            <LoginForm userData={userData} setUserData={setUser} />
          </div>
          <div
            className={classNames("grow min-w-full w-full sm:w-[375px] p-5 rounded-b-md outline-none", {
              hidden: isOpen,
            })}
          >
            <RegisterForm
              setUserData={setUser}
              onLoginOpen={setLoginOpen}
              userData={userData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
