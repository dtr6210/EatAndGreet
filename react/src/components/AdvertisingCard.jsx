import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import advert from "/advert.png";

export default function AdvertisingCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image={advert}
          alt="your ad here"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Advertise with us
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
