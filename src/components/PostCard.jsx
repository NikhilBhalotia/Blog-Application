import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-sm h-[350px] bg-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        {/* Image section with fixed size */}
        <div className="w-full h-[200px] flex items-center justify-center bg-white">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="object-contain max-w-full max-h-full"
          />
        </div>

        {/* Title section */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 truncate">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
