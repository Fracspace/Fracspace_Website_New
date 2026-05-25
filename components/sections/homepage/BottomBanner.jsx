import React from "react";
import Image from "next/image";
import mobiImg from "../../../assets/mobileImg.webp";
import googleplayImg from "../../../assets/googleplay.png";
import appstoreImg from "../../../assets/appstore.png";

function BottomBanner() {
  return (
    <section className="">
      <div className="shadow-xl border border-gray-200 rounded-xl flex flex-col md:flex-row items-center mx-auto max-w-7xl ml-10 mr-10 px-6 py-4 mt-12">
        <div className=" md:w-[70vw]">
          <h2 className="text-2xl md:text-4xl font-jakarta leading-[1.5]">
            Explore, invest, and earn - all in one app. Download Fracspace
            today!
          </h2>
          <p className="text-lg font-dm mt-4">
            Explore verified co-ownership opportunities and invest with
            confidence.
          </p>
          <div className="flex  md:flex-row">
            <Image
              alt="google play store icon"
              src={googleplayImg}
              className="w-[30vw] md:w-[10vw] mt-3"
            />
            <Image
              alt="apple app store icon"
              src={appstoreImg}
              className="w-[30vw] md:w-[10vw] mt-3 ml-3"
            />
          </div>
        </div>
        <div>
          <Image
            alt="fracspace mobile app image"
            src={mobiImg}
            className=" my-6 md:my-0 aspect-[3/2] md:aspect-[3/4] md:h-[50vh] "
          />
        </div>
      </div>
    </section>
  );
}

export default BottomBanner;
