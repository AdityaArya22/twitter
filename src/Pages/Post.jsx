import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams,Link } from 'react-router-dom'
import appwriteService from '../appwrite/service'
import { Button } from '../Components'
const Post = () => {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)

  const isAuthor = post && userData ? post.userID === userData.$id : false
  console.log(isAuthor);
  console.log(post);
  
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate("/")
      });
    } else {
      navigate("/")
    }
  }, [slug, navigate])
  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
            appwriteService.deleteFile(post.featuredImage);
            navigate("/");
        }
    });
};
  return (
    post ? (
      <div >

        { post.featuredImage && <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
         <img
            src={appwriteService.filePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
        </div>}

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-500 mr-3">
                  Edit
                </Button>
              </Link>
              <Button className="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        <div className="w-full mb-6">
          <h1 className="text-2xl text-white font-bold">{post.content}</h1>
        </div>
      </div>
    ): null
  )
}

export default Post