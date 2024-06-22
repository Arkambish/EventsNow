import connectMongoDB from "../../../../../../lib/mongo/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import BuyTicket from "@/models/buyTicket";

export const GET = async (
  req: Request,
  { params }: { params: { id: string | string[] } }
) => {
  await connectMongoDB();

  try {
    let eventId: string;

    if (Array.isArray(params.id)) {
      eventId = params.id[0];
    } else {
      eventId = params.id;
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      console.error("Invalid eventId:", eventId);
      return NextResponse.json({ success: false, error: "Invalid eventId" });
    }

    const ticketSalesByClass = await BuyTicket.aggregate([
      { $match: { eventId: new mongoose.Types.ObjectId(eventId) } },
      {
        $lookup: {
          from: "tickettypes",
          localField: "ticketId",
          foreignField: "_id",
          as: "ticketTypeDetails",
        },
      },
      { $unwind: "$ticketTypeDetails" },
      {
        $group: {
          _id: "$ticketTypeDetails.classType",
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({ success: true, data: ticketSalesByClass });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error });
  }
};
