import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function ProfileRecipeCard({ id, title, imageUrl, ingredients, directions, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDirections, setEditedDirections] = useState(directions);
  
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        onDelete(id);
      }
    };
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleCancel = () => {
      setIsEditing(false);
      setEditedTitle(title);
      setEditedIngredients(ingredients);
      setEditedDirections(directions);
    };
  
    const handleSave = () => {
      onUpdate(id, { editedTitle, editedDirections });
      setIsEditing(false);
    };
  
    return (
        <Card sx={{ maxWidth: 345, width: '100%', mb: 2 }}>
          {isEditing ? (
            <>
              <CardContent>
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
                  label="Directions"
                  value={editedDirections}
                  onChange={(e) => setEditedDirections(e.target.value)}
                  multiline
                  rows={4}
                />
              </CardContent>
              <Button startIcon={<SaveIcon />} onClick={handleSave} color="primary">
                Save
              </Button>
              <Button startIcon={<CancelIcon />} onClick={handleCancel} color="secondary">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <CardMedia component="img" height="140" image={imageUrl} alt={title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {directions}
                </Typography>
              </CardContent>
              <IconButton aria-label="edit" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Card>
      );
    }
    
    export default ProfileRecipeCard;