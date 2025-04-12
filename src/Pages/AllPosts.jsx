import React, {useEffect, useState}from 'react'
import AppwriteServices from '../Appwrite/Services'
import PostCard from '../component/PostCard'

function AllPosts() {
  const [posts, setPosts] = useState([])
  
  const getposts = async () => {
    const data = await AppwriteServices.get_allposts()

    if(data){
      setPosts(data.documents)
    }
  }
 
  useEffect(() => {
    getposts()
  }, [])



  return (
    <div className='w-full py-8 h-90 mb-50'>
        <div className='flex items-center justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
                {
                posts.length>0?posts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                )) : (
                    <p className=' text-3xl font-bold text-white'>No Posts Available</p>
                )
                }
            </div>
            </div>
        </div>
  )
}

export default AllPosts