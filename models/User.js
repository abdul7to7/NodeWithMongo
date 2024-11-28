const mongodb = require("mongodb");
const { getDB } = require("../utils/db");

class User {
  constructor(data) {
    this.username = data.username;
    this.mail = data.mail;
    this.password = data.password;
    this.isAdmin = data.isAdmin ? data.isAdmin : false;
  }

  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  static findUserByID(id) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = User;
