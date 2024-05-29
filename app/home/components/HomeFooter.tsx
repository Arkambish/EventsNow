// import React from "react";
// import HomeButton from "./HomeButton";
// import SocialButton from "./SocialButton";
// import Link from "next/link";

// export default function HomeFooter() {
//   return (
//     <div className="h-screen grid place-content-center bg-[#142A62] p-10 ">
//       <div className="  justify-center grid ">
//         <div className="grid sm:gap-3 xl:gap-5 gap-3">
//           <div className="text-center text-white font-dm-sans font-bold text-xs sm:text-sm uppercase tracking-[2.8px] opacity-60 ">
//             Unleash Your Event Potention
//           </div>
//           <div className=" text-center text-white font-bold text-4xl sm:text-[50px] font-abhaya-libre">
//             Request More Information
//           </div>
//           <div className="  place-self-center text-white text-center font-dm-sans sm:font-bold text-xs sm:text-lg opacity-80 w-3/5">
//             Discover the full range of features and services our website offers
//             for effortless event planning and execution.
//           </div>

//           <div className="place-self-center sm:my-6 my-1">
//             <Link href="/about">
//             <HomeButton filled={true} text={"Contact Us"} />
//             </Link>
//           </div>
//           <div className="text-white text-center font-dm-sans text-xs sm:text-sm font-bold opacity-80">
//             © 2024 TeamOneZero
//           </div>
//         </div>
//         <div className="h-0.5 bg-white opacity-20 my-5"> </div>
//         <div className=" flex  justify-center gap-4   ">
//           <SocialButton image={"linkedin"} />
//           <SocialButton image={"facebook"} />
//           <SocialButton image={"instagram"} />
//           <SocialButton image={"youtube"} />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useRef, useEffect } from "react";
import HomeButton from "./HomeButton";
import SocialButton from "./SocialButton";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";

export default function HomeFooter() {
  const titleText = "Request More Information";
  const descriptionText =
    "Discover the full range of features and services our website offers for effortless event planning and execution.";

  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const title = titleRef.current;
    const description = descriptionRef.current;

    if (!title || !description) return;

    const titleChars = titleText.split("").map((char, index) => {
      const span = document.createElement("span");
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.textContent = char === " " ? "\u00A0" : char;
      return span;
    });

    title.innerHTML = "";
    titleChars.forEach((char) => title.appendChild(char));

    if (inView) {
      gsap.timeline().to(titleChars, {
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(description, {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          });
        },
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="h-screen grid place-content-center bg-[#142A62] p-10"
    >
      <div ref={sectionRef} className="justify-center grid">
        <div className="grid sm:gap-3 xl:gap-5 gap-3">
          <div className="text-center text-white font-dm-sans font-bold text-xs sm:text-sm uppercase tracking-[2.8px] opacity-60">
            Unleash Your Event Potential
          </div>
          <div
            ref={titleRef}
            className="text-center text-white font-bold text-4xl sm:text-[50px] font-abhaya-libre"
          ></div>
          <div
            ref={descriptionRef}
            className="place-self-center text-white text-center font-dm-sans font-light  text-xs sm:text-lg opacity-80 w-3/5"
            style={{ opacity: 0 }}
          >
            {descriptionText}
          </div>
          <div className="place-self-center sm:my-6 my-1">
            <Link href="/about">
              <HomeButton filled={true} text={"Contact Us"} />
            </Link>
          </div>
          <div className="text-white text-center font-dm-sans text-xs sm:text-sm font-bold opacity-80">
            © 2024 TeamOneZero
          </div>
        </div>
        <div className="h-0.5 bg-white opacity-20 my-5"></div>
        <div className="flex justify-center gap-4 text-white">
          <SocialButton image={"linkedin"} />
          <SocialButton image={"facebook"} />
          <SocialButton image={"instagram"} />
          <SocialButton image={"youtube"} />
        </div>
      </div>
    </div>
  );
}
