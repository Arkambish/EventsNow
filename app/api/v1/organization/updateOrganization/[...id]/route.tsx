import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const body = await request.json();

    await connectMongoDB();

    await Organization.findByIdAndUpdate(
      id,
      {
        $set: { ...body },
      },
      { new: true }
    );

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
