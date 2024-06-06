"use client";
import React, { useEffect, useState, ComponentType, useRef } from "react";
import { gsap } from "gsap";
import BookticketSection from "./BookticketSection";
import HowItWorks from "./HowItWorks";
import OverviewComponent from "./OverviewComponent";
import CreateEventSection from "./CreateEventSection";
import HomeFooter from "./HomeFooter";

const components: ComponentType[] = [
  BookticketSection,
  HowItWorks,
  OverviewComponent,
  CreateEventSection,
  HomeFooter,
];

const AnimatedHome: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) return;

      setIsScrolling(true);
      if (event.deltaY > 0 && currentIndex < components.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }

      setTimeout(() => setIsScrolling(false), 1000);
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentIndex, isScrolling]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
      );
    }
  }, [currentIndex]);

  const CurrentComponent = components[currentIndex];

  return (
    <div className="bg-gradient-home" ref={containerRef}>
      <CurrentComponent />
    </div>
  );
};

export default AnimatedHome;
