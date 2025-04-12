import React from 'react'
import PostForm from '../component/PostForm'

function AddPost() {
  return (
    <div className='py-8'>
        <div className="flex items-center justify-center">
            <div className={` w-full bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className="text-center text-2xl font-bold leading-tight">Create a new post</h2>
                <PostForm />
            </div>
        </div>
    </div>
  )
}

export default AddPost