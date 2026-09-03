const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const db = new Database(process.env.DB_FILE || "database.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user' CHECK(role IN ('admin', 'user','super'))
  )
`
).run();


(async () => {
  const userExists = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get("admin");

  if (!userExists) {
    const adminpass = await bcrypt.hash("admin123", 10);
    db.prepare(
      "INSERT INTO users (username,email ,password, role) VALUES (?, ?, ?, ?)"
    ).run("admin", "admin@mail.com", adminpass, "admin");
  }
})();

(async () => {
  const userExists = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get("test");

  if (!userExists) {
    const testpass = await bcrypt.hash("test123", 10);
    db.prepare(
      "INSERT INTO users (username,email ,password) VALUES (?, ?, ?)"
    ).run("test", "test@mail.com", testpass);
  }
})();

// db.prepare("INSERT INTO users (username,email,password) VALUES(?,?,?)").run("test","test@test.com","test123")
// db.prepare(`DROP TABLE IF EXISTS festivals`).run();
// db.prepare("DELETE FROM users WHERE id = 2").run()

module.exports = db;