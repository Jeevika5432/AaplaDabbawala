import Dabbawala from "../models/Dabbawala.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import cloudinary from '../config/cloudinary.js';

export const register = async (req, res, next) => {
   try {
      const { email } = req.body;
      const aadharCard = req.file;

      console.log(aadharCard);

      const existingDabbawala = await Dabbawala.findOne({ email });
      if (existingDabbawala) {
         console.log("exist");
         return res.status(409).json({ error: "Dabbawala with this email already exists." });
      }

      // Upload idCard to Cloudinary
      const aadharCardResult = await cloudinary.uploader.upload(aadharCard.path);
      console.log(aadharCardResult);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      console.log("h");
      const newDabbawala = new Dabbawala({
         ...req.body,
         password: hash,
         // secured url
         aadharCard: aadharCardResult.secure_url,
         // Store the Cloudinary public_ids in MongoDB
         aadharCardPublicUrl: aadharCardResult.public_id,
      });
      const newDabba = await newDabbawala.save();
      res.status(200).json(newDabba);
   } catch (err) {
      next(err);
   }
}

export const login = async (req, res, next) => {
   try {
      const dabbawala = await Dabbawala.findOne({ email: req.body.email });
      if (!dabbawala) return next(createError(404, "Dabbawala not found"));

      const isPasswordCorrect = await bcrypt.compare(req.body.password, dabbawala.password);
      if (!isPasswordCorrect)
         return next(createError(400, "Wrong password"));

      const token = jwt.sign(
         {
            id: dabbawala._id
         },
         process.env.JWT,
         {
            expiresIn: "1h"
         }
      );

      const { password, ...dabbawalaa } = dabbawala._doc;

      const option = {
         expires: new Date(Date.now() + 1000 * 60 * 60 * 16),
         httpOnly: false
      }

      res.status(200).cookie("access_token2", token, option).json(dabbawalaa);
   } catch (err) {
      next(err);
   }
}


export const dabbaVerification = (req, res, next) => {
   try {
      const token = req.cookies.access_token2;
      if (!token) {
         return res.json({ status: false });
      }

      jwt.verify(token, process.env.JWT, async (err, data) => {
         if (err) {
            return res.json({ status: false });
         }

         const dabbawalaRes = await Dabbawala.findById(data.id);
         if (dabbawalaRes) {
            const { password, ...dabbawala } = dabbawalaRes._doc;
            return res.json({ status: true, dabbawala });
         }
         else {
            return res.json({ status: false });
         }
      })
   }
   catch (err) {
      next(err);
   }
}

export const logout = async (req, res) => {
   try {
      res.cookie('access_token2', ' ', { expires: new Date(0) });
      res.status(200).json({ message: 'Logout successful' });
   } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};
