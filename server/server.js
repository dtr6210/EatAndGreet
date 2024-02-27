const express = require("express");
const cors = require("cors");
const app = express();


require("dotenv").config();
// parse requests of content-type -application/json

let dbConnect = require("./dbConnect");
let userRoutes = require('./routes/userRoutes');
let postRoutes = require('./routes/postRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to myMongoDB application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
