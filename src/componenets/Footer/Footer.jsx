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
    <section className=" fixed xl:bottom-10 bottom-3 xl:text-xl text-xs xl:right-10 right-3 xl:w-52 w-[180px] xl:py-2 py-1 px-5 rounded-3xl bg-slate-600">
      <div className=" flex items-center justify-between">
        <Logo/>
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
