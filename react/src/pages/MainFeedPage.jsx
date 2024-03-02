import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AdvertisingCard from "../components/AdvertisingCard";

export default function MainFeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then((response) => {
        console.log("Posts fetch:", response.data.data); // checking the fetched post
        setPosts(response.data.data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  console.log(posts) //log the posts array to check for _id values

  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={12} lg={9}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {posts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              title={post.recipe}
              imageUrl={post.picture}
              onLike={() => console.log("Like post:", post._id)}
            />
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={3}>
        {/* Advertisement section */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <AdvertisingCard />
        </Box>
      </Grid>
    </Grid>
  );
}
