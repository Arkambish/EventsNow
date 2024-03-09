import React from "react";
import ProfileDetails from "./ProfileDetails";
import WishListCard from "./WishListCard";
import { useProf } from "../ProfContext";

type EvenDetails = {
  eventDetails: any[];
};

export default function MyProfile() {
  const { eventDetails } = useProf() as any as EvenDetails;
  return (
    <div className="flex flex-col h-screen md:flex-row rounded-lg shadow-3xl bg-[#fff] pt-8 justify-start items-start gap-12 overflow-y-scroll">
      <div className="w-full ml-0 overflow-y-auto">
        <div className="text-3xl font-semibold text-custom-orange font-IBM ml-[55px]">
          Wish List
        </div>
        <div>
          {eventDetails ? (
            eventDetails.map((e: any) => (
              <WishListCard
                EventName={e.eventName}
                Location={e.selectedTab}
                Time={e.startTime}
                Date={e.eventStartDate}
                Ratings={"4.5"}
                image={e.postImageLink}
                buttonDesc={"Remove from wishlist"}
              />
            ))
          ) : (
            <p>No events found in the wishlist.</p>
          )}
        </div>
      </div>
    </div>
  );
}
