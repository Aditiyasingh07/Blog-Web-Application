import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export default function Footer() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <section className=" fixed bottom-10 left-10 w-52 py-2 px-5 rounded-3xl bg-slate-600">
      <div className=" flex items-center justify-between">
        <div className=" bg-slate-50 rounded-full">
          <img src="src\assets\icon.png" alt="logo" width="50px" />
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
