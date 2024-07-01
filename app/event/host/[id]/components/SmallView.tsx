import React from "react";
import Image from "next/image";
import PostTab from "./PostTab";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { error, success } from "@/util/Toastify";
import { getSession } from "next-auth/react";

import { FaRegRegistered } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoIosCard } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoIosTime } from "react-icons/io";
import { FaTicketSimple } from "react-icons/fa6";

import RegistrationForEventModalSmall from "./RegistrationForEventModalSmall";
import {
  EventContextType,
  UseEventContext,
} from "../../../dashboard/[id]/EventDashContext";

interface SmallView {
  EventName: String;
  Location: String;
  Time: String;
  Date: String;
  preview?: boolean;
  activeComponent: string; // Add prop for active component
  handleComponentChange?: (component: string) => void; // Add prop for handle component change
}

type Ticket = {
  _id: string;
  eventId: string;
  price: number;
  classType: string;
  image: string;
};

interface customUser {
  email: string;
  name: string;
  image: string;
  _id: string;
}

export default function SmallView({
  EventName,
  Location,
  Time,
  Date,
  activeComponent,
  preview = false,
  handleComponentChange,
}: SmallView) {
  const { allTickets } = UseEventContext() as EventContextType;
  const [activeButton, setActiveButton] = useState<number | null>(1);

  const [isRegModalShow, setIsRegModalShow] = useState<boolean>(false);
  const [eventUpdates, setEventUpdates] = useState(false);
  const [marketingUpdates, setMarketingUpdates] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [registeredUserList, setRegisteredUserList] = useState<string[] | null>(
    null
  );

  const [isActiveTicketModal, setIsActiveTicketModal] =
    useState<boolean>(false);
  const [isActiveProceedTicketModal, setIsActiveProceedTicketModal] =
    useState<boolean>(false);
  function buyTckets() {}

  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [isAddWishList, setIsAddWishList] = useState<boolean>(false);

  const handleClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);
  };

  const id = useParams<{ id: string }>().id;
  const [allBuyTicketsArrayTemp, setAllBuyTicketsArrayTemp] = useState<
    string[]
  >([]);
  const [allTicketTypes, setAllTicketTypes] = useState<Ticket[]>([]);
  const [totalTicketPrice, setTotalTicketPrice] = useState<number>(0);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    async function getTicketTypes() {
      const res = await fetch(`/api/v1/ticket/getTicket/${params.id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setAllTicketTypes(data);
    }
    getTicketTypes();
  }, [params.id]);

  async function userRegistrationForEventHandler() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/registerUserForEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          eventId: id,
          sendEventUpdates: eventUpdates,
          sendMarketingUpdates: marketingUpdates,
        }),
      }
    );
    if (!res.ok) {
      error("Error registration for event");
      return;
    }

    success("registered for event successfully");
    setIsRegistered(true);
    setIsRegModalShow(false);
  }

  async function removeUserFromRegisteredEvent() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/removeRegisteredUserFromEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, eventId: id }),
      }
    );
    if (!res.ok) {
      error("Error registration for event");
      return;
    }

    success("remove user from event successfully");
    setIsRegistered(false);
  }

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      const user = session?.user as customUser;
      setUserId(user?._id);
      setEmail(user?.email);
    };
    getUser();
  }, [id]);

  useEffect(() => {
    const checkUserRegistered = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/event/checkUserRegistered`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId, eventId: id }),
        }
      );
      if (!res.ok) {
        error("Error checking user registration");
        return;
      }
      const data = await res.json();
      setIsRegistered(data);
    };
    checkUserRegistered();
  }, [id, userId]);

  //get user data
  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/user/getWishlistByIdForHost`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(userId),
          }
        );
        const data = await res.json();

        const wishlistStatus = data?.includes(id || "");
        setIsAddWishList(wishlistStatus);
      }
    };
    getUser();
  }, [id, userId, isAddWishList]);

  // add to wishlist

  async function addTowishlistHandler() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/addToWishList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, eventId: id }),
      }
    );
    if (!res.ok) {
      error("Error adding to wishlist");
      return;
    }

    success("Event added to the wishlist ");
    setIsAddWishList(true);
  }

  //remove from wishlist

  async function removeFromWishlistHandler() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/removeFromWishList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, eventId: id }),
      }
    );

    if (!res.ok) {
      error("Error removing from wishlist");
      return;
    }

    success("Event removed from the wishlist ");
    setIsAddWishList(false);
  }

  const paymentDetails = {
    items: "test",
    oder_id: "test",
    currency: "LKR",
    first_name: "test",
    last_name: "test",
    fullAmount: 200,
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  };

  return (
    <div>
      {isRegModalShow && (
        <RegistrationForEventModalSmall
          setVisible={setIsRegModalShow}
          userRegistrationFunction={userRegistrationForEventHandler}
          setEventsUpdatesFunction={setEventUpdates}
          setMarketingUpdatesFunction={setMarketingUpdates}
        />
      )}
      <div className=' text-center text-[#454545cc] text-4xl font-normal pt-8 font-["Roboto"]'>
        {EventName}
      </div>

      <div className="mx-12 sm:mx-32 text-cenetr text-[#455273] text-2xl font-bold mt-8 ">
        QUICK FACTS
      </div>

      <div className="grid grid-rows-3 gap-6  text-left mt-8 mx-16 sm:mx-36">
        <div>
          <div className="text-[#AC736D] ">
            <IoLocation size={25} />
          </div>
          <div className="text-[#353C4E] xl:text-2xl md:text-xl  align-top -mt-8 font-['Roboto'] ml-12">
            {Location}
          </div>
        </div>

        <div>
          <div className="text-[#AC736D]">
            <SlCalender size={20} />
          </div>
          <div className="text-[#353C4E] xl:text-2xl  md:text-xl font-['Roboto'] align-top -mt-6 ml-12">
            {Date}
          </div>
        </div>

        <div>
          <div className="text-[#AC736D]">
            <IoIosTime size={25} />
          </div>
          <div className="text-[#353C4E] xl:text-2xl  md:text-xl  font-['Roboto'] align-top -mt-6 ml-12">
            {Time}
          </div>
        </div>
      </div>

      <div className="mx-16 sm:mx-36 space-y-4 mt-8">
        <div className="flex  items-center ">
          {isRegistered ? (
            <button
              disabled={preview ? true : false}
              onClick={removeUserFromRegisteredEvent}
              className="flex button w-32  h-12 bg-custom-orange rounded-l-xl items-center "
            >
              <div className="flex px-2.5 space-x-2">
                <div className="text-white">
                  <FaRegRegistered size={20} />
                </div>
                <div className="font-medium xl:text-sm text-white text-left leading-tight xl:ml-4 md:ml-2">
                  Unregister
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsRegModalShow(true);
              }}
              className="flex xl:w-36 w-32 xl:h-16 h-12  bg-custom-orange rounded-l-2xl items-center xl:px-4"
            >
              <div className="flex px-2.5 space-x-2">
                <div className="text-white">
                  <FaRegRegistered />
                </div>
                <div className="font-medium text-sm text-white text-left leading-tight ">
                  Register
                </div>
              </div>
            </button>
          )}

          {isAddWishList ? (
            <button
              disabled={preview ? true : false}
              onClick={removeFromWishlistHandler}
              className="flex button xl:w-36 w-32 xl:h-14 h-12 bg-[#455273] rounded-r-xl items-center xl:px-4"
            >
              <div className="flex px-2.5 space-x-2">
                <div className="text-white">
                  <FaHeart />
                </div>
                <div className="font-medium text-sm text-white text-left leading-tight xl:ml-4 md:ml-2">
                  Remove
                </div>
              </div>
            </button>
          ) : (
            <button
              disabled={preview ? true : false}
              onClick={addTowishlistHandler}
              className={`${
                preview ? "cursor-not-allowed" : ""
              }  button   h-12  bg-[#455273] rounded-r-xl items-center `}
            >
              <div className="flex px-2.5 space-x-2">
                <div className=" text-white">
                  <FaHeart />
                </div>
                <div className="font-medium text-sm text-white text-left leading-tight ">
                  Wish List
                </div>
              </div>
            </button>
          )}
        </div>
        {allTickets && allTickets.length > 0 && (
          <button className="h-10 w-36 bg-[#D47151] rounded-xl items-center  ">
            <div className="flex p-2 pl-6 space-x-3">
              <div className="text-white">
                <FaTicketSimple size={20} />
              </div>
              <div className="font-medium text-sm text-white text-left leading-tight ">
                Buy tickets
              </div>
            </div>
          </button>
        )}
      </div>

      <div className="text-center text-[#455273] text-xl font-bold mt-10 ">
        COMMUNITY
      </div>

      <div className="items-center justify-center mx-auto sm:mx-28">
        <PostTab />
      </div>
    </div>
  );
}
