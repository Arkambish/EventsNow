import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import BuyTicket from "@/models/buyTicket";
import Comment from "@/models/comment";
import Contact from "@/models/contacts";
import Event from "@/models/eventModel";
import Notification from "@/models/notification";
import Organization from "@/models/organizationModel";
import Permission from "@/models/permissionModel";
import Post from "@/models/post";
import RegisteredUser from "@/models/registeredUserModel";
import TicketType from "@/models/ticketType";
import User from "@/models/userModel";

import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await connectMongoDB();
    // await Comment.deleteMany();
    // await TicketType.deleteMany();
    // await Attendant.deleteMany();
    // await BuyTicket.deleteMany();
    // await Post.deleteMany();
    // await Event.deleteMany();
    // await Organization.deleteMany();
    // await Permission.deleteMany();
    // await User.deleteMany();
    // await RegisteredUser.deleteMany();
    // await Notification.deleteMany();
    // await Contact.deleteMany();

    return NextResponse.json({ message: "data delete success" });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
