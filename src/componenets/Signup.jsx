import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const createdUser = await authService.createAccount(data);
      if (createdUser) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login({ userData: currentUser }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-1/3 bg-gray-800 rounded-3xl hover:rounded-xl duration-600 p-10 ">
        <div className="flex justify-center">
          <span className="bg-white rounded-full">
            <img src="src\assets\icon.png" alt="logo" width="50px" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:text-slate-400"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5 mt-5 text-xl font-bold text-center">
            <Input
              label="Full Name: "
              className=" w-[86%] rounded-2xl p-2 text-[1rem] text-center outline-none"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              className=" w-[86%] rounded-2xl p-2 text-[1rem] text-center outline-none"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              className=" w-[86%] outline-none rounded-2xl p-2 text-[1rem] text-center"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-xl font-bold"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
