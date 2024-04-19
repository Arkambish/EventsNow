import connectMongoDB from "@/lib/mongo/mongodb";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
  try {
    await connectMongoDB();

    const { organizationName, comment, senderId } = await req.json();

    console.log("t1");
    const createNotification = await Notification.create({
      organizationName,
      comment,
      senderId,
    });
    console.log("t2");

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
