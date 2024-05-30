import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./Appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./componenets/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="h-full flex flex-wrap">
      <div className="w-full block">
        <Header />
        <main>
          <div className=" xl:text-3xl text-xl font-bold text-center mt-5">Blogs</div>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
