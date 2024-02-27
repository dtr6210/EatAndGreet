import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

export default function MainFeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <h1>Main Feed</h1>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          title={post.recipe}
          imageUrl={post.picture}
          onLike={() => console.log("Like post:", post._id)}
        />
      ))}
    </div>
  );
}
