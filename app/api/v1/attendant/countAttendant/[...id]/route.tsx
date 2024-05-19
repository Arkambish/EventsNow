import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  connectMongoDB();
  console.log("connected");
  try {
    const id = params.id;
    console.log(id);
    const attendant = await Attendant.find({ eventId: id });
    console.log(attendant.length);
    return NextResponse.json({ success: true, data: attendant.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
};
