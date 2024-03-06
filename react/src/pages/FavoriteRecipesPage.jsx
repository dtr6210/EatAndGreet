import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import Footer from "../components/Footer";

export default function FavoriteRecipesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { currentUser } = useUserContext(); // access current user

  useEffect(() => {
    if (currentUser && currentUser._id) {
      axios
        .get(`http://localhost:8080/api/users/${currentUser._id}/likedPosts`)
        .then((response) => {
          console.log("Favorite Recipes fetch:", response.data.data);
          setFavoriteRecipes(response.data.data);
        })
        .catch((error) =>
          console.error("Error fetching favorite recipes:", error)
        );
    }
  }, [currentUser]);

  return (
    <Box>
      <Grid container spacing={2} mt={5}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
            {currentUser?.username}'s Favorite Recipes
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            {favoriteRecipes.map((recipe) => (
              <PostCard
                key={recipe._id}
                id={recipe._id}
                title={recipe.recipe}
                imageUrl={recipe.picture}
                onLike={() => console.log("Like recipe:", recipe._id)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
