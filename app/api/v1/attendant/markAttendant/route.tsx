import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import { NextRequest, NextResponse } from "next/server";
// import connectMongoDB from "../../../../../lib/mongo/mongodb";
// import TicketType from "@/models/ticketType";
// import Ticket from "@/models/ticketType";

export async function POST(req: NextRequest) {
  const { ticketType, eventId, userId } = await req.json();

  try {
    connectMongoDB();

    // const checkUser = await Attendant.findOne({
    //   userId: userId,
    //   eventId: eventId,
    // });
    // if (checkUser) {
    //   return NextResponse.json({ message: "User Already Attending" });
    // }

    const attendant = await Attendant.create({
      ticketType,
      eventId,
      userId,
    });

    if (!attendant) {
      return NextResponse.json(
        { message: "attendant Creation Failed" },
        { status: 400 }
      );
    }
    return NextResponse.json(attendant, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "ticket Creation Failed" },
      { status: 400 }
    );
  }
}
