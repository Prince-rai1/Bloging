import React from 'react'
import { useEffect, useState } from 'react'
import AppwriteServices from '../Appwrite/Services'
import PostCard from '../component/PostCard'
import { useSelector } from 'react-redux' 

function Home() {
  const [posts, setPosts] = useState([])
  const isloggedin = useSelector((state)=>state.auth.status)

  useEffect(()=>{
    AppwriteServices.get_allposts().then((res)=>{
      if(res){
        setPosts(res.documents)
      }
    })
  },[])

  if(posts.length === 0 && isloggedin===false) {
    return (
        <div className="w-full py-8 mt-4 text-center h-60">
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
        </div>
    )
  }

  return(
    <>
    <div className='w-full py-8 h-90 mb-20'>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
    </div>
      <div> </div>
      </>
  )
}

export default Home 
