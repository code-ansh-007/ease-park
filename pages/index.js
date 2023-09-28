import Image from "next/image";
import { VT323 } from "next/font/google";
import gsap from "gsap";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

const vt = VT323({ subsets: ["latin"], weight: ["400"] });

export default function Home({ demo }) {
  const router = useRouter();
  // Loading Effect
  useEffect(() => {
    const titleElement = document.querySelector(".animated-title");

    const tl = gsap.timeline();
    tl.to(titleElement, {
      duration: 2,
      transform: "scale(0.7)",
      ease: "power2.inOut",
    }).to(titleElement, {
      duration: 1.5,
      transform: "scale(3)",
      opacity: 0,
      transform: "scale(3.5)",
      display: "none",
      ease: "power2.inOut",
    });
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`min-h-screen min-w-screen p-12  ${vt.className} bg-[#062145] max-sm:p-4 max-md:bg-[#161B24] `}
    >
      <div className="max-md:hidden">
        <div className="flex justify-between items-center max-sm:justify-between">
          <h1 className={`text-8xl text-slate-200 max-sm:text-6xl `}>
            Ease<span className="  text-[#00ff00]">Park</span>
          </h1>
          <button className="bg-[#00ff00] p-3 px-12 rounded-2xl  max-sm:px-3">
            <span className="text-3xl text-slate-900">
              <span className="max-sm:hidden">Login</span>{" "}
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/user--v1.png"
                alt="user--v1"
                className="sm:hidden"
              />
            </span>
          </button>
        </div>
        <div className="md:hidden">
          <video
            className=" ml-32 my-4 max-sm:ml-0"
            loop
            autoPlay
            muted
            width="400"
            height="400"
          >
            <source src="v1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex m-h-screen bg-[#062145] max-sm:flex-col">
          <div className=" py-28 pl-10">
            <h2 className="text-6xl text-slate-200">Make Parking Easy</h2>
            <h2 className="text-4xl  text-[#00ff00] ">
              Pay <span className="text-white">.</span> Park{" "}
              <span className="text-white">.</span> Proceed
            </h2>
            <p className="text-4xl py-4 text-slate-200">
              Rent your place for parking and make your city traffic free.{" "}
              <br /> The best parking app to save your time.
            </p>
            <button className=" bg-[#00ff00] p-3 px-20 rounded-2xl">
              <span className="text-3xl text-slate-900">Book Now</span>
            </button>
          </div>
          <div>
            <video
              className=" ml-32 my-4 max-lg:ml-2 max-lg:my-32"
              loop
              autoPlay
              muted
              width="400"
              height="400"
            >
              <source src="v1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* Mobile Part */}
      <div className="flex justify-center items-center h-screen md:hidden">
        {/* <h1 className={'${vt.className} text-6xl  tracking-wider animated-title text-white'}>
          Ease<span className="text-[#5EE65A]">Park</span>
        </h1> */}
        <img src="easepark.svg" className="animated-title"></img>
      </div>
      <div className={` fixed top-0 left-0  ${isVisible ? "" : "hidden"}`}>
        <div className=" h-80 w-screen flex justify-center items-center md:hidden">
          {/* <h1 className="text-6xl tracking-wider text-white ">
            Ease<span className="text-[#5EE65A]">Park</span>
          </h1> */}
          <img src="easepark.svg" className=" w-3/4"></img>
        </div>
        <div className="flex h-72 -mt-12 flex-col  items-center md:hidden">
          <button
            onClick={() => router.push("/auth/signin")}
            className=" bg-green-600 px-24 py-3 rounded-2xl text-2xl m-4 font-bold text-white"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth/signin")}
            className=" bg-green-600 px-24 py-3 rounded-2xl text-2xl m-4 font-bold text-white"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/mainHome",
        permanent: false,
      },
    };
  }
}
