import React, { useState } from "react";
import authService from "../Appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from './index';
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
            <div className="mx-auto w-full max-w-lg  bg-[#343434] rounded-lg hover:rounded-3xl duration-700 p-10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
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
                    <div className='space-y-5 mt-5 font-bold text-center'>
                        <Input
                            label="Full Name: "
                            className=" w-full rounded-2xl p-2 text-center outline-none"
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            className=" w-full rounded-2xl p-2 text-center outline-none"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            className=" w-full outline-none rounded-2xl p-2 text-center"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" className=" w-1/2 rounded-2xl p-2 text-center">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
