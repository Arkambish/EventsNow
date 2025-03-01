import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongo/mongodb";
import TicketType from "@/models/ticketType";
// import Ticket from "@/models/ticketType";

export async function POST(req: NextRequest) {
  const { price, image, eventId, classType } = await req.json();
  try {
    connectMongoDB();
    const ticket = await TicketType.create({
      price,
      image,
      eventId,
      classType,
    });
    if (!ticket) {
      return NextResponse.json(
        { message: "ticket Creation Failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "server ticket Creation Failed" },
      { status: 400 }
    );
  }
}
