import Image from "next/image";
import React from "react";
interface log {
  titleOfbutton: String;
  image: String;
  fn?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Login({ image, titleOfbutton, fn }: log) {
  return (
    <button onClick={fn} className={`bg-custom-orange  button hover:opacity-85 h-8 rounded-md`}>
      <div className="flex  flex-row ml-2 mr-2  gap-2 p-0 items-center justify-center">
        {/* <Image
          src={`/images/reusableComponents/${image}`}
          alt="Picture of the button"
          width={20}
          height={20}
        /> */}
        <div className=" text-white text-sm font-semibold ">{titleOfbutton}</div>
      </div>
    </button>
  );
}
