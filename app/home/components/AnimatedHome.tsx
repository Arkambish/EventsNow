"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookticketSection from "./BookticketSection";
import HowItWorks from "./HowItWorks";
import OverviewComponent from "./OverviewComponent";
import CreateEventSection from "./CreateEventSection";
import HomeFooter from "./HomeFooter";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHome() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top -40%",
            toggleActions: "play none none reverse",
            onLeave: () => {
              gsap.to(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
              });
            },
            onEnterBack: () => {
              gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
              });
            },
          },
        }
      );
    });
  }, []);

  return (
    <div className="bg-gradient-home">
      <div>
        <BookticketSection />
      </div>
      <div ref={(el) => (sectionsRef.current[0] = el!)}>
        <HowItWorks />
      </div>
      <div ref={(el) => (sectionsRef.current[1] = el!)}>
        <OverviewComponent />
      </div>
      <div ref={(el) => (sectionsRef.current[2] = el!)}>
        <CreateEventSection />
      </div>
      <div ref={(el) => (sectionsRef.current[3] = el!)}>
        <HomeFooter />
      </div>
    </div>
  );
}
