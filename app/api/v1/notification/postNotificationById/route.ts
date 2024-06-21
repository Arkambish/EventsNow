import connectMongoDB from "@/lib/mongo/mongodb";
import Notification from "@/models/notification";
import RegisteredUser from "@/models/registeredUserModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    let sendNotificationState = true;

    const { topic, comment, userIds } = await req.json(); // Assuming userIds is an array of user IDs
    console.log(topic);
    console.log(comment);
    console.log(userIds);
    // Iterate over the array of user IDs
    for (const userId of userIds) {
      // Find the user in the database based on the user ID
      // const receiverr = await User.findById(userId);
      const receiverr = await RegisteredUser.findById(userId)
      console.log(receiverr.userId);
      if (!receiverr) {
        continue; // Move on to the next user ID
      }

      // Create a new notification for the user
      const createNotification = await Notification.create({
        topic,
        comment,
        recieverId: receiverr.userId, // Use userId directly since we already have it
      });
      console.log(createNotification);
      if (!createNotification) {
        sendNotificationState = false;
        
      }
    }
    if(sendNotificationState === true ){
      return NextResponse.json(
        { message: "Notifications created successfully" },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: "Error creating notification" },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
