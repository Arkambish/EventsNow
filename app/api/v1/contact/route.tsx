import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongo/mongodb";
import Contact from "../../../../models/contacts";

export async function POST(req: NextRequest) {
  const { 
    first_name,
    last_name,
    email,
    phone_number,
    description,
    checked
 } = await req.json();

    connectMongoDB();

    const contact = await Contact.create({
         first_name,
         last_name,
         email,
         phone_number,
         description, 
         checked, 
        });

    if (!contact) {
      return NextResponse.json(
        { message: "Contact Creation Failed" },
        { status: 400 }
      );
    }
    return NextResponse.json({ contact }, { status: 201 });
  
}
