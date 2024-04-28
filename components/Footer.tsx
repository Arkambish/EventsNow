"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { error, success } from "@/util/Toastify";


export default function Footer() {
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhone_number] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const validateform = z.object({
    first_name: z.string().min(1, {message : "First name is required"}),
    last_name: z.string().min(1),
    email: z.string().email({message: "Invalid email"}),
    phone_number: z.string().min(10,{message: "Phone number is required"}),
    description: z.string().max(1000,{message: "Description is required"}),
    checked: z.boolean().refine(value => value === true, { message: "Do you agree to the terms and conditions?" }),
  })

  async function submitForm(e: any) {
    try {

      e.preventDefault();
      setIsSubmitting(true);

      const data = {
        first_name,
        last_name,
        email,
        phone_number,
        description,
        checked
      }
      
      const result = validateform.safeParse(data);

      if (result.success) {
       const res = await fetch(`/api/v1/contact`, 
       {
        method: "POST",
        mode : "cors",
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      alert("There is an error submitting datails");
      setIsSubmitting(false);
      return;
    } 
    success("Contact form submitted successfully");

    setFirst_name("");
    setLast_name("");
    setEmail("");
    setPhone_number("");
    setDescription("");
    setChecked(false);
    setIsSubmitting(false);

  }else{
    error("There is an error submitting the form");
  }
  setIsSubmitting(false);
}catch{
  error("There is an error submitting the form");
  setIsSubmitting(false);
}
}
  return (
    <>
      <div className="h-12 bg-myBrown"></div>
      <div className="flex sm:flex-row sm:content-normal	 content-center	  flex-col w-full bg-custom-brown pr-4 pl-4 ">
        <div className="flex flex-col    justify-evenly sm:w-7/12 w-full pt-6 pr-5 pl-5 mb-6 ">
          <div className="text-custom-orange flex justify-center font-bold text-5xl mb-8 sm:mb-2">
            Want to talk ?
          </div>
          <div className="relative sm:text-base text-black font-normal lg:ml-12 md:ml-4 sm:ml-0 sm:mb-2 mb-2 lg:pl-20 md:pl-8 sm:pl-0 lg:pr-20 md:pr-8 sm:pr-0 text-center	">
            Fill out your information and an EventNow representative will reach
            out to you. Have a simple question?
          </div>

          <div className="flex sm:flex-row sm:justify-evenly justify-between text-center mt-2">
            <button>
              <Image
                src={`/images/footer/facebook.svg`}
                alt="Picture of the button"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </button>
            <button>
              <Image
                src={`/images/footer/instergram.svg`}
                alt="Picture of the button"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </button>
            <button>
              <Image
                src={`/images/footer/google.svg`}
                alt="Picture of the button"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </button>
            <button>
              <Image
                src={`/images/footer/youtube.svg`}
                alt="Picture of the button"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </button>
            <button>
              <Image
                src={`/images/footer/messenger.svg`}
                alt="Picture of the button"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </button>
          </div>
          <div className="sm:flex justify-center hidden   mt-2  sm:justify-center">
            <Image
              src={`/images/reusableComponents/nav-logo.svg`}
              alt="Picture of the button"
              width={0}
              height={0}
              className="w-20 h-20"
            />
          </div>

          <div className="text-black justify-center lg:text-sm hidden text-xs sm:flex flex-row sm:ml-4 md:ml-0 lg:ml-0 mt-2">
            <button>
              <div className="mr-6">About</div>
            </button>
            <button>
              <div className="mr-6">Team</div>
            </button>
            <button>
              <div className="mr-6">Privacy policy</div>
            </button>
            <button>
              <div className="">Terms of use</div>
            </button>
          </div>
        </div>
        <div className="sm:w-5/12 w-full p-2 justify-evenly  sm:mr-10">
          <form>
            <div className="flex flex-wrap justify-between sm:mt-14 sm:flex-col md:flex-col lg:flex-row">
              <div className="w-1/2 mb-4 ">
                <div className="mb-2">First Name</div>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                  className="rounded-lg p-1 bg-custom-lightorange border-solid border-2 border-gray-600 mr-2"
                />
              </div>
              <div className="sm:w-1/2 w-full mb-4">
                <div className="mb-2">Last Name</div>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                  className="rounded-lg p-1 bg-custom-lightorange border-solid border-2 border-gray-600 outline-none "
                />
              </div>
              <div className="sm:w-1/2 w-full mb-4">
                <div className="mb-2">Email</div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg p-1 bg-custom-lightorange border-solid border-2 border-gray-600 outline-none "
                />
              </div>
              <div className="sm:w-1/2 w-full mb-4">
                <div className="mb-2">Phone number</div>
                <input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  className="rounded-lg p-1 bg-custom-lightorange border-solid border-2 border-gray-600 outline-none "
                />
              </div>
              <div className=" mb-4">
                <div className="mb-2">What would you like to discuss</div>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  cols={40}
                  className="rounded-lg bg-custom-lightorange border-solid border-2 border-gray-600 outline-none w-full"
                />
              </div>

              <div className="flex sm:flex-row  mb-4">
                <input 
                  type="checkbox"
                  name="checked"
                  id="checked"
                  value={checked.toString()}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <div className="text-black text-xs ml-2 w-100">
                  By checking and clicking Submit, you are agreeing to
                  EventNow’s Privacy
                </div>
              </div>
              <button className="flex flex-start w-full mb-4 sm:w-1/2 ">
                <input
                  type="submit"
                  value="Submit"
                  onClick={submitForm}
                  className="bg-custom-orange text-white sm:text-base text-xs sm:w-24  w-12 sm:p-2 p-1 rounded-2xl "
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
