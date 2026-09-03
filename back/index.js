require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./src/database/database.js");
const jsonwebtoken = require("jsonwebtoken");
// env variables
const port = process.env.PORT || 8080;
const jwt_secret = process.env.JWT_SECRET || "test123";
const app = express();
app.use(express.json());
const pages = require("./src/page.js")

// Cors
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));


app.use("/api/pages", pages);




function getRandom(sentences) {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

app.get("/api", (req, res) => {
  
  const sentences = [
    "Welcome Back",
    "Please Log In",
  ];
  const randomSentence = getRandom(sentences);
  res.json({ success: true, data:randomSentence });
});




app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
