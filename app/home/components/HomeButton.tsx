import React from "react";
import {} from "next/navigation";

interface homeButtonProps {
  filled: boolean;
  text: string;
}

export default function HomeButton({ filled, text }: homeButtonProps) {
  return (
    <button
      className={` transition ease-in-out duration-300 delay-50 items-center sm:py-3 py-2 rounded-full px-4 sm:px-7 lg:px-6 xl:px-5 2xl:px-7 text-center font-bold sm:text-lg font-dm-sans flex gap-2 ${
        filled
          ? "text-home-blue hover:text-white hover:bg-home-blue bg-white"
          : " border-2 text-white hover:text-home-blue hover:border-home-blue "
      } `}
    >
      {text}
    </button>
  );
}
