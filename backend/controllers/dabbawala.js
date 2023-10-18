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
    const { userId,userName, content, rating } = req.body;

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
    const userId = req.body.userId;

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




export const getDabbawala = async (req, res, next) => {
  try {
    const dabbawala = await Dabbawala.findById(req.params.id);

    if (!dabbawala) {
      return res.status(404).json({ error: "Dabbawala not found." });
    }

    // Retrieve the image URLs from Cloudinary
    const profileImage = await cloudinary.url(dabbawala.profileImage, { secure: true });
    const idCard = await cloudinary.url(dabbawala.idCard, { secure: true });
    
    // Create a new dabbawala object with image URLs
    const dabbawalaWithImages = {
      ...dabbawala._doc,
      profileImage,
      idCard,
    };
    
    res.status(200).json(dabbawalaWithImages);
  } catch (err) {
    next(err);
  }
};


export const getDabbawalas = async (req, res, next) => {
  const { city } = req.query;
  
  try {
    let query = Dabbawala.find();
    
    if (city) {
      query = query.where({ city }); // Apply city filter if provided
    }
    
    const dabbawalas = await query.exec();
    
    if (dabbawalas.length === 0) {
      return res.status(404).json({ error: "No dabbawalas found." });
    }

    const dabbawalasWithImages = await Promise.all(
      dabbawalas.map(async (dabbawala) => {
        // Construct Cloudinary URLs using public IDs
        const profileImage = await cloudinary.url(dabbawala.profileImagePublicId, { secure: true });
        const idCard = await cloudinary.url(dabbawala.idCardPublicId, { secure: true });
        
        // Create a new dabbawala object with image URLs
        return {
          ...dabbawala._doc,
          profileImage,
          idCard,
        };
      })
      );
      
      res.status(200).json(dabbawalasWithImages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
  }
};
// export const deleteDabbawala = async (req, res, next) => {
//   try {
//     const dabbawala = await Dabbawala.findById(req.params.id);

//     if (!dabbawala) {
//       return res.status(404).json({ error: "Dabbawala not found." });
//     }

//     // Delete images from Cloudinary using public_ids
//     await cloudinary.uploader.destroy(dabbawala.profileImagePublicId);
//     await cloudinary.uploader.destroy(dabbawala.idCardPublicId);

//     // Delete dabbawala from MongoDB
//     await dabbawala.remove();

//     res.status(200).json({ message: "Dabbawala has been deleted." });
//   } catch (err) {
//     next(err);
//   }
// };
