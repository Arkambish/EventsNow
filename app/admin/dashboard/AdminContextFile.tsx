"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// import { AdminContext, voidFunc, User, Organization } from "@/app/admin/Type";
import { getAllEvents, getAllOrganization, getAllUser } from "./FetchData";
import { getSession } from "next-auth/react";
import { getUser } from "@/components/Navbar/NavBar";
import { useParams, useRouter } from "next/navigation";
import {
  AdminContext,
  EventType,
  OrganizationType,
  UserType,
  voidFunc,
} from "@/app/Type";
import { FetchPost } from "@/hooks/useFetch";
import { error, success } from "@/util/Toastify";

interface AdminContextProps {
  children: React.ReactNode;
}

const adminContext = createContext<AdminContext | string>("");

function AdminContextProvider({ children }: AdminContextProps) {
  const [status, setStatus] = useState("");
  const [user, setUser] = useState<UserType[]>([]);
  const [event, setEvent] = useState<EventType[]>([]);
  const [notification, setNotification] = useState<OrganizationType[]>([]);
  const [organization, setOrganization] = useState<OrganizationType[]>([]);
  const [payment, setPayment] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const params = useParams();

  const handleNotification: voidFunc = () => {
    setStatus("Notification");
  };
  const handleOrganization: voidFunc = () => {
    setStatus("Organization");
  };
  const handleEvent: voidFunc = () => {
    setStatus("Event");
  };
  const handleUser: voidFunc = () => {
    setStatus("User");
  };
  const handlePayments: voidFunc = () => {
    setStatus("Payments");
  };

  //fetch all data from the api and set the state
  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const session = await getSession();
      if (!session) {
        router.push("/404");
      }

      const data = await getUser({ email: session?.user?.email });

      if (data.role !== "admin") {
        router.push("/404");
      }

      const allOrg = await getAllOrganization();

      if (!allOrg.ok) {
        setIsLoading(false);
        return;
      }

      const { organization } = await allOrg.json();

      const resActive = organization.filter(
        (org: OrganizationType) => org.isActive
      );
      const notActive = organization.filter(
        (org: OrganizationType) => !org.isActive
      );

      if (resActive.length !== 0) {
        setOrganization(resActive);
      }
      if (notActive.length !== 0) {
        setNotification(notActive);
      }

      const allUser = await getAllUser();

      if (!allUser.ok) {
        setIsLoading(false);
        return;
      }

      const users = await allUser.json();

      setUser(users);

      const allEvent = await getAllEvents();

      if (!allEvent.ok) {
        setIsLoading(false);
        return;
      }

      const events = await allEvent.json();

      setEvent(events);

      setIsLoading(false);
    }

    getData();
  }, [router]);

  return (
    //provide adminContext values to child components

    <adminContext.Provider
      value={{
        status,
        handleNotification,
        handleOrganization,
        handleEvent,
        handleUser,
        handlePayments,
        notification,
        organization,
        event,
        user,
        payment,
        setNotification,
        setOrganization,
        setEvent,
        setUser,
        setPayment,
        isLoading,
      }}
    >
      {children}
    </adminContext.Provider>
  );
}

function useAdmin() {
  const context = useContext(adminContext);
  if (context === undefined)
    throw new Error("Admin context was used outside the AdminProvider");
  return context;
}
export { AdminContextProvider, useAdmin };
