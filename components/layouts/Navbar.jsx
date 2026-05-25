"use client";

import React, { useState } from "react";
import logo from "../../assets/logo.png";
import scannerIcon from "../../assets/scannerIcon.png";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isMenu, setIsMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="ml-[3vw] mr-[3vw] flex items-center justify-between border-b border-bule-200 md:border-none">
        <div>
          <Image
            alt="fracspace logo"
            src={logo}
            className="w-[50vw] h-[12vh] md:w-[16vw] md:h-[12vh]"
          />
        </div>

        {!isMobile ? (
          <div>
            <ul className="w-[50vw] flex items-center justify-between">
              <li className="cursor-pointer" onClick={() => router.push("/")}>
                Home
              </li>
              <li
                className="cursor-pointer"
                onClick={() => router.push("/about")}
              >
                About Us
              </li>
              <li className="cursor-pointer">Blogs</li>
              <li className="cursor-pointer">Agents</li>
              <li className="cursor-pointer">Contact</li>
              <div>
                <button className="bg-[#021265] text-white font-jakarta flex px-4 py-2 rounded-xl cursor-pointer">
                  <Image
                    src={scannerIcon}
                    alt="download app"
                    className="w-[2vw] h-[2vw] mr-2"
                  />{" "}
                  Download App
                </button>
              </div>
            </ul>
          </div>
        ) : (
          <div
            className="mr-4 cursor-pointer"
            onClick={() => setIsMenu(!isMenu)}
          >
            {" "}
            <Menu />{" "}
          </div>
        )}
      </div>

      {isMenu && (
        <div className="bg-white">
          <ul className="w-full flex-col items-center justify-between">
            <li className="text-center text-2xl font-jakarta pt-4">Home</li>
            <li className="text-center text-2xl font-jakarta pt-4">About Us</li>
            <li className="text-center text-2xl font-jakarta pt-4">Blogs</li>
            <li className="text-center text-2xl font-jakarta pt-4">Agents</li>
            <li className="text-center text-2xl font-jakarta pt-4">Contact</li>
            <div className="flex mt-4 pb-4 items-center justify-center mx-auto w-full">
              <button className="bg-[#021265] text-white font-jakarta flex px-4 py-2 rounded-xl cursor-pointer">
                <Image
                  src={scannerIcon}
                  alt="download app"
                  className="w-[2vw] h-[2vw] mr-2"
                />{" "}
                Download App
              </button>
            </div>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
