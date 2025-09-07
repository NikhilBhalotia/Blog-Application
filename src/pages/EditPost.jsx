import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-12 bg-gray-100 min-h-[80vh]">
      <Container>
        <div className="max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
          <h2 className="pb-3 mb-6 text-3xl font-bold text-gray-800 border-b">
            ✏️ Edit Post
          </h2>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
