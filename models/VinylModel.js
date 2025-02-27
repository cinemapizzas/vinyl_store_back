const mongoose = require("mongoose");
const Joi = require("joi");

let vinylSchema = new mongoose.Schema({
  albumName: String,
  price: Number,
  recordLabel: String,
  quantity: Number,
  sold: { type: Number, default: 0 },
  songsList: [String],
  imageUrl: { type: String },
  genre: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

exports.VinylModel = mongoose.model("vinylModel", vinylSchema);

exports.validVinyl = (requestBody) => {
  let joiSchema = Joi.object({
    albumName: Joi.string().min(2).max(150).required(),
    price: Joi.number().min(0).required(),
    recordLabel: Joi.string().min(2).max(100).required(),
    quantity: Joi.number().min(0).required(),
    sold: Joi.number().min(0).optional(),
    songsList: Joi.array().items(Joi.string().min(1)).required(),
    imageUrl: Joi.string().uri().optional(),
    genre: Joi.string().min(2).max(50).required(),
  });
  return joiSchema.validate(requestBody);
};