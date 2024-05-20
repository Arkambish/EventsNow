import React from 'react'
import WorkDescribeComponent from './WorkDescribeComponent'

export default function HowItWorks() {
  return (
    <div className='h-screen grid  items-center'>
        <div className="">
        <div className="mb-12 text-center font-semibold text-[40px] text-white font-manrope">
        How it works?
        </div>
      <div className=" flex gap-5  justify-around mx-40 ">
      <WorkDescribeComponent
      fillColor={"#9672FF"}
      image={"organization.png"}
      headerText={"Create Organizations"}
      text={"Get started swiftly & easily by creating an organization to host your events effortlessly in a single click."}/>
      <WorkDescribeComponent
      fillColor={"#4DDFFD"}
      image={"event.png"}
      headerText={"Host Events "}
      text={"Easily organized and manage your events. Setup details, invite attendees, and track registrations all in one platform.  "}/>
      <WorkDescribeComponent
      fillColor={"#F2B8EC"}
      image={"organization.png"}
      headerText={"Buy Tickets"}
      text={"Secure your spot with just a few clicks. Browse events, select your tickets, and complete your purchase quickly and easily."}/>
      </div>
        </div>
      
      
    </div>
  )
}
