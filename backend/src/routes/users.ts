// This file is called "users.ts" (plural) cuz it is a REST API convention.

import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// This route will be on "/api/users/register" cuz in the index.ts file, we're importing this entire file and using it on "/api/users" endpoint.
router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with at least 6 characters is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ message: errors.array() });
    }

    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {       // 400 status: Bad request
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User(req.body);
        await user.save();

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

        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }

});

export default router;