export const dynamic = "force-dynamic";

import connectMongoDB from "@/lib/mongo/mongodb";
import Event from "@/models/eventModel";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(req: Request, { params }: { params: Params }) {
  const id = params.id;
  // const id = await req.json();
  connectMongoDB();
  const event = await Event.findOne({ _id: id });

  if (!event) {
    return NextResponse.json({ message: "No event" });
  }
  return NextResponse.json(event);
}
