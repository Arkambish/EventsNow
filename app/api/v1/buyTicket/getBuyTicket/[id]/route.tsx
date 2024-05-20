import connectMongoDB from "@/lib/mongo/mongodb";
import BuyTicket from "@/models/buyTicket";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const id = params.id;

    await connectMongoDB();

    const ticket = await BuyTicket.find({ eventId: id });
    if (!ticket || ticket.length === 0) {
      return NextResponse.json([]);
    }
    return NextResponse.json(ticket);
  } catch (error) {
    return new NextResponse("Errror in fetching data" + error, { status: 500 });
  }
}
