export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import Ticket from "@/models/ticketType";
import TicketType from "@/models/ticketType";
import Event from "@/models/eventModel";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const id = params.id;

    await connectMongoDB();

    const events = await Event.find({ organizationId: id, income: { $gt: 0 } });

    const income = events.reduce((acc: any, event: any) => {
      return acc + event.income;
    }, 0);

    if (!events || events.length === 0) {
      return NextResponse.json("no events found");
    }
    return NextResponse.json({ events, income });
  } catch (error) {
    return new NextResponse("Errror in fetching data" + error, { status: 500 });
  }
}
