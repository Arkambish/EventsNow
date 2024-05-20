import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import BuyTicket from "@/models/buyTicket";

import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(req: NextRequest) {
  const { ticketCode, eventId } = await req.json();
  console.log(ticketCode, eventId);
  try {
    connectMongoDB();
    console.log("ashan");
    const ticketDetails = await BuyTicket.findOne({
      eventId,
      ticketCode: ticketCode,
    }).populate("ticketId");
    console.log("1" + ticketDetails);

    if (!ticketDetails) {
      return NextResponse.json(
        { message: "Invalid Ticket Code" },
        { status: 400 }
      );
    }

    console.log("2" + ticketDetails);
    if (ticketDetails.isAttendentMarked) {
      return NextResponse.json(
        { message: "Ticket Already Marked" },
        { status: 200 }
      );
    }
    console.log("3" + ticketDetails);

    ticketDetails.isAttendentMarked = true;
    await ticketDetails.save();

    const attendant = await Attendant.create({
      ticketType: ticketDetails.ticketId.classType,
      eventId: ticketDetails.eventId,
      userId: ticketDetails.userId,
    });

    console.log("4" + attendant);

    if (!attendant) {
      return NextResponse.json(
        { message: "attendant Creation Failed" },
        { status: 200 }
      );
    }

    console.log(NextResponse.json(ticketDetails));

    return NextResponse.json(ticketDetails, { status: 201 });
    // return NextResponse.json({message:"attendance marked successfully"},{status:200});
  } catch (e) {
    return NextResponse.json({ message: "server error" }, { status: 400 });
  }
}
