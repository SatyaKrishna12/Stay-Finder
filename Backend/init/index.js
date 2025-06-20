const mongoose = require("mongoose");
const Listing = require("../models/Listing.js");
const dataDb = require("./data.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/stayfinder";
main()
  .then((res) => {
    console.log("connected Successful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async ()=>{
   await Listing.deleteMany({});
   await Listing.insertMany(dataDb.data)
   console.log("Data Intitiated")
}
initDB();