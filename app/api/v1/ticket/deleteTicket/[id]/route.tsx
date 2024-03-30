import connectMongoDB from "@/lib/mongo/mongodb";
import TicketType from "@/models/ticketType";

// import Ticket from "@/models/ticketType";
import User from "@/models/userModel";

import { NextResponse } from "next/server";
type Params = {
  id: string;
};
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    await connectMongoDB(); // Await the connection establishment

    const id = params.id;

    const data = await TicketType.deleteOne({ _id: id });

    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
    return NextResponse.error(); // Return an error response
  }
}
