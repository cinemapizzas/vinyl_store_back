const mongoose = require("mongoose");
const Joi = require("joi");

let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: { type: String, enum: ["user", "admin"], default: "user" }, 
  createdAt: { type: Date, default: Date.now },
});

exports.UserModel = mongoose.model("userModel", userSchema);

exports.validUser = (requestBody) => {
  let joiSchema = Joi.object({
    username: Joi.string().min(2).max(99).required(),
    password: Joi.string().min(2).max(99).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid("user", "admin").optional(),
  });
  return joiSchema.validate(requestBody);
};