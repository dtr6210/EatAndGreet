import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Paper } from "@mui/material";

function DetailedPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  console.log("DetailedPostPage - postId:", postId); // Check if id is correct

  useEffect(() => {
    console.log(`API call to fetch post with id: ${postId}`);
    axios
      .get(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => {
        console.log("API Response:", response.data); // Checking response
        setPost(response.data.data);
      })
      .catch((error) => console.error("Error fetching post details:", error));
  }, [postId]);

  if (!post) return <Box sx={{ mt: 8 }}>Loading...</Box>;

  return (
    <Box
      sx={{
        p: 2,
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 3,
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1, mb: 2 }}>
          {post.recipe}
        </Typography>
        <img
          src={post.picture}
          alt={post.recipe}
          style={{ maxWidth: "100%", borderRadius: "4px" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          Ingredients:
        </Typography>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          {post.ingredients.map((ingredient, index) => (
            <Typography
              key={index}
              sx={{ ml: 2 }}
            >{`- ${ingredient}`}</Typography>
          ))}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          Instructions:
        </Typography>
        <Typography sx={{ textAlign: "left", width: "100%" }}>
          {post.directions}
        </Typography>
      </Paper>
    </Box>
  );
}

export default DetailedPostPage;
