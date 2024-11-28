async function verifyAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ success: false, message: "unathorised access" });
  }
  next();
}
module.exports = verifyAdmin;
