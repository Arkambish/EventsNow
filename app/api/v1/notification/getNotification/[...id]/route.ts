import connectMongoDB from "@/lib/mongo/mongodb";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const orgId = params.id;
  try {
    connectMongoDB();
    console.log("test1");
    console.log("test2");
    console.log(orgId);

    const filternotification = await Notification.findOne({ senderId: orgId });
    console.log(filternotification);
    //const total = await filternotification.countDocuments();
    console.log("test3");
    //console.log(total);

    if (!filternotification) {
      return NextResponse.json(
        { message: "No notifications found" },
        { status: 400 }
      );
    }
    console.log("test4");
    console.log("Notifyyyyyyy mmeeee");
    console.log(filternotification);

    return NextResponse.json({ filternotification });
  } catch (error) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
