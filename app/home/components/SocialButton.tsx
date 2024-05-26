import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function SocialButton({ image }: { image: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.fromTo(
      button,
      { backgroundPosition: "0% 0%" },
      { backgroundPosition: "100% 0%", duration: 0.5 }
    );
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, { backgroundPosition: "0% 0%", duration: 0.5 });
  };

  return (
    <button
      ref={buttonRef}
      className="grid size-11 rounded-full border-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage:
          "linear-gradient(to right, #142A62 0%, #142A62 50%, #ffffff 50%, #ffffff 100%)",
        backgroundSize: "200% 100%",
      }}
    >
      <Image
        src={`/images/home/${image}.svg`}
        alt="Picture of the button"
        width={image === "facebook" ? 10 : 15}
        height={10}
        quality={100}
        className="place-self-center"
      />
    </button>
  );
}
