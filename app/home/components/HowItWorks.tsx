import React, { useEffect, useRef } from "react";
import WorkDescribeComponent from "./WorkDescribeComponent";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";

export default function HowItWorks() {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline();

      const header = headerRef.current;
      if (header) {
        const words = header.innerText.split(" ");
        header.innerHTML = words
          .map(
            (word) =>
              `<span style="opacity: 0; display: inline-block;">${word}&nbsp;</span>`
          )
          .join(" ");
        const wordSpans = header.querySelectorAll("span");
        tl.to(wordSpans, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.18,
        });
      }

      contentRefs.current.forEach((content) => {
        tl.from(content, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          stagger: 0.3,
        });
      });
    }
  }, [inView]);

  return (
    <div ref={sectionRef} className="h-screen grid items-center max-lg:p-10">
      <div>
        <div
          ref={headerRef}
          className="sm:mb-12 mb-4 text-center font-semibold text-xl md:text-[40px] text-white font-manrope"
        >
          How it works?
        </div>
        <div className="sm:flex grid gap-6 justify-around xl:mx-40 lg:mx-5">
          <div ref={(el) => (contentRefs.current[0] = el!)}>
            <WorkDescribeComponent
              fillColor={"#9672FF"}
              image={"organization.png"}
              headerText={"Create Organizations"}
              text={
                "Get started swiftly & easily by creating an organization to host your events effortlessly in a single click."
              }
            />
          </div>
          <div ref={(el) => (contentRefs.current[1] = el!)}>
            <WorkDescribeComponent
              fillColor={"#4DDFFD"}
              image={"event.png"}
              headerText={"Host Events"}
              text={
                "Easily organized and manage your events. Setup details, invite attendees, and track registrations all in one platform."
              }
            />
          </div>
          <div ref={(el) => (contentRefs.current[2] = el!)}>
            <WorkDescribeComponent
              fillColor={"#F2B8EC"}
              image={"ticket.png"}
              headerText={"Buy Tickets"}
              text={
                "Secure your spot with just a few clicks. Browse events, select your tickets, and complete your purchase quickly and easily."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
