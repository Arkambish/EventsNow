import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongo/mongodb";
import Post from "@/models/post";

export async function POST(req: NextRequest) {
  try {
    const { userName, userImage, eventId, description, image } =
      await req.json();

    if (!userName || !userImage || !eventId || !description || !image) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    connectMongoDB();
    await Post.create({
      userName,
      userImage,
      eventId,
      description,
      image,
    });
    return NextResponse.json(
      { message: "Post Created Successfully" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: " server Error Failed to create post" },
      { status: 500 }
    );
  }
}
