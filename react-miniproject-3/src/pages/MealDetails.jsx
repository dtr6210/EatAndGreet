import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";

//component for displaying meal details
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
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 2, mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        {mealDetails.strMeal}
      </Typography>
      <Box
        component="img"
        sx={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
        }}
        src={mealDetails.strMealThumb}
        alt={mealDetails.strMeal}
      />
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Instructions
      </Typography>
      <Typography paragraph>{mealDetails.strInstructions}</Typography>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Ingredients
      </Typography>
      <Box display="flex" justifyContent="center"> 
        <List sx={{ width: 'fit-content' }}> 
          {ingredientsList.map((ingredient, index) => (
            <ListItem key={index}>{ingredient}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
