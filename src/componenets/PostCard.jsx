import React from "react";
import appwriteService from "../Appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full rounded-xl hover:rounded-3xl p-4">
        <div className="w-full flex xl:justify-center justify-center mb-4">
          <img
            src={`/images/${appwriteService.getFilePreview(featuredImage)}`}
            alt={title}
            className="rounded-xl h-60"
          />
        </div>
        <h2 className="text-xl text-center font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
