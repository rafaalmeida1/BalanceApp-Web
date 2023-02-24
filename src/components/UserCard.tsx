import { formatPrice } from "../utils/formatPrice";
import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import { Pencil } from "phosphor-react";
import classNames from "classnames";
import * as Dialog from "@radix-ui/react-dialog";
import { UserDetailsModal } from "./UserDetailsModal";

export function UserCard() {
  const { user, priceIsVisible } = useContext(AccountContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onSetModalOpen(isModalOpen: boolean) {
    setIsModalOpen(isModalOpen);
  }
  340;

  return (
    <div className="overflow-auto xs:overflow-hidden relative xl:fixed xl:w-1/3 w-full h-1/3 rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg shadow-violet-900 mb-4 pt-4 flex flex-col gap-1 sm:gap-4 items-start justify-between">
      <Dialog.Root open={isModalOpen}>
        <Dialog.Trigger asChild>
          <button
            onClick={() => onSetModalOpen(true)}
            className="bg-transparent p-3 group rounded-lg hover:bg-gray-700 cursor-pointer transition-all absolute top-[2px] right-[2px] sm:top-[15px] sm:right-[15px]"
          >
            <span className="group-hover:text-violet-500">
              <Pencil size={18} />
            </span>
          </button>
        </Dialog.Trigger>

        <UserDetailsModal onSetModalOpen={onSetModalOpen} />
      </Dialog.Root>

      <div className="flex flex-row gap-1 justify-start items-start px-4 sm:px-10">
        <div className="text-gray-100 bg-transparent border py-4 px-6 border-violet-900 hover:bg-violet-900 rounded-[9999px] flex cursor-pointer overflow-hidden">
          <span className="text-5xl font-bold">
            {user.username?.split(" ")[0].substring(0, 1)!}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="leading-tight text-2xl sm:text-3xl">
            {user.username?.split(" ")[0]!}{" "}
            {user.username?.split(" ").length > 0 &&
              user.username?.split(" ")[1]!}
          </h2>

          <strong>
            <span className="font-bold text-xs text-violet-500">
              Email / Chave Pix:{" "}
            </span>{" "}
            {user.email}
          </strong>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="px-5 pb-1 sm:pb-5">
          <div
            className={classNames("text-xl sm:text-3xl font-medium", {
              "w-1/3 h-9 bg-gradient-to-b from-gray-900 to-gray-700 rounded-lg":
                !priceIsVisible,
            })}
          >
            {priceIsVisible && `${formatPrice(user.user_account?.balance)}`}
          </div>
        </div>
        <div className="px-5 pt-2 pb-2 border-t border-black w-full text-violet-600 text-sm text-right">
          {user.id}
        </div>
      </div>
    </div>
  );
}
