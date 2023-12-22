import Image from "next/image";
function EventCard(props) {
  return (
    <div className="text-neutral-50  bg-base rounded-[9px] w-64 shrink-0 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)]  m-10">
      <div className="styleQ">
        <Image src={props.img} alt={"event-img"} width={256} height={301} />
      </div>

      <div className="grid grid-cols-3 ">
        <div className="text ml-5 col-span-2  text-xl font-mono  font-extrabold ">
          {props.name}
        </div>
        <button className="hover:bg-[#526595] col-span-1 w-63 h-22 mr-4 rounded-[10px]   text-center text-sm font-mono bg-base2">
          INFO
        </button>
      </div>
      <div>
        <hr className="w-52 ml-5 mt-1"></hr>
      </div>

      <div className=" flex">
        <Image
          className="mt-1"
          src={"/Pin_fill.svg"}
          alt={"pin-fill"}
          width={47}
          height={47}
        />
        <div className="text-xs font-khand font-semibold my-auto ">
          {props.location}
        </div>
        <div className=" ml-6 mr-2 border-l-[1px] border-solid border-white h-10 w-1"></div>
        <Image
          src={"/Time_fill.svg"}
          alt={"time-fill"}
          width={30}
          height={24}
        />
        <div className="flex flex-col mr-auto ml-3">
          <div className="text-xs font-khand font-semibold my-auto ">
            21st MAY
          </div>
          <div className="text-xs font-khand font-semibold my-auto ">
            21.00{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
