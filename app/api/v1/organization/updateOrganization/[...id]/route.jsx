import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const id = params.id;

    const body = await request.json();

    await connectMongoDB();

    {
      /* find by organization id and update */
    }

    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      {
        $set: { ...body },
      },
      { new: true }
    );

    if (!updatedOrganization) {
      throw new Error("Organization not found");
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}
