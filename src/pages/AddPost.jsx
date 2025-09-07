import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-12 bg-gray-100 min-h-[80vh]">
      <Container>
        <div className="max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
          <h2 className="pb-3 mb-6 text-3xl font-bold text-gray-800 border-b">
            ✍️ Create a New Post
          </h2>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
