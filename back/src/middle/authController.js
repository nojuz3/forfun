const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database/database.js");
const JWT_SECRET = process.env.JWT_SECRET || JSW;

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userRow = db
      .prepare(
        "SELECT id, username, password, role FROM users WHERE username = ?"
      )
      .get(username);

    if (!userRow) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, userRow.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: userRow.id, role: userRow.role }, JWT_SECRET, {
      expiresIn: "3h",
    });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const me = async (req, res) => {
  try {
    const user = db
      .prepare("SELECT id, username, role FROM users WHERE id = ?")
      .get(req.user.id);

    if (!user) {
      return;
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const users = async (req, res) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    res.json({success: true, users});
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
};

module.exports = { login, me, users };