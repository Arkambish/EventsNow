import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongo/mongodb";
import User from "@/models/userModel";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { userId, eventId } = await request.json();
    await connectMongoDB();

    const getUserById = await User.findOne({ _id: userId });
    if (!getUserById) {
      return NextResponse.json({ message: "User not found" });
    }

    const newWishListArray = getUserById.wishListId.filter(
      (i: any) => i._id.toString() !== eventId.toString()
    );

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: {
        wishListId: newWishListArray,
      },
    });
    console.log(updatedUser);

    if (!updatedUser) {
      return NextResponse.json({ message: "failed to add event to wishList " });
    }
    return NextResponse.json({ message: "event removed from wishList" });
  } catch (e) {
    return NextResponse.json("error of the server", { status: 500 });
  }
}
