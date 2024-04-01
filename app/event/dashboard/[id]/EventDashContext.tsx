"use client";
import { voidFunc } from "@/app/organization/dashboard/[id]/Type";

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
// import { Post } from "../../host/[id]/components/PostTab";

import { Post } from "../../host/[id]/SelectTemplate";
import { set } from "mongoose";
import { ca } from "date-fns/locale";
import { error, success } from "@/util/Toastify";
import { AttendanceType, EventType } from "@/app/Type";

export interface EventContextType {
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

  eventname: String;
  eventLocation: String;
  eventType: String;
  eventDate: String;
  eventStartTime: String;
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  endTime: String;
  eventVisibility: boolean;

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
  newTicketPrice: number;
  newTicketClass: string;
  newTicketImage: string;
  setNewTicketPrice: React.Dispatch<React.SetStateAction<number>>;
  setNewTicketClass: React.Dispatch<React.SetStateAction<string>>;
  setNewTicketImage: React.Dispatch<React.SetStateAction<string>>;
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
  const [status, setStatus] = useState("tickets");
  const params = useParams<{ id: string }>();
  const [isSideBar, setIsSideBar] = useState(true);

  const [eventPosts, setEventPosts] = useState<Post[]>([]);
  const [allComment, setAllComment] = useState<Comment[]>([]);
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);

  const [isloading, setIsloading] = useState(false);

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
  });
  const [eventname, setEventname] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventEndDate, setEventEndDate] = useState<string>("");
  const [eventStartTime, setEventStartTime] = useState<string>("");
  const [eventEndTime, setEventEndTime] = useState<string>("");

  const [endTime, setEndTime] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [eventVisibility, setEventVisibility] = useState<boolean>(false);
  const [eventCoverImage, setEventCoverImage] = useState<string>("");
  const [eventDashboardImage, setEventDashboardImage] = useState<string>("");

  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  const router = useRouter();

  //new ticket details
  const [newTicketPrice, setNewTicketPrice] = useState<number>(0);
  const [newTicketClass, setNewTicketClass] = useState<string>("");
  const [newTicketImage, setNewTicketImage] = useState<string>("");

  useEffect(() => {
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
      const event = await getEvent();
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

      setEndTime(event.endTime);
      // setStartTime(event.startTime);
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
  }, [params.id, router, setEventPublish, status, id]);

  return (
    <EventContext.Provider
      value={{
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
        newTicketPrice,
        newTicketClass,
        newTicketImage,
        setNewTicketPrice,
        setNewTicketClass,
        setNewTicketImage,
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
