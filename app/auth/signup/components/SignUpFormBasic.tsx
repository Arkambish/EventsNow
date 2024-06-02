"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";

import { error, success } from "../../../../util/Toastify";
import Image from "next/image";
import { z } from "zod";
import toast from "react-hot-toast";

export default function LoginFormBasic() {
  const [firstName, setFristName] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false);

  const [lastName, setLastName] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [passwordConfirm, setCPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const validateSignUpForm = z
    .object({
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
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Password Doesnot Match",
    });
  async function sendLoginData(e: any) {
    e.preventDefault();

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
        setIsSubmitting(true);
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
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Successfully created your account 🔥
                  </p>
                  <p className="mt-1 text-sm text-orange-500">
                    Please verify your email before logging in
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));
        //success("Successfully created your account");
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
        <div className=" my-2 leading-none mb-8 	 text-center text-[#455273] font-khand text-[35px] sm:text-[50px] font-semibold">
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
            className="w-full px-3 py-[4px] border rounded-md focus:outline-none focus:border-slate-700  my-3"
            placeholder="Enter your first name  "
          ></input>

          <input
            required
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-[4px] border rounded-md focus:outline-none focus:border-slate-700  my-3"
            placeholder="Enter your last name  "
          ></input>

          <input
            required
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-3 py-[4px] border rounded-md focus:outline-none focus:border-slate-700 my-3"
            placeholder="Enter your email "
          ></input>

          <input
            required
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-3 py-[4px] border rounded-md focus:outline-none focus:border-slate-700  my-3"
            placeholder="Create password  "
          ></input>

          <input
            required
            type="password"
            name="cPassword"
            id="cPassword"
            value={passwordConfirm}
            onChange={(e) => setCPassword(e.target.value)}
            className="w-full px-3 py-[4px] border rounded-md focus:outline-none focus:border-slate-700  my-3"
            placeholder="Confirm password  "
          ></input>

          {isSubmitting ? (
            <button className="hover:opacity-85 my-3 button flex text-center mt-8 p-1 justify-center w-full content-center bg-custom-orange text-white font-semibold rounded-md  text-base font-mono">
              <div className="flex gap-2 justify-center items-center">
                <div> CREATING</div>
                <Image
                  src="/images/reusableComponents/Loading.svg"
                  alt="loading btn"
                  width={25}
                  height={40}
                />
              </div>
            </button>
          ) : (
            <button
              type="submit"
              className=" hover:opacity-85 my-3 button flex text-center mt-8 p-1 justify-center w-full content-center bg-custom-orange text-white font-semibold rounded-md  text-base font-mono"
            >
              CREATE ACCOUNT
            </button>
          )}
        </form>
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
}
