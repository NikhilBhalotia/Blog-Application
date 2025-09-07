import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-10 bg-gray-100 min-h-[80vh]">
      <Container>
        <h2 className="pb-3 mb-8 text-3xl font-bold text-gray-800 border-b-2 border-gray-300">
          All Posts
        </h2>

        {posts.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-lg text-gray-600">No posts available yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
