import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dabbawala: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dabbawala",
      required: true,
    },
    userName: {
      type: String,
    },
    userPhone:{
      type:String
    },
    dabbawalaName: {
      type: String,
    },
    dabbawalaPhone:{
      type:String
    },
    foodName:{
      type: String,
    },
    orderType: {
      type: String,
      // enum: ["one-time", "monthly"],
      required: true,
    },
    quantity:{
      type:Number,
      required:true
    },
    prices: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mealType: {
      type: String,
      required: true,
    },
    oneTimeOrderDate: {
      type: Date,
    },
    subscriptionStartDate: {
      type: Date,
    },
    subscriptionEndDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
