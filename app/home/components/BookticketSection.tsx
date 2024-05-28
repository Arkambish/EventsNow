"use client";
import Image from "next/image";
import HomeButton from "./HomeButton";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BookticketSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const text2 = text2Ref.current;
    const image = imageRef.current;
    const section = sectionRef.current;
    const buttons = buttonsRef.current;

    if (!text || !text2 || !image || !section || !buttons) return;

    const words = text.innerText.split(" ");
    text.innerHTML = words
      .map(
        (word) =>
          `<span style="opacity: 0; display: inline-block;">${word}</span>`
      )
      .join(" ");

    const words2 = text2.innerText.split(" ");
    text2.innerHTML = words2
      .map(
        (word) =>
          `<span style="opacity: 0; display: inline-block;">${word}</span>`
      )
      .join(" ");

    gsap
      .timeline()
      .fromTo(
        image,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0 0)",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(image, {
              x: "+=20",
              y: "+=20",
              rotation: 1,
              duration: 1,
              yoyo: true,
              repeat: -1,
              ease: "power1.inOut",
            });
          },
        }
      )
      .fromTo(
        section,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1, ease: "power2.inOut" },
        "-=0.5"
      )
      .to(
        Array.from(text.children),
        {
          opacity: 1,
          x: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "-=0.5"
      )
      .to(
        Array.from(text2.children),
        {
          opacity: 1,
          x: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "-=0.5"
      )
      .fromTo(
        buttons,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" }
      );
  }, []);

  return (
    <div className="h-screen overflow-hidden grid lg:grid-cols-2 bg-[url('/images/home/Rectangle12.png')] bg-no-repeat bg-cover bg-center">
      <div className="hidden items-end justify-center lg:flex" ref={imageRef}>
        <Image
          src="/images/home/image-area.png"
          alt="Picture of the author"
          style={{ height: "80vh", width: "auto" }}
          width={2000}
          height={2000}
          quality={100}
        />
      </div>
      <div className="p-10 flex" ref={sectionRef}>
        <div className="content-center md:px-28 lg:px-12 xl:px-32 grid gap-3">
          <div
            className="font-monoton text-start font-normal text-white text-[30px] sm:text-[40px]"
            ref={textRef}
          >
            Book Your Next Adventure Today!
          </div>
          <div
            className="text-start font-dm-sans sm:text-lg font-normal text-white"
            ref={text2Ref}
          >
            Discover and Book Amazing Events Near You. Experience Unforgettable
            Moments with Just a Click.
          </div>
          <div className="flex gap-3" ref={buttonsRef}>
            <Link href="/">
              <HomeButton text={"Book Tickets"} filled={true} />
            </Link>
            <Link href="/about">
              <HomeButton filled={false} text={"Learn More"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
