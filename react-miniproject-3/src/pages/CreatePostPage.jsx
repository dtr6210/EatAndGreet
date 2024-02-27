import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useUserContext } from "../context/UserContext";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      author: currentUser._id,
      recipe: title,
      ingredients: ingredients.split(","),
      directions,
      picture: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:8080/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitResult("Post created successfully");
        navigate("/main");
      } else {
        setSubmitResult(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitResult("An error occurred. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
        Share Your Recipe
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Recipe Title"
          name="title"
          autoComplete="title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="ingredients"
          label="Ingredients (comma separated)"
          type="text"
          id="ingredients"
          autoComplete="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          multiline
          rows={4}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="directions"
          label="Directions"
          type="text"
          id="directions"
          autoComplete="directions"
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
          multiline
          rows={6}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="imageUrl"
          label="Image URL"
          type="text"
          id="imageUrl"
          autoComplete="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Share Recipe
        </Button>
      </Box>
    </Container>
  );
}
