import React, { useState } from "react";
import { MdPublish } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { error, success } from "@/util/Toastify";
import Description from "@/app/event/host/[id]/components/Description";
import CoverPhoto from "@/app/event/host/[id]/components/CoverPhoto";
import PostTab from "./PostTab";
import SmallView from "@/app/event/host/[id]/components/SmallView";
import HostSideBar from "@/app/event/host/[id]/components/HostSideBar";
import { useParams } from "next/navigation";
import { AuthContext, useAuth } from "@/app/AuthContext";
type Props = {
  setIsTemplate1: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Template1({ setIsTemplate1 }: Props) {
  const params = useParams<{ id: string }>();
  const { setEventPublish } = useAuth() as AuthContext;

  const [activeComponent, setActiveComponent] = useState("CoverPhoto");
  const handleComponentChange = (component: string) => {
    setActiveComponent(component);
  };

  async function publishEvent() {
    const res = await fetch(`/api/v1/event/publishTemplate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        template: "template1",
      }),
    });
    const data = await res.json();

    if (data.message === "Please complete your organization details") {
      error("Please complete your organization bank details");
      return;
    }

    if (data.message === "No event found") {
      error("There was an error publishing the event");
      return;
    }
    setEventPublish(true);
    success("Event published successfully");
    setIsTemplate1(false);
  }
  return (
    <div>
      <div
        style={{
          backgroundColor: "#D9D9D9CC",
        }}
        id="static-modal"
        data-modal-backdrop="static"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden  fixed  z-50 justify-center items-center w-full inset-0 md:inset-0  max-h-full"
        
      >
        <div className="border-[1px]  md:mb-10 mb-0  rounded-xl bg-white w-4/5 lg:w-11/12 md:w-11/12  relative top-10 left-10 md:top-[5%] md:left-[5%]   ">
          <div className="text-black p-3 text-xl ">
            <div className="flex justify-between">
              template 1
              <button
                onClick={() => setIsTemplate1(false)}
                className="bg-slate-300 hover:bg-slate-400  w-8 col-span-1 rounded-full p-2 flex justify-center items-center"
              >
                <IoClose />
              </button>
            </div>
          </div>

          <div>
           
           
            <div className="md:flex md:justify-between pointer-events-none">
        {activeComponent === "CoverPhoto" && (
          <CoverPhoto 
            image={"https://res.cloudinary.com/dpk9utvby/image/upload/v1713416883/events/zlds9w8qlcpajnzeruy0.jpg"}
            // image={"/images/ReusableComponents/PictureOfPost.jpg"}
          />
        )}

        {activeComponent === "PostTab" && <PostTab />}
        <div className="md:hidden">
          <SmallView
            EventName={"my event"}
            Location={"matara"}
            Time={`4.00pm to 6.00pm`}
            Date={"21th April 2020"}
            activeComponent={activeComponent}
            handleComponentChange={handleComponentChange}
          />
        </div>

        <div className=" hidden md:block ">
          <HostSideBar
            preview={false}
            EventName={"my event"}
            Location={"matara"}
            Time={`4.00pm to 6.00pm`}
            Date={"21th April 2020"}
            activeComponent={activeComponent}
            handleComponentChange={handleComponentChange}
          />
          
        </div>
      </div>

      <Description description={`
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`} />

          <div className="flex justify-end">
            <button onClick={publishEvent} className="button">
              <div className="bg-custom-orange flex gap-3 w-fit rounded-xl p-2 m-2 text-white ">
                <MdPublish size={25} />
                Publish the Event
              </div>
            </button>
          </div>

          {/* <div className="flex gap-5 mb-10 p-5">
            <button>
              <div className="flex flex-col justify-center items-center gap-3">
                <Image
                  src={"/images/createEvent/eventRegFormImg.png"}
                  alt="template1"
                  width={40}
                  height={40}
                />
                template 1
              </div>
            </button>
            <button>
              <div className="flex flex-col justify-center items-center gap-3">
                <Image
                  src={"/images/createEvent/eventRegFormImg.png"}
                  alt="template1"
                  width={40}
                  height={40}
                />
                template 2
              </div>
            </button>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
}
