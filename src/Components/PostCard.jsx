import React from 'react'
import appwriteService from "../appwrite/service"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostCard = ({$id , featuredImage , name , content}) => {
  const userData = useSelector(state => state.auth.userData)
  return (
    <Link to={`/post/${$id}`} className=' m-10 lg:w-1/2 text-white rounded-lg p-3 bg-slate-700 lg:relative lg:left-1/2 lg:-translate-x-1/2 ' >
        <h1 className='font-bold text-2xl bg-slate-800 p-7 rounded-lg' >
            @{userData.name}{console.log(name , $id , content)
            }
        </h1>
        <p className='p-5 text-lg'>{content}</p>

        {featuredImage && <img src={appwriteService.filePreview(featuredImage)} alt="Error loading Image" className='object-cover rounded-lg'/>}
        
    </Link>
  )
}

export default PostCard