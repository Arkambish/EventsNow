import React from "react";
import WishListCard from "./WishListCard";
import { useProf } from "../ProfContext";
import EmptyStateComponent from "@/components/EmptyStateComponent";
export type EventDetails = {
  eventDetails: any[];
};

export default function MyProfile() {
  const { eventDetails } = useProf() as any as EventDetails;

  return (
    <div className="flex flex-col  md:flex-row rounded-lg   pt-8 justify-start items-start gap-12 h-full">
      <div className="w-full ml-0 ">
        <div className="text-3xl font-semibold text-stone-600 font-IBM ml-[55px]">
          Wish List
        </div>
        <div className="m-6   overflow-y-scroll sm:max-h-80 xl:max-h-96 scroll-smooth">
          {eventDetails.length > 0 ? (
            eventDetails.map((e: any) => (
              <WishListCard
                key={e._id}
                eId={e._id}
                EventName={e.eventName}
                Location={e.selectedTab}
                Time={e.startTime}
                Date={e.eventStartDate}
                image={e.coverImage}
              />
            ))
          ) : (
            <EmptyStateComponent message="No events found in the wishlist." />
          )}
        </div>
      </div>
    </div>
  );
}
