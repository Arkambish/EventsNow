import connectMongoDB from "@/lib/mongo/mongodb";
import { NextResponse } from "next/server";
import Permission from "@/models/permissionModel";
import { ObjectId } from "mongodb";

type Params = {
  id: string;
};

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const id = params.id;

    const body = await request.json();

    await connectMongoDB();

    const response = await Permission.find({ _id: id });
    console.log(response);
    console.log(response[0].eventPermission.length);
    if (response[0].eventPermission.length == 0) {
      const res = await Permission.findByIdAndUpdate(
        id,
        {
          $set: { eventPermission: [body] },
        },
        { new: true }
      );

      if (!response) {
        return NextResponse.json(
          { message: "Failed to update global permission" },
          { status: 500 }
        );
      }

      return NextResponse.json({ res });
    }

    const isEventPermissionExist = response[0].eventPermission.find(
      (data: any) => data.eventId == body.eventId
    );

    console.log(isEventPermissionExist);

    if (isEventPermissionExist) {
      const bodyEventId = new ObjectId(isEventPermissionExist.eventId);

      const a = response[0].eventPermission.filter((data: any) => {
        return data.eventId.toString() !== bodyEventId.toString();
      });

      isEventPermissionExist.eventPermission = body.eventPermission;

      const newPermission = [...a, isEventPermissionExist];

      const newPermissionRes = await Permission.findByIdAndUpdate(
        id,
        {
          $set: { eventPermission: newPermission },
        }
        // { new: true }
      );

      if (!newPermissionRes) {
        return NextResponse.json(
          { message: "Failed to update event permission" },
          { status: 500 }
        );
      }
      return NextResponse.json({ newPermissionRes });
    } else {
      console.log(body);
      console.log(response[0].eventPermission);
      const newPermission = [...response[0].eventPermission, body];
      const newPermissionRes = await Permission.findByIdAndUpdate(
        id,
        {
          $set: { eventPermission: newPermission },
        }
        // { new: true }
      );

      if (!newPermissionRes) {
        return NextResponse.json(
          { message: "Failed to update event permission" },
          { status: 500 }
        );
      }
      return NextResponse.json({ newPermissionRes });
    }
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
