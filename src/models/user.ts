import {Schema, model, models} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema ({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,required: true },
    image: { type: String, required: false },
    streetAddress: { type: String, required: false },
    phone: { type: String, required: false },
    postalCode: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false }

}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);