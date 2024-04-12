import connectMongoDB from "@/lib/mongo/mongodb";
import RegisteredUser from "@/models/registeredUserModel";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    await connectMongoDB();

    const registerUser = await RegisteredUser.findOne({
        userId: data.userId,
        eventId: data.eventId,
        });
    if (!registerUser) {
        return NextResponse.json(false);
        
    }
    return NextResponse.json(true);
    
    } catch (error) {
        return NextResponse.json({ message: "Error registering for event" });
    }}