const mongodb = require("mongodb");
const { getDB } = require("../utils/db");

class User {
  constructor(username, mail, password) {
    this.username = username;
    this.mail = mail;
    this.password = password;
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
