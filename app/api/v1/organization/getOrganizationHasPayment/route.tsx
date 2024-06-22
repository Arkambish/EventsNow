export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import Ticket from "@/models/ticketType";
import TicketType from "@/models/ticketType";
import Event from "@/models/eventModel";
import { EventType } from "@/app/Type";

type Params = {
  id: string;
};

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    const allEvent = await Event.find({ income: { $gt: 0 } }).populate(
      "organizationId"
    );
    console.log(allEvent[0]);
    const getOrganizationId = allEvent.map(
      (event: EventType) => event.organizationId
    );

    const uniqueValues = [];
    const lookupTable: any = {};

    for (const value of getOrganizationId) {
      if (!lookupTable[value] && value !== null) {
        uniqueValues.push(value);
        lookupTable[value] = true;
      }
    }

    return NextResponse.json(uniqueValues);
  } catch (error) {
    return new NextResponse("Errror in fetching data" + error, { status: 500 });
  }
}
