import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongo/mongodb";
import User from "@/models/userModel";
import Event from "@/models/eventModel";
import RegistrationUser from "@/models/registeredUserModel";
import { UserType } from "@/app/Type";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await connectMongoDB();

    const user: UserType | null = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const checkRegisterUser = await RegistrationUser.findOne({
      userId: user._id,
      eventId: data.eventId,
    });
    if (checkRegisterUser) {
      return NextResponse.json({ message: "User Already Registered" });
    }

    const registerUser = await RegistrationUser.create({
      userId: user._id,
      email: user.email,
      eventId: data.eventId,
      eventUpdates: data.sendEventUpdates,
      marketingUpdates: data.sendMarketingUpdates,
    });

    if (!registerUser) {
      return NextResponse.json(
        { message: "Registration Failed" },
        { status: 400 }
      );
    }

    const eventForUpdate = await Event.findOne({ _id: data.eventId });
    if (!eventForUpdate) {
      return NextResponse.json({ message: "Event not found" });
    }

    const newRegisterUserArray = [
      ...eventForUpdate.registerUser,
      registerUser._id,
    ];

    const updatedEvent = await Event.findByIdAndUpdate(data.eventId, {
      $set: {
        registerUser: newRegisterUserArray,
      },
    });

    if (!updatedEvent) {
      return NextResponse.json({
        message: "failed to register user to  event ",
      });
    }

    const newRegisteredEventArray = [
      ...user.registeredEvents,
      registerUser._id,
    ];
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $set: {
        registeredEvents: newRegisteredEventArray,
      },
    });
    if (!updatedUser) {
      return NextResponse.json({
        message: "failed to register user to  event ",
      });
    }

    return NextResponse.json(registerUser, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Registration Failed" },
      { status: 400 }
    );
  }
}
