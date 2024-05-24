import Modal from "@/components/Modal";
import { FetchPost } from "@/hooks/useFetch";
import { success, error } from "@/util/Toastify";
import { Dialog } from "@headlessui/react";
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaRegistered } from "react-icons/fa6";
import ShowTicketsForUserModal from "../components/ShowTicketsForUserModal";
import TicketModal from "../components/TicketModal";
interface HostSideBar {
  EventName: String;
  Location: String;
  Time: String;
  Date: String;
  preview?: boolean;
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

export type TicketArray = {
  typeId: string;
  type: string;
};
const Buttons = ({
  EventName,
  Location,
  Time,
  Date,
  preview = false,
}: HostSideBar) => {
  const [isRemoveWishListModal, setIsRemoveWishListModal] =
    useState<boolean>(false);
  const [isAddWishListModal, setIsAddWishListModal] = useState<boolean>(false);
  const [isRegModalShow, setIsRegModalShow] = useState<boolean>(false);

  const [isRemoveRegistation, setIsRemoveRegistation] =
    useState<boolean>(false);

  const [eventUpdates, setEventUpdates] = useState(false);
  const [marketingUpdates, setMarketingUpdates] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(1);
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
    TicketArray[]
  >([]);
  const [allTicketTypes, setAllTicketTypes] = useState<Ticket[]>([]);
  const [totalTicketPrice, setTotalTicketPrice] = useState<number>(0);
  const params = useParams<{ id: string }>();

  async function userRegistrationForEventHandler() {
    console.log("userRegistrationForEventHandler");
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
    const data = {
      topic: "Registration Alert",
      comment: `You have been registered for ${EventName}`,
      email: email,
    };

    const sendNotification = await FetchPost({
      endpoint: `notification/getAllNotifications`,
      body: data,
    });

    if (sendNotification.message != "Notification created successfully") {
      error("Error registration for event");
      return;
    }
    if (!res.ok) {
      console.log("res");

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
    setIsRemoveRegistation(false);
  }

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      const user = session?.user as customUser;
      setUserId(user._id);
      setEmail(user.email);
    };
    getUser();
  }, [id]);

  //check user registered for the event
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
    setIsAddWishListModal(false);
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
    setIsRemoveWishListModal(false);
  }

  return (
    <div className=" space-x-6">
      {isRegistered ? (
        <button
          disabled={preview ? true : false}
          onClick={() => setIsRemoveRegistation(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-full mb-2"
        >
          <div className="flex py-1 px-2">
            <div className=" text-white">
              <FaRegistered size={23} />{" "}
            </div>
            <div className="font-medium xl:text-md text-white text-left leading-tight xl:ml-4 md:ml-2 mx-auto ">
              Unregister
            </div>
          </div>
        </button>
      ) : (
        <button
          disabled={preview ? true : false}
          onClick={() => {
            setIsRegModalShow(true);
          }}
          className={`bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-full mb-2 ${
            preview ? "cursor-not-allowed" : ""
          } `}
        >
          <div className="flex py-1 px-2 ">
            <div className=" text-white">
              <FaRegistered size={23} />{" "}
            </div>

            <div className="font-medium xl:text-md text-white text-left leading-tight xl:ml-4 md:ml-2 mx-auto ">
              Register
            </div>
          </div>
        </button>
      )}

      {/* Registration Modal */}
      {isRegModalShow && (
        <Modal setIsOpen={setIsRegModalShow} isOpen={isRegModalShow}>
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Registration For Event
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              <div className="flex my-auto gap-2 ">
                <input
                  type="checkbox"
                  className="my-auto"
                  onChange={(e) => setEventUpdates(e.target.checked)}
                />
                I want to get updates on community page of the event via my
                emails
              </div>
              <div className="flex my-auto gap-2">
                <input
                  type="checkbox"
                  className="my-auto"
                  onChange={(e) => setMarketingUpdates(e.target.checked)}
                />
                I want to get marketing updates of the event via emails
              </div>
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={userRegistrationForEventHandler}
            >
              Register
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsRegModalShow(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {isAddWishList ? (
        <button
          disabled={preview ? true : false}
          onClick={() => setIsRemoveWishListModal(true)}
          // onClick={removeFromWishlistHandler}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-full mb-2"
        >
          <div className="p-1 flex">
            <div className="text-white">
              <FaHeart size={21} />
            </div>
            <div className="font-medium text-sm text-white text-left leading-tight xl:ml-4 md:ml-2">
              Remove
            </div>
          </div>
        </button>
      ) : (
        <button
          disabled={preview ? true : false}
          // onClick={addTowishlistHandler}
          onClick={() => setIsAddWishListModal(true)}
          className={`${
            preview ? "cursor-not-allowed" : ""
          }  bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-full mb-2`}
        >
          <div className="flex p-1">
            <div className=" text-white">
              <FaRegHeart size={21} />
            </div>
            <div className="font-medium md:text-md text-sm  text-white text-left leading-tight xl:ml-4 md:ml-2">
              Wish List
            </div>
          </div>
        </button>
      )}

      <button
        onClick={() => setIsActiveTicketModal(true)}
        disabled={preview ? true : false}
        className={` bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-full mb-2 ${
          preview ? "cursor-not-allowed" : ""
        } `}
      >
        <div className="flex p-1">
          <div className="text-white">
            <FaTicketAlt size={23} />
          </div>
          <div className="font-medium xl:text-md text-sm text-white text-left leading-tight ml-4">
            Buy tickets
          </div>
        </div>
      </button>

      {isAddWishListModal && (
        <Modal setIsOpen={setIsAddWishListModal} isOpen={isAddWishListModal}>
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Add to wishlist
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to add this event to your wishlist?
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={addTowishlistHandler}
            >
              Add to wishlist
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsAddWishListModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {isRemoveWishListModal && (
        <Modal
          setIsOpen={setIsRemoveWishListModal}
          isOpen={isRemoveWishListModal}
        >
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Remove from wishlist
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to remove this event from your wishlist?
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={removeFromWishlistHandler}
            >
              Remove from wishlist
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsRemoveWishListModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {isRemoveRegistation && (
        <Modal setIsOpen={setIsRemoveRegistation} isOpen={isRemoveRegistation}>
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Remove registration
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to remove registration for this event?
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={removeUserFromRegisteredEvent}
            >
              Remove registration
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsRemoveRegistation(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {isActiveTicketModal && (
        <ShowTicketsForUserModal
          totalPrice={totalTicketPrice}
          setTotalPrice={setTotalTicketPrice}
          setIsActiveTicketModal={setIsActiveTicketModal}
          setIsActiveProceedTicketModal={setIsActiveProceedTicketModal}
          ticketArrayTemp={allBuyTicketsArrayTemp}
          setTicketArrayTemp={setAllBuyTicketsArrayTemp}
          ticketTypes={allTicketTypes}
          isActiveTicketModal={isActiveTicketModal}
        />
      )}
      {isActiveProceedTicketModal && (
        <TicketModal
          isActiveProceedTicketModal={isActiveProceedTicketModal}
          setIsActvieTicketModal={setIsActiveTicketModal}
          setTicketArrayTemp={setAllBuyTicketsArrayTemp}
          setIsActiveTicketModal={setIsActiveTicketModal}
          totalPrice={totalTicketPrice}
          setTotalPrice={setTotalTicketPrice}
          ticketTypes={allTicketTypes}
          ticketArrayTemp={allBuyTicketsArrayTemp}
          setIsActiveProceedTicketModal={setIsActiveProceedTicketModal}
        />
      )}
    </div>
  );
};

export default Buttons;
