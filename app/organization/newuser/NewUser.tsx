"use client";
import { FetchPost } from "@/hooks/useFetch";
import { error, success } from "@/util/Toastify";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function NewUser() {
  const router = useSearchParams();
  const organizationId = router.get("organizationId");
  const userId = router.get("userId");

  useEffect(() => {
    async function createOrganizer() {
      if (!organizationId || !userId) {
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/permission/createOrganizer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organizationId,
            userId,
            globalPermission: [],
          }),
        }
      );
      const data = await res.json();
      console.log(data.message);
      if (data.message === "success to create organizer") {
        success("success to create organizer");
        console.log("success to create organizer");

        // send notification
        try {
          const data = {
            topic: "Congratulations",
            comment: "You have been added to the organization team",
            userIds: [userId],
          };

          // const notifyUser = await FetchPost({
          //   endpoint: `notification/postNotificationById`,
          //   body: data,
          // });
          // console.log(notifyUser);
          // if (!notifyUser) {
          //   // error("error in sending notification");
          //   console.log("error in sending notification");
          //   return;
          // }

          // success("Notification sent successfully");
          console.log("Notification sent successfully");
        } catch (error) {
          console.error("Error", error);
        }
        return;
      }
      if (data.message === "User already exists in the organization") {
        error("User already exists in the organization");
        console.log("User already exists in the organization");
        return;
      }
    }
    // const sendNotification = async () => {
    //   try {
    //     const data = {
    //       topic: "Congratulations",
    //       comment: "You have been added to the organization team",
    //       userIds: [userId]
    //     };

    //     const notifyUser = await FetchPost({
    //       endpoint: `notification/postNotificationById`,
    //       body: data,
    //     });
    //     console.log(notifyUser)
    //     if (!notifyUser) {
    //       error("error in sending notification");
    //       console.log("error in sending notification")
    //       return;
    //     }

    //     success("Notification sent successfully");
    //     console.log("Notification sent successfully")
    //   } catch (error) {
    //     console.error("Error", error);
    //   }
    // };

    // Check if the code is running in a browser environment
    createOrganizer();
    // sendNotification();
  }, [organizationId, userId]); // Include the missing dependencies 'organizationId' and 'userId' in the dependency array.

  return (
    <div className="h-screen">
      <div
        className="relative flex flex-col items-center justify-center w-full h-1/2  bg-cover font-khand"
        //style={{ backgroundImage: "url('/images/organization/black.jpg')" }}
      >
        {" "}
        {/* Linear gradient overlay */}
        <div className="absolute inset-0 bg-[#AC736D] opacity-70"></div>
        {/* Content */}
        <div className="relative text-white text-4xl mt-12  font-bold">
          You have been added to the organization team
        </div>
        {/* Button */}
        <div className="relative z-10">
          <Link href={"/"}>
            <button className="bg-custom-orange text-white rounded-xl font-bold border-white text-xl  px-4 py-2 mt-12 ">
              Home page
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white w-full h-1/2 "></div>
    </div>
  );
}
