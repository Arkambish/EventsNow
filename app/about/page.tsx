import React from "react";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import AnimatedAbout from "./components/AnimatedAbout";

export const metadata: Metadata = {
  title: " About",
  description: "This is the about page of the website.",
};

export default function page() {
  return (
    <div>
      <AnimatedAbout />
      <div className="mt-52"></div>

      <Footer />
    </div>
  );
}
