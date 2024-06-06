"use client";
import { error, success } from "@/util/Toastify";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyEmail = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/user/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (data.message === "Email verified successfully") {
        success("Email verified successfully");
        setVerified(true);
      } else {
        error(data.error || "Invalid or expired token");
      }
    } catch (err: any) {
      error(err.message);
    }
  }, [token]);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token, verifyEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 lg:h-3/4 h-screen  bg-[#AC736D]">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
        {verified ? (
          <div className="text-center">
            <h2 className="text-green-600 text-xl font-semibold mb-4">
              Email verified successfully
            </h2>
            <Link className="text-blue-500 hover:underline" href="/auth/login">
              <button className="hover:opacity-85 my-3 button flex text-center mt-8 p-1 justify-center w-full content-center bg-custom-orange text-white font-semibold rounded-md  text-base font-mono">
                Go to Login
              </button>
            </Link>
          </div>
        ) : (
          <button className="hover:opacity-85 my-3 button flex text-center mt-8 p-1 justify-center w-full content-center bg-custom-orange text-white font-semibold rounded-md  text-base font-mono">
            <div className="flex gap-2 justify-center items-center">
              <div>Verifying email</div>
              <Image
                src="/images/reusableComponents/Loading.svg"
                alt="loading btn"
                width={25}
                height={40}
              />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
