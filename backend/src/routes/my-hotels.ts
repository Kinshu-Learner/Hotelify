import express, { Request, Response } from "express";
import multer from "multer"; // multer is a package that handles images/forms

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
  async (req: Request, res: Response) => {}
);
