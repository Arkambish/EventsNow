import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const animateHero = () => {
  const tl = gsap.timeline();

  tl.from("#quote", {
    duration: 2,
    text: "",
    ease: "power2.out",
    onComplete: function () {
      this.restart();
    },
  });

  tl.to("#quote", {
    duration: 2,
    text: "“Where Moments Become Memories”",
    ease: "none",
  });
};

export default animateHero;
