import { NextResponse } from "next/server";
import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import TicketType from "@/models/ticketType";
import BuyTicket from "@/models/buyTicket";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const id = params.id;
    await connectMongoDB();

    // Fetch BuyTicket entries for the given userId
    const tickets = await BuyTicket.find({ userId: id });

    // Check if any tickets were found
    if (!tickets || tickets.length === 0) {
      return new NextResponse("No tickets found", { status: 404 });
    }

    const ticketIds = tickets.map((ticket: any) => ticket.ticketId);

    // Fetch TicketType entries for the ticketIds
    const ticketTypes = await TicketType.find({ _id: { $in: ticketIds } });
    //console.log(ticketTypes);
    // Check if any ticket types were found
    if (!ticketTypes || ticketTypes.length === 0) {
      return new NextResponse("No ticket types found", { status: 404 });
    }

    // Return the ticket types
    return NextResponse.json(ticketTypes);
  } catch (error) {
    console.error("Error in fetching data:", error);
    return new NextResponse("Error in fetching data", { status: 500 });
  }
}
