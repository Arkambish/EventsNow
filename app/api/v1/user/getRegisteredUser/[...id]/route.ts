export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import RegisteredUser from "@/models/registeredUserModel";

export const GET : any = async (req: Request, { params }: any) => {
  const id = params.id;

  try {
    connectMongoDB();
    const registerdEventsUser = await RegisteredUser.find({ userId: id }).populate(
      "eventId"
    );
    const data = registerdEventsUser; 
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse("Errror in fetching data" + error, { status: 500 });
  }
};
