import connectMongoDB from "@/lib/mongo/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    connectMongoDB();
    const { email } = await req.json();

    const data = await User.findOne({ email }).select("+password");

    if (!data) {
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
