import React from "react";
import Footer from "@/components/Footer";
import EventCardDisabled from "@/components/EventCardDisabled";
import { formatDate } from "@/util/helper";
import EventViewMode from "@/components/EventViewMode";
import HeroSection from "@/components/HeroSection";
import { EventType } from "./Type";
import useUser from "@/hooks/useUser";
import { redirect } from "next/navigation";

async function getOutDateEvent() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/outdatedEvents`,
      { cache: "no-cache" }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching outdated events:", error);
    return [];
  }
}

async function getEvent() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/getPublishedEvents`,
      { next: { revalidate: 0 } }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching published events:", error);
    return [];
  }
}

export default async function Home() {
  // const [username] = useUser();
  // if (!username) {
  //   redirect("/home");
  // }

  const data = await getOutDateEvent();
  const event = await getEvent();

  return (
    <div className="scroll-smooth">
      <HeroSection />
      <EventViewMode event={event} />
      <div className="font-bold text-[30px] md:text-[40px] lg:text-5xl text-[#906953] drop-shadow-lg ms-8">
        Outdated Events
      </div>
      {data.length !== 0 && (
        <div className="flex-wrap justify-center items-center flex">
          {data.slice(0, 6).map((e: EventType) => (
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

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const username = req.cookies["next-auth.session-token"];
//   return {
//     props: {
//       username: username || "",
//     },
//   };
// };
