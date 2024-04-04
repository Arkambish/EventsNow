import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongo/mongodb";
import User from "@/models/userModel";

export async function POST(req: Request) {
  try {
    connectMongoDB();

    const { email, name, image } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      const user = await User.create({
        email,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        image,
      });
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ user });
    }
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
