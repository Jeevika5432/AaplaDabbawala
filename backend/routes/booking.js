// routes/booking.js
import express from "express";
import {
  createBooking,
  getUserBookings,
  getDabbawalaBookings,
} from "../controllers/booking.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/userbookings/:userId", getUserBookings);
router.get("/dabbawalabookings/:dabbawalaId", getDabbawalaBookings);

// Add more routes for bookings

export default router;
