import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function PostCard({ id, title, imageUrl, onLike }) {
  console.log("Rendering PostCard with id:", id); // checking id
  const navigate = useNavigate();

  const handleViewPost = () => {
    console.log(`Trying to navigate to post with id: ${id}`);
    navigate(`/posts/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, height: "auto" }}>
      <CardHeader title={title} />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={`Image of ${title}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Comments will go here.......{" "}
          {/* need to see about creating input for comments */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLike}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="view post" onClick={handleViewPost}>
          View
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostCard;
