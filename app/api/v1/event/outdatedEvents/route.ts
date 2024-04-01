export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import Event from "@/models/eventModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { formatDate } from "@/util/helper";
import { EventType } from "@/app/Type";

export const GET = async (req: Request) => {
  try {
    await connectMongoDB();

    const isPublishedEvent = await Event.find({
      isPublished: true,
    });

    const currentDate = formatDate(new Date());

    const outDatedEvent = isPublishedEvent.filter((event: EventType) => {
      return new Date(event.eventEndDate) < new Date(currentDate);
    });

    if (outDatedEvent === undefined) {
      return new NextResponse(JSON.stringify([]), {
        status: 404,
      });
    }

    if (outDatedEvent.length === 0) {
      return new NextResponse(JSON.stringify([]), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(outDatedEvent), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching data" + error, { status: 500 });
  }
};
