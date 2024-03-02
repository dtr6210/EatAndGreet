import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

// This card is to be displayed on the profile page

function ProfileRecipeCard({
  id,
  title,
  imageUrl,
  ingredients = [], // default to empty array if ingredients are undefined
  directions,
  onDelete,
  onUpdate,
}) {
  // State for editing mode, edited values, and expanded view
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedIngredients, setEditedIngredients] = useState(
    Array.isArray(ingredients) ? ingredients.join(", ") : ""
  );
  // Convert ingredients array to string for editing
  const [editedDirections, setEditedDirections] = useState(directions);
  const [expanded, setExpanded] = useState(false); // State to manage the toggle for Read More/Read Less

  // Function to handle the deletion of a recipe
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      console.log(`Deleting recipe with id: ${id}`);
      onDelete(id);
    }
  };

  // Function to enable editing mode
  const handleEdit = () => {
    console.log(`Editing recipe with id: ${id}`);
    setIsEditing(true);
  };

  // Function to cancel editing
  const handleCancel = () => {
    console.log("Canceling edits");
    setIsEditing(false);
    setEditedTitle(title);
    setEditedIngredients(ingredients.join(", "));
    setEditedDirections(directions);
  };

  // Function to save edits
  const handleSave = () => {
    console.log(`Saving edits for recipe id: ${id}`);
    onUpdate(id, {
      editedTitle,
      editedIngredients: editedIngredients.split(", "), // Convert string back to array
      editedDirections,
    });
    setIsEditing(false);
  };

  // Function to toggle the expanded state for Read More/Read Less
  const handleExpandClick = () => {
    console.log(`Toggling expanded view for recipe id: ${id}`);
    setExpanded(!expanded);
  };

  // Function to truncate text if it exceeds a certain limit
  const truncateText = (text, limit) => {
    if (!text) return ''; // Return an empty string if text is undefined or null
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={isEditing ? "Edit Recipe" : title} />
      <CardMedia component="img" height="194" image={imageUrl} alt={title} />
      <CardContent>
        {isEditing ? (
          <>
            {/* Fields to edit title, ingredients, and directions */}
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Ingredients"
              value={editedIngredients}
              onChange={(e) => setEditedIngredients(e.target.value)}
              multiline
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Directions"
              value={editedDirections}
              onChange={(e) => setEditedDirections(e.target.value)}
              multiline
              rows={4}
            />
          </>
        ) : (
          <>
            {/* Display ingredients and directions, with option to expand/collapse */}
            <Typography paragraph variant="subtitle1" fontWeight="bold">
              Ingredients:
            </Typography>
            <Typography variant="body2" color="text.secondary" align="left">
              {!expanded
                ? truncateText(ingredients.join(", "), 100)
                : ingredients.join(", ")}
            </Typography>
            <Typography
              paragraph
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mt: 2 }}
            >
              Directions:
            </Typography>
            <Typography variant="body2" color="text.secondary" align="left">
              {!expanded ? truncateText(directions, 100) : directions}
            </Typography>
            <Button onClick={handleExpandClick} sx={{ mt: 1 }}>
              {expanded ? "Read Less" : "Read More"}
            </Button>
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {isEditing ? (
          <>
            {/* Save and Cancel buttons for editing mode */}
            <Button startIcon={<SaveIcon />} onClick={handleSave}>
              Save
            </Button>
            <Button startIcon={<CancelIcon />} onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            {/* Edit and Delete buttons */}
            <IconButton aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default ProfileRecipeCard;
