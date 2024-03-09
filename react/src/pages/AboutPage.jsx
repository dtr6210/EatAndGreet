import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import Footer from "../components/Footer";
import Logo2 from "/Logo2.png";

export default function AboutPage() {
  return (
    <Box>
      <Container maxWidth="md" sx={{ mt: 7 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 1,
            }}
          >
            <img
              src={Logo2}
              alt="Logo 2 Image"
              style={{ maxWidth: "35%", height: "auto" }}
            />
          </Box>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography paragraph align="left">
            EatAndGreet.com is a vibrant social media platform designed
            specifically for food enthusiasts and culinary experts alike. Our
            community-driven site offers a unique space where users can explore
            a diverse array of recipes shared by fellow members, ranging from
            home cooks to professional chefs. Upon logging in, you're invited
            into a world of culinary discovery where you can browse through a
            plethora of recipes, giving a "heart" to those that catch your eye
            and resonate with your taste buds.
          </Typography>
          <Typography paragraph align="left">
            What sets EatAndGreet.com apart is its user-centric approach,
            allowing you to not only explore but also contribute to our
            ever-growing repository of recipes. By uploading your own creations,
            you begin to craft a personalized cookbook that evolves with your
            tastes and cooking adventures over time. This feature caters to the
            joy of sharing your culinary journey and, in turn, drawing
            inspiration from the community.
          </Typography>
          <Typography paragraph align="left">
            Professional chefs find a welcoming platform in EatAndGreet.com,
            where they can showcase their signature dishes and innovative
            recipes. It serves as an effective channel to enhance their online
            presence, directing food lovers to their personal websites and
            expanding their reach to a broader audience.
          </Typography>
          <Typography paragraph align="left">
            EatAndGreet.com is more than just a recipe-sharing site; it's a
            place where culinary passions are ignited, connections are made, and
            the universal love for food is celebrated. Join us to share,
            discover, and revel in the diverse flavors and stories that each
            recipe brings to the table. Welcome to your ultimate social
            cookbook, where every login leads to a new culinary adventure.
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
