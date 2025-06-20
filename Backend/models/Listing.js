const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User'); 
const Review = require('./Review'); 
const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image:{
        url:{type:String},
        filename:{type:String}
    },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  country:{
    type: String,
    required: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Listing', listingSchema);
