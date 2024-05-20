import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from "./Appwrite/auth"
import { login, logout } from './store/authSlice'
import {Header, Footer} from "./componenets/index"
import { Outlet } from 'react-router-dom'

function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])


 return !loading ? (
  <div className=' flex flex-wrap w-full h-full bg-gray-900'>
    <div className=' w-full flex items-center flex-col '>
      <Header/>
      <main>
      <div className='text-3xl flex justify-center font-bold my-10'>Blogs
      </div>  
      <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
 ) : null
}

export default App
