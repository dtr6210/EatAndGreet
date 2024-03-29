import React from "react";
import { useUserContext } from "../context/UserContext";
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

// The PostCard is used to display recipes on the main feed page

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  "& .MuiCardHeader-content": {
    overflow: "hidden", // keep heading from spilling over
    whiteSpace: "nowrap",
  },
  "& .MuiCardHeader-title": {
    fontSize: "1.2rem",
  },
}));

function PostCard({ id, title, imageUrl, onLike }) {
  console.log("Rendering PostCard with id:", id); // checking id
  const navigate = useNavigate();
  const { currentUser } = useUserContext(); //use context to access current user

  const handleViewPost = () => {
    console.log(`Trying to navigate to post with id: ${id}`);
    navigate(`/posts/${id}`);
  };

  const handleLike = () => {
    // call API to like post
    fetch(`http://localhost:8080/api/posts/${id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser._id }), // use current users id
    })
      .then((response) => response.json())
      .then((data) => {
        onLike(data);
      })
      .catch((error) => console.error("Error liking the post:", error));
  };

  return (
    <Card sx={{ maxWidth: 345, height: "auto" }}>
      <StyledCardHeader title={title} />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={`Image of ${title}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="view post" onClick={handleViewPost}>
          <Typography
            variant="body2"
            sx={{ fontSize: "1.2rem", alignItems: "center" }}
          >
            View the full recipe
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostCard;
