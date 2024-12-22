import React, { useEffect, useState } from 'react'
import { PostCard } from '../Components'
import appwriteService from '../appwrite/service'
const Home = () => {
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    appwriteService.getAllPosts().then((post)=>{
      if(post){
        console.log(post);
        
        setPosts(post.documents)
        
      }
    })
    console.log(posts);
  },[])
  if (posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center">

                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl text-white font-bold hover:text-gray-500">
                            No posts 
                        </h1>
                    </div>
                </div>
           
        </div>
    )
}
  return (
    <div>
       {posts.map((item)=>{
          return <div className="flex" key={item.$id}>
            <PostCard {...item}/>
          </div>
       })}
    </div>
  )
}

export default Home