import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import BuyTicket from "@/models/buyTicket";
import Comment from "@/models/comment";
import Event from "@/models/eventModel";
import Organization from "@/models/organizationModel";
import Permission from "@/models/permissionModel";
import Post from "@/models/post";
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

    return NextResponse.json({ message: "data delete success" });
  } catch (e) {
    console.log(e);
  }
}
