import connectMongoDB from "../../../../../../lib/mongo/mongodb";
import BuyTicket from "@/models/buyTicket";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  connectMongoDB();
  console.log("connected");
  try {
    const id = params.id;
    const buyTicket = await BuyTicket.find({ eventId: id });
    return NextResponse.json({ success: true, data: buyTicket.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
};
