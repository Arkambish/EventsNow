import Image from "next/image";
import React from "react";

function info() {}

interface Upcoming_Events {
  EventName: string;
  Location: string;
  Time: string;
  Date: string;
  Ratings: string;
  image: string;
  buttonDesc: string;
}

export default function WishListCArd({
  EventName,
  Location,
  Time,
  Date,
  Ratings,
  image,
  buttonDesc,
}: Upcoming_Events) {
  //const margin = EventName.length > 14 ? "mt-4" : " mt-0";
  console.log(image);

  return (
    <div className="bg-[#D9D9D9] h-fit my-6 mx-4 rounded-lg md:grid md:grid-cols-2 sm:grid-cols-2 w-[340px] md:w-[800px] md:h-fit xl:grid-cols-12 xl:h-fit">
      <div className="pt-4 mx-4 my-4 md:mx-0 md:my-0 md:pt-0 rounded-lg overflow-hidden h-fit md:h-[13.5rem] xl:col-span-5">
        <Image src={`${image}`} alt="hay" width={410} height={200} />
      </div>

      <div className="xl:grid xl:grid-rows-3 xl:justify-left xl:col-span-7 capitalize">
        <div className="mx-4 md:mt-4 grid grid-cols-2 ">
          <div className="font-sans text-2xl capitalize font-bold leading-7 text-[#353535]">
            {EventName}
          </div>

          <div className="flex justify-end whitespace-nowrap h-fit">
            <button
              onClick={() => info()}
              className="flex items-center bg-[#4E8171] text-white rounded-3xl py-1 px-3"
            >
              <div className="mr-2">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Send_fill">
                    <path
                      id="Subtract"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.48116 12.1048L7.60892 11.4807C5.25571 10.6963 4.0791 10.3041 4.0791 9.58335C4.0791 8.86259 5.25571 8.47039 7.60892 7.68598L15.3721 5.09826C17.0279 4.54633 17.8558 4.27036 18.2928 4.70738C18.7298 5.14439 18.4538 5.97228 17.9019 7.62805L17.9019 7.62807L17.9019 7.62808L15.3142 15.3913L15.3142 15.3913L15.3142 15.3913C14.5298 17.7445 14.1376 18.9211 13.4168 18.9211C12.6961 18.9211 12.3039 17.7445 11.5195 15.3912L10.8954 13.519L15.0823 9.33212C15.4728 8.9416 15.4728 8.30843 15.0823 7.91791C14.6917 7.52738 14.0586 7.52738 13.6681 7.91791L9.48116 12.1048Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <div className="text-xs font-medium">{buttonDesc}</div>
            </button>
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-2">
          <div className={`mx-8 mt-2 flex items-center xl:items-start h-auto `}>
            <div className="w-8 h-8 xl:-mt-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Pin_fill">
                  <path
                    id="Subtract"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.4025 26.4711C18.1914 25.5629 25.3333 21.5085 25.3333 14.6667C25.3333 9.51201 21.1546 5.33333 16 5.33333C10.8453 5.33333 6.66666 9.51201 6.66666 14.6667C6.66666 21.5085 13.8086 25.5629 15.5975 26.4711C15.8515 26.6 16.1485 26.6 16.4025 26.4711ZM16 18.6667C18.2091 18.6667 20 16.8758 20 14.6667C20 12.4575 18.2091 10.6667 16 10.6667C13.7909 10.6667 12 12.4575 12 14.6667C12 16.8758 13.7909 18.6667 16 18.6667Z"
                    fill="#455273"
                  />
                </g>
              </svg>
            </div>
            <div className="text-[#353C4E] text-center text-base font-normal leading-4 pl-4 ">
              {Location}
            </div>
          </div>

          <div className={`mx-8 mt-2 flex  xl:mt-0`}>
            <div className="w-8 h-8">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Time_fill">
                  <path
                    id="Subtract"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 6.5C13 5.94772 12.5523 5.5 12 5.5C11.4477 5.5 11 5.94772 11 6.5V11.75C11 12.4404 11.5596 13 12.25 13H15.5C16.0523 13 16.5 12.5523 16.5 12C16.5 11.4477 16.0523 11 15.5 11H13V6.5Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>
            <div className="text-[#353C4E] text-center text-base font-normal leading-4 pl-4 pt-2 ">
              {Date}
            </div>
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-2">
          <div className={`mx-8 mt-2 flex items-center xl:items-start `}>
            <div className="w-8 h-8 xl:-mt-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Clock_fill">
                  <path
                    id="Ellipse 55"
                    d="M7.95297 4.18173C7.04867 4.42403 6.22409 4.90011 5.5621 5.5621C4.90011 6.22409 4.42403 7.04867 4.18173 7.95297"
                    stroke="#AC736D"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    id="Ellipse 56"
                    d="M24.047 4.18173C24.9513 4.42403 25.7759 4.90011 26.4379 5.5621C27.0999 6.22409 27.576 7.04867 27.8183 7.95297"
                    stroke="#AC736D"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    id="Subtract"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.9997 26.6668C21.8907 26.6668 26.6663 21.8912 26.6663 16.0002C26.6663 10.1091 21.8907 5.3335 15.9997 5.3335C10.1086 5.3335 5.33301 10.1091 5.33301 16.0002C5.33301 21.8912 10.1086 26.6668 15.9997 26.6668ZM16.9997 10.6668C16.9997 10.1145 16.552 9.66683 15.9997 9.66683C15.4474 9.66683 14.9997 10.1145 14.9997 10.6668V15.7502C14.9997 16.4405 15.5593 17.0002 16.2497 17.0002H19.9997C20.552 17.0002 20.9997 16.5524 20.9997 16.0002C20.9997 15.4479 20.552 15.0002 19.9997 15.0002H16.9997V10.6668Z"
                    fill="#AC736D"
                  />
                </g>
              </svg>
            </div>
            <div className="text-[#353C4E] text-center text-base font-normal leading-4 pl-4 ">
              {Time}
            </div>
          </div>

          <div className={`mx-8 mt-2 flex `}>
            <div className="w-8 h-8">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Line_up">
                  <path
                    id="Vector 8"
                    d="M28 8L20.7071 15.2929C20.3166 15.6834 19.6834 15.6834 19.2929 15.2929L16.7071 12.7071C16.3166 12.3166 15.6834 12.3166 15.2929 12.7071L9.33333 18.6667"
                    stroke="#455273"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Rectangle 25"
                    d="M4 4V24.8C4 25.9201 4 26.4802 4.21799 26.908C4.40973 27.2843 4.71569 27.5903 5.09202 27.782C5.51984 28 6.0799 28 7.2 28H28"
                    stroke="#455273"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </g>
              </svg>
            </div>
            <div className="text-[#353C4E] text-center text-base font-normal leading-4 pl-4 pt-2">
              {Ratings}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
