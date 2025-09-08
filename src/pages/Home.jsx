import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      if (!currentUser) return;

      const response = await appwriteService.getPosts(currentUser.$id);
      if (response) {
        // Sort by created date (latest first) and take top 3
        const sorted = response.documents.sort(
          (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
        );
        setPosts(sorted.slice(0, 3));
      }
    };

    fetchUserPosts();
  }, []);

  if (!user) {
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
            to see your recent posts.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10 bg-gray-100">
      <Container>
        <h2 className="pb-2 mb-6 text-2xl font-semibold text-gray-800 border-b-2 border-gray-300">
          Your Recent Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-lg text-gray-600">
            You haven’t created any posts yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
