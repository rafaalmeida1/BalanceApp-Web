import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export function Home() {
  const { setLoginOpen } = useContext(LoginContext);

  const userLoggedIn = JSON.parse(
    localStorage.getItem("@benini-login-auth:1.0.0")!
  );

  return (
    <section className="text-gray-100 bg-gray-950 h-screen ">
      <header className="flex items-center justify-between px-5 pb-3 pt-2 sm:pb-0 sm:pt-0 h-24 sm:h-20 shadow-md shadow-black bg-gray-900">
        <strong className="text-2xl text-violet-500 hover:text-gray-100 cursor-pointer transition-all">
          Balance App
        </strong>

        <div className="flex items-center justify-center gap-1">
          {userLoggedIn?.userLoggedIn.id! ? (
            <>
              <Link
                to={`/user/${userLoggedIn?.userLoggedIn.id!}`}
                onClick={() => setLoginOpen(true)}
                className="px-5 py-3 bg-violet-600 rounded-lg text-gray-100 font-bold border border-violet-900 hover:bg-violet-500 transition-all"
              >
                Entrar
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setLoginOpen(true)}
                className="px-5 py-3 bg-transparent rounded-lg text-gray-100 font-bold border border-violet-900 hover:bg-violet-900 transition-all"
              >
                Sign in
              </Link>
              <Link
                to="/login"
                onClick={() => setLoginOpen(false)}
                className="px-5 py-3 bg-violet-600 rounded-lg text-gray-100 font-bold border border-violet-900 hover:bg-violet-500 transition-all"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
    </section>
  );
}
