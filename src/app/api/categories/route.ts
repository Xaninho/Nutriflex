import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req : any) {
    mongoose.connect(process.env.MONGODB_URL);
    const {name} = await req.json();
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);

}

export async function PUT(req : any) {
    mongoose.connect(process.env.MONGODB_URL);
    const {name, _id} = await req.json();
    await Category.updateOne({_id}, {name});
    return Response.json(true);

}

export async function GET(req : any) {
    mongoose.connect(process.env.MONGODB_URL);
    return Response.json(await Category.find());
}