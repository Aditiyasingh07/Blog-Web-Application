import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button } from "./index";
import Logo from "./logo"
import Input from "./input"
import { useDispatch } from "react-redux";
import authService from "../Appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userdata = await authService.getCurrentUser();
        if (userdata) dispatch(authLogin(userdata));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full my-5">
      <div
        className={`mx-auto flex justify-center flex-col items-center w-full max-w-lg bg-[#343434] rounded-lg hover:rounded-3xl duration-700 p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="w-full font-bold text-2xl">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Login in to your account
        </h2>
        <p className="mt-2 text-center text-base">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:text-slate-400"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-2 flex flex-col text-center items-center font-bold">
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              className=" w-full rounded-2xl outline-none p-2 text-center"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              className=" w-full text-center rounded-2xl outline-none mb-5 p-2"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="flex p-2 rounded-2xl bg-blue-500 justify-center w-1/2">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
