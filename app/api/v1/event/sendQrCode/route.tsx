import { NextResponse } from "next/server";
import Handlebars from "handlebars";
import { promises as fs } from "fs";

import { transporter, mailOptions } from "@/config/nodemailer";
import User from "@/models/userModel";
import { emailTemplate } from "@/lib/email/email";
import { QrEmailTemplate } from "@/lib/email/QrcodeEmailTemplate";
import { uploadToCloudinary } from "@/util/helper";

import { v2 as cloudinary } from "cloudinary";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);

  const image = await uploadToCloudinary(data.qr);
  console.log(image);

  const user = await User.findOne({ _id: data.userid });

  if (user === null) {
    return NextResponse.json("No User  exists");
  }

  const template = Handlebars.compile(QrEmailTemplate);
  const htmlBody = template({
    qr: data.qr,
  });

  try {
    const res = await transporter.sendMail({
      from: "ruchithsamarawickrama.sg@gmail.com",
      to: user.email,
      subject: "Payment Successfull",
      text: `Payment Successfull. Here is your qr code`,
      html: htmlBody,
      // html: `<img src=${image}  alt="this is qr code"/> this is your qr code`,
    });

    if (res.accepted.length > 0) {
      return NextResponse.json("Email sent successfully");
    }
  } catch (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(user);
}
