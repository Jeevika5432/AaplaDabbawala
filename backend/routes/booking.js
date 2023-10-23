import express from "express";
import {
  createBooking,
  getBookings,
  getUserBookings,
  getDabbawalaBookings,
  getDabbawalaBookingsWp
} from "../controllers/booking.js";

const router = express.Router();

router.post("/create", createBooking);

router.get("/allbookings", getBookings);
router.get("/userbookings/:userId", getUserBookings);
router.get("/dabbawalabookings/:dabbawalaId", getDabbawalaBookings);

router.get("/bookingswp/:phone", getDabbawalaBookingsWp);


export default router;
