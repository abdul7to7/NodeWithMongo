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

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");

const User = require("./models/User");
const Product = require("./models/Product");

const authenticate = require("./middlewares/authenticate");
const verifyAdmin = require("./middlewares/verifyAdmin");

app.use("/auth", authRoutes);
app.use("/cart", authenticate, cartRoutes);
app.use("/admin", authenticate, verifyAdmin, adminRoutes);

(async () => {
  try {
    await mongoConnect();

    // Example: Use `getDB` to query the database
    const db = await getDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
