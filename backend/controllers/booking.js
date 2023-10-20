import Booking from "../models/Booking.js";
// import axios from "axios";
// import User from "../models/User.js"
// import Dabbawala from "../models/Dabbawala.js";

export const createBooking = async (req, res, next) => {
  try {

    const booking = new Booking(req.body);

    await booking.save();
    // console.log("1")

    // // whatsapp notification alert
    // const user = await User.findById(booking.user);
    // const dabbawala = await Dabbawala.findById(booking.dabbawala);

    // const bookingData = {
    //     phoneNumber: dabbawala.phone,
    //     orderDetails: booking.mealType,
    //     orderDate : booking.subscriptionStartDate,
    //     userPhone: user.phone
    // };
    // console.log(bookingData)

    // const resul = await axios.post('http://localhost:8801/api/booking-notification', bookingData);

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
}


export const getUserBookings = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const bookings = await Booking.find({ user: userId });
    // const bookings = await Booking.find({ user: userId }).populate('dabbawala').populate('user');

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getDabbawalaBookings = async (req, res, next) => {
  try {
    const {dabbawalaId} = req.params;
    console.log(dabbawalaId);
    const bookings = await Booking.find({ dabbawala: dabbawalaId });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};