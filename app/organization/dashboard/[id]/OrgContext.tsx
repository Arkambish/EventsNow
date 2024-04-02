"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useParams, notFound } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { AuthContext } from "@/components/Navbar/NavBar";
import {
  ChildrenType,
  EventType,
  OrgContext,
  OrgDashboardType,
  OrganizationTeamType,
  OrganizationType,
  UserType,
  voidFunc,
} from "@/app/Type";

export type Modal =
  | ""
  | "givenPermission"
  | "allPermission"
  | "permissionOneEvent"
  | "selectOneEvent";

export type EventPermission = {
  eventId: string;
  eventPermission: string[];
};

type GettingOrganizationData = {
  organization: OrganizationType;
  message: string;
};
const orgContext = createContext<OrgContext | string>("");
function OrgContextProvider({ children }: ChildrenType) {
  const [status, setStatus] = useState<OrgDashboardType>("dashboard");
  const [revenue, setRevenue] = useState<number>(0);
  const [ticketSold, setTicketSold] = useState<number>(0);
  const [events, setEvents] = useState<EventType[]>([]);
  const [team, setTeam] = useState<OrganizationTeamType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isSlideBar, setIsSlideBar] = useState<boolean>(true);
  const [organization, setOrganization] = useState<OrganizationType | null>(
    null
  );
  const params = useParams();
  const router = useRouter();
  const [editedName, setEditedName] = useState<string>("");
  const [modal, setModal] = useState<Modal>("");
  const [modalUserName, setModalUserName] = useState<string>("");
  const [permissionID, setPermissionID] = useState<string>("");
  const [globalPermission, setGlobalPermission] = useState<string[]>([]);
  const { setOrganizationId } = useAuth() as AuthContext;
  const [selectEventForPermission, setSelectEventForPermission] =
    useState<Event | null>(null);
  const [organizationImage, setOrganizationImage] = useState<string>("");
  const id: string | any = params.id;
  const [eventPermission, setEventPermission] = useState<EventPermission[]>([]);

  useEffect(
    function () {
      async function getData() {
        setIsLoading(true);
        try {
          console.log(params.id);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/getOrganization/${params.id}`
          );

          if (!res.ok) {
            router.push("/404");
            return;
          }

          const organizationDetails: GettingOrganizationData = await res.json();

          if (organizationDetails.message === "No organization") {
            router.push("/404");
          }

          setEditedName(
            organizationDetails.organization.organizationName || ""
          );
          setOrganization(organizationDetails.organization);
          setOrganizationImage(
            organizationDetails.organization.postImageLink || ""
          );

          setIsActive(organizationDetails.organization.isActive);

          // get users in organization
          const res2 = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/v1/permission/getOrganiztionUsers/${params.id}`
          );

          const organizationUser: OrganizationTeamType[] = await res2.json();

          const team: OrganizationTeamType[] = organizationUser.filter(
            (user: OrganizationTeamType) =>
              user.userData.email !== organizationDetails.organization.email
          );

          setTeam(team);
          setOrganizationId(params.id);
          // get events in organization
          const res3 = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/getOrganizationEvent/${params.id}`
          );

          const organizationEvent: EventType[] = await res3.json();
          setEvents(organizationEvent);

          setIsLoading(false);
        } catch (error) {
          router.push("/404");
          notFound();
        }
      }

      getData();
    },
    [params.id, router, setOrganizationId]
  );

  const handleDashboard: voidFunc = () => {
    setStatus("dashboard");
    setIsDashboardOpen(false);
  };

  const handleMyEvent: voidFunc = () => {
    setStatus("myEvents");
    setIsDashboardOpen(false);
  };

  const handleMyTeam: voidFunc = () => {
    setStatus("myTeam");
    setIsDashboardOpen(false);
  };

  const handleReport: voidFunc = () => {
    setStatus("report");
    setIsDashboardOpen(false);
  };

  const handleSetting: voidFunc = () => {
    setStatus("setting");
    setIsDashboardOpen(false);
  };

  return (
    <orgContext.Provider
      value={{
        events,
        handleSetting,
        isSlideBar,
        setIsSlideBar,
        isDashboardOpen,
        setIsDashboardOpen,
        isLoading,
        isActive,
        revenue,
        ticketSold,
        status,
        handleDashboard,
        handleMyEvent,
        handleMyTeam,
        handleReport,
        organization,
        editedName,
        setEditedName,
        modal,
        setModal,
        team,
        setTeam,
        modalUserName,
        setModalUserName,
        permissionID,
        setPermissionID,
        globalPermission,
        setGlobalPermission,
        setEvents,
        selectEventForPermission,
        setSelectEventForPermission,
        eventPermission,
        setEventPermission,
        id,
        organizationImage,
        setOrganizationImage,
      }}
    >
      {children}
    </orgContext.Provider>
  );
}

function useOrg() {
  const context = useContext(orgContext);
  if (context === undefined)
    throw new Error("Organization context was used outside the orgProvider");
  return context;
}
export { OrgContextProvider, useOrg };
