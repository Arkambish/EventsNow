import connectMongoDB from "@/lib/mongo/mongodb";
import Event from "@/models/eventModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB(); // Await the connection establishment

    const { _id } = await req.json();

    // Assuming User is a Mongoose model, use deleteOne() method
    const data = await Event.deleteOne({ _id });

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
    // return NextResponse.error(); // Return an error response
  }
}
