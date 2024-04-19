export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import Ticket from "@/models/ticketType";
import TicketType from "@/models/ticketType";
import BuyTicket from "@/models/buyTicket";

type Params = {
  id: string;
};


export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const id = params.id;
    await connectMongoDB();

    const ticket = await BuyTicket.find({ userId: id });
    if (!ticket || ticket.length === 0) {
      return NextResponse.json([]);
    }
    return NextResponse.json(ticket);
    }catch (error) {
    return new NextResponse("Errror in fetching data" + error, { status: 500 });
  }
}
