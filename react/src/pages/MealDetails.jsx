import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Box,
  CircularProgress,
  Paper,
  // List,
  // ListItem,
} from "@mui/material";

//component for displaying meal details for the inspirational recipes

export default function MealDetailPage() {
  const { mealId } = useParams();
  const [mealDetails, setMealDetails] = useState(null);

  //effect hook to fetch meal details based on mealId
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        // Process and set the meal details
        setMealDetails(response.data.meals[0]);
      })
      .catch((error) => console.error("Error fetching meal details:", error));
  }, [mealId]);

  // Function to extract ingredients from meal details
  function extractIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 30; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  }

  // Extract ingredients from mealDetails
  const ingredientsList = mealDetails ? extractIngredients(mealDetails) : [];

  if (!mealDetails)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

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
          {mealDetails.strMeal}
        </Typography>
        <Box
          component="img"
          src={mealDetails.strMealThumb}
          alt={mealDetails.strMeal}
          sx={{ maxWidth: "100%", borderRadius: "4px" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          Ingredients:
        </Typography>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          {ingredientsList.map((ingredient, index) => (
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
          {mealDetails.strInstructions}
        </Typography>
      </Paper>
    </Box>
  );
}
