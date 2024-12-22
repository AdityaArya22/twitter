import React, { useEffect, useState } from 'react'
import authService from '../appwrite/auth'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Profile = ({ post }) => {
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()
  const logoutHandler = async () => {
    await authService.logoutUser().then(() => {
      dispatch(logout())
      navigate("/login")
    })
  }

  const [avatar, setAvatar] = useState(null)
  useEffect(() => {
    const avatarURL = authService.createAvatars(userData.name)
    //  console.log("avatar: "+avatar);
    setAvatar(avatarURL)

  }, [])
  return (
    <div className=' m-10 w-full text-white rounded-lg p-3  lg:relative lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2'>
      <div className="flex gap-10 justify-center items-center my-10">
        <img src={avatar} alt="" className='w-20 rounded-full' />
        <div className='text-3xl my-4 text-center font-bold text-white'>@{userData.name}</div>
      </div>
      <Button className='' onClick={logoutHandler}>Logout</Button>
      
    </div>
  )
}

export default Profile