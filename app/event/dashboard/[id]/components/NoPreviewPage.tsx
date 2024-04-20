import Link from "next/link";
import React from "react";

function NoPreviewPage() {
  return (
    <div className="h-screen">
      <div
        className="relative flex flex-col items-center justify-center w-full h-1/2  bg-cover font-khand"
        //style={{ backgroundImage: "url('/images/organization/black.jpg')" }}
      >
        {/* Linear gradient overlay */}
        <div className="absolute inset-0 bg-[#AC736D] opacity-70"></div>
        {/* Content */}
        <div className="relative text-white text-4xl mt-12  font-bold">
          Upload Event Host Page
        </div>
        {/* Button */}
        {/* <div className="relative z-10">
          <Link href={"/"}>
            <button className="bg-custom-orange text-white rounded-xl font-bold border-white text-xl  px-4 py-2 mt-12 ">
              Home page
            </button>
          </Link>
        </div> */}
      </div>
      <div className="bg-white w-full h-1/2 "></div>
    </div>
  );
}

export default NoPreviewPage;
