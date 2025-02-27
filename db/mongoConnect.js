const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/maorClass25");
  console.log("mongo connect started");
}

module.exports = main; 
