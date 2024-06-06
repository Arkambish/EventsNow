import { NextResponse } from "next/server";
import Handlebars from "handlebars";

import { transporter, mailOptions } from "@/config/nodemailer";
import User from "@/models/userModel";
import { emailTemplate } from "@/lib/email/email";

export async function POST(req: Request) {
  try {
    const { email, organizationId } = await req.json();

    const user = await User.findOne({ email });

    if (user === null) {
      return NextResponse.json("No User  exists");
    }

    const template = Handlebars.compile(emailTemplate);
    const htmlBody = template({
      name: "99x",
      URL: `${process.env.NEXT_PUBLIC_URL}/organization/newuser?organizationId=${organizationId}&userId=${user._id}`,
    });

    try {
      const res = await transporter.sendMail({
        from: "eventsnow.project.ruchith@gmail.com",
        to: email,
        subject: "Invitation to join the organization",
        text: `You have been invited to join the organization`,
        html: htmlBody,
      });

      if (res.accepted.length > 0) {
        return NextResponse.json("Email sent successfully");
      }
    } catch (error) {
      return NextResponse.json(error);
    }

    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
