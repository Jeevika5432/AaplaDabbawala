import express from "express";
import {
  createBooking,
  getBookings,
  getUserBookings,
  getDabbawalaBookings,
} from "../controllers/booking.js";

const router = express.Router();

router.post("/create", createBooking);

router.get("/allbookings", getBookings);
router.get("/userbookings/:userId", getUserBookings);
router.get("/dabbawalabookings/:dabbawalaId", getDabbawalaBookings);


export default router;
