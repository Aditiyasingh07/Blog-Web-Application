import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../Appwrite/auth";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { loginlogo } from "./index";

function Login() {

  const loginanime = useRef(null)

  useEffect(()=>{
    gsap.to(loginanime.current, {
      scale: 1.27,
      duration: 5,
      repeat: -1,
      yoyo: true
    })
  })

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
      <div className=" absolute top-[200px] left-[500px] z-0">
        <img
        ref={loginanime}
        className="h-[200px] w-[130px] rotate-12"
        src={loginlogo} alt="" />
        </div>
      <div
        className={`mx-auto login-class my-10 hover:rounded-xl duration-500 rounded-3xl p-10 z-50`}
      >
        <div className=" mb-2 flex justify-center">
            <Logo/>
        </div>
        <h2 className="text-center xl:text-2xl text-xl font-bold text-[#ECF0F1]">
          Login in to your account
        </h2>
        <p className="mt-2 text-center xl:text-xl text-sm text-[#ECF0F1]">
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
            <div className=" xl:text-xl text-sm  flex flex-col gap-y-4 text-center">
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                className="flex xl:text-[1rem] text-sm outline-none text-center m-auto h-10 w-[90%] rounded-2xl"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                className="flex text-[1rem] text-sm text-center outline-none m-auto h-10 w-[90%] rounded-2xl"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-xl font-bold"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
