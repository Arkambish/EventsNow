import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";

export async function PUT(request: NextRequest) {
  try {
    const { id, amount } = await request.json();

    await connectMongoDB();

    const isEventExist = await Event.findOne({ _id: id });

    if (!isEventExist) {
      return NextResponse.json({ message: "No event found" });
    }
    const income = isEventExist.income ? isEventExist.income + amount : amount;

    const data = await Event.findByIdAndUpdate(
      id,
      {
        $set: { income },
      },
      { new: true }
    );

    if (!data) {
      return NextResponse.json({ message: "update failed" });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json("Error updating organization image");
  }
}
