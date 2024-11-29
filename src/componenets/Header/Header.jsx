import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {Container, Logo, LogoutBtn} from "../index"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "/src/App.css"
import { headerlogo } from "../index";

function Header(){

  const animepng = useRef(null)

  useEffect(() => {
    gsap.to(animepng.current, {
      rotateZ: 360,
      duration: 12,
      repeat: -1,
      yoyo: true,
    });
  }, []);

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
        <div>
          <div className=" absolute top-[50px] right-[350px] z-0">
        <img
        ref={animepng}
        className="h-[120px] w-[120px] rotate-12"
        src={headerlogo} alt="headerlogo" />
        </div>
          <header className=' header-class xl:py-3 py-4 m-auto flex rounded-2xl xl:mt-4 text-xl mb-24 font-bold xl:w-1/2'>
          <Container>
            <nav className='xl:flex justify-around'>
              <div className='mr-4 xl:text-xl text-[1rem] flex xl:justify-around justify-center text-[#F8F8FF]'>
                <Link to='/'>
                    <Logo/>
                  </Link>
              </div>
              <ul className='flex xl:text-xl md:mt-0 mt-3 text-sm xl:justify-center justify-evenly'>
                {navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                    <button
                    onClick={() => navigate(item.slug)}
                    className='flex md:px-6 px-3 md:py-2 py-1 duration-700 hover:bg-blue-300 hover:text-black rounded-full'
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
        </div>
      )
}

export default Header