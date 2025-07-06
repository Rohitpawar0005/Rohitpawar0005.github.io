import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = "secret";
const app = express();

app.use(express.json());

const users = [
  {
    email: "john@gmail.com",
    pass: "$2b$10$7RjOZ0iYdKiwJWB9tubqwuLgQ2PuCqZdpb9xTprGIBAlHE1QJ4UQO", // hashed "1234"
    role: "user",
  },
  {
    email: "cathy@gmail.com",
    pass: "$2b$10$7RjOZ0iYdKiwJWB9tubqwuLgQ2PuCqZdpb9xTprGIBAlHE1QJ4UQO", // hashed "1234"
    role: "admin",
  },
];

// Authentication Middleware
const authenticate = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error("No token provided");
    token = token.split(" ")[1];
    const user = jwt.verify(token, SECRET);
    req.role = user.role;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

// Authorization Middleware
const authorize = (role) => {
  return (req, res, next) => {
    if (req.role === role) {
      next();
    } else {
      return res.json({ message: "Not authorized" });
    }
  };
};

// Register Endpoint
app.post("/register", async (req, res) => {
  const { name, email, pass, role } = req.body;
  const hashedPass = await bcrypt.hash(pass, 10);
  const user = {
    name,
    email,
    pass: hashedPass,
    role,
  };
  users.push(user);
  res.json({ message: "User registered", user });
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const found = users.find((user) => user.email === email);
  if (found) {
    const match = await bcrypt.compare(pass, found.pass);
    if (match) {
      const token = jwt.sign(found, SECRET, { expiresIn: "1h" });
      res.status(200).json({ user: found, token });
    } else {
      res.status(403).json({ message: "Invalid password" });
    }
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

// Protected Route
app.get("/users", authenticate, authorize("admin"), (req, res) => {
  res.json(users);
});

// Start server
app.listen(8080, () => {
  console.log("Server started");
});
