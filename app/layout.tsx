import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import AuthProvider from "./AuthProvider";
// import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./AuthContext";
const inter = Inter({ subsets: ["latin"] });

// import NavBar from "@/components/Navbar/NavBar";
import AuthProvider from "./AuthProvider";
import TostifyProvider from "@/provider/TostifyProvider";
import "grapesjs/dist/css/grapes.min.css";
import "grapick/dist/grapick.min.css";
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
        <link rel="icon" href="/reusableComponents/nav-logo.png" sizes="any" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Monoton&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <AuthProvider>
          <AuthContextProvider>
            <NavBar />
            {children}
          </AuthContextProvider>
          <TostifyProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
