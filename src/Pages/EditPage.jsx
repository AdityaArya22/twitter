import React, { useEffect, useState } from 'react'
import { Editpost } from '../Components'
import appwriteService from '../appwrite/service'
import { useNavigate, useParams } from 'react-router-dom'
const EditPage = () => {
  const [post, setPosts] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post)
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])
  console.log(post);
  
  return post ? (
    <div className='py-8'>

      <Editpost post={post} />

    </div>
  ) : null
}

export default EditPage