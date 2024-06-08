import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import BuyTicket from "@/models/buyTicket";
import { NextRequest, NextResponse } from "next/server";
import TicketType from "@/models/ticketType";
import Ticket from "@/models/ticketType";

export async function POST(req: NextRequest) {
  const { ticketType, eventId, userId, ticketCode} = await req.json();

  console.log("ashan", ticketType, eventId, userId, ticketCode)

  try {
    connectMongoDB();

    const attendanceMarked = await Attendant.findOne({ ticketCode });
    if (attendanceMarked.isMarkAttendance) {
      return NextResponse.json(
        { message: "Ticket Type Already Marked" },
        { status: 400 }
      );
    }

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
    const updatedAttendant = await BuyTicket.findOneAndUpdate(
      { ticketCode },
      { isMarkAttendance: true }
    );
    if(!updatedAttendant) {
      return NextResponse.json(
        { message: "attendant create failed" },
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

// export async function POST(req: NextRequest) {
//   const { ticketType, eventId, userId } = await req.json();

//   try {
//     connectMongoDB();

//     // Check if attendance has already been marked for this ticket type
//     const existingAttendance = await Attendant.findOne({ eventId, userId, ticketType });

//     if (existingAttendance) {
//       return NextResponse.json(
//         { message: "Ticket Type Already Marked" },
//         { status: 400 }
//       );
//     }

//     // If attendance has not been marked for this ticket type, proceed to mark attendance
//     const ticket = await BuyTicket.findOneAndUpdate(
//       { eventId, userId, ticketType, isMarkAttendance: false },
//       { isMarkAttendance: true }
//     );

//     if (!ticket) {
//       return NextResponse.json(
//         { message: "Ticket Already Used for Attendance" },
//         { status: 400 }
//       );
//     }

//     const attendant = await Attendant.create({
//       ticketType,
//       eventId,
//       userId,
//     });

//     if (!attendant) {
//       return NextResponse.json(
//         { message: "Attendant Creation Failed" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(attendant, { status: 201 });
//   } catch (e) {
//     return NextResponse.json(
//       { message: "Ticket Creation Failed" },
//       { status: 400 }
//     );
//   }
// }
