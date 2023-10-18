import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userName: String,
  content: String,
  rating: Number,
});

// veg, nonveg, jain
const dabbaSchema = new mongoose.Schema({
  isPresent: {
    type: Boolean,
    default: false
  },
  name: String,
  menu: String,
  price: Number,
});


const DabbawalaSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    aadharCard: {
      type: String,
      required: true,
    },
    aadharCardPublicUrl: {
      type: String,
    },

    // profiles
    profilePicture: {
      type: String,
    },
    profilePicturePublicUrl: {
      type: String,
    },

    locations: {
      type: [String],
      default: []
    },
    phone: {
      type: String,
    },

    // timing n all
    dailySchedule: {
      type: String,
    },

    dabbawalaDetails: {
      type: String,
    },

    mealTypes: {
      type: String,
      enum: ["jain", "veg", "nonVeg"],
    },

    jain:{
      type: dabbaSchema
    },

    veg:{
      type: dabbaSchema
    },

    nonVeg:{
      type: dabbaSchema
    },

    reviews: {
      type: [reviewSchema],
      default: [],
    },
    rating: {
      type: String,
      default: "5/5"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Dabbawala", DabbawalaSchema);
