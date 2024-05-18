import React from "react";
import appwriteService from "../Appwrite/config"
import { Link } from "react-router-dom";

function PostCard($id, title, featuredImage){
    return (
        <Link to={`/post/${$id}`}>
            <div className=" w-full p-4">
                <div className=" w-full justify-center mb-5">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className=" rounded-lg" />
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard