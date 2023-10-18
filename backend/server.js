import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/db.js";

import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import auth2Route from "./routes/auth2.js"
import dabbawalaRoute from "./routes/dabbawala.js"
import paymentRoute from "./routes/payment.js"
import bookingRoute from "./routes/booking.js"

import contactRoute from "./routes/contact.js"


const app = express()
dotenv.config()

// cors
const corsOptions = {
   origin: 'http://localhost:3000',
   credentials: true,
};
app.use(cors(corsOptions));


app.get('/', (req, res) => {
   res.send("Hello World")
})


// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/auth2", auth2Route);
app.use("/api/dabbawala", dabbawalaRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/booking", bookingRoute);


app.use("/api/contact", contactRoute);



app.use((err, req, res, next) => {
   const errorStatus = err.status || 500;
   const errorMessage = err.message || "Something went wrong"
   return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
   })
})


const port = process.env.PORT  || 8800;
const host = '0.0.0.0'

app.listen(port, host, () => {
   connectDB()
   console.log("connected to backend")
})