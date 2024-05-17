import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from "./Appwrite/auth"
import { login, logout } from './store/authSlice'
import {Header, Footer} from "./componenets/index"

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
  <div className=' flex flex-wrap w-screen h-screen bg-slate-500'>
    <div className=' w-full block flex items-center flex-col '>
      <Header/>
      <main>
      Blogs  {/* <Outlet/> */}
      </main>
      <Footer/>
    </div>
  </div>
 ) : null
}

export default App
