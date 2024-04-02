import connectMongoDB from "@/lib/mongo/mongodb";
import Permission from "@/models/permissionModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { organizationId, userId, globalPermission } = await req.json();
  console.log({ organizationId, userId, globalPermission });

  await connectMongoDB();

  const user = await Permission.findOne({
    userId: userId,
    organizationId: organizationId,
  });

  console.log(user);

  if (user) {
    return NextResponse.json(
      { message: "User already exists in the organization" },
      { status: 400 }
    );
  }

  const res = await Permission.create({
    globalPermission,
    organizationId,
    userId,
  });

  if (!res) {
    return NextResponse.json(
      { message: "Failed to create organizer permission" },
      { status: 500 }
    );
  }

  console.log("success");
  return NextResponse.json(
    { message: "success to create organizer" },
    { status: 201 }
  );
}
