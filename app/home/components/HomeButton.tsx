"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface HomeButtonProps {
  text: string;
  initialColor: string;
  initialTextcolor: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({
  text,
  initialColor,
  initialTextcolor,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<GSAPTimeline>();

  useEffect(() => {
    if (buttonRef.current) {
      tl.current = gsap
        .timeline({ paused: true })
        .to(buttonRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0)",
          duration: 0.3,
          color: "#FFFFFF",
        })
        .to(
          buttonRef.current,
          {
            borderTopColor: "#FFFFFF",
            borderBottomColor: "#FFFFFF",
            borderTopWidth: 2,
            borderBottomWidth: 2,
            duration: 0.3,
          },
          0
        );
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      className="transition ease-in-out duration-300 delay-50 items-center sm:py-3 py-2 rounded-md px-4 sm:px-7 lg:px-6 xl:px-5 2xl:px-7 text-center font-bold sm:text-lg font-dm-sans flex gap-2 border-0  bg-transparent"
      style={{ backgroundColor: initialColor, color: initialTextcolor }}
      onMouseEnter={() => tl.current?.play()}
      onMouseLeave={() => tl.current?.reverse()}
    >
      {text}
    </button>
  );
};

export default HomeButton;
