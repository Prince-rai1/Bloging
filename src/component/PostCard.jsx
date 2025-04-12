import React, { useEffect, useState } from 'react'
import AppwriteServices from "../Appwrite/Services"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredimage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 hover:shadow-2xl transition duration-300 ease-in-out hover:bg-gray-300'>
            <div className='w-full justify-center mb-4'>
                <img src={AppwriteServices.getFileview(featuredimage)} alt={title}
                className='rounded-xl' width={300} height={300}/>

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard