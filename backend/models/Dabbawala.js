import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userName: String,
  content: String,
  rating: Number,
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
    phoneNumber: {
      type: String,
      required: true
    },
    aadharCard: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    aadharCardPublicUrl: {
      type: String,
    },
    profilePicturePublicUrl: {
      type: String,
    },

    locations:{
      type: [String],
      default:[]
    },

    dabbaDetails: {
      type: String,
      // Define the fields for dabba details
      // You can structure this object according to your requirements
    },
    prices: {
      simpleThaali: Number,
      deluxThaali: Number,
      maharajaThaali: Number,
    },
    foodMenu: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["jain", "veg", "non veg"],
      required: true,
    },

    reviews: {
      type: [reviewSchema],
      default: [],
    },
    rating: {
      type: String,
      default: "5/5"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Dabbawala", DabbawalaSchema);
