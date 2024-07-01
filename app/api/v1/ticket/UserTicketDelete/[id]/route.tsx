import connectMongoDB from "@/lib/mongo/mongodb";
import BuyTicket from "@/models/ticketType";

import User from "@/models/userModel";

import { NextResponse } from "next/server";
type Params = {
  id: string;
};
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    await connectMongoDB(); // Await the connection establishment

    const id = params.id;

    const data = await BuyTicket.deleteOne({ _id: id });

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
    // return NextResponse.error(); // Return an error response
  }
}
