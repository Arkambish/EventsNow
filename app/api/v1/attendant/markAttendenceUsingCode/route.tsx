import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import BuyTicket from "@/models/buyTicket";

import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(req: NextRequest) {
  const { ticketCode, eventId } = await req.json();

  try {
    connectMongoDB();

    const ticketDetails = await BuyTicket.findOne({
      eventId,
      ticketCode: ticketCode,
    }).populate("ticketId");

    if (!ticketDetails) {
      return NextResponse.json(
        { message: "Invalid Ticket Code" },
        { status: 400 }
      );
    }

    if (ticketDetails.isAttendentMarked) {
      return NextResponse.json(
        { message: "Ticket Already Marked" },
        { status: 200 }
      );
    }

    ticketDetails.isAttendentMarked = true;
    await ticketDetails.save();

    const attendant = await Attendant.create({
      ticketType: ticketDetails.ticketId.classType,
      eventId: ticketDetails.eventId,
      userId: ticketDetails.userId,
    });

    if (!attendant) {
      return NextResponse.json(
        { message: "attendant Creation Failed" },
        { status: 200 }
      );
    }

    return NextResponse.json(ticketDetails, { status: 201 });
    // return NextResponse.json({message:"attendance marked successfully"},{status:200});
  } catch (e) {
    return NextResponse.json({ message: "server error" }, { status: 400 });
  }
}
