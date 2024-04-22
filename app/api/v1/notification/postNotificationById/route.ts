import connectMongoDB from "@/lib/mongo/mongodb";
import Notification from "@/models/notification";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { topic, comment, userIds } = await req.json(); // Assuming userIds is an array of user IDs

    // Iterate over the array of user IDs
    for (const userId of userIds) {
      // Find the user in the database based on the user ID
      const receiverr = await User.findById(userId);
      if (!receiverr) {
        console.log(`User with ID ${userId} not found`);
        continue; // Move on to the next user ID
      }
      console.log(userId);

      // Create a new notification for the user
      const createNotification = await Notification.create({
        topic,
        comment,
        recieverId: userId, // Use userId directly since we already have it
      });

      if (!createNotification) {
        return NextResponse.json(
          { message: "Error creating notification" },
          { status: 500 }
        );
      }

      console.log(createNotification);
    }

    return NextResponse.json(
      { message: "Notifications created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
