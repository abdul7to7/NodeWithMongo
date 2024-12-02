require("dotenv").config();
const express = require("express");
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
const productRoutes = require("./routes/productRoutes");

const User = require("./models/User");
const Product = require("./models/Product");

const authenticate = require("./middlewares/authenticate");
const verifyAdmin = require("./middlewares/verifyAdmin");
const connectToDb = require("./utils/db");

app.use("/auth", authRoutes);
app.use("/cart", authenticate, cartRoutes);
app.use("/product", authenticate, productRoutes);
app.use("/admin", authenticate, verifyAdmin, adminRoutes);

(async () => {
  const PORT = process.env.PORT || 3000;
  const MONGO_URI = process.env.URI; // Ensure this is set in your .env file

  try {
    await connectToDb(MONGO_URI); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the application:", error.message);
    process.exit(1);
  }
})();
