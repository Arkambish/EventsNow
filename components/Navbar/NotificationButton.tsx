import { FetchPost, FetchPut } from "@/hooks/useFetch";
import React, { Fragment, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { NotificationType } from "./NavBar";
import { getTimeAgo, getTimeDifference } from "@/util/helper";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { error, success } from "@/util/Toastify";
interface notificationty {
  comment: string;
  //   recieverId: string;
  topic: string;
  _id: string;
  isClicked: boolean;
  createdAt: string;
  setNotification: React.Dispatch<React.SetStateAction<NotificationType[]>>;
}
function NotificationButton({
  comment,
  topic,
  isClicked,
  createdAt,
  _id,
  setNotification,
}: notificationty) {
  const [click, setClick] = useState<boolean>(isClicked);
  const [active, setIsActive] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  async function handleClick() {
    console.log(_id);
    const update = await FetchPut({
      endpoint: `notification/getNotification/${_id}`,
      body: {},
    });
    if (update === "User updated successfully") {
      setNotification((data: NotificationType[]) => {
        console.log(data);
        const newArray = data.map((document: NotificationType) => {
          if (document._id == _id) {
            document.isClicked = false;
          }
          return document;
        });
        console.log(newArray);
        return newArray;
      });
    }
    setClick(false);
  }
  // const timeAgo = () => {
  //   const
  //    = new Date(createdAt); // Convert createdAt string to a Date object
  //   const timeAgoString = getTimeAgo(createdAtDate); // Calculate time ago based on the Date object
  //   console.log(timeAgoString);
  //   return timeAgoString;
  // };
  const deleteNotification = async () => {
    try {
      const update = await FetchPost({
        endpoint: "notification/deleteOneNotification",
        body: { _id },
      });

      if (!update.ok) {
        error("Error in delete notification");
        return;
      }
      if (update === "Notification deleted successfully") {
        success("Notification deleted successfully");
        return;
      }
    } catch (e) {
      error("Error in server");
    }
  };
  return (
    <div>
      <button className="w-full">
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="grid items-center px-4 border-b-2 font-khand border-white -mx-2"
        >
          <div className="flex justify-between">
            <h2 className="text-white mx-2 text-sm font-bold">{topic}</h2>
            {click ? <GoDotFill className="text-green-500 p-1" /> : null}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-slate-300 text-start text-sm mx-2">{comment}</p>
            {isOpen && (
              <div className="relative inline-block mt-[-50px]">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center items-center w-full rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                      <HiOutlineDotsVertical />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                      className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-700 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleClick}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full text-white items-center rounded-md px-2 py-2 text-sm ${
                                !click ? "hidden" : ""
                              }`}
                            >
                              Mark as read
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            onClick={deleteNotification}
                            className={`group flex w-full hover:bg-custom-orange text-white items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Remove this notification
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </div>
          <p className="text-custom-orange mx-2 font-IBM text-sm text-end mb-2">
            {/* {timeAgo()} */}
          </p>
        </div>
      </button>
    </div>
  );
}

export default NotificationButton;
