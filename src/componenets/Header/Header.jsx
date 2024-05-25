import React from "react";
import { Link } from "react-router-dom";
import {Container, Logo, LogoutBtn} from "../index"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header(){

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]
    
      return (
        <header className='py-3 shadow m-auto w-1/2 flex rounded-2xl bg-[#191970] mt-4 text-xl font-bold'>
          <Container>
            <nav className='flex'>
              <div className='mr-4 flex items-center text-[#F8F8FF]'>
                <Link to='/'
                className=" bg-slate-50 rounded-full"
                >
                    <Logo/>
                  </Link>
              </div>
              <ul className='flex ml-auto'>
                {navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                    <button
                    onClick={() => navigate(item.slug)}
                    className='flex px-6 py-2 duration-700 hover:bg-blue-300 hover:text-black rounded-full'
                    >{item.name}</button>
                  </li>
                ) : null
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </nav>
            </Container>
        </header>
      )
}

export default Header