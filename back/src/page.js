const express = require("express");
const db = require("./database/database.js");
const { authMiddleware } = require("./middle/auth.js");
const router = express.Router();
const {
  login,
  me,
  users,
} = require("./middle/authController.js");

router.post("/login", login);
router.get("/me", authMiddleware, me);
router.get("/users", authMiddleware, users);

router.get("/get",(req,res) =>{
  res.json("sss")
})


module.exports = router;