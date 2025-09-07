import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents.slice(0, 1));
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-center bg-gray-100">
        <Container>
          <h1 className="mb-3 text-3xl font-bold text-gray-800">
            Welcome to MyBlog 👋
          </h1>
          <p className="text-lg text-gray-600">
            Please{" "}
            <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
              Login
            </span>{" "}
            to read the latest posts.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10 bg-gray-100">
      <Container>
        <h2 className="pb-2 mb-6 text-2xl font-semibold text-gray-800 border-b-2 border-gray-300">
          Featured Post
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
