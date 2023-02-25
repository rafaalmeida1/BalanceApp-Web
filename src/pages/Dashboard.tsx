import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { UserCard } from "../components/UserCard";
import { AccountContext } from "../context/AccountContext";
import { api } from "../lib/api";

export function Dashboard() {
  const { user, searchUserLoading, setLoadingUser, setUserById } = useContext(AccountContext)

  const navigate = useNavigate();

  const userLoggedIn = JSON.parse(
    localStorage.getItem("@benini-login-auth:1.0.0")!
  );

  // async function getOnlyUser() {
  //   await getUser();
  // }

  const { id } = useParams();

  async function getUser() {
    try {
      const response = await api.get(`/user/${id}`, {
        headers: {
          "Accept-Control-Allow-Origin": "*",
        }
      });

      if (userLoggedIn.userLoggedIn.id === response.data.id) {
        setUserById(response.data);
        setLoadingUser(false);
      } else {
        navigate(`/login`);
        localStorage.removeItem("@benini-login-auth:1.0.0");
        setLoadingUser(false);
      }
    } catch (err) {
      console.log(err);
      setLoadingUser(false);
    } finally {
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    if (userLoggedIn?.userLoggedIn?.id) {
      getUser();
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
