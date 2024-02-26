import React from "react";
import Container from "./Container";
import GetReportComponent from "./GetReportComponent";

export default function Reports() {
  const getAttendanceReport = () => {
    console.log("Attendance report");
  }
  const getRevenueReport = () => {
    console.log("Revenue report");
  }
  return (
    <Container>
      <div className="pl-10 mb-5 grid gap-2 mt-8 mr-10 pb-8">
        <div className=" font-mono text-custom-orange font-bold text-3xl ">
          REPORTS
        </div>
        <div className=" text-[#455273] font-mono mr-8">
          Get your event report, identify what went well , what could be
          improved and make a better event in future.
        </div>

        <div className="mt-12 grid gap-8 mr-16">
          <GetReportComponent
            reportName="ATTENDANCE REPORT"
            image="attendanceReport"
            getReport={getAttendanceReport}
          />
          <GetReportComponent 
            reportName="REVENUE REPORT" 
            image="revenueReport" 
            getReport={getRevenueReport}
          />
          
        </div>
      </div>
    </Container>
  );
}
