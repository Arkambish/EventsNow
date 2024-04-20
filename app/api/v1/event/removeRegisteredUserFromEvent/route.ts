import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongo/mongodb";
import User from "@/models/userModel";
import Event from "@/models/eventModel";
import { get } from "lodash";
import RegisteredUser from "@/models/registeredUserModel";
import { UserType } from "@/app/Type";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const data = await request.json();
  

    await connectMongoDB();

    const getUserByemail : UserType | null= await User.findOne({ email: data.email });
    if (!getUserByemail) {
      return NextResponse.json({ message: "User not found" });
    }
   
    const userRegister : any = await RegisteredUser.findOne({userId: getUserByemail._id, eventId: data.eventId});

    if (!userRegister) {
      return NextResponse.json({ message: "User not registered for this event" });
    }

    const eventForUpdate = await Event.findOne({ _id: data.eventId });
    if (!eventForUpdate) {
      return NextResponse.json({ message: "Event not found" });
    }


const newRegisterUserArray = eventForUpdate.registerUser.filter((i: any) => i._id.toString() !== userRegister._id.toString());



const updatedEvent = await Event.findByIdAndUpdate(data.eventId,{
    $set: {

        registerUser: newRegisterUserArray,
      },
    });

    if (!updatedEvent) {
      return NextResponse.json({
        message: "failed to remove user from  event ",
      });
    }

    const newRegisteredEventArray = getUserByemail.registeredEvents.filter(
      (i: any) => i._id.toString() !== userRegister._id.toString()
    );

    const updatedUser : UserType | null = await User.findByIdAndUpdate(getUserByemail._id, {
      $set: {
        registeredEvents: newRegisteredEventArray,
      },
    });

    if (!updatedUser) {
      return NextResponse.json({
        message: "failed to remove user from  event ",
      });
    }

    const removeRegisteredUser : any  = await RegisteredUser.deleteOne({_id: userRegister._id});

    if (!removeRegisteredUser) {
      return NextResponse.json({
        message: "failed to remove user from  event ",
      });
    }

    return NextResponse.json("remove user from the event successfully", {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json("error of the server", { status: 500 });
  }
}
