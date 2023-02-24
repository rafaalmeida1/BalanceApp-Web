import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { LoginContext } from "../../context/LoginContext";
import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, Spinner } from "phosphor-react";
import { RegisterUserDataProps } from "../../pages/Login";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormInput = z.infer<typeof LoginFormSchema>;

interface UserDataProps {
  userData: RegisterUserDataProps;
  setUserData: (userData: RegisterUserDataProps) => void;
}

export function LoginForm({ userData, setUserData }: UserDataProps) {
  const { setLoading, isLoading } = useContext(LoginContext);
  const [isOpen, setIsOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<LoginFormInput>({
    resolver: zodResolver(LoginFormSchema),
  });

  console.log(userData)

  async function handleLoginSubmitForm(data: LoginFormInput) {
    try {
      setLoading(true);
      const res = await api.post("/login", data);

      localStorage.setItem(
        "@benini-login-auth:1.0.0",
        JSON.stringify(res.data)
      );

      if (res.data.userLoggedIn.id !== null) {
        navigate(`/user/${res.data.userLoggedIn.id}`);
      } else {
        localStorage.removeItem("@benini-login-auth:1.0.0");
        navigate("/login");
        reset();
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 5000);
      }
    } catch (err) {
      setLoading(false);
      setIsOpen(true);
      reset();
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <strong className="mb-5 font-normal text-base text-[15px] leading-normal">
        Sign in to your account
      </strong>

      <form
        className="mt-4 space-y-6"
        onSubmit={handleSubmit(handleLoginSubmitForm)}
      >
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-2">
            <label htmlFor="email" className="text-[13px] leading-none mb-2.5 text-violet12 block">
              Email address
            </label>
            <Input
              id="email"
              type="text"
              autoComplete="email"
              required
              className="bg-white appearance-none rounded-lg relative block w-full px-2 py-1 border border-black placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-violet-900 focus:border-violet-900 focus:z-10 sm:text-sm"
              placeholder="email@gmail.com"
              {...register("email")}
              defaultValue={userData.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-[13px] leading-none mb-2.5 text-violet12 block">
              Password
            </label>
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              required
              className="bg-white appearance-none rounded-lg relative block w-full px-2 py-1 border border-black placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-violet-900 focus:border-violet-900 focus:z-10 sm:text-sm"
              placeholder="********"
              {...register("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <Eye size={16} /> : <EyeClosed size={16} />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          {isOpen && (
            <p className="text-xs text-violet-500">
              Ocorreu um error ao se conectar
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-900 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                Sign in
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
