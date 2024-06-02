import React from "react";

export default function ContainerWithStroke({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full hover:shadow-xl ease-in-out duration-300 bg-white border-dashBtnBlue hover:border-opacity-90 border-opacity-60 border-solid rounded-xl shadow-md border-t-2">
      <div className="  w-full  text-center content-center  rounded-xl    shadow-normalComponnt  ease-out duration-100 ">
        {children}
      </div>
    </div>
  );
}
