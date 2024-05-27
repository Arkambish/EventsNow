import { NextResponse } from "next/server";
import Handlebars from "handlebars";
// import { promises as fs } from "fs";

type RegisterUser = {
  _id: string;
  userId: string;
  eventId: string;
  eventUpdates: boolean;
  marketingUpdates: boolean;
  email: string;
};

import { transporter, mailOptions } from "@/config/nodemailer";
import User from "@/models/userModel";
import { emailTemplate } from "@/lib/email/email";
import Event from "@/models/eventModel";

export async function POST(req: Request) {
  const { subject, message, eventId } = await req.json();

  const registerUser = await Event.findOne({ _id: eventId });
  if (!registerUser) {
    return NextResponse.json({ message: "No  event" });
  }
  if (registerUser.registerUser.length == 0) {
    return NextResponse.json({ message: "No users registered for the event" });
  }
  const user = await Event.findOne({ _id: eventId }).populate("registerUser");
  console.log(user);

  if (!user) {
    console.log("No users registered for the event");
    return NextResponse.json({ message: "No users registered for the event" });
  }

  const usersArray = user.registerUser;
  const usersEmail = user.registerUser.map((u: RegisterUser) => u.email);

  console.log("usersEmail" + usersEmail);

  if (!usersEmail) {
    console.log("No users registered for the event");

    return NextResponse.json({ message: "No users registered for the event" });
  }

  // const template = Handlebars.compile(emailTemplate);
  // const htmlBody = template({
  //   name: "99x",
  //   URL: `${process.env.NEXT_PUBLIC_URL}/organization/newuser?organizationId=${organizationId}&userId=${user._id}`,
  // });

  try {
    const res = await transporter.sendMail({
      from: "ruchithsamarawickrama.sg@gmail.com",
      to: usersEmail,
      subject: subject,
      // html: htmlBody,
      html: `<h1>${message}</h1>`,
    });

    if (res.accepted.length > 0) {
      console.log("Email sent successfully");
      return NextResponse.json({ message: "Email sent successfully" });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }

  // return NextResponse.json(user);
}
