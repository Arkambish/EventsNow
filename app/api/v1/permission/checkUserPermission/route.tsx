import connectMongoDB from "@/lib/mongo/mongodb";
import Permission from "@/models/permissionModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { organizationId, userId } = await req.json();

  await connectMongoDB();

  const user = await Permission.findOne({
    userId: userId,
    organizationId: organizationId,
  });

  if (!user) {
    return NextResponse.json(
      { message: " No User  in the organization" },
      { status: 400 }
    );
  }

  return NextResponse.json(user, { status: 200 });
}
