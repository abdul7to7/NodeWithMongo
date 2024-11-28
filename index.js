require("dotenv").config();
const express = require("express");
const { mongoConnect, getDB } = require("./utils/db");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoutes");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Initialize MongoDB Connection
(async () => {
  try {
    await mongoConnect();

    // Example: Use `getDB` to query the database
    const db = getDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
