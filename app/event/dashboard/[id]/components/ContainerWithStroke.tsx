import React from "react";

export default function ContainerWithStroke({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full hover:shadow-xl ease-in-out duration-300 rounded-xl shadow-md">
      <div className="  w-full  text-center content-center  rounded-xl border-solid border-t-2 border-dashBtnBlue shadow-normalComponent hover:border-opacity-90 border-opacity-60 ease-out duration-100 bg-white">
        {children}
      </div>
    </div>
  );
}
