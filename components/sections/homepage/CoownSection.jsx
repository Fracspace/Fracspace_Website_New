import React from "react";
import Image from "next/image";
import herobg from "../../../assets/herobg.webp";
import growthImg from "../../../assets/growthGraph.png";
import managementImg from "../../../assets/management.png";
import sharedOwnImg from "../../../assets/sharedOwn.png";

function CoownSection() {
  return (
    <section className="mt-10">
      <div className="w-full flex flex-col md:flex-row gap-8 mx-auto max-w-7xl px-8 lg:px-10">
        <div className="md:flex-[6]">
          <h2 className="text-4xl font-jakarta">The Concept Of Co-Ownership</h2>
          <p className="pt-6 font-dm">
            Co-ownership empowers you to own a share of premium real estate with
            lower capital commitment and proportional income rights.
          </p>

          <div>
            <div className="mt-8 flex mr-10 gap-4 bg-gray-200 border-l-4 border-[#021265] px-6 py-4">
              <div className="bg-gray-300 w-34 h-12 md:w-18 md:h-12 flex items-center justify-center rounded-full">
                <Image
                  src={sharedOwnImg}
                  alt="co-own property"
                  className="w-6 h-6 md:w-8 md:h-7"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold font-jakarta">
                  Shared Ownership
                </h2>
                <p className="text-gray-600 font-dm">
                  Multiple investors share legal property ownership with clear
                  title deeds and structured agreements.
                </p>
              </div>
            </div>

            <div className="mt-8 flex mr-10 gap-4 bg-gray-200 border-l-4 border-[#021265] px-6 py-4">
              <div className="bg-gray-300 w-18 h-12 flex items-center justify-center rounded-full">
                <Image
                  src={sharedOwnImg}
                  alt="co-own property"
                  className=" md:w-8 md:h-7"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold font-jakarta">
                  Shared Ownership
                </h2>
                <p className="text-gray-600 font-dm">
                  Multiple investors share legal property ownership with clear
                  title deeds and structured agreements.
                </p>
              </div>
            </div>

            <div className="mt-8 flex mr-10 gap-4 bg-gray-200 border-l-4 border-[#021265] px-6 py-4">
              <div className="bg-gray-300 w-18 h-12 flex items-center justify-center rounded-full">
                <Image
                  src={sharedOwnImg}
                  alt="co-own property"
                  className=" md:w-8 md:h-7"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold font-jakarta">
                  Shared Ownership
                </h2>
                <p className="text-gray-600 font-dm">
                  Multiple investors share legal property ownership with clear
                  title deeds and structured agreements.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:flex-[4]">
          <Image
            src={herobg}
            alt="property image"
            className="aspect-[6/7] rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default CoownSection;
