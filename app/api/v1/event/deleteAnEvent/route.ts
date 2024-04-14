import connectMongoDB from "@/lib/mongo/mongodb";
import Event from "@/models/eventModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { _id } = await req.json();

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
