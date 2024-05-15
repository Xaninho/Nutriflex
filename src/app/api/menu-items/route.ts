import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req, res) {
    mongoose.connect(process.env.MONGODB_URL);
    const data = req.json();
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc, 201);
}

export async function GET(req, res) {
    mongoose.connect(process.env.MONGODB_URL);
    return Response.json(await MenuItem.find());
}