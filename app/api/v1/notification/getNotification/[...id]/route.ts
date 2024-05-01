import connectMongoDB from "@/lib/mongo/mongodb";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET(req: Request, { params }: any) {
  const userId = params.id;
  try {
    connectMongoDB();

    const filternotification = await Notification.find({
      recieverId: userId,
    });

    if (!filternotification) {
      return NextResponse.json(
        { message: "No notifications found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ filternotification });
  } catch (error) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request, { params }: any) {
  try {
    await connectMongoDB();
    const recieverId = params.id[0];
    console.log(params.id[0]);
    const updateRead = await Notification.findByIdAndUpdate(recieverId, {
      isClicked: false,
    });
    return NextResponse.json("User updated successfully");
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
