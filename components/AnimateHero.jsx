import { gsap } from "gsap";

const animateHero = () => {
  const tl = gsap.timeline();

  tl.set("#quote", {
    opacity: 0,
  });

  tl.to("#quote", {
    duration: 4,
    opacity: 1,
    text: "“Where Moments Become Memories”",
    ease: "power2.out",
  });
};

export default animateHero;
