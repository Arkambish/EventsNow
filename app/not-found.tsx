import Link from "next/link";
import React from "react";

function Notfound() {
  return (
    <div className="lg:h-3/4 h-screen  bg-[#AC736D]  text-center p-6">
      <div className="font-bold text-[#455273]  pt-40 ">
        There was a problem
      </div>
      <div className="font-bold text-white md:text-4xl text-2xl pt-2">
        This Page is not found
      </div>
      {/* <div className="font-bold text-white pt-4">
        Please try again later or contact support if the problem persists
      </div> */}
      <Link href="/" className="pb-28 mb-10">
        <button className="bg-[#455273] hover:bg-[#303951] text-white px-4 py-2 mt-4 rounded-lg ">
          Go back home
        </button>
      </Link>
    </div>
  );
}

export default Notfound;
