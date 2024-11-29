import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import authService from "../Appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {

  const Signanime = useRef(null)

  useEffect(()=>{
    gsap.to(Signanime.current, {
      rotate: 360,
      duration: 15,
      repeat: -1,
      yoyo: true
    })
  })

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
      <div className=" absolute top-[250px] left-[350px] z-0">
        <img
        ref={Signanime}
        className="h-[250px] w-[250px] rotate-12"
        src="/src/assets/four.svg" alt="" />
        </div>
      <div className="mx-auto xl:w-1/3 w-1/1 login-class rounded-3xl hover:rounded-xl duration-500 p-10 ">
        <div className="flex justify-center">
          <Logo/>
        </div>
        <h2 className="text-center xl:text-2xl text-xl font-bold leading-tight">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center xl:text-xl text-sm">
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
          <div className="space-y-5 mt-5 xl:text-xl text-sm px-5 flex flex-col text-center">
            <Input
              label="Full Name: "
              className=" w-full rounded-2xl p-2 xl:text-[1rem] text-sm text-center outline-none"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              className=" w-full rounded-2xl flex p-2 text-[1rem] text-center outline-none"
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
              className=" w-full outline-none rounded-2xl p-2 text-[1rem] text-center"
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
