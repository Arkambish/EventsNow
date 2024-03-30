"use client";
import React from "react";
import { UseEventContext, EventContextType } from "../EventDashContext";
import Overview from "./Overview";
import Campaign from "./Campaign";
import Settings from "./Settings";
import Hostpage from "./Hostpage";
import Myteam from "./Myteam";
import Reports from "./Reports";
import EditPost from "./EditPost";
import SendEmail from "./SendEmail";
import Attendance from "./overviewModal/Attendance";
import Revenue from "./overviewModal/Revenue";
import Tickets from "./Tickets";

export default function MidContent() {
  const { status } = UseEventContext() as EventContextType;
  return (
    <div>
      {status === "overview" && <Overview />}
      {status === "hostpage" && <Hostpage />}
      {status === "myteam" && <Myteam />}
      {status === "reports" && <Reports />}
      {status === "campaign" && <Campaign />}
      {status === "settings" && <Settings />}
      {status === "editpost" && <EditPost />}
      {status === "sendemail" && <SendEmail />}
      {status === "attendance" && <Attendance />}
      {status === "revenue" && <Revenue />}
      {status === "tickets" && <Tickets />}
    </div>
  );
}
