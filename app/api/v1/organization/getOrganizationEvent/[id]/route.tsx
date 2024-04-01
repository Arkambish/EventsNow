import { NextResponse } from "next/server";
import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import Event from "@/models/eventModel";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const objectId = new mongoose.Types.ObjectId(id);
    await connectMongoDB();
    const organization = await Event.find({ organizationId: objectId });

    if (!organization) {
      return NextResponse.json({ message: "No organization" });
    }

    return NextResponse.json(organization);
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
