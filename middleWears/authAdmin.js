const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const auth = async (req, res, next) => {
  const token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ err: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "user-secret");
    const user = await UserModel.findById(decoded._id).select("-password"); 
    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }

    req.role = user.role;
    if (user.role !== "admin") {
      return res.status(401).json({ err: "Invalid admin token" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ err: "Invalid token." });
  }
};

module.exports = auth; 
