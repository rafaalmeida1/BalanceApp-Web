import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { UserCard } from "../components/UserCard";
import { AccountContext } from "../context/AccountContext";

export function Dashboard() {
  const { getUser, user, searchUserLoading } = useContext(AccountContext)

  const navigate = useNavigate();

  const userLoggedIn = JSON.parse(
    localStorage.getItem("@benini-login-auth:1.0.0")!
  );

  async function getOnlyUser() {
    await getUser();
  }

  useEffect(() => {
    if (userLoggedIn?.userLoggedIn?.id) {
      getOnlyUser();
    } else {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="px-2 pt-28 pb-5 md:px-5 xl:px-20 sm:pt-32 sm:pb-10 text-gray-100 h-full">
      {searchUserLoading ? (
        <Loading />
      ) : (
        <section className="flex flex-col xl:flex-row items-start justify-between w-full h-full">
          <UserCard />

          <div className="xl:w-[60%] w-full h-[5000px] border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-lg shadow-violet-900 ml-auto"></div>
        </section>
      )}
    </div>
  );
}
