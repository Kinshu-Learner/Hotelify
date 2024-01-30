import express, { Request, Response } from "express";
import multer from "multer"; // multer is a package that handles images/forms
import cloudinary from "cloudinary";

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
  upload.array("imageFiles", 6), // telling multer to expect a form property called "imageFiles", which is an array upto 6 images.
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[]; // to get the image data separately
      const newHotel = req.body; // to get the rest of the form data

      // 1. Upload the images to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        // Looping over all of the images we got in input in "imageFiles".
        const b64 = Buffer.from(image.buffer).toString("base64"); // Creating a base 64 buffer from each image.
        let dataURI = "data:" + image.mimetype + ";base64," + b64; // Creating a string to identify the image separately from one another while uploading. mimetype = jpeg/png etc.
        const res = await cloudinary.v2.uploader.upload(dataURI); // Uploading the image to cloudinary using the string that we just created.
        return res.url; // Finally returning the url of the uploaded image.
      });

      const imageURLs = await Promise.all(uploadPromises); // The "uploadPromises" will contain promises of all the images. We want to first await all of them first, and then move on with the next steps.

      // 2. if the upload was successful, add the URLs to the new hotel
      // 3. save the new hotel in database
      // 4. return 201 status
    } catch (error) {}
  }
);
