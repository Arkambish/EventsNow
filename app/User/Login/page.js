import SignupSocial from "@/components/SignupSocial";
import Image from "next/image";
import Footer from "@/components/Footer";
import CreatAccountText from "./CreatAccountText";
import LoginForm from "./LoginForm";
import NavBar from "@/components/NavBar";

export default function LogIn() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2  p-8">
          <h1 className="text-custom-blue font-khand text-5xl text-center mt-3 font-bold">
            Log-in to Events now
          </h1>
          <div className="flex flex-col items-center my-12">
            <LoginForm />
          </div>
          <SignupSocial />

          <CreatAccountText />
        </div>

        <Image
          src="/ReUsableComponentData/login.jpg"
          alt="Man"
          width={900}
          height={735}
        />
      </div>
      <Footer />
    </>
  );
}
