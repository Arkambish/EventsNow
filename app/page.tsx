import React from "react";
import Footer from "@/components/Footer";
import EventCardDisabled from "@/components/EventCardDisabled";
import { formatDate } from "@/util/helper";
import EventViewMode from "@/components/EventViewMode";
import HeroSection from "@/components/HeroSection";
import { EventType } from "./Type";
import EventsPage from "@/components/EventViewMode";

async function getOutDateEvent() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/outdatedEvents`,
      { cache: "no-cache" }
    );
    const data = await response.json();

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
      <HeroSection />

      <EventViewMode event={event} />

      <div className="font-bold text-[30px] md:text-[40px] lg:text-5xl text-[#906953] drop-shadow-lg ms-8">
        Outdated Events
      </div>

      {data.length !== 0 && (
        <div className="flex flex-wrap ms-12">
          {data.map((e: EventType) => (
            <EventCardDisabled
              key={e._id}
              name={e.eventName}
              img={e.dashboardImage}
              location={e.selectedTab}
              date={formatDate(e.eventStartDate)}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
