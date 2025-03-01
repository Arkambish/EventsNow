import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/lib/mongo/mongodb";
import Event from "@/models/eventModel";

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const data = await request.json();
    await connectMongoDB();

    const updatedEvent = await Event.findByIdAndUpdate(data.id, {
      $set: {
        eventName: data.eventName,
        eventLocation: data.eventLocation,
        selectedTab: data.selectedTab,
        eventStartDate: data.eventStartedDate,
        startTime: data.startTime,
        endTime: data.endTime,
        isPublished: data.eventVisibility,
        dashboardImage: data.eventDashboardImage,
        coverImage: data.eventCoverImage,
        eventEndDate: data.eventEndDate,
      },
    });

    if (!updatedEvent) {
      return NextResponse.json({ message: "failed to update event details" });
    }

    return NextResponse.json(
      { message: "Event details updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json("error of the server", { status: 500 });
  }
}
