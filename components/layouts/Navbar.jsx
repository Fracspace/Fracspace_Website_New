"use client";

import React, { useState } from "react";
import logo from "../../assets/logo.png";
import scannerIcon from "../../assets/scannerIcon.png";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { useDownloadApp } from "@/context/DownloadAppContext";

function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isMenu, setIsMenu] = useState(false);
  const router = useRouter();

  const { openDownloadModal } = useDownloadApp();

  return (
    <>
      <div className="mx-auto flex items-center justify-between md:border-none w-full max-w-7xl px-4">
        <div>
          <Image
            alt="fracspace logo"
            src={logo}
            className="w-[48vw] max-w-[180px] md:w-[14vw] md:max-w-[210px] h-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {!isMobile ? (
          <div>
            <ul className="flex items-center gap-6 lg:gap-8">
              <li className="cursor-pointer hover:text-blue-600 transition" onClick={() => router.push("/")}>
                Home
              </li>
              <li
                className="cursor-pointer hover:text-blue-600 transition"
                onClick={() => router.push("/about")}
              >
                About Us
              </li>
              <li className="cursor-pointer hover:text-blue-600 transition" onClick={() => router.push("/properties")}>Properties</li>
              <li
                className="cursor-pointer hover:text-blue-600 transition"
                onClick={() => router.push("/contact")}
              >
                Contact
              </li>
              <li>
                <button
                  className="bg-[#021265] text-white font-jakarta flex px-4 py-2.5 rounded-xl cursor-pointer hover:bg-blue-800 transition items-center whitespace-nowrap"
                  onClick={openDownloadModal}
                >
                  <Image
                    src={scannerIcon}
                    alt="download app"
                    className="w-5 h-5 mr-2"
                  />
                  Download App
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div
            className="mr-4 cursor-pointer p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMenu(!isMenu)}
          >
            {" "}
            <Menu />{" "}
          </div>
        )}
      </div>

      {isMenu && (
        <div className="bg-white border-b border-gray-100 shadow-lg absolute left-0 right-0 z-50 transition-all duration-300">
          <ul className="w-full flex flex-col items-center justify-between py-4">
            <li className="text-center text-md font-jakarta py-3 w-full cursor-pointer hover:bg-gray-50" onClick={() => { router.push("/"); setIsMenu(false); }}>Home</li>
            <li className="text-center text-md font-jakarta py-3 w-full cursor-pointer hover:bg-gray-50" onClick={() => { router.push("/about"); setIsMenu(false); }}>About Us</li>
            <li className="text-center text-md font-jakarta py-3 w-full cursor-pointer hover:bg-gray-50" onClick={() => { router.push("/properties"); setIsMenu(false); }}>Properties</li>
            <li className="text-center text-md font-jakarta py-3 w-full cursor-pointer hover:bg-gray-50" onClick={() => { router.push("/contact"); setIsMenu(false); }}>Contact</li>
            <div className="flex mt-4 pb-2 items-center justify-center mx-auto w-full">
              <button 
                className="bg-[#021265] text-white font-jakarta flex px-6 py-2 rounded-xl cursor-pointer hover:bg-blue-800 transition"
                onClick={() => { openDownloadModal(); setIsMenu(false); }}
              >
                <Image
                  src={scannerIcon}
                  alt="download app"
                  className="w-[6vw] h-[6vw] mr-2"
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
