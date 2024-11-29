async function verifyAdmin(req, res, next) {
  console.log(req.user);
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ success: false, message: "unathorised access" });
  }
  next();
}
module.exports = verifyAdmin;
