require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./src/database/database.js");
const jsonwebtoken = require("jsonwebtoken");
// env variables
const port = process.env.PORT || 8080;
const jwt_secret = process.env.JWT_SECRET || "test123";

const app = express();

// Cors
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

function getRandom(sentences) {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

app.get("/api", (req, res) => {
  
  const sentences = [
    "Do not resist.",
    "The new age is now.",
    "Stand with the Orion Corporation",
  ];
  const randomSentence = getRandom(sentences);
  res.json({ success: true, data:randomSentence });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
