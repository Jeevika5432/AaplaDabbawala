import Dabbawala from "../models/Dabbawala.js";
import cloudinary from '../config/cloudinary.js'; // Import the Cloudinary configuration



// export const addDabbawala = async (req, res, next) => {
//   try {
//     const dabbawala = new Dabbawala({
//       name: req.body.name,
//       age: req.body.age,
//       locations: req.body.locations,
//       prices: req.body.prices,
//       foodMenu: req.body.foodMenu,
//       category: req.body.category,
//     });

//     await dabbawala.save();
//     res.status(201).json(dabbawala);
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateDabbawala = async (req, res, next) => {
//   try {
//     const updatedDabbawala = await Dabbawala.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         age: req.body.age,
//         locations: req.body.locations,
//         prices: req.body.prices,
//         foodMenu: req.body.foodMenu,
//         category: req.body.category,
//       },
//       { new: true }
//     );

//     if (!updatedDabbawala) {
//       return res.status(404).json({ message: "Dabbawala not found" });
//     }

//     res.status(200).json(updatedDabbawala);
//   } catch (err) {
//     next(err);
//   }
// };


export const createDabbawala = async (req, res, next) => {
  const { email, name, phone, yearOfExperience } = req.body;
  const profileImage = req.files.profileImage[0];
  const idCard = req.files.idCard[0];

  try {
    // Upload profileImage to Cloudinary
    const profileImageResult = await cloudinary.uploader.upload(profileImage.path);

    // Upload idCard to Cloudinary
    const idCardResult = await cloudinary.uploader.upload(idCard.path);

    const newDabbawala = new Dabbawala({
      email,
      name,
      phone,
      yearOfExperience,
      profileImage: profileImageResult.secure_url,
      idCard: idCardResult.secure_url,

      // Store the Cloudinary public_ids in MongoDB
      profileImagePublicId: profileImageResult.public_id,
      idCardPublicId: idCardResult.public_id,
    });

    const savedDabbawala = await newDabbawala.save();
    res.status(200).json(savedDabbawala);
  } catch (err) {
    next(err);
  }
};


export const deleteDabbawala = async (req, res, next) => {
  try {
    const dabbawala = await Dabbawala.findById(req.params.id);

    if (!dabbawala) {
      return res.status(404).json({ error: "Dabbawala not found." });
    }

    // Delete images from Cloudinary using public_ids
    await cloudinary.uploader.destroy(dabbawala.profileImagePublicId);
    await cloudinary.uploader.destroy(dabbawala.idCardPublicId);

    // Delete dabbawala from MongoDB
    await dabbawala.remove();

    res.status(200).json({ message: "Dabbawala has been deleted." });
  } catch (err) {
    next(err);
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
