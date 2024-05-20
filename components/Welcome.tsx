"use client";
import React, { useRef, useLayoutEffect } from "react";
import HeroSection from "./HeroSection";
import gsap from "gsap";

export default function Welcome() {
  const comp = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.5,
        delay: 0.5,
      })
        .from("#title1", {
          opacity: 0,
          y: "+-30",
          stagger: 0.5,
        })
        .to("#title1", {
          opacity: 0,
          y: "+-30",
          delay: 0.5,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.5,
        })
        .from("#hero-section", {
          opacity: 0,
          duration: 1.5,
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div className="relative" ref={comp}>
        <div
          className="h-screen w-full bg-[#F5F5F5] absolute"
          id="intro-slider"
        >
          <div
            className=" text-[#906953] flex justify-center place-items-center font-bold text-[30px] md:text-[40px] lg:text-5xl drop-shadow-lg ms-8"
            id={"title1"}
          >
            Welcome
          </div>
        </div>

        <div id="hero-section" className="">
          <HeroSection />
        </div>
      </div>
    </div>
  );
}
