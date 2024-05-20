import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";

export async function PUT(request: NextRequest) {
  try {
    const { id, template, hostPageType } = await request.json();

    await connectMongoDB();

    const event = await Event.findOne({ _id: id });
    const orgnaizationId = event.organizationId;
    const organization = await Organization.findOne({ _id: orgnaizationId });
    if (!organization) {
      return NextResponse.json({ message: "No organization found" });
    }

    if (
      !organization.accountName ||
      !organization.accountNumber ||
      !organization.bank ||
      !organization.branch ||
      !organization.payout
    ) {
      return NextResponse.json({
        message: "Please complete your organization details",
      });
    }

    const data = await Event.findByIdAndUpdate(
      id,
      {
        $set: { template, isPublished: true, hostPageType },
      },
      { new: true }
    );

    if (!data) {
      return NextResponse.json({ message: "No event found" });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json("Error updating organization image");
  }
}
