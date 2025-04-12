import React, {useEffect, useState} from 'react'
import PostForm from '../component/PostForm'
import AppwriteServices from '../Appwrite/Services'
import {useParams, useNavigate} from 'react-router-dom'

function EditPost() {
   const [post, setPost] = useState(null)
   const {id} = useParams()
   const navigate = useNavigate()
   
   useEffect(() => {
      if(id){
         AppwriteServices.get_post(id).then((res)=>{
            if(res){
                setPost(res)
            }else{
                navigate('/404')
            }
        })
      } else {
         navigate('/')
      }
   }, [id, navigate])


  return post ? (
    <div className='py-8'>
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full  bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className="text-center text-2xl font-bold leading-tight">Edit Post</h2>
                <PostForm post={post} />
            </div>
        </div>
    </div>
  ) : null
}

export default EditPost