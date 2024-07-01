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
import QrReader from "./QrReader";
import Tickets from "./Tickets";
import RegisteredUsersList from "./RegisteredUsersList";

export default function MidContent() {
  const { status } = UseEventContext() as EventContextType;
  return (
    <div className=" h-full ">
      {status === "overview" && <Overview />}
      {status === "hostpage" && <Hostpage />}
      {status === "myteam" && <Myteam />}
      {status === "reports" && <Reports />}
      {status === "campaign" && <Campaign />}
      {status === "settings" && <Settings />}

      {status === "tickets" && <Tickets />}
      {status === "editpost" && <EditPost />}
      {status === "sendemail" && <SendEmail />}
      {/* attendance report  */}
      {status === "attendance" && <Attendance />} 

      
      {status === "revenue" && <Revenue />}

      {status === "qrreader" && <QrReader />}

      {status === "registeredusers" && <RegisteredUsersList />}
    </div>
  );
}
