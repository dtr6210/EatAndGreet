import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function MainFeedPage() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // effect hook to fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  //effect hook to fetch meals when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      fetchData(selectedCategory);
    }
  }, [selectedCategory]);

  //fucntion to fetchcategories from the API
  const fetchCategories = () => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        const fetchedCategories = response.data.categories || [];
        setCategories(fetchedCategories);
        if (fetchedCategories.length > 0) {
          setSelectedCategory(fetchedCategories[0].strCategory);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  //function to fetch meals based on the selected category
  const fetchData = (category) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => {
        const fetchedMeals = response.data.meals || [];
        setMeals(fetchedMeals);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  //function to handle category selection changes
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", p: 2, mt: 8 }}>
      {" "}
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Choose a food category
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          p: 2,
          gap: 2,
        }}
      >
        {meals.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            id={meal.idMeal}
            title={meal.strMeal}
            imageURL={meal.strMealThumb}
          />
        ))}
      </Box>
    </Box>
  );
}

export default MainFeedPage;
