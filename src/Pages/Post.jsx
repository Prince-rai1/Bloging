import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppwriteServices from "../Appwrite/Services";
import Button from "../component/Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    // const [image, setImage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.user_ID === userData.$id : false;

 
    useEffect(() => {
       const loadpost = async () =>{
         if(id){
            const post = await AppwriteServices.get_post(id);
            if(post){
              setPost(post);
            }
            else{
                navigate("/");
            }
         }
         else {
            navigate("/");
         }
       }

       loadpost();

    }, [id, navigate]);



    const deletePost = () => {
        AppwriteServices.delete_file(post.featuredimage).then((status) => {
            if (status) {
                AppwriteServices.delete_post(post.$id);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
           
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={AppwriteServices.getFileview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl"
                        width={500}
                        height={500}
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}
                               className="mr-5" >
                                <Button bgColor="bg-green-500" classname="cursor-pointer hover:bg-green-600" text="Edit"/>
                            </Link>
                             <Button bgColor="bg-red-500" onClick={deletePost} text="Delete" classname="cursor-pointer hover:bg-red-600"/>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-center">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-center mb-6">
                    {parse(post.content)}
                    </div>
         
        </div>
    ) : null;
}