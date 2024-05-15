import React from "react";
import Container from "./Container";
import GetReportComponent from "./GetReportComponent";
import CheckPermission from "./CheckPermission";

export default function Reports() {
  const getAttendanceReport = () => {};
  const getRevenueReport = () => {};
  return (
    <Container>
      <div className="pl-10 mb-5 grid gap-2 mt-8 mr-10 pb-8">
        <div className="  text-stone-600 font-IBM font-medium text-3xl ">
          REPORTS
        </div>
        <div className=" text-[#455273]  md:mr-8">
          Get your event report, identify what went well , what could be
          improved and make a better event in future.
        </div>

        <div className="mt-12 grid gap-8 lg:mr-16">
          <CheckPermission
            provideGlobalPermission={["View Attendees"]}
            provideEventPermission={["View Attendees"]}
          >
            <GetReportComponent
              reportName="ATTENDANCE REPORT"
              image="attendanceReport"
              // getReport={getAttendanceReport}
              linkToDetails="totalAttendence"
              size={80}
            />
          </CheckPermission>

          <CheckPermission
            provideGlobalPermission={["Manage Payments"]}
            provideEventPermission={["Manage Payments"]}
          >
            <GetReportComponent
              reportName="REVENUE REPORT"
              image="revenueReport"
              // getReport={getRevenueReport}
              linkToDetails="totalRevenue"
              size={95}
            />
          </CheckPermission>
        </div>
      </div>
    </Container>
  );
}
