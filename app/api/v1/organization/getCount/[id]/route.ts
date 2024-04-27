import Event from "@/models/eventModel";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  try {
    const orgId = params.id;

    // Fetch events belonging to the organization
    const events = await Event.find({ organizationId: orgId });

    let totalRegisteredUsersCount = 0;
    events.forEach((event: any) => {
      totalRegisteredUsersCount += event.registerUser.length;
    });

    return NextResponse.json({ totalRegisteredUsersCount, events });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
