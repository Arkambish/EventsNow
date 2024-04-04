"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { error, success } from "../../../../util/Toastify";
import Image from "next/image";
import { z } from "zod";

export default function LoginFormBasic() {
  const [firstName, setFristName] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false);

  const [lastName, setLastName] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [passwordConfirm, setCPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const validateSignUpForm = z.object({
    firstName: z
      .string()
      .min(1, "Enter your first name")
      .regex(/^[a-zA-Z ]*$/, {
        message: "Cannot enter number or symbol for name",
      }),
    lastName: z
      .string()
      .min(1, "Enter your last name")
      .regex(/^[a-zA-Z ]*$/, {
        message: "Cannot enter number or symbol for name",
      }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    passwordConfirm: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .refine((value) => value === password, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
      }),
  });
  async function sendLoginData(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      };
      const result = validateSignUpForm.safeParse(data);
      if (result.success) {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/user/exist`,
          {
            mode: "no-cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const dat = await user.json();

        if (dat.user !== null) {
          setIsSubmitting(false);
          error("Already exist this email");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/user/signup`,
          {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data),
          }
        );

        if (!res.ok) {
          setIsSubmitting(false);
          error("There is a error for registartion");
          return;
        }

        setFristName("");
        setLastName("");
        setemail("");
        setpassword("");
        setCPassword("");
        setSpinner(false);
        success("Successfully created your account");
        router.push("/auth/login");
        setIsSubmitting(false);
      } else {
        const formattedError = result.error.format();
        if (formattedError.firstName?._errors) {
          error(String(formattedError.firstName?._errors));
        } else if (formattedError.lastName?._errors) {
          error(String(formattedError.lastName?._errors));
        } else if (formattedError.email) {
          error(String(formattedError.email?._errors));
        }
        if (formattedError.password?._errors) {
          error(String(formattedError.password?._errors));
        }
        if (formattedError.passwordConfirm?._errors) {
          error(String(formattedError.passwordConfirm?._errors));
        } else error("an unknown error occur in validation process");
      }
    } catch (e) {
      setIsSubmitting(false);
      error("There is a error for registartion");
    }
  }

  return (
    <div className="mx-auto  flex justify-center">
      <div className="">
        <div className=" mt-2 leading-none	 text-center text-[#455273] font-khand text-[40px] sm:text-[64px] font-semibold">
          Create account
        </div>
        <form
          className=" flex-column "
          action={sendLoginData}
          onSubmit={(e) => sendLoginData(e)}
        >
          <input
            required
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFristName(e.target.value)}
            className="focus:outline-custom-orange my-5 w-full h-8 block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-2 rounded-[12px]"
            placeholder="Enter your first name  "
          ></input>

          <input
            required
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="focus:outline-custom-orange my-5 w-full h-8 block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-2 rounded-[12px]"
            placeholder="Enter your last name  "
          ></input>

          <input
            required
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="focus:outline-custom-orange my-5 w-full h-8 block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-2 rounded-[12px]"
            placeholder="Enter your email "
          ></input>

          <input
            required
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="focus:outline-custom-orange my-5 w-full h-8 block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-2 rounded-[12px]"
            placeholder="Create password  "
          ></input>

          <input
            required
            type="password"
            name="cPassword"
            id="cPassword"
            value={passwordConfirm}
            onChange={(e) => setCPassword(e.target.value)}
            className="focus:outline-custom-orange my-5 w-full h-8 block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-2 rounded-[12px]"
            placeholder="Confirm password  "
          ></input>

          {isSubmitting ? (
            <button className="button flex text-center mt-10 mb-10 xl:mb-20  px-2 justify-center bg-custom-orange text-white font-semibold rounded-lg  text-base font-mono ">
              <div className="flex gap-2 justify-center items-center">
                <div> Creating</div>
                <Image
                  src="/images/reusableComponents/Loading.svg"
                  alt="loading btn"
                  width={40}
                  height={40}
                />
              </div>
            </button>
          ) : (
            <button
              type="submit"
              className="button flex text-center p-1 justify-center w-full bg-custom-orange text-white font-semibold rounded-lg  text-base font-mono"
            >
              CREAT ACCOUNT
            </button>
          )}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
