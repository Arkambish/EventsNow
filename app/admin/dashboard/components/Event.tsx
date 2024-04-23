import React, { useState, useEffect } from "react";
import SuperadminPages from "@/app/admin/dashboard/components/SuperadminPages";
// import { AdminContext } from "@/app/admin/Type";
import { useAdmin } from "../AdminContextFile";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import Spinner from "@/components/Spinner";
import { getAllEvents } from "../FetchData";
import EventCardNewOrg from "@/components/EventCardNewOrg";
import { AdminContext, EventType } from "@/app/Type";
import { People } from "@/app/organization/dashboard/[id]/components/InviteButton";

export default function Event() {
  const { event, setEvent } = useAdmin() as AdminContext;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filterEventData, setFilterEventData] = useState<EventType[]>(event);

  const [selectEvent, setSelectEvent] = useState<People>({
    id: "",
    name: "",
  });

  const searchEventData = event.map((event: EventType) => ({
    id: event._id,
    name: event.eventName,
  }));

  function handleSearchBtn() {
    if (selectEvent.name === "") {
      setFilterEventData(event);
      return;
    }
    setFilterEventData(() => {
      return event.filter((event) => event.eventName === selectEvent.name);
    });
  }

  function handleAllBtn() {
    setSelectEvent({ id: "", name: "" });
    setFilterEventData(event);
  }

  const serachData = {
    data: searchEventData,
    select: selectEvent,
    setSelect: setSelectEvent,
    handleSearchBtn,
    placeholder: "Event name",
    handleAllBtn,
  };

  async function reloadPage() {
    setIsLoading(true);

    const res2 = await getAllEvents();

    if (!res2.ok) {
      setIsLoading(false);
      return;
    }

    const finalRes1 = await res2.json();

    setEvent(finalRes1);
    setIsLoading(false);
  }

  return (
    <div>
      <SuperadminPages
        serachData={serachData}
        title="All Events"
        description="You can see all the events currently available from here."
        text="Search Events"
        reloadPage={reloadPage}
        customComponent={
          <>
            {isLoading ? (
              <Spinner />
            ) : event.length === 0 ? (
              <EmptyStateComponent message="No Events" />
            ) : (
              filterEventData.map((e) => (
                <EventCardNewOrg key={e._id} event={e} />
              ))
            )}
            {}
          </>
        }
      />
    </div>
  );
}
