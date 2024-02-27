import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";

function DetailedPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  console.log("DetailedPostPage - postId:", postId); //check if id is correct

  useEffect(() => {
    console.log(`API call to fetch post with id: ${postId}`);
    axios
      .get(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => {
        console.log("API Response:", response.data); //checking response
        setPost(response.data.data);
      })
      .catch((error) => console.error("Error fetching post details:", error));
  }, [postId]);

  if (!post) return <Box>Loading...</Box>;

  return (
    <Box sx={{ p: 2, mt: 8 }}>
      <Typography variant="h4">{post.recipe}</Typography>
      <img src={post.picture} alt={post.recipe} style={{ maxWidth: "100%" }} />
      <Typography variant="h6">Ingredients:</Typography>
      <Box>
        {post.ingredients.map((ingredient, index) => (
          <Typography key={index}>{ingredient}</Typography> 
        ))}
      </Box>
      <Typography variant="h6">Instructions:</Typography>
      <Typography paragraph>{post.directions}</Typography>
    </Box>
  );
}

export default DetailedPostPage;
