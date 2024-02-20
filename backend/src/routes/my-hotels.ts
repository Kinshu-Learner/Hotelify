import express, { Request, Response } from "express";
import multer from "multer"; // multer is a package that handles images/forms
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage(); // We're telling multer to store the data (in this case, incoming image) using the memoryStorage, cuz we aren't saving it directly to the database, but we have to first upload it to cloudinary.

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

//    api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price Per Night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6), // telling multer to expect a form property called "imageFiles", which is an array upto 6 images.
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[]; // to get the image data separately
      const newHotel: HotelType = req.body; // to get the rest of the form data

      // 1. Upload the images to cloudinary
      const imageURLs = await uploadImages(imageFiles); // The "uploadPromises" will contain promises of all the images. We want to first await all of them first, and then move on with the next steps.

      // 2. if the upload was successful, add the URLs to the new hotel
      newHotel.imageUrls = imageURLs;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // 3. save the new hotel in database
      const hotel = new Hotel(newHotel); // Created a new hotel using the "Hotel" schema and "newHotel" data.
      await hotel.save();

      // 4. return 201 status
      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error creating hotel: ", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.send(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const ID = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      // If we use "find" here instead of findOne, we'll get back an array as a response, as opposed to a single object.
      _id: ID,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching the Hotel" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files as Express.Multer.File[];

      const updatedImageUrls = await uploadImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []), // Here, we're handling a case where the user has decided to delete all the existing images, thus || [].
      ];

      await hotel.save();

      res.send(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    // Looping over all of the images we got in input in "imageFiles".
    const b64 = Buffer.from(image.buffer).toString("base64"); // Creating a base 64 buffer from each image.
    let dataURI = "data:" + image.mimetype + ";base64," + b64; // Creating a string to identify the image separately from one another while uploading. mimetype = jpeg/png etc.
    const res = await cloudinary.v2.uploader.upload(dataURI); // Uploading the image to cloudinary using the string that we just created.
    return res.url; // Finally returning the url of the uploaded image.
  });

  const imageURLs = await Promise.all(uploadPromises); // The "uploadPromises" will contain promises of all the images. We want to first await all of them first, and then move on with the next steps.
  return imageURLs;
}

export default router;
