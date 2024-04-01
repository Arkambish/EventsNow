import connectMongoDB from "@/lib/mongo/mongodb";
import Permission from "@/models/permissionModel";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await connectMongoDB();

    const res = await Permission.findByIdAndDelete({ _id: id });

    if (!res) {
      return NextResponse.json(
        { message: "Failed to delete user permission" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "success toelete user permission" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
