import React from 'react'
import appwriteService from '../../appwrite/service'
import { useSelector } from 'react-redux'
import { Input, Button, Select } from "../index"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Editpost = ({ post }) => {
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const { register, handleSubmit, watch, setValue, getValues } = useForm({
       defaultValues:{
        content: post?.content || "",
       }
    })

    const submit = async (data) => {
        const fileInput = data.image?.[0]
        if (post) {
            let file = fileInput ? await appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                await appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : null
                
            })
            console.log(data)

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            

            if (fileInput) {
                const file = await appwriteService.uploadFile(data.image[0])
                console.log("Uploading file");
                
                if (file) {
                    const fileId = file.$id
                    console.log(userData);
                    data.featuredImage = fileId
                    const dbPost = await appwriteService.createPost({ ...data, userID: userData.$id })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                        console.log(dbPost.$id);
                        
                    }
                }
            }
            console.log(fileInput);
            
            if(!fileInput){
                const dbPost = await appwriteService.createPost({...data,userID:userData.$id})
                if (dbPost) {
                    navigate(`/posts/${dbPost.$id}`)
                    console.log(dbPost.$id);
                    
                }
            }
            console.log(data);
            
        }
    }

    return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-10 rounded-lg shadow-3xl w-[96%] lg:w-1/2 '>
            <h1 className='text-white text-center text-3xl my-10'>{post ? "Update" : "Add"} your post</h1>
            <form onSubmit={handleSubmit(submit)}>
                <div className="space-y-5">
                    <Input
                        label="content"
                        labelClass="text-white font-bold text-2xl drop-shadow-lg"
                        placeholder="Write Something"
                        {...register("content", {
                            required: true,
                            maxLength: 255,
                        })}
                    />
                    <Input
                        type="file"
                        name="image"
                        labelClass="text-white font-bold text-2xl drop-shadow-lg"
                        label="Add Photo"
                        className="text-slate-800 cursor-pointer p-4 border-2 border-dashed border-blue-500 bg-slate-200 rounded-lg hover:bg-gray-700 active:bg-blue-600 transition-all"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image")}
                    />
                    <Select
                                label="Post type"
                                labelClass="text-white font-bold text-2xl drop-shadow-lg"
                                options={["public", "private"]}
                                {...register("status", { required: true })}
                              />
                    <Button className={`${post ? "bg-green-600" : null} `}>{post ? "Update" : "Submit"}</Button>

                </div>
            </form>
        </div>
    )
}

export default Editpost