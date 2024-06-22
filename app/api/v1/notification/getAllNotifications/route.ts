import connectMongoDB from "@/lib/mongo/mongodb";
import Notification from "@/models/notification";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { topic, comment, email } = await req.json();

    const reciever = await User.findOne({ email });

    const recieverId = await reciever._id;

    

    const createNotification = await Notification.create({
      topic,
      comment,
      recieverId,
    });

    if (!createNotification) {
      return NextResponse.json(
        { message: "Error creating notification" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Notification created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
