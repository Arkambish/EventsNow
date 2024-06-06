import connectMongoDB from "@/lib/mongo/mongodb";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { _id } = await req.json();

    const deletedData = await Notification.deleteOne({ _id: _id });

    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
