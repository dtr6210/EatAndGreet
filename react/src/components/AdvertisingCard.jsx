import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import advert from "/advert.png";
import advert1 from "/advert1.jpg";
import advert2 from "/advert2.png";
import advert3 from "/advert3.jpg";
import advert4 from "/advert4.jpg";
import advert5 from "/advert5.jpg";
import advert6 from "/advert6.jpg";
import advert7 from "/advert7.png";
import advert8 from "/advert8.jpg";
import advert9 from "/advert9.jpeg";
import advert10 from "/advert10.jpg";
import advert11 from "/advert11.jpg";
import advert12 from "/advert12.jpeg";

const adverts = [
  advert1,
  advert2,
  advert3,
  advert4,
  advert5,
  advert6,
  advert7,
  advert8,
  advert9,
  advert10,
  advert11,
  advert12,
]; //array of advertising images for random display

export default function AdvertisingCard() {
  // select random advertisement each time component is rendered
  const randomAdvert = adverts[Math.floor(Math.random() * adverts.length)];

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image={randomAdvert}
          alt="your ad here"
        />
        {/* <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Advertise with us
          </Typography>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
}
