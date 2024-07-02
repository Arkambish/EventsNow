import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongo/mongodb";
import Event from "../../../../../models/eventModel";
import BuyTicket from "@/models/buyTicket";
import TicketType from "@/models/ticketType";

export async function POST(req: NextRequest) {
  const { ticketId, eventId, userId, ticketCode } = await req.json();

  try {
    await connectMongoDB();
    const buyTicket = await BuyTicket.create({
      ticketId: ticketId.typeId,
      eventId,
      userId,
      ticketCode,
    });
    console.log(buyTicket);
    

    if (!buyTicket) {
      return NextResponse.json(
        { message: "user buy ticket Failed,try again" },
        { status: 400 }
      );
    }
    const newTicket = await TicketType.findById(ticketId.typeId);
    console.log(newTicket);
    if (!newTicket) {
      return NextResponse.json(
        { message: "user buy ticket Failed,try again" },
        { status: 400 }
      );
    }
    console.log(ticketId);
    console.log(ticketId.typeId);
    console.log(newTicket.count);
    const updatedTicketCount= await TicketType.findByIdAndUpdate(ticketId.typeId, {
      $set: { count: newTicket.count + 1 },
    });
    console.log(updatedTicketCount);
    if (!updatedTicketCount) {
      return NextResponse.json(
        { message: "ticket count update Failed,try again" },
        { status: 400 }
      );
    }
    return NextResponse.json({ buyTicket }, { status: 201 });
  } catch (e) {
    return NextResponse.json("server error" + e, { status: 500 });
  }
}
