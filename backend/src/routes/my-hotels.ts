import express, { Request, Response } from "express";
import multer from "multer"; // multer is a package that handles images/forms

const router = express.Router();

const storage = multer.memoryStorage(); // We're telling multer to store the data (in this case, incoming image) using the memoryStorage, cuz we aren't saving it directly to the database, but we have to first upload it to cloudinary.

//    api/my-hotels

router.post("/", async (req: Request, res: Response) => {});
