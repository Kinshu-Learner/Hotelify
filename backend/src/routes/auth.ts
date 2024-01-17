import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';

const router = express.Router();

router.use("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with at least 6 characters is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials" });   
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",      // Cuz we only want it on HTTPS in production build, but NOT in development build
            maxAge: 86400000,
        });

        res.status(200).json({userId: user._id});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while logging in" });
    }

});

// Just made an end point to take the HTTP cookie and check if it's valid or not using this function, which includes the use of a middleware (verifyToken).
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({userId: req.userId});
});

export default router;