import express from "express";
import { login, register, dabbaVerification, logout } from "../controllers/auth2.js";
const router = express.Router();
import multer from 'multer';

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      // Specify the destination directory where files will be stored
      cb(null, 'uploads/'); // Change 'uploads/' to your desired directory
   },
   filename: function (req, file, cb) {
      // Define how the file should be named
      cb(null, file.originalname); // You can customize the file naming logic
   },
});

const upload = multer({ storage: storage });


router.post("/register", upload.single('aadharCard'), register);
router.post("/login", login);

router.get("/dabbawala", dabbaVerification);
router.get("/logout", logout);


export default router