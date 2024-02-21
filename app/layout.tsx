import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./AuthContext";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import NavBar from "@/components/Navbar/NavBar";

export const metadata: Metadata = {
  title: "EventsNow",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <link rel="icon" href="/ReusableComponents/nav-logo.png" sizes="any" />
        <AuthProvider>
          <AuthContextProvider>
            <NavBar />
            {children}
          </AuthContextProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
