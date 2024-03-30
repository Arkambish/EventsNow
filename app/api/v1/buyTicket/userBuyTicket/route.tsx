import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongo/mongodb";
import Event from "../../../../../models/eventModel";
import BuyTicket from "@/models/buyTicket";

export async function POST(req: NextRequest) {
  const { classType, price, image, quantity, eventId, userId } =
    await req.json();
  console.log(classType, price, image, quantity, userId, eventId);
  try {
    connectMongoDB();
    const buyTicket = await BuyTicket.create({
      classType,
      price,
      image,
      quantity,
      eventId,
      userId,
    });
    if (!buyTicket) {
      return NextResponse.json(
        { message: "user buy ticket Failed,try again" },
        { status: 400 }
      );
    }
    return NextResponse.json({ buyTicket }, { status: 201 });
  } catch (e) {
    return NextResponse.json("server error" + e, { status: 500 });
  }
}
