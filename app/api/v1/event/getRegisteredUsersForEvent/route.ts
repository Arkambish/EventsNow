import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongo/mongodb";
import RegisteredUser from "@/models/registeredUserModel";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const data  = await req.json();
    

    const registeredUsers = await RegisteredUser.find({eventId:data.id}).populate("userId");

    if (!registeredUsers) {
      return NextResponse.json({ message: "No registered users" }, { status: 404 });
    }
    

    return NextResponse.json(registeredUsers);
  } catch (e) {
    
    return NextResponse.json("Error in fetching data" + e, { status: 500 });
}}