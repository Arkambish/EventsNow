import { error, success } from '@/util/Toastify';
import { set } from 'mongoose';
import Image from 'next/image';
import React,{useState} from 'react'

type RegisteredEventCardProps = {
  eventName:string;
  regUserId:string;
  eventUpdates:boolean;
  marketingUpdates:boolean;
  eventImage:string;
}

export default function RegisteredEventCard(
    {eventName,regUserId,eventUpdates,marketingUpdates,eventImage}:RegisteredEventCardProps
) {
  const [getEventUpdates,setGetEventUpdates]=useState(eventUpdates);
  const [getMarketingUpdates,setGetMarketingUpdates]=useState(marketingUpdates);

  const registrationUpdateHandler=async ()=>{
    const res = await fetch(`/api/v1/user/updateRegistrationForEvent`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        regUserId,
        eventUpdates:getEventUpdates,
        marketingUpdates:getMarketingUpdates
      }),
    });
    if (!res.ok) {
      error('Failed to update registration');
      return;
    }
    success('Registration updated successfully');
  }

  return (      
    <div className='rounded-lg border-2 grid gap-2 pb-2'>

     <div className="  rounded-t-lg overflow-hidden"><Image
       
        alt={"event image"}
        src={eventImage}
        className="h-full w-full object-cover bg-center"
        width={300}
        height={100}
      /></div>
     
      
      <div className=" pl-2 pr-4 flex justify-between"><div className=" font-mono text-lg text-center font-semibold">{eventName}</div> <button className='bg-custom-orange button rounded-lg  text-sm  px-2 text-white'>
       EVENT PAGE </button></div>
      <div className="ml-2">
      <div className=" font-mono text-base text-center flex gap-2 ">
      <input
                type="checkbox"
                checked={getEventUpdates}
                className="my-auto"
                onChange={(e) => setGetEventUpdates(e.target.checked)}
              />get community page Updates</div>
      <div className=" font-mono text-base text-center flex gap-2 ">
      <input
                type="checkbox"
                checked={getMarketingUpdates}
                className="my-auto"
                onChange={(e) => setGetMarketingUpdates(e.target.checked)}
              />get marketing Updates</div>

      </div>

      <button onClick={registrationUpdateHandler} className='
      border-2 
       button rounded-lg mx-2  py-0 px-2 text-custom-orange text-base font-semibold'>
        update Registration </button>

      
    </div>
  )
}
