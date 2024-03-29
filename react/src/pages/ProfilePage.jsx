import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Container,
  Avatar,
  Link,
  Box,
} from "@mui/material";
import defaultprofile from "/defaultprofile.png";
import AdvertisingCard from "../components/AdvertisingCard";
import ProfileRecipeCard from "../components/ProfileRecipeCard";
import { useUserContext } from "../context/UserContext";
import Footer from "../components/Footer";

const ProfilePage = () => {
  //state for storing users posts
  const [posts, setPosts] = useState([]);
  //accessing current user details
  const { currentUser } = useUserContext();

  // fetch users posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (currentUser?._id) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/posts/byUser/${currentUser._id}`
          );
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
  }, [currentUser?._id]);

  //function to handle deleting a post
  const handleDeletePost = async (postId) => {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setPosts(posts.filter((post) => post._id !== postId));
    }
  };

  // function to handle updating post
  const handleUpdatePost = async (
    postId,
    { editedTitle, editedDirections, editedIngredients }
  ) => {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: editedTitle,
        ingredients: editedIngredients,
        directions: editedDirections,
      }),
    });
    if (response.ok) {
      const updatedPost = await response.json();
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, ...updatedPost.data } : post
        )
      );
    }
  };

  console.log(posts); // log the posts array to check for _id values

  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          {/* Left side - Profile */}
          <Grid item xs={12} sm={3} lg={3}>
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
                Profile
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                Username: {currentUser.username}
              </Typography>
              <Avatar
                sx={{ width: 80, height: 80, marginBottom: 2 }}
                src={currentUser.profilePicture || defaultprofile}
                alt="Profile Pic"
              />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                About Me
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "left",
                  marginBottom: 2,
                  alignSelf: "flex-start",
                }}
              >
                {currentUser.aboutMe || "No About Me info available."}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Personal Website
              </Typography>
              {currentUser.personalWebsite ? (
                <Link
                  href={currentUser.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    alignSelf: "flex-start",
                    marginBottom: 2,
                    wordBreak: "break-all",
                  }}
                >
                  {currentUser.personalWebsite}
                </Link>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "left",
                    marginBottom: 2,
                    alignSelf: "flex-start",
                  }}
                >
                  Add your personal websites here.
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Middle - for user posts */}
          <Grid item xs={12} sm={6} lg={6}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 2,
              }}
            >
              {posts.length > 0 &&
                posts.map((post) => (
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
            </Box>
          </Grid>

          {/* Right side - Advertising */}
          <Grid item xs={12} sm={3} lg={3}>
            <Box
              elevation={3}
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Advertisements:
              </Typography>
              <AdvertisingCard />
              <AdvertisingCard />
              <AdvertisingCard />
              <AdvertisingCard />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfilePage;
