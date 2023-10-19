import Booking from "../models/Booking.js";
// import axios from "axios";

export const createBooking = async (req, res, next) => {
  try {
    // const {
    //   user,
    //   dabbawala,
    //   orderType,
    //   quantity,
    //   prices,
    //   address,
    //   mealType,
    //   oneTimeOrderDate,
    //   subscriptionStartDate,
    //   subscriptionEndDate,
    // } = req.body;

    // const booking = new Booking({
    //   user,
    //   dabbawala,
    //   orderType,
    //   quantity,
    //   prices,
    //   address,
    //   mealType,
    //   oneTimeOrderDate,
    //   subscriptionStartDate,
    //   subscriptionEndDate,
    // });

    const booking = new Booking(req.body);

    await booking.save();

    // const bookingData = {
    //     phoneNumber: "dabbawala.phoneNumber",
    //     orderDetails: "detaols",
    //     message: User.email
    // };
    // const resul = await axios.post('http://localhost:8801/api/booking-notification', bookingData);
    // console.log(resul);


    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ user: userId });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getDabbawalaBookings = async (req, res, next) => {
  try {
    const dabbawalaId = req.params.dabbawalaId;
    const bookings = await Booking.find({ dabbawala: dabbawalaId });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};