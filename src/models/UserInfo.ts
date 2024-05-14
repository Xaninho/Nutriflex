import { Schema, model, models } from 'mongoose';

const UserInfoSchema = new Schema({
    phone: { type: String, required: false },
    email: { type: String, required: true, unique: true },          
    postalCode: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    admin: { type: Boolean, default: false },
    streetAddress: { type: String, required: false }
}, { timestamps: true });

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);