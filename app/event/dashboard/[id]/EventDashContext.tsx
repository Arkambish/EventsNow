"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthContext, useAuth } from "@/app/AuthContext";

import { Post } from "../../host/[id]/SelectTemplate";
import { UserDetails } from "@/app/Type";

import { set } from "mongoose";
import { ca, ro } from "date-fns/locale";
import { error, success } from "@/util/Toastify";

import {
  AttendanceType,
  EventPermissionType,
  EventType,
  voidFunc,
  UserType,
} from "@/app/Type";
import { getUserDetails } from "@/util/helper";

export interface EventContextType {
  isLoading: boolean;
  globalPermission: string[];
  eventPermission: string[];
  id: String;
  status: String;
  handleOverview: voidFunc;
  handleHostPage: voidFunc;
  handleMyteam: voidFunc;
  handleReports: voidFunc;
  handleCampaign: voidFunc;
  handleSetting: voidFunc;
  handleTicket: voidFunc;
  isSideBar: boolean;
  setIsSideBar: (value: boolean) => void;
  setAllTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  event: EventType;
  setEvent: React.Dispatch<React.SetStateAction<EventType>>;

  user: EventUserDeatils[];
  setStatus: Dispatch<SetStateAction<string>>;
  eventPosts: Post[];
  setEventPosts: Dispatch<SetStateAction<Post[]>>;
  allComment: Comment[];
  setAllComment: Dispatch<SetStateAction<Comment[]>>;

  isPageBuilder: boolean;
  setIsPageBuilder: Dispatch<SetStateAction<boolean>>;
  eventname: String;
  eventLocation: String;
  eventType: String;
  eventDate: String;
  eventStartTime: String;
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  endTime: String;
  eventVisibility: boolean;
  income: number;

  setEventname: (value: string) => void;
  setEventLocation: (value: string) => void;
  setEventType: (value: string) => void;
  setEventDate: (value: string) => void;
  setEventStartTime: (value: string) => void;

  setEndTime: (value: string) => void;
  setEventVisibility: (value: boolean) => void;

  eventDashboardImage: string;
  eventCoverImage: string;
  eventEndTime: string;
  startTime: string;
  handleQRreader: voidFunc;
  setEventEndDate: React.Dispatch<React.SetStateAction<string>>;
  eventEndDate: string;
  attendances: AttendanceType[];
  setEventDashboardImage: React.Dispatch<React.SetStateAction<string>>;
  setEventCoverImage: React.Dispatch<React.SetStateAction<string>>;

  allTickets: Ticket[];

  allRegisteredUsers: UserType[];
}

type EventUserDeatils = {
  email: string;
  name: string;
};
type Comment = {
  _id: string;
  userImage: string;
  postId: string;
  description: string;
};
type Ticket = {
  _id: string;
  eventId: string;
  price: number;
  classType: string;
  image: string;
};

const EventContext = createContext<EventContextType | string>("");

function EventContextProvider({ children }: { children: React.ReactNode }) {
  const { setEventPublish } = useAuth() as AuthContext;
  const [status, setStatus] = useState<string>("qrreader");
  const params = useParams<{ id: string }>();
  const [isSideBar, setIsSideBar] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventPosts, setEventPosts] = useState<Post[]>([]);
  const [allComment, setAllComment] = useState<Comment[]>([]);
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [allRegisteredUsers, setAllRegisteredUsers] = useState<UserType[]>([]);

  const [isPageBuilder, setIsPageBuilder] = useState<boolean>(false);

  const handleOverview: voidFunc = () => {
    setStatus("overview");
  };
  const [user, setUser] = useState<EventUserDeatils[]>([]);
  const handleHostPage: voidFunc = () => {
    setStatus("hostpage");
  };
  const handleMyteam: voidFunc = () => {
    setStatus("myteam");
  };
  const handleReports: voidFunc = () => {
    setStatus("reports");
  };
  const handleQRreader: voidFunc = () => {
    setStatus("qrreader");
  };
  const handleCampaign: voidFunc = () => {
    setStatus("campaign");
  };
  const handleSetting: voidFunc = () => {
    setStatus("settings");
  };
  const handleTicket: voidFunc = () => {
    setStatus("tickets");
  };

  const id = useParams<{ id: string }>().id;
  const [event, setEvent] = useState<EventType>({
    selectedTab: "",
    eventStartDate: "",
    startTime: "",
    _id: "",
    eventName: "",
    organizationId: "",
    description: "",
    coverImage: "",
    dashboardImage: "",
    isPublished: false,
    template: "",
    registerUser: [],
    location: "",
    eventEndDate: "",
    endTime: "",
    __v: 0,
    income: 0,
    eventLocation: "",
  });
  const [eventname, setEventname] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventEndDate, setEventEndDate] = useState<string>("");
  const [eventStartTime, setEventStartTime] = useState<string>("");
  const [eventEndTime, setEventEndTime] = useState<string>("");
  const [income, setIncome] = useState<number>(0);

  const [endTime, setEndTime] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [eventVisibility, setEventVisibility] = useState<boolean>(false);
  const [eventCoverImage, setEventCoverImage] = useState<string>("");
  const [eventDashboardImage, setEventDashboardImage] = useState<string>("");

  const [globalPermission, setGlobalPermission] = useState<string[]>([]);
  const [eventPermission, setEventPermission] = useState<string[]>([]);

  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  const router = useRouter();

  // const createTicketHandler = async () => {
  //   try {
  //     const res = await fetch(`/api/v1/ticket/addTicket`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         price: newTicketPrice,
  //         image: newTicketImage,
  //         eventId: params.id,
  //         classType: newTicketClass,
  //       }),
  //     });
  //     if (!res.ok) {
  //       error("Failed to create ticket");

  //       return;
  //     }
  //     setAllTickets([...allTickets, await res.json()]);
  //     success("Ticket created successfully");
  //   } catch (e) {}
  // };

  useEffect(() => {
    setIsLoading(true);
    const getEvent = async () => {
      const res = await fetch(`/api/v1/event/getOneEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.id,
        }),
      });
      if (!res.ok) {
        router.push("/404");
        return;
      }
      const data = await res.json();
      return data;
    };

    const eventPost = async () => {
      const res = await fetch(`/api/v1/post/getAllPostEvent/${params.id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();

      return data;
    };

    const getUser = async () => {
      const res = await fetch(`/api/v1/event/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.id,
        }),
      });
      if (!res.ok) {
        return;
      }
      const data = await res.json();

      return data;
    };

    const getAttendence = async () => {
      const res = await fetch(`/api/v1/attendant/getAttendants/${id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();

      return data;
    };

    async function handleContext() {
      setIsLoading(true);
      const event = await getEvent();

      const userPermissionData = await getUserDetails({
        organizationId: event.organizationId,
      });

      setGlobalPermission(userPermissionData.globalPermission);
      const getEventPermission = userPermissionData.eventPermission.filter(
        (item: EventPermissionType) => item.eventId === params.id
      );

      setEventPermission(
        getEventPermission[0]?.eventPermission
          ? getEventPermission[0]?.eventPermission
          : []
      );

      if (event.message === "No event") {
        router.push("/404");
        return;
      }
      setEvent(event);
      setEventname(event.eventName);
      setEventLocation(event.eventLocation);
      setEventType(event.selectedTab);
      setEventDate(event.eventStartDate);
      setEventEndDate(event.eventEndDate);
      setEventStartTime(event.startTime);

      setIncome(event.income);

      setAllRegisteredUsers(event.registerUser);

      setEndTime(event.endTime);
      setEventPublish(event.isPublished);
      setEventVisibility(event.isPublished);
      setEventCoverImage(event.coverImage);
      setEventDashboardImage(event.dashboardImage);
      setEventEndTime(event.eventEndDate);

      const user = await getUser();

      if (!user) {
        return;
      }
      setUser(user);

      const posts = await eventPost();
      setEventPosts(posts);

      const attendance = await getAttendence();
      setAttendances(attendance);
    }
    handleContext();

    async function getTickets() {
      const res = await fetch(`/api/v1/ticket/getTicket/${params.id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setAllTickets(data);
    }
    getTickets();
    setIsLoading(false);
  }, [params.id, router, setEventPublish, status, id]);

  return (
    <EventContext.Provider
      value={{
        isLoading,
        isPageBuilder,
        setIsPageBuilder,
        attendances,
        isPreview,
        setIsPreview,
        setEventEndDate,
        eventEndDate,
        event,
        setEvent,
        id,
        status,
        user,
        handleOverview,
        handleHostPage,
        handleMyteam,
        handleReports,
        handleCampaign,
        handleSetting,
        handleTicket,
        isSideBar,
        setIsSideBar,
        handleQRreader,
        setStatus,
        eventPosts,
        setEventPosts,
        allComment,
        setAllComment,

        eventname,
        eventLocation,
        eventType,
        eventDate,
        eventStartTime,
        income,

        endTime,
        eventVisibility,
        eventEndTime,
        startTime,

        eventDashboardImage,
        eventCoverImage,

        setEventname,
        setEventLocation,
        setEventType,
        setEventDate,
        setEventStartTime,

        setEndTime,
        setEventVisibility,

        setEventDashboardImage,
        setEventCoverImage,
        setAllTickets,
        allTickets,

        // createTicketHandler,

        allRegisteredUsers,

        eventPermission,
        globalPermission,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

function UseEventContext() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error(
      "useEventContext must be used within a EventContextProvider"
    );
  }
  return context;
}

export { EventContextProvider, UseEventContext };
