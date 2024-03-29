import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper"; 
import Typography from "@mui/material/Typography"; 
import AdvertisingCard from "../components/AdvertisingCard";
import Footer from "../components/Footer";


export default function MainFeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then((response) => {
        console.log("Posts fetch:", response.data.data); // Checking the fetched post
        setPosts(response.data.data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  console.log(posts); // Log the posts array to check for _id values

  return (
    <Box>
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
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            // backgroundColor: grey[50], 
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Advertisements:
          </Typography>
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
          <AdvertisingCard />
        </Box>
      </Grid>
    </Grid>
    <Footer />
    </Box>
  );
}
