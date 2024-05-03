import React from "react";

interface Details {
  name: String;
  data: string;
}

export default function ProfileDetails({ name, data }: Details) {
  return (
    <div className="border-gray border-2 flex flex-col lg:flex-row w-full p-1 pl-3 rounded-lg bg-white mt-5">
      <label
        className="inline-block whitespace-nowrap my-1 capitalize text-xs md:text-base  sm:my-auto md:my-2 lg:my-auto"
        htmlFor="fname"
      >
        {name} :-
      </label>
      <div className="w-full rounded-lg   my-1 sm:ml-0 sm:my-auto md:ml-0 md:my-2 lg:ml-5 lg:my-auto">
        <p className="text-base ">{data}</p>
      </div>
    </div>
  );
}
