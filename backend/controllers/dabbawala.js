import Dabbawala from "../models/Dabbawala.js";
import cloudinary from '../config/cloudinary.js'; // Import the Cloudinary configuration


export const updateDabbawala = async (req, res, next) => {
  try {
    const {name, locations, phone, dailySchedule, jain, veg, nonVeg } = req.body;
    const profilePicture = req.file;

    const profilePictureResult = await cloudinary.uploader.upload(profilePicture.path);


    const updatedDabbawala = await Dabbawala.findByIdAndUpdate(
      req.body.userId,
      {
        name: name,
        locations: locations,
        phone: phone,
        dailySchedule: dailySchedule,
        jain: jain,
        veg: veg,
        nonVeg: nonVeg,
        profilePicture: profilePictureResult.secure_url,
        profilePicturePublicUrl: profilePictureResult.public_id
      },
      { new: true }
    );

    if (!updatedDabbawala) {
      return res.status(404).json({ message: "Dabbawala not found" });
    }

    res.status(200).json(updatedDabbawala);
  } catch (err) {
    next(err);
  }
};


export const addReview = async (req, res, next) => {
  try {
    const { userId, userName, content, rating } = req.body;

    const dabbawala = await Dabbawala.findById(userId);

    if (!dabbawala) {
      return res.status(404).json({ message: 'dabbawala not found' });
    }

    const newReview = {
      userName,
      content,
      rating,
    };

    dabbawala.reviews.push(newReview);

    // Calculate the new average rating for the hotel based on the appended review
    const totalReviews = dabbawala.reviews.length;
    const totalRating = dabbawala.reviews.reduce((sum, review) => sum + review.rating, 0);
    const updatedRating = (totalRating / totalReviews).toFixed(1);
    dabbawala.rating = `${updatedRating} /5`;

    await dabbawala.save();

    res.status(200).json({ message: 'Review added successfully', dabbawala });
  } catch (error) {
    next(error);
  }
};

export const getDabbawalaReviews = async (req, res, next) => {
  try {
    const {userId} = req.params;

    const dabbawala = await Dabbawala.findById(userId);

    if (!dabbawala) {
      return res.status(404).json({ message: 'Dabbawala not found' });
    }

    // Send the Dabbawala's reviews as the response
    res.status(200).json(dabbawala.reviews);
  } catch (error) {
    next(error);
  }
};


export const getDabbawalas = async (req, res) => {
  const { location, category } = req.body;
  const filter = {};

  // Filter by location
  if (location) {
    filter.locations = location;
  }

  // Filter by category
  if (category) {
    filter[`${category}.isPresent`] = true;
  }

  try {
    const dabbawalas = await Dabbawala.find(filter);

    if (dabbawalas.length === 0) {
      return res.status(404).json({ message: 'No Dabbawalas found for the given criteria.' });
    }

    res.json(dabbawalas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error querying Dabbawalas' });
  }
}

export const getDabbawala = async (req, res) => {
  const { userId } = req.params;
  console.log(userId)

  try {
    const dabbawala = await Dabbawala.findById(userId);

    if (!dabbawala) {
      return res.status(404).json({ message: 'Dabbawala not found' });
    }

    res.json(dabbawala);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error querying Dabbawala by ID' });
  }
};
