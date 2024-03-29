import React from "react";
import Footer from "@/components/Footer";
import { formatDate } from "@/util/helper";
import EventViewMode from "@/components/EventViewMode";
import HeroSection from "@/components/HeroSection";
import Test from "@/components/Test";
import IndexPage from "@/components/Test1";
import EventCardDisabled from "@/components/EventCardDisabled";

import { Event } from "./admin/Type";

export interface EventType {
  _id: string;
  eventName: string;
  selectedTab: string;
  eventLocation: string;
  eventStartDate: string;
  startTime: string;
  duration: string;
  eventTimeZone: string;
  description: string;
  postImageLink: string;
  organizationId: [string];
  isPublished: boolean;
  registerUser: [string];
  dashboardImage: string;
  __v: number;
}

async function getOutDateEvent() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/outdatedEvents`,
      { next: { revalidate: 10 } }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function getEvent() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/getPublishedEvents`,
      { next: { revalidate: 10 } }
    );
    const event = await response.json();

    return event;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function Home() {
  const data = await getOutDateEvent();
  const event = await getEvent();

  return (
    <div>
      {/* <Test /> */}

      <HeroSection />

      <EventViewMode event={event} />
      {data.length !== 0 && (
        <div className="font-bold text-[30px] md:text-[40px] lg:text-5xl text-[#906953] drop-shadow-lg ms-8">
          Outdated Events
        </div>
      )}

      <div className="flex flex-wrap ms-12">
        {data.map((e: any) => (
          <EventCardDisabled
            key={e._id}
            name={e.eventName}
            img={e.dashboardImage}
            location={e.selectedTab}
            date={formatDate(e.eventStartDate)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

// import React from "react";
// import PaymentModal from "@/components/PaymentModal";

// export default function page() {
//   const paymentDetails = {
//     items: "Event",
//     oder_id: "123",
//     currency: "LKR",
//     first_name: "Kasun",
//     last_name: "Chathuranga",
//     email: "ruchith.sg@gmail.com",
//     phone: "0771234567",
//     address: "No.1, Galle Road",
//     city: "Colombo",
//     country: "Sri Lanka",
//   };

//   const fullAmount = 500;
//   return (
//     <PaymentModal
//       item={paymentDetails?.items}
//       orderId={paymentDetails?.oder_id}
//       amount={fullAmount}
//       currency={paymentDetails?.currency}
//       first_name={paymentDetails?.first_name}
//       last_name={paymentDetails?.last_name}
//       email={paymentDetails?.email}
//       phone={paymentDetails?.phone}
//       address={paymentDetails?.address}
//       city={paymentDetails?.city}
//       country={paymentDetails?.country}
//     />
//   );
// }
