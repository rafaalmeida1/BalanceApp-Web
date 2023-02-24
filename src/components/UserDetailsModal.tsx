import * as Dialog from "@radix-ui/react-dialog";
import { Eye, EyeClosed, X } from "phosphor-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Spinner } from "phosphor-react";
import * as z from "zod";
import { api } from "../lib/api";
import { useParams } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const SignUpFormSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
  newPassword: z.string().optional(),
});

type SignUpFormInput = z.infer<typeof SignUpFormSchema>;

interface UserDetailsModalProps {
  onSetModalOpen: (isModalOpen: boolean) => void;
}

export function UserDetailsModal({ onSetModalOpen }: UserDetailsModalProps) {
  const { user } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);


  const [errorPasswordMatch, setErrorPasswordMatch] = useState(false);
  const [errorPasswordIsTheSameAsTheNew, setErrorPasswordIsTheSameAsTheNew] =
    useState(false);

  const { register, handleSubmit, reset } = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const { id } = useParams();
  const navigate = useNavigate();

  async function handleUpdateUser(data: SignUpFormInput) {
    try {
      setIsLoading(true);
      await api.put(`/update-user/${id}`, data);
      onSetModalOpen(false);
      reset();
      navigate(`/user/${id}`);
    } catch (err: any) {
      if (err.response.data.message === "Password is incorrect") {
        setErrorPasswordMatch(true);
        setTimeout(() => {
          setErrorPasswordMatch(false);
        }, 5000);
      } else if (err.response.data.message === "Passwords are the same") {
        setErrorPasswordIsTheSameAsTheNew(true);
        setTimeout(() => {
          setErrorPasswordIsTheSameAsTheNew(false);
        }, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        onClick={() => onSetModalOpen(false)}
        className="fixed w-screen h-screen inset-0 bg-black opacity-75"
      />

      <Dialog.Content className="text-gray-100 w-[20rem] sm:w-[32rem] rounded-lg py-10 px-12 border border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900 shadow-xl shadow-black fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Dialog.Title className="text-xl mb-5">User Details</Dialog.Title>

        <Dialog.Close
          onClick={() => onSetModalOpen(false)}
          className="absolute bg-transparent border-[0px] top-6 right-6 leading-[0px] cursor-pointer text-violet-600"
        >
          <X size={24} />
        </Dialog.Close>

        <form className="space-y-6" onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2">
            <div>
              <label
                htmlFor="username"
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                required
                className="bg-white appearance-none rounded-lg relative block w-full px-2 py-1 border border-black placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-violet-900 focus:border-violet-900 focus:z-10 sm:text-sm"
                placeholder="Rafael Almeida"
                {...register("username")}
                defaultValue={user?.username}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="bg-white appearance-none rounded-lg relative block w-full px-2 py-1 border border-black placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-violet-900 focus:border-violet-900 focus:z-10 sm:text-sm"
                placeholder="email@gmail.com"
                {...register("email")}
                defaultValue={user?.email}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
              >
                Current Password
              </label>
              <Input
                id="password"
                type={currentPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                className="bg-white appearance-none rounded-lg relative block w-full px-2 py-1 border border-black placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-violet-900 focus:border-violet-900 focus:z-10 sm:text-sm"
                placeholder="********"
                {...register("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                    >
                      {currentPasswordVisible ? <Eye size={16} /> : <EyeClosed size={16} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errorPasswordMatch && (
                <p className="text-xs text-red-500">Password is incorrect</p>
              )}
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                type={newPasswordVisible ? "text" : "password"}
                autoComplete="current-newPassword"
                className="bg-white appearance-none rounded-lg relative block w-full px-2 py-1 border border-black placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-violet-900 focus:border-violet-900 focus:z-10 sm:text-sm"
                placeholder="********"
                {...register("newPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                      {newPasswordVisible ? <Eye size={16} /> : <EyeClosed size={16} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errorPasswordIsTheSameAsTheNew && (
                <p className="text-xs text-red-500">Try another password</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-900 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <Spinner className="animate-spin" size={20} />
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Lock
                      className="h-5 w-5 text-violet-900 group-hover:text-violet-400 duration-150"
                      aria-hidden="true"
                    />
                  </span>
                  Update User
                </>
              )}
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
