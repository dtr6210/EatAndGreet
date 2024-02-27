import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Container, Avatar } from "@mui/material";
import defaultprofile from "/defaultprofile.png";
import AdvertisingCard from "../components/AdvertisingCard";
import ProfileRecipeCard from "../components/ProfileRecipeCard";
import { useUserContext } from "../context/UserContext";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useUserContext(); // to accesss current user data

  useEffect(() => {
    const fetchPosts = async () => {
      if (currentUser?._id) {
        // Check for current user id
        try {
          const response = await fetch(
            `http://localhost:8080/api/posts/byUser/${currentUser._id}`
          ); //look for current user by id
          const data = await response.json();
          if (response.ok) {
            setPosts(data.data);
          } else {
            throw new Error("Failed to fetch posts");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchPosts();
  }, [currentUser?._id]); // Rerun when currentUser changes

  const handleDeletePost = async (postId) => {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setPosts(posts.filter((post) => post._id !== postId));
    }
  };

  const handleUpdatePost = async (postId, { editedTitle, editedDirections }) => {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            recipe: editedTitle, 
            directions: editedDirections,
        }),
    });
    if (response.ok) {
      const updatedPost = await response.json();
      setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
    }
  };
  return (
    <Container maxWidth="xl" sx={{ mt: 5, padding: 2 }}>
      <Grid container spacing={2}>
        {/* Left side - Profile */}
        <Grid item xs={12} sm={2} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              Profile:
            </Typography>
            <Avatar
              sx={{ width: 80, height: 90, marginBottom: 2 }}
              src={defaultprofile}
              alt="Profile Pic"
            />
            {/* About Me Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              About Me
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              {/* Placeholder text */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla
              facilisi etiam dignissim diam quis enim. Ut consequat semper
              viverra nam libero justo laoreet. Euismod elementum nisi quis
              eleifend quam adipiscing vitae proin. Sed elementum tempus egestas
              sed sed risus pretium quam vulputate. Scelerisque viverra mauris
              in aliquam sem fringilla ut morbi. A diam maecenas sed enim ut sem
              viverra aliquet eget. Vestibulum morbi blandit cursus risus at
              ultrices mi. Malesuada fames ac turpis egestas. Purus sit amet
              luctus venenatis.
            </Typography>
            {/* Social Media section: add links to fb, insta, personal websites, etc */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Social Media
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Other Social Links go here! Add your FB, Inst, or personal
              webpages for your products!{" "}
            </Typography>
          </Paper>
        </Grid>

        {/* Middle - for user posts */}
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ padding: 2, minHeight: "80vh" }}>
            <Typography variant="h6">My Posts</Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {posts.map((post) => (
                <ProfileRecipeCard
                  key={post._id}
                  id={post._id}
                  title={post.recipe}
                  imageUrl={post.picture}
                  ingredients={post.ingredients}
                  directions={post.directions}
                  onDelete={handleDeletePost}
                  onUpdate={handleUpdatePost}
                />
              ))}
            </div>
          </Paper>
        </Grid>

        {/* Right side - Advertising */}
        <Grid item xs={12} sm={2} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h6">Your Ads Here:</Typography>
            {/* Advertising cards */}
            <AdvertisingCard />
            <AdvertisingCard />
            <AdvertisingCard />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
