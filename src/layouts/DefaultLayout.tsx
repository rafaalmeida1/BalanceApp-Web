import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen min-w-screen">
      <Header />
      <main className="w-full my-0 mx-auto py-0 p-2 sm:px-4 md:px-0">
        <Outlet />
      </main>
    </div>
  );
}
