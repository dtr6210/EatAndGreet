import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
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

  const AdvertisementSpace = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    height: "100vh", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    
  }));

  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={12} lg={9}>
        {" "}
        
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
        {" "}
        {/* Advertisement section */}
        <AdvertisementSpace>
          <AdvertisingCard />
        </AdvertisementSpace>
      </Grid>
    </Grid>
  );
}
