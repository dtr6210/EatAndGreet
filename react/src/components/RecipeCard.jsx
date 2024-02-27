import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({
  id,
  title,
  imageURL,
  altText = "placeholder",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/meal/${id}`); // Navigate to the meal detail page
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        maxWidth: 275,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="275"
          alt={altText}
          image={imageURL}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click on me to see the recipe details!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
