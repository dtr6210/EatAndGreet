import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

function PostCard({ id, title, imageUrl, onLike }) {
    console.log("Rendering PostCard with id:", id); // checking id
  const navigate = useNavigate();

  const handleViewPost = () => {
    console.log(`Trying to navigate to post with id: ${id}`)
    navigate(`/posts/${id}`); 
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mb: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={`Image of ${title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {/* Placeholder for comments */}
        <Typography variant="body2" color="text.secondary">
          Comments will go here.......
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button aria-label="add to favorites" onClick={onLike}>
          <FavoriteIcon />
        </Button>
        <Button size="small" onClick={handleViewPost}>View the recipe</Button> 
      </CardActions>
    </Card>
  );
}

export default PostCard;
