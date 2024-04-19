import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongo/mongodb";
import Event from "../../../../../models/eventModel";
import BuyTicket from "@/models/buyTicket";

export async function POST(req: NextRequest) {
  const { ticketId, eventId, userId } = await req.json();
  console.log(ticketId, eventId, userId);
  try {
    await connectMongoDB();
    const buyTicket = await BuyTicket.create({
      ticketId: ticketId.typeId,
      eventId,
      userId,
    });
    console.log(buyTicket);
    if (!buyTicket) {
      console.log("user buy ticket Failed,try again");
      return NextResponse.json(
        { message: "user buy ticket Failed,try again" },
        { status: 400 }
      );
    }
    return NextResponse.json({ buyTicket }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("server error" + e, { status: 500 });
  }
}
