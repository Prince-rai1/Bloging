import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import Input from './Input'
import Button from './Button'       
import RTE from './RTE'
import Select from './Select'
import AppwriteServices from '../Appwrite/Services'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function PostForm({post}) {
   const {register, handleSubmit, control, watch, setValue, getValues} = useForm({
    defaultValues: {
        title: post?.title || '',
        content: post?.content || '',
        status: post?.status || 'Active',
        slug: post?.slug || '',
        
    }
   })

//    console.log("Post Form : ",post)

   const navigate = useNavigate()
   const user = useSelector((state) => state.auth.userData)
   
   const onSubmit = async (data) =>  {
      if(post){
        const file = data.image[0]?await AppwriteServices.upload_file(data.image[0]):null

        if(file){
            AppwriteServices.delete_file(post?.featuredImage)
        }
        const dbPost = await AppwriteServices.update_post(
           { 
            title: data.title,
            content: data.content,
            status: data.status,
            slug: data.slug,
            featuredimage: file?file.$id:undefined,
            Id: post.$id
           }
        )
        if(dbPost){
            navigate(`/post/${dbPost.$id}`)
        }
      }
      else{
        const file = data.image[0]? await AppwriteServices.upload_file(data.image[0]):null
        
        const imageid = file.$id

        if(file){
          const dbpost =  await AppwriteServices.create_post({
            title: data.title,
            content: data.content,
            status: data.status,
            slug: data.slug,
            featuredimage: imageid,
            user_ID: user.$id
          })
          if(dbpost){
            navigate(`/post/${dbpost.$id}`)
          }
        }
      }
   }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";
}, []);

   React.useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-white p-1.5 outline-none border-none text-black rounded-lg hover:bg-gray-100"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4  bg-white p-1.5 outline-none border-none text-black rounded-lg hover:bg-gray-100"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4  bg-white p-1.5 border-none text-black rounded-lg hover:bg-gray-100"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={AppwriteServices.getFileview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                            width={300}
                            height={300}
                        />
                    </div>
                )}
                <Select
                    option={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} 
                className="w-full bg-blue-500 
                p-1.5 border-none 
                text-white rounded-lg
                hover:bg-blue-600"
                 text = {post ?"Update" :"Submit"}/>
                    
            </div>
        </form>
  )
}

export default PostForm