const express = require("express");;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const methodOveride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");

const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");
const User = require("./models/User.js");
app.use(methodOveride("_method"));
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");


const dbUrl = process.env.ATLAS_DB;
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: 'https://stay-finder-pj4p.onrender.com', credentials: true }));
app.use(cookieParser());
main()
  .then((res) => {
    console.log("connected Successful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

app.get("/",(req,res)=>{
    res.json({"fruits":["apple","banana","orange"]});
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

// Listing Routes
app.use("/listing",listingRoutes);
// User Routes
app.use("/",userRoutes);
//Booking Routes
app.use("/bookings", require("./routes/booking.js"));
// Review Routes
app.use("/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found."));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).json({ error: message });
});