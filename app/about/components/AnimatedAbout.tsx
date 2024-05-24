"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import BestEvent from "./BestEvent";
import gsap from "gsap";
import { useIntersection } from "react-use";

export default function AnimatedAbout() {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const historyRef = useRef(null);
  const besteventRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const missionIntersection = useIntersection(missionRef, {
    root: null,
    rootMargin: "10px",
    threshold: 0.5,
  });

  const visionIntersection = useIntersection(visionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  const historyIntersection = useIntersection(historyRef, {
    root: null,
    rootMargin: "200px",
    threshold: 0.5,
  });

  const bestEventIntersection = useIntersection(besteventRef, {
    root: null,
    rootMargin: "100px",
    threshold: 0.5,
  });

  const fadeIn = (element: gsap.TweenTarget) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power4.out",
      stagger: {
        amount: 0.3,
      },
    });
  };

  const fadeOut = (element: gsap.TweenTarget) => {
    gsap.to(element, {
      opacity: 0,
      y: 50,
      duration: 2,
      ease: "power4.out",
    });
  };

  useEffect(() => {
    if (missionIntersection && missionIntersection.intersectionRatio < 0.5) {
      fadeOut(missionRef.current);
    } else {
      fadeIn(missionRef.current);
    }
  }, [missionIntersection]);

  useEffect(() => {
    if (visionIntersection && visionIntersection.intersectionRatio < 0.5) {
      fadeOut(visionRef.current);
    } else {
      fadeIn(visionRef.current);
    }
  }, [visionIntersection]);

  useEffect(() => {
    if (historyIntersection && historyIntersection.intersectionRatio < 0.5) {
      fadeOut(historyRef.current);
    } else {
      fadeIn(historyRef.current);
    }
  }, [historyIntersection]);

  useEffect(() => {
    if (
      bestEventIntersection &&
      bestEventIntersection.intersectionRatio < 0.5
    ) {
      fadeOut(besteventRef.current);
    } else {
      fadeIn(besteventRef.current);
    }
  }, [bestEventIntersection]);

  useEffect(() => {
    const image = imageRef.current;
    const text = textRef.current;

    const tl = gsap.timeline();

    tl.fromTo(
      image,
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 2, ease: "power4.out" }
    );

    tl.fromTo(
      text,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=1"
    );
  }, []);

  return (
    <div>
      <div className="xl:h-[600px] md:h-[400px] lg:h-[500px] h-[350px] w-full bg-no-repeat bg-cover bg-center relative overflow-hidden">
        <Image
          className=" bg-white opacity-100 -z-10 inset-0 object-cover filter brightness-50  pointer-ev"
          ref={imageRef}
          src="/images/about/mainphoto.jpg"
          layout="fill"
          objectFit="cover"
          alt="Main photo"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={textRef}
            className="antialiased	sm:text-5xl main-text text-white text-center md:text-6xl lg:text-8xl text-3xl md:py-40 xl:pt-50 py-20 px-8 sm:px-20 font-['Khand'] font-semibold"
          >
            About Us
            <p className=" antialiased text-sm sm:text-lg	xl:text-3xl md:text-2xl xl:px-96 md:px-12 sm:px-12">
              Don't just host events, create memories. Expert planning for
              impactful experiences that leave a lasting impression
            </p>
          </div>
        </div>
      </div>

      <div ref={missionRef}>
        <div className="grid md:grid-cols-2 md:mx-4 lg:mx-16 xl:mx-40 lg:text-white xl:my-14 md:place-items-center place-items-center ">
          <div>
            <div className='mt-2 md:mt-8 px-8 py-4 md:text-left xl:mb-4 sm:text-3xl flex-auto w-full md:h-[5rem] flex-col text-center justify-center shrink-0 text-[#906953] font-["Khand"] md:text-4xl xl:text-5xl  sm:mt-10  font-semibold'>
              OUR MISSION
            </div>
            <div className='sm:px-6 sm:-mb-20 md:px-8 px-4 xl:mb-4  md:text-left flex-auto w-full h-[13rem] text-center flex-col shrink-0 text-black font-["Khand"] md:text-base  font-medium tracking-wider '>
              At EventNow our mission is to connect people through exceptional
              event experiences. We are committed to providing a seamless and
              user-friendly platform that empowers event organizers to create,
              promote, and manage their events effortlessly. By fostering a
              vibrant community of organizers and attendees, we aim to enhance
              the way people discover, share, and participate in events,
              fostering memorable moments and lasting connections.
            </div>
          </div>

          <div className="w-full h-full xl:mt-8 md:mt-40 lg:mt-36 px-8 mb-4 mt-28 lg:px-6 place-items-center flex justify-center items-center xl:px-0  ">
            <Image
              src={"/images/about/mission.jpg"}
              width={500}
              height={200}
              alt="mission"
              // className="w-auto h-auto"
            />
          </div>
        </div>
      </div>
      <div ref={visionRef}>
        <div className="grid md:grid-cols-2 lg:mx-16 xl:mx-40 xl:my-14 lg:-mt-4 md:mx-8">
          <div className="w-full h-full xl:mt-0 lg:mt-24 md:mt-44 px-8 mt-6 sm:-mt-16 hidden md:grid">
            <Image
              src={"/images/about/vision.jpg"}
              width={500}
              height={200}
              alt="vision"
            />
          </div>

          <div>
            <div className='md:mt-20 xl:-mt-2 px-8 py-4 md:text-left xl:mb-4 sm:text-3xl flex-auto w-full md:h-[5rem] flex-col text-center justify-center shrink-0 text-[#906953] font-["Khand"]  md:text-4xl xl:text-5xl  sm:mt-8  font-semibold'>
              OUR VISION
            </div>
            <div className=' sm:px-6 lg:px-8  px-4 mb-12 md:text-left flex-auto w-full h-[13rem] flex-col text-center shrink-0 text-black font-["Khand"] md:text-base font-medium tracking-wider'>
              Our vision is to be the go-to platform for event planning and
              participation, setting the standard for excellence in the digital
              events landscape. We envision a future where individuals and
              organizations worldwide turn to EventNow for all their event
              needs. By leveraging cutting-edge technology, fostering
              innovation, and prioritizing user satisfaction, we strive to
              become a global hub that transforms the way people celebrate,
              learn, and connect through events.
            </div>
          </div>

          <div className="w-full h-full xl:mt-0 lg:mt-24 md:mt-44 px-8 pt-20 sm:-mt-16 md:hidden place-items-center flex justify-center items-center">
            <Image
              src={"/images/about/vision.jpg"}
              width={500}
              height={200}
              alt="vision"
            />
          </div>
        </div>
      </div>

      <div className="mt-44">
        <div ref={historyRef}>
          <div className="bg-[#F9EBE9] py-8">
            <div className='text-center w-full  text-[#906953] font-["Khand"] md:text-4xl xl:text-6xl sm:text-3xl  font-semibold sm:mt-12'>
              OUR STORY
            </div>

            <div className="">
              {/* <div className="w-full flex justify-center items-center md:px-4 md:ml-4 xl:-mt-24 px-6 sm:px-0"> */}
              {/* <Image
              src={"/images/about/story.png"}
              width={500}
              height={300}
              alt="story"
              // className="w-auto h-auto"
            /> */}
              {/* </div> */}

              <div className=" sm:mt-8 xl:mx-12 sm:px-4 md:mt-0 ">
                <div className='mb-10 sm:px-8 text-center px-4 md:px-20 lg:px-32 mt-6  shrink-0 text-black font-["Khand"] md:text-base font-medium xl:tracking-wider '>
                  As aspiring event organizers immersed in the dynamic landscape
                  of IT in 2023, Team OneZero observed a seismic shift in how
                  individuals engage with experiences. The traditional methods
                  of marketing and sales pitches were losing their
                  effectiveness, drowned out by a discerning audience that had
                  mastered the art of ignoring interruptions. Inspired by this
                  shift, the vision for EventNow emerged—a platform founded on
                  the principles of &quot;inbound&quot; for the event space. The
                  fundamental belief that people no longer desired interruptions
                  but sought genuine assistance in their event journeys became
                  the cornerstone of EventNow. In the spirit of the inbound
                  movement, EventNow empowers event organizers to cease
                  interruption, embrace assistance, and refocus on the attendee.
                  Through our platform, we aim to catalyze a movement where
                  events become authentic, enriching experiences rather than
                  interruptions in people&rdquo;s lives. EventNow—Empowering
                  Events, Enhancing Experiences.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mt-52 mt-20">
        <div className='mt-6 text-center w-full  h-[5rem]  text-[#906953] font-["Khand"] md:text-4xl xl:text-5xl sm:text-3xl md:mt-12 font-semibold sm:my-10 '>
          Why choose EventNow?
        </div>
        <div className="lg:mx-32 grid sm:grid-cols-2 gap-4 font-['Khand'] md:mx-16 sm:mx-8 mx-4 ">
          <div className="bg-[#F9EBE9] w-full rounded-md ">
            <div className="text-center p-4  text-[#906953]  sm:text-2xl text-lg  ">
              Streamlined Event Management
            </div>
            <div className="px-8 pb-4 text-lg text-center ">
              EventNow provides a user-friendly interface that guides you
              through the entire event creation process, from start to finish.
              Manage everything from creating events and selling tickets to
              engaging with attendees all within a single, convenient hub.
            </div>
          </div>

          <div className="bg-[#F9EBE9] w-full rounded-md ">
            <div className="text-center p-4  text-[#906953]  sm:text-2xl text-lg  ">
              Seamless Event Booking
            </div>
            <div className="px-8 pb-4 text-lg text-center">
              Explore a vast variety of events happening near you, from concerts
              and conferences to festivals and workshops. Booking your spot is a
              breeze with our secure platform that allows you to register in
              just a few clicks.
            </div>
          </div>

          <div className="bg-[#F9EBE9] w-full rounded-md font-['Khand']">
            <div className="text-center p-4  text-[#906953]  sm:text-2xl text-lg ">
              Unparalleled Flexibility
            </div>
            <div className="px-8 pb-4 text-lg text-center">
              No matter the size or scale of your event, from intimate
              gatherings to large conferences or virtual events, EventNow caters
              to your specific needs. Design a ticketing system that drives
              sales with a variety of options, including different ticket tiers
              with varying prices and perks.
            </div>
          </div>

          <div className="bg-[#F9EBE9] w-full rounded-md font-['Khand']">
            <div className="text-center p-4  text-[#906953]  sm:text-2xl text-lg  ">
              Secure Transactions
            </div>
            <div className="px-8 pb-4 text-lg text-center">
              Enjoy complete peace of mind with a secure platform that
              safeguards both organizers and attendees. Our robust security
              measures protect financial information during ticket purchases,
              and advanced fraud prevention systems ensure all transactions are
              conducted safely and transparently.
            </div>
          </div>
        </div>
      </div>

      <div className='mt-32 text-center w-full  text-[#906953] font-["Khand"] md:text-4xl xl:text-5xl sm:text-3xl md:mt-44 font-semibold  '>
        Ready to get started?
      </div>

      <div className="lg:mx-16 md:mx-12 mx-8">
        <div className="grid sm:grid-cols-3 sm:gap-4">
          <div className="mt-8">
            <div className="grid grid-rows-2">
              <div className="w-full h-full flex justify-center">
                <Image
                  src={"/images/about/create.jpg"}
                  width={300}
                  height={300}
                  alt="step1"
                />
              </div>
              <div className="xl:pt-8 text-center xl:px-20 text-md lg:text-lg   font-semibold">
                Effortlessly create and customize your events with our intuitive
                platfor
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-rows-2 -mt-20 sm:mt-0">
              <div className="w-full flex justify-center">
                <Image
                  src={"/images/about/explore.jpg"}
                  width={300}
                  height={300}
                  alt="step1"
                />
              </div>
              <div className="xl:pt-8 text-center xl:px-20 text-md lg:text-lg  font-semibold">
                Discover a wide range of exciting, diverse events tailored to
                your interests.
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-rows-2 -mt-20 sm:mt-0">
              <div className="w-full flex justify-center">
                <Image
                  src={"/images/about/enjoy.jpg"}
                  width={300}
                  height={300}
                  alt="step1"
                />
              </div>
              <div className="xl:pt-8 text-center xl:px-20 text-md lg:text-lg   font-semibold">
                Easily check in and enjoy a seamless event experience with
                real-time updates.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={besteventRef}>
        <div className='mt-6 text-center w-full  h-[5rem]  text-[#906953] font-["Khand"] md:text-4xl xl:text-5xl sm:text-3xl md:mt-12 font-semibold sm:my-10 '>
          BEST EVENTS
        </div>

        <div className="m-10 grid xl:grid-cols-3  md:grid-cols-3     justify-center items-center place-items-center -mt-20 xl:mt-1">
          <BestEvent
            img="bestevent.png"
            eventname={"MEGA"}
            year={"2021"}
            description={
              "Darani, an extraordinary event, was held with unmatched grandeur and elegance. This remarkable gathering celebrated the fusion of culture and creativity, creating an unforgettable experience for all attendees. From captivating performances to delectable cuisine, Darani left a lasting impression on every guest. It was a momentous journey, where the vibrancy of tradition blended seamlessly with modernity. The event's success is a testament to the "
            }
          />

          <BestEvent
            img="bestevent.png"
            eventname={"MEGA"}
            year={"2021"}
            description={
              "Darani, an extraordinary event, was held with unmatched grandeur and elegance. This remarkable gathering celebrated the fusion of culture and creativity, creating an unforgettable experience for all attendees. From captivating performances to delectable cuisine, Darani left a lasting impression on every guest. It was a momentous journey, where the vibrancy of tradition blended seamlessly with modernity. The event's success is a testament to the "
            }
          />
          <BestEvent
            img="bestevent.png"
            eventname={"MEGA"}
            year={"2021"}
            description={
              "Darani, an extraordinary event, was held with unmatched grandeur and elegance. This remarkable gathering celebrated the fusion of culture and creativity, creating an unforgettable experience for all attendees. From captivating performances to delectable cuisine, Darani left a lasting impression on every guest. It was a momentous journey, where the vibrancy of tradition blended seamlessly with modernity. The event's success is a testament to the "
            }
          />
        </div>
      </div>
    </div>
  );
}
