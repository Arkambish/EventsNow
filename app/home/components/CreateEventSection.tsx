"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import styles from "./CreateEventSection.module.css";

export default function CreateEventSection() {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const head = headRef.current;

    if (!head) return;

    const words = head.innerText.split(" ");
    head.innerHTML = words
      .map(
        (word) =>
          `<span style="opacity: 0; display: inline-block;">${word}&nbsp;</span>`
      )
      .join(" ");

    const wordSpans = head.querySelectorAll("span");

    gsap.to(wordSpans, {
      scrollTrigger: {
        trigger: head,
        start: "top 90%",
        end: "bottom 20%",
        scrub: true,
      },
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.18,
    });
  }, []);

  return (
    <div className="h-screen grid items-center py-10">
      <div className="w-full h-2/3 sm:h-2/5 bg-[#DFE4FF] lg:grid grid-cols-2 px-10 relative">
        <div className="hidden lg:grid justify-center">
          <div className={styles.partyImageContainer}>
            <Image
              className={styles.partyImage}
              src="/images/home/partyImage.png"
              alt="Picture of the author"
              height={450}
              width={450}
              quality={100}
            />
          </div>
        </div>
        <div className="grid items-center justify-center h-full">
          <div className="mbb-10">
            <div
              ref={headRef}
              className="lg:text-left text-center text-2xl sm:text-[34px] font-dm-sans font-bold text-black mb-2 max-sm:mb-6"
            >
              Make your own Event
            </div>
            <div className="text-[#272727] text-center lg:text-left text-sm sm:text-lg font-normal font-dm-sans sm:pr-10">
              Bring your event to life with our easy-to-use platform. Create,
              manage, and promote effortlessly while reaching a wider audience.
              We provide all the tools for a successful and memorable event.
              Start today!
            </div>
            <div className="max-lg:flex max-lg:justify-center max-sm:mt-16">
              <Link href={"/createorganization"}>
                <button className=" transition ease-in-out duration-300 delay-50 bg-home-blue text-white font-dm-sans text-center sm:text-lg text-base font-bold sm:px-20 px-10 py-3 rounded-full mt-5 hover:text-home-blue hover:bg-white">
                  Create Event
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
