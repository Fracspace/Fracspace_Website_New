"use client";

import React from "react";
import Image from "next/image";
import howFsWorksBg from "../../assets/howFsWorksBg.webp";
import logo from "../../assets/logo22.png";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

function Footer() {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const router = useRouter();
  return (
    <section>
      <div className="mt-16 md:pl-3 md:pr-3 relative w-full h-full py-12 overflow-hidden">
        {!isMobile && (
          <Image
            alt="how fracspace works"
            src={howFsWorksBg}
            className="z-0 w-full h-full absolute top-0 left-0"
          />
        )}
        <div className="absolute z-10 w-full h-full bg-gradient-to-r from-slate-900/90 to-blue-900/60 top-0 left-0"></div>
        <div className="flex flex-col md:flex-row justify-between md:max-w-7xl px-5 sm:px-10 lg:mx-auto">
          <div className="z-20 text-white w-full md:w-[30vw]">
            <div className="">
              <Image
                alt="fracspace logo"
                className="md:w-60 md:h-12 object-contain"
                src={logo}
              />
              <p className="ml-2 mt-4 font-dm text-gray-300">
                Fracspace Offers Innovative Fractional Investment
                Opportunities,allowing you to own a share of luxury properites
                and unique real estate projects.
              </p>
              <div></div>
            </div>
          </div>
          <div className="z-20 ml-2  text-white md:w-[10vw] mt-2">
            <p className="text-xl font-600 font-jakarta ">Quick Links</p>
            <ul className="mt-4">
              <li className="cursor-pointer font-dm text-gray-300 hover:text-white transition" onClick={() => router.push("/")}>Home</li>
              <li className="cursor-pointer pt-2 font-dm text-gray-300 hover:text-white transition" onClick={() => router.push("/about")}>
                About Us
              </li>
              <li className="cursor-pointer pt-2 font-dm text-gray-300 hover:text-white transition" onClick={() => router.push("/properties")}>
                Properties
              </li>
              <li className="cursor-pointer pt-2 font-dm text-gray-300 hover:text-white transition" onClick={() => router.push("/contact")}>
                Contact Us
              </li>
            </ul>
          </div>
          <div className="z-20 ml-2 text-white md:w-[20vw] mt-2">
            <p className="text-xl font-600 font-jakarta ">Contact</p>
            <ul className="mt-4">
              <li className="font-dm text-gray-300">
                4th Floor, Dreamscape Hotel, MLA Colony, NBT Nagar, Road No.12,
                Banjara Hills, Hyderabad,Telangana, 500034
              </li>
              <li className="pt-2 font-dm text-gray-300">
                support@fracspace.com
              </li>
              <li className="pt-2 font-dm text-gray-300">
                {" "}
                +91 93555 65604, +91 98806 26111
              </li>
            </ul>
          </div>
          <div className="z-20 ml-2 text-white mt-2">
            <p className="text-xl font-600 font-jakarta">Legal</p>
            <ul className="mt-4">
              <li className="cursor-pointer font-dm text-gray-300 hover:text-white transition" onClick={() => router.push("/termsofuse")}>
                Terms Of Service
              </li>
              <li className="pt-2 cursor-pointer font-dm text-gray-300 hover:text-white transition" onClick={() => router.push("/privacypolicy")}>
                Privacy Policy
              </li>
              <li className="pt-2 cursor-pointer font-dm text-gray-300 hover:text-white transition" onClick={() => router.push("/refundpolicy")}>
                Refund Policy
              </li>
            </ul>
          </div>
        </div>

        <hr className="relative mt-8 max-w-6xl mx-auto z-30  h-[1px] bg-gray-400 border-none" />
        <p className="relative z-30 text-center mt-6 text-gray-300">
          Copy rights 2026. All Rights Reserved By Fracspace
        </p>
      </div>
    </section>
  );
}

export default Footer;
