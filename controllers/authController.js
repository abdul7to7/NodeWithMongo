const bcrypt = require("bcrypt");
const User = require("../models/User");
const authGenerate = require("../middlewares/authGenerate");

exports.postLogin = async (req, res, next) => {
  try {
    // Hashing the password for security
    const hashed = await bcrypt.hash(req.body.password, 10);
    if (!hashed) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while hashing",
      });
    }
    console.log(req.body);
    console.log(hashed);

    const user = await User.findByMail(req.body.mail);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      // Exclude sensitive fields
      const { password, ...userDetails } = user;

      // Generate a token for the user

      const token = await authGenerate(userDetails);

      // Respond with success
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
        username: userDetails.username,
        _id: userDetails._id, // Mongoose uses `_id` by default
      });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: `Something went wrong: ${e.message}` });
  }
};
exports.postSignup = async (req, res, next) => {
  try {
    const userExisted = await User.findByMail(req.body.mail);
    if (userExisted) {
      return res
        .status(409)
        .json({ success: false, message: "User mail already exists" });
    }

    // Hash the password
    const hashed = await bcrypt.hash(req.body.password, 10);
    if (!hashed) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while hashing",
      });
    }

    console.log("ereee");

    // Create the new user
    const user = new User({
      username: req.body.username,
      mail: req.body.mail,
      password: hashed,
    });
    const savedUser = await user.save();
    // Exclude sensitive data from user object

    const { password, ...userDetails } = savedUser;

    if (savedUser) {
      // Generate a token for the user
      const token = await authGenerate(userDetails);

      // Respond with success
      return res.status(201).json({
        success: true,
        message: "Created successfully",
        token: token,
        username: userDetails.username,
        _id: userDetails._id, // Use `_id` in Mongoose
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: `Something went wrong: ${e.message}` });
  }
};
