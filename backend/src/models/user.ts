import mongoose, { mongo } from 'mongoose';

export type UserType = {        // Typescript type
    _id: string;            // Small "s" for string in TS
    email: string;
    password: string;
    firstname: string;
    lastname: string;
};

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },      // Capital "S" for Mongo String
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;