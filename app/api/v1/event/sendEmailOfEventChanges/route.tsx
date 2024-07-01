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
  const {  eventId } = await req.json();

  console.log("eventId", eventId);

  const event = await Event.findOne({ _id: eventId }).populate("registerUser");
  if (!event) {
    return NextResponse.json({ message: "No  event" });
  }
  if (event.registerUser.length == 0) {
    return NextResponse.json({ message: "No users registered for the event" });
  }
  // const user = await Event.findOne({ _id: eventId }).populate("registerUser");

  // if (!user) {
  //   return NextResponse.json({ message: "No users registered for the event" });
  // }

  const usersArray = event.registerUser;
  const usersEmail = event.registerUser.map((u: RegisterUser) => u.email);

  if (!usersEmail) {
    return NextResponse.json({ message: "No users registered for the event" });
  }

  try {
    const res = await transporter.sendMail({
      from: "eventsnow.project.ruchith@gmail.com",
      to: usersEmail,
      subject: "event details updated",
      text: `here are the new event details `,
      // html: htmlBody,
      html: `<!DOCTYPE html>

      <html
        lang="en"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:v="urn:schemas-microsoft-com:vml"
      >
        <head>
          <title></title>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <!--[if mso
            ]><xml
              ><o:OfficeDocumentSettings
                ><o:PixelsPerInch>96</o:PixelsPerInch
                ><o:AllowPNG /></o:OfficeDocumentSettings></xml
          ><![endif]-->
          <!--[if !mso]><!-->
          <!--<![endif]-->
          <style>
            * {
              box-sizing: border-box;
            }
      
            body {
              margin: 0;
              padding: 0;
            }
      
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
      
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
      
            p {
              line-height: inherit;
            }
      
            .desktop_hide,
            .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
            }
      
            .image_block img + div {
              display: none;
            }
      
            @media (max-width: 660px) {
              .desktop_hide table.icons-inner {
                display: inline-block !important;
              }
      
              .icons-inner {
                text-align: center;
              }
      
              .icons-inner td {
                margin: 0 auto;
              }
      
              .mobile_hide {
                display: none;
              }
      
              .row-content {
                width: 100% !important;
              }
      
              .stack .column {
                width: 100%;
                display: block;
              }
      
              .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
              }
      
              .desktop_hide,
              .desktop_hide table {
                display: table !important;
                max-height: none !important;
              }
      
              .row-2 .column-1 .block-1.image_block .alignment div {
                margin: 0 auto 0 0 !important;
              }
      
              .row-4 .column-1 .block-3.paragraph_block td.pad > div {
                font-size: 27px !important;
              }
            }
          </style>
        </head>
        <body
          style="
            background-color: #f3f2f3;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            text-size-adjust: none;
          "
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="nl-container"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #f3f2f3;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-1"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #ffffff;
                              color: #000000;
                              width: 640px;
                              margin: 0 auto;
                            "
                            width="640"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="divider_block block-1 mobile_hide"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad">
                                        <div align="center" class="alignment">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                            "
                                            width="100%"
                                          >
                                            <tr>
                                              <td
                                                class="divider_inner"
                                                style="
                                                  font-size: 1px;
                                                  line-height: 1px;
                                                  border-top: 30px solid #f3f2f3;
                                                "
                                              >
                                                <span> </span>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-2"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #ffffff;
                              color: #000000;
                              width: 640px;
                              margin: 0 auto;
                            "
                            width="640"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    padding-left: 48px;
                                    padding-top: 33px;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="33.333333333333336%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="image_block block-1"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad" style="width: 100%">
                                        <div
                                          align="center"
                                          class="alignment"
                                          style="line-height: 10px"
                                        >
                                          <div style="max-width: 82px">
                                            <img
                                              height="auto"
                                              src="https://res.cloudinary.com/dpk9utvby/image/upload/v1713429318/logo/p8ziuenkg0j0brdoaz7j.png"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                width: 100%;
                                              "
                                              width="82"
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td
                                  class="column column-2"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="33.333333333333336%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="empty_block block-1"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad">
                                        <div></div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td
                                  class="column column-3"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    padding-bottom: 5px;
                                    padding-left: 48px;
                                    padding-top: 5px;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="33.333333333333336%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="divider_block block-1 mobile_hide"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-left: 10px;
                                          padding-right: 10px;
                                          padding-top: 30px;
                                        "
                                      >
                                        <div align="center" class="alignment">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                            "
                                            width="100%"
                                          >
                                            <tr>
                                              <td
                                                class="divider_inner"
                                                style="
                                                  font-size: 1px;
                                                  line-height: 1px;
                                                  border-top: 0px solid #bbbbbb;
                                                "
                                              >
                                                <span> </span>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-2"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad" style="padding-bottom: 28px">
                                        <div
                                          style="
                                            color: #555555;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                            font-size: 14px;
                                            line-height: 180%;
                                            text-align: center;
                                            mso-line-height-alt: 25.2px;
                                          "
                                        >
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span style="color: #2a272b"
                                              ><strong>EventNow</strong></span
                                            >
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-3"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #f3f2f3;
                              color: #000000;
                              width: 640px;
                              margin: 0 auto;
                            "
                            width="640"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <div
                                    class="spacer_block block-1"
                                    style="
                                      height: 1px;
                                      line-height: 1px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-4"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #ffffff;
                              background-image: url('images/bg-shade.jpg');
                              background-position: center top;
                              background-repeat: repeat;
                              color: #000000;
                              width: 640px;
                              margin: 0 auto;
                            "
                            width="640"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    padding-top: 60px;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="divider_block block-1 mobile_hide"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad" style="padding-top: 50px">
                                        <div align="center" class="alignment">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                            "
                                            width="100%"
                                          >
                                            <tr>
                                              <td
                                                class="divider_inner"
                                                style="
                                                  font-size: 1px;
                                                  line-height: 1px;
                                                  border-top: 0px solid #bbbbbb;
                                                "
                                              >
                                                <span> </span>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-2"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad">
                                        <div
                                          style="
                                            color: #d47151;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                            font-size: 16px;
                                            line-height: 120%;
                                            text-align: center;
                                            mso-line-height-alt: 19.2px;
                                          "
                                        >
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <strong>Event Details Updated</strong>
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-3"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-bottom: 15px;
                                          padding-left: 38px;
                                          padding-right: 38px;
                                          padding-top: 20px;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #555555;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                            font-size: 42px;
                                            line-height: 120%;
                                            text-align: center;
                                            mso-line-height-alt: 50.4px;
                                          "
                                        >
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span style="color: #2a272b"
                                              ><strong>${event.eventName}</strong></span
                                            >
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-4"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-left: 38px;
                                          padding-right: 38px;
                                          padding-top: 10px;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #555555;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                            font-size: 16px;
                                            line-height: 150%;
                                            text-align: center;
                                            mso-line-height-alt: 24px;
                                          "
                                        >
                                          <p style="margin: 0">
                                            Event name : ${event.eventName}
                                          </p>
                                          <p style="margin: 0">
                                            Event type: ${event.selectedTab}
                                          </p>
                                          <p style="margin: 0">
                                            Event venue/platform : ${event.eventLocation}
                                          </p>
                                          <p style="margin: 0">
                                            Event start time : ${event.startTime}
                                          </p>
                                          <p style="margin: 0">
                                            Event End time : ${event.endTime}
                                          </p>
                                          <p style="margin: 0">
                                            Event Starting Date : ${event.eventStartDate.substring(0, 10)}
                                          </p>
                                          <p style="margin: 0">
                                            Event End Date : ${event.eventEndDate.substring(0, 10)}
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <div
                                    class="spacer_block block-5"
                                    style="
                                      height: 60px;
                                      line-height: 60px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="image_block block-6"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad" style="width: 100%">
                                        <div
                                          align="center"
                                          class="alignment"
                                          style="line-height: 10px"
                                        >
                                          <div style="max-width: 640px">
                                            <img
                                              height="auto"
                                              src=${event.eventCoverImage}
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                width: 100%;
                                              "
                                              width="640"
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-7"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-bottom: 10px;
                                          padding-left: 38px;
                                          padding-right: 38px;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #555555;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                            font-size: 12px;
                                            line-height: 150%;
                                            text-align: center;
                                            mso-line-height-alt: 18px;
                                          "
                                        >
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                             
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-5"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #f3f2f3;
                              color: #000000;
                              width: 640px;
                              margin: 0 auto;
                            "
                            width="640"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <div
                                    class="spacer_block block-1"
                                    style="
                                      height: 1px;
                                      line-height: 1px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-6"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #ffffff;
                              color: #000000;
                              width: 640px;
                              margin: 0 auto;
                            "
                            width="640"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    padding-left: 48px;
                                    padding-top: 33px;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="33.333333333333336%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="image_block block-1"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad" style="width: 100%">
                                        <div
                                          align="center"
                                          class="alignment"
                                          style="line-height: 10px"
                                        >
                                          <div style="max-width: 82px">
                                            <img
                                              height="auto"
                                              src="https://res.cloudinary.com/dpk9utvby/image/upload/v1713429318/logo/p8ziuenkg0j0brdoaz7j.png"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                width: 100%;
                                              "
                                              width="82"
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td
                                  class="column column-2"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="33.333333333333336%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="empty_block block-1"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad">
                                        <div></div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td
                                  class="column column-3"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    padding-bottom: 5px;
                                    padding-left: 48px;
                                    padding-top: 5px;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="33.333333333333336%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="divider_block block-1 mobile_hide"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-left: 10px;
                                          padding-right: 10px;
                                          padding-top: 30px;
                                        "
                                      >
                                        <div align="center" class="alignment">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                            "
                                            width="100%"
                                          >
                                            <tr>
                                              <td
                                                class="divider_inner"
                                                style="
                                                  font-size: 1px;
                                                  line-height: 1px;
                                                  border-top: 0px solid #bbbbbb;
                                                "
                                              >
                                                <span> </span>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-2"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-bottom: 28px;
                                          padding-right: 48px;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #555555;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                            font-size: 14px;
                                            line-height: 150%;
                                            text-align: left;
                                            mso-line-height-alt: 21px;
                                          "
                                        >
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            Copyright © 2020
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-7"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #f3f2f3;
                              color: #000000;
                              width: 640px;
                              margin: 0 auto;
                            "
                            width="640"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="15"
                                    cellspacing="0"
                                    class="divider_block mobile_hide block-1"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad">
                                        <div align="center" class="alignment">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                            "
                                            width="100%"
                                          >
                                            <tr>
                                              <td
                                                class="divider_inner"
                                                style="
                                                  font-size: 1px;
                                                  line-height: 1px;
                                                  border-top: 0px solid #bbbbbb;
                                                "
                                              >
                                                <span> </span>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-8"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background-color: #ffffff;
                    "
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #ffffff;
                              color: #000000;
                              width: 640px;
                              margin: 0 auto;
                            "
                            width="640"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="icons_block block-1"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      text-align: center;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          vertical-align: middle;
                                          color: #1e0e4b;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 15px;
                                          padding-bottom: 5px;
                                          padding-top: 5px;
                                          text-align: center;
                                        "
                                      >
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="alignment"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                              <!--[if !vml]><!-->
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                class="icons-inner"
                                                role="presentation"
                                                style="
                                                  mso-table-lspace: 0pt;
                                                  mso-table-rspace: 0pt;
                                                  display: inline-block;
                                                  margin-right: -4px;
                                                  padding-left: 0px;
                                                  padding-right: 0px;
                                                "
                                              >
                                                <!--<![endif]-->
                                                <tr>
                                                  <td
                                                    style="
                                                      vertical-align: middle;
                                                      text-align: center;
                                                      padding-top: 5px;
                                                      padding-bottom: 5px;
                                                      padding-left: 5px;
                                                      padding-right: 6px;
                                                    "
                                                  >
                                                    <a
                                                      href="http://designedwithbeefree.com/"
                                                      style="text-decoration: none"
                                                      target="_blank"
                                                      ><img
                                                        align="center"
                                                        alt="Beefree Logo"
                                                        class="icon"
                                                        height="auto"
                                                        src="images/Beefree-logo.png"
                                                        style="
                                                          display: block;
                                                          height: auto;
                                                          margin: 0 auto;
                                                          border: 0;
                                                        "
                                                        width="34"
                                                    /></a>
                                                  </td>
                                                  <td
                                                    style="
                                                      font-family: 'Inter', sans-serif;
                                                      font-size: 15px;
                                                      font-weight: undefined;
                                                      color: #1e0e4b;
                                                      vertical-align: middle;
                                                      letter-spacing: undefined;
                                                      text-align: center;
                                                    "
                                                  >
                                                    <a
                                                      href="http://designedwithbeefree.com/"
                                                      style="
                                                        color: #1e0e4b;
                                                        text-decoration: none;
                                                      "
                                                      target="_blank"
                                                      >Designed with Beefree</a
                                                    >
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- End -->
        </body>
      </html>
      `,
    });

    if (res.accepted.length > 0) {
      return NextResponse.json({ message: "Email sent successfully" });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
  // return NextResponse.json("email not sent");
}
