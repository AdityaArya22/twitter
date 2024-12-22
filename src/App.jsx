import { useEffect, useState } from 'react'
import { login, logout } from "./store/authSlice"
import authService from "./appwrite/auth"
import './App.css'
import { useDispatch } from 'react-redux'
import { Editpost, Login, Navbar, PostCard, Signup } from './Components/index'
import { Outlet } from 'react-router-dom'
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    authService.getCurrentuser()
    .then((user)=>{
      if(user){
        dispatch(login(user))
      }else{
        dispatch(logout(user))
      }
    })
    .finally(setCount(false))
  },[])
  const [count, setCount] = useState(true)

  return (
    <div className='bg-slate-800 min-h-screen pb-10'>
      {/* {  count ? <p>Welcome</p>:<p>Pls Login</p>} */}
      <div className="lg:flex">
        <Navbar />
        <Outlet />

      </div>
    </div>
  )
}

export default App
