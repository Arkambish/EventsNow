import User from "@/models/userModel";
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongo/mongodb";

export async function GET(req: Request, { params }: any) {
  const id = params.id;
  try {
    connectMongoDB();

    const data = await User.findOne({ _id: id }).select("+password");

    if (!data) {
      return NextResponse.json("No User");
    }

    return NextResponse.json(data);
  } catch (error) {
   
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
