import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req : any) {
    mongoose.connect(process.env.MONGODB_URL ?? '');
    const data = req.json();
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc, { status: 201 });
}

export async function PUT(req : any) {
    mongoose.connect(process.env.MONGODB_URL ?? '');
    const [_id, data] = [req.params._id, req.json()];
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);
}

export async function GET(req : any) {
    mongoose.connect(process.env.MONGODB_URL ?? '');
    return Response.json(await MenuItem.find());
}

export async function DELETE(req : any) {
    mongoose.connect(process.env.MONGODB_URL ?? '');
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await MenuItem.deleteOne({_id});
    return Response.json(true);
}