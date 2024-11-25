require("dotenv").config();
const express = require("express");
const { mongoConnect, getDB } = require("./utils/db");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Initialize MongoDB Connection
(async () => {
  try {
    await mongoConnect();

    // Example: Use `getDB` to query the database
    const db = getDB();
    const collectionNames = await db.listCollections().toArray();
    console.log("Collections in the database:", collectionNames);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
