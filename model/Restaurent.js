const mongoose = require('mongoose');
const { Schema } = mongoose;

//  the review schema
const reviewSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },

});

// the restaurent schema
const restaurentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  reviews: {
    type: [reviewSchema],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  profile_img: String,
  cloudinary_id: String
});


const Restaurent = mongoose.model('restaurent', restaurentSchema);

module.exports = Restaurent;
