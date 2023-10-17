// routes/booking.js
import express from "express";
import {
  createBooking,
  getUserBookings,
  getDabbawalaBookings,
  /* add more controller methods here */
} from "../controllers/booking.js";

const router = express.Router();

router.post("/create-booking", createBooking);
router.get("/user-bookings/:userId", getUserBookings);
router.get("/dabbawala-bookings/:dabbawalaId", getDabbawalaBookings);

// Add more routes for bookings

export default router;
