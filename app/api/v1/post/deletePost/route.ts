import connectMongoDB from "@/lib/mongo/mongodb";
import { NextResponse } from "next/server";
import Post from "@/models/post";

export async function DELETE(req: Request) {
  try {
    connectMongoDB();
    const { id } = await req.json();

    const data = await Post.findByIdAndDelete(id);

    if (!data) {
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}