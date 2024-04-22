import { FetchPut } from "@/hooks/useFetch";
import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { NotificationType } from "./NavBar";
import { getTimeAgo, getTimeDifference } from "@/util/helper";
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
  return (
    <div>
      <button className=" w-full" onClick={handleClick}>
        <div className="grid  items-center px-4  border-b-2 font-khand border-white hover:opacity-50 -mx-2">
          <div className="flex justify-between">
            <h2 className=" text-white  mx-2 text-sm font-bold">{topic}</h2>
            {click ? <GoDotFill className=" text-green-500 p-1" /> : null}
          </div>

          <p className="text-slate-300 text-start text-sm mx-2">{comment}</p>
          <p className=" text-custom-orange mx-2 font-IBM text-sm text-end mb-2 ">
            {getTimeAgo(createdAt)}
          </p>
        </div>
      </button>
    </div>
  );
}

export default NotificationButton;
