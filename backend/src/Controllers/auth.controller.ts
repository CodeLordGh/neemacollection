import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { UserModel as User } from "../Models/user.model";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import passport from "../utils/auth.strategy";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const register = async (req: any, res: Response) => {
    // get user input
    const { email, password, username, phone } = req.body;

    // check if all fields are filled and passes validation
    if (!email || !password || !username || !phone) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    // check if name only conatins letters and sapces, password length greater than 6, email is valid and phone number is valid
    if (!/^[a-zA-Z\s]*$/.test(username) || password.length < 6 || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email) || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    // check if user exist in the database
    const user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: 'User already exist' });
    }

    //hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({ ...req.body, password: hashedPassword });

    if (email === process.env.ADMIN_EMAIL) {
        newUser.isAdmin = true;
    }

    try {
        // save user in the database
        await newUser.save();

        // create token
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' } as any);
        req.session.jwt = token
        // return success message
        return res.status(201).json({ message: `User ${username} registered successfully`, isAdmin: newUser.isAdmin });
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};


export const login = (req: any, res: Response) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            return res.send(err);
        }
        if (!user) {
            return res.status(401).send(info.message || 'Unauthorized');
        }
        req.logIn(user, (err: any) => {
            if (err) {
                return res.send(err);
            }

            const token = jwt.sign({ sub: user._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' } as any);
            req.session.jwt = token;

            // Set a cookie with the session ID
            // res.cookie('sessionId', req.sessionID, {
            //     httpOnly: true,
            //     secure: false,
            //     sameSite: 'lax',
            //     maxAge: 3600000, // 1 hour
            // });

            return res.status(200).json({ message: `user ${user.username} logged in`, token, isAdmin: user.isAdmin });
        });
    })(req, res);
};

export const logout = (req: Request, res: Response) => {
    res.cookie('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
    });

    res.json({ message: 'Logged out' });
};

// Dashboard
export const dashboard = (req: any, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: `Welcome, ${req.user.username}!` });
};