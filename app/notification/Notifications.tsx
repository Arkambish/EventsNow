"use client";
import { FetchGet } from "@/hooks/useFetch";
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
export type NotificationType = {
  comment: string;
  recieverId: string;
  topic: string;
  _id: string;
  isClicked: boolean;
  createdAt: string;
};
export const getUser = async ({ email }: any) => {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/user/getOneUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const { data } = await user.json();
  return data;
};
function Notification() {
  const [notification, setNotification] = useState<NotificationType[]>([]);

  useEffect(() => {
    async function session() {
      const session = await getSession();

      if (session) {
        const name = session?.user?.name ? session?.user?.name : "";

        if (name !== "") {
          const data = await getUser({ email: session?.user?.email });

          if (data) {
            const notificationData = await FetchGet({
              endpoint: `notification/getNotification/${data._id}`,
            });
            console.log("Fetched Notifications:", notificationData);
            notificationData
              ? setNotification(notificationData.filternotification.reverse())
              : setNotification([]);
          }
        }
      }
    }

    session();
  }, []);

  return (
    <div className="container mx-auto p-8 overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <div>
        {notification.map((item) => (
          <div key={item._id} className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-lg font-semibold mb-1">{item.topic}</p>
            <p className="text-gray-700 mb-2">{item.comment}</p>
            <p className="text-gray-500 ">{item.createdAt.substring(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
