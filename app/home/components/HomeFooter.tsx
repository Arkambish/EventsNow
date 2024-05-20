import React from "react";
import HomeButton from "./HomeButton";
import SocialButton from "./SocialButton";

export default function HomeFooter() {
  return (
    <div className="h-screen grid place-content-center bg-[#142A62]  ">
      <div className="  justify-center grid ">
        <div className="grid gap-2 ">
          <div className="text-center text-white font-dm-sans font-bold text-sm uppercase tracking-[2.8px] opacity-60 ">Unleash Your Event Potention</div>
          <div className=" text-center text-white font-bold text-[50px] font-abhaya-libre">Request More Information</div>
          <div className="  place-self-center text-white text-center font-dm-sans font-bold text-lg opacity-80 w-3/5">
            Discover the full range of features and services our website offers
            for effortless event planning and execution.
          </div>
          
          <div className="place-self-center my-6"><HomeButton filled={true} text={"Contact Us"} image={""} /></div>
          <div className="text-white text-center font-dm-sans text-sm font-bold opacity-80">© 2024 TeamOneZero</div>
        </div>
        <div className="h-0.5 bg-white opacity-20 my-5">  </div>
        <div className=" flex  justify-center gap-4   ">
            <SocialButton image={"linkedin"} />
            <SocialButton image={"facebook"} />
            <SocialButton image={"instagram"} />
            <SocialButton image={"youtube"} />

        </div>
      </div>
    </div>
  );
}
