import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth";
import { logout } from "../../store/authSlice";
import Logo from "../logo"

export default function Footer() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <section className=" fixed bottom-10 right-10 w-52 py-2 px-5 rounded-3xl bg-slate-600">
      <div className=" flex items-center justify-between">
        <div className=" bg-slate-50 rounded-full">
          <Logo/>
        </div>
        <div>
          <button
            className="text-xl hover:text-[#5d89ba] duration-500 font-bold"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
