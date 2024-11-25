const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db; // Variable to store the database instance

// Connect to MongoDB
const mongoConnect = async () => {
  if (_db) {
    console.log("Database already initialized.");
    return _db; // Return existing database instance if already connected
  }
  try {
    const client = await MongoClient.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
    _db = client.db(); // Store the database instance
    return _db;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err; // Throw error to handle it in the caller function
  }
};

// Get the existing database instance
const getDB = () => {
  if (!_db) {
    throw new Error("Database not initialized! Call mongoConnect first.");
  }
  return _db;
};

module.exports = { mongoConnect, getDB };
