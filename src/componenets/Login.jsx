import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
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
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex">
      <div
        className={`mx-auto bg-gray-800 my-10 hover:rounded-xl duration-600 rounded-3xl p-10`}
      >
        <div className="mb-2 flex justify-center">
          <span className=" bg-white rounded-full">
            <img src="src\assets\icon.png" alt="logo" width="50px" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-[#ECF0F1]">
          Login in to your account
        </h2>
        <p className="mt-2 text-center text-base text-[#ECF0F1]">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <div className=" text-xl flex flex-col gap-y-4 text-center">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className="flex text-[1rem] outline-none text-center m-auto h-10 w-[90%] rounded-2xl"
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
              className="flex text-[1rem] text-center outline-none m-auto h-10 w-[90%] rounded-2xl"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            </div>
            <Button type="submit" className="w-full h-12 rounded-2xl text-xl font-bold">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
