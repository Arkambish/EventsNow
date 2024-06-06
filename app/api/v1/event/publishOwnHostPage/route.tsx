import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";

export async function PUT(request: NextRequest) {
  try {
    const { id, uploadPage } = await request.json();

    await connectMongoDB();

    const data = await Event.findByIdAndUpdate(
      id,
      {
        $set: { uploadPage, hostPageType: "uploadPage", isPublished: true },
      },
      { new: true }
    );

    if (!data) {
      return NextResponse.json({ message: "pageBuilder update faild" });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json("Error updating pagebuilder");
  }
}
