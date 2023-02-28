import { Eye, EyeClosed, SignOut, Spinner, User } from "phosphor-react";
import classNames from "classnames";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { formatPrice } from "../utils/formatPrice";

export function Header() {
  const { user, setPriceVisible, priceIsVisible, searchUserLoading } =
    useContext(AccountContext);
  const navigate = useNavigate();

  return (
    <header className="z-10 fixed w-screen min-w-screen px-5 pb-3 pt-2 sm:pb-0 sm:pt-0 h-24 sm:h-20 bg-gray-900 flex flex-col sm:flex-row items-center justify-between shadow-md shadow-black">
      <Link to="/">
        <strong className="text-2xl text-violet-500 hover:text-gray-100 cursor-pointer transition-all  ">
          Balance App
        </strong>
      </Link>

      {/* <NavigationMenu.Root className="relative z-[1] flex flex-1 justify-center p-5">
        <NavigationMenu.List className="center shadow-black m-0 flex list-none rounded-[6px] bg-gray-700 text-gray-100 p-1 shadow-[0_2px_10px]">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Account{" "}
              <CaretDown
                className="relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto bg-gray-700">
              <div className="m-0 p-[10px] sm:w-[300px] flex flex-col items-between justify-center gap-2">
                <div
                  className="text-gray-100 focus:shadow-violet-700 from-violet-900 to-indigo-700 flex 
                    h-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[20px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                >
                  <ul className="list-none overflow-x-auto flex flex-col gap-2">
                    <li>
                      <strong>Username: </strong>
                      {user.username}
                    </li>
                    <li>
                      <strong>Email: </strong>
                      {user.email}
                    </li>
                    <li>
                      <strong>Money: </strong>
                      {user.user_account.balance}
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  className="text-gray-100 focus:shadow-violet-700 from-violet-900 to-indigo-700 
                    h-full w-full focus:shadow-[0_0_0_2px] bg-gradient-to-b p-3 rounded-[6px] font-bold hover:bg-gradient-to-t"
                >
                  Alterar dados
                </button>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <div className="absolute top-full left-0 flex w-full justify-center">
          <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-gray-700 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </div>
      </NavigationMenu.Root> */}

      <div className="flex items-center justify-start gap-5 text-gray-100 group transition-all bg-transparent">
        <div className="flex-1 gap-4 flex items-center justify-between flex-wrap ">
          {searchUserLoading ? (
            <Spinner className="animate-spin text-violet-600" size={40} />
          ) : (
            <>
              <div className="flex gap-2">
                <div
                  className={classNames("text-base font-medium", {
                    "w-[81px] bg-gradient-to-b from-gray-900 to-gray-700 rounded-lg":
                      !priceIsVisible,
                  })}
                >
                  {priceIsVisible &&
                    `${formatPrice(user.user_account?.balance)}`}
                </div>

                {priceIsVisible ? (
                  <button
                    className="text-gray-100"
                    onClick={() => setPriceVisible(false)}
                  >
                    <Eye size={24} />
                  </button>
                ) : (
                  <button
                    className="text-gray-100"
                    onClick={() => setPriceVisible(true)}
                  >
                    <EyeClosed size={24} />
                  </button>
                )}
              </div>

              <div className=" text-gray-100 bg-transparent border border-violet-900 hover:bg-violet-900 px-4 py-2 rounded-[9999px] flex items-center justify-center cursor-pointer">
                <span className="text-xl font-bold">
                  {user.username?.split(" ")[0].substring(0, 1)!}
                </span>
              </div>
            </>
          )}

          <button
            onClick={() => {
              localStorage.removeItem("@benini-login-auth:1.0.0");
              navigate("/login");
            }}
          >
            <SignOut size={24} className="text-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
