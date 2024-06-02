
import React from "react";
import Image from "next/image";



interface Event {
  EventName: String;
  Location: String;
  Time: String;
  Date: String;
  eventCover: String;
  endTime: String;
  endDate: String;
  isPublished: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Event({
  EventName,
  Location,
  Time,
  Date,
  eventCover,
  endTime,
  endDate,
  isPublished,
  setIsPreview,
}: Event) {
  const handlePreviewClick = () => {
    if (isPublished) {
      setIsPreview(true);
    }
  };
  return (
    <div className="grid justify-center bg-slate-100 shadow-inner rounded-xl h-full ">
    <div className="     xl:pt-8 xl:px-8 pt-6 px-6 h-full grid  ">
      <Image
        className=" rounded-md lg:w-52 xl:w-auto 
          "
        src={eventCover as string}
        alt="event cover"
        width={250}
        height={150}
      />

      <div className="text-[#353535]  text-2xl py-4  font-medium  ">
        {EventName}
      </div>

      <div className="grid grid-rows-4 gap-3 mb-5 ">
        <div className="flex gap-3">
          <Image
            className="grid content-center "
            src="/images/reusableComponents/Pin_fill.svg"
            alt="print"
            width={28}
            height={28}
          />

          <div className="text-[#353C4E]  text-sm text-start align-top  grid content-center">
            {Location}
          </div>
        </div>

        <div className="flex gap-3">
          <Image
            className="grid content-center"
            src="/images/reusableComponents/Date_org.svg"
            alt="print"
            width={28}
            height={28}
          />

          <div className="text-[#353C4E] text-sm text-start  align-top grid content-center">
            {Date} to <span>{endDate}</span>
          </div>
        </div>

        <div className="flex gap-3 ">
          <Image
            className="grid content-center"
            src="/images/reusableComponents/Clock_fill.svg"
            alt="print"
            width={28}
            height={28}
          />

          <div className="text-[#353C4E] text-sm text-start   align-top grid content-center">
            {Time}-{endTime}
          </div>
        </div>

        {/* <div className="flex xl:gap-4 gap-1"> */}
          {/* <button
            onClick={() => Share()}
            className="w-24 h-8 rounded-3xl bg-white shrink-0 flex"
          >
            <div className=" pl-4 pt-2  ">
              <Image
                src={"/images/reusableComponents/Vector.svg"}
                alt="info"
                width={50}
                height={50}
              />
            </div>
            <div className="w-40 h-4 text-[#535353] text-sm font-medium font-['IBM Plex Mono'] py-1.5 pl-0 mr-2 ">
              Share
            </div>
          </button> */}

          <button
            onClick={() => handlePreviewClick()}
            className={`w-28 h-8 rounded-3xl bg-white shrink-0 flex  ${
              !isPublished && "opacity-50 pointer-events-none"
            }`}
          >
            <div className=" pl-4 pt-1  ">
              <Image
                src={"/images/reusableComponents/View_alt.svg"}
                alt="info"
                width={60}
                height={60}
              />
            </div>

            <div className="w-40 h-4 text-[#535353] text-sm font-['IBM Plex Mono'] font-medium py-1.5 pl-0 mr-2 ">
              Preview
            </div>
          </button>
        {/* </div> */}
      </div>
    </div>
    </div>
  );
}
