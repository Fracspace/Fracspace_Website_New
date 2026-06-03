import React from "react";
import Image from "next/image";
import herobg from "../../../assets/herobg.webp";
import growthImg from "../../../assets/icons/growthGraph.png";
import managementImg from "../../../assets/icons/management.png";
import sharedOwnImg from "../../../assets/icons/sharedOwn.png";
import coOwnImg from "../../../assets/coOwnImg.webp";

function CoownSection() {
  return (
    <section className="mt-10">
      <div className="w-full flex flex-col md:flex-row gap-8 mx-auto max-w-7xl px-8 lg:px-10">
        <div className="md:flex-[6]">
          <h2 className="text-3xl md:text-4xl font-jakarta">
            The Concept Of Co-Ownership
          </h2>
          <p className="pt-6 font-dm">
            Co-ownership empowers you to own a share of premium real estate with
            lower capital commitment and proportional income rights.
          </p>

          <div>
            <div className="mt-8 flex md:mr-10 gap-4 bg-gray-100 border-l-4 border-[#021265] px-6 py-4">
              <div className="bg-gray-300 px-2 w-38 h-12 md:w-18 md:h-12 flex items-center justify-center rounded-full">
                <Image
                  src={sharedOwnImg}
                  alt="co-own property"
                  className="w-8 h-6  md:w-8 md:h-7"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold font-jakarta">
                  Shared Ownership
                </h2>
                <p className="text-gray-600 font-dm">
                  Multiple investors share legal property ownership with clear
                  title deeds and structured agreements.
                </p>
              </div>
            </div>

            <div className="mt-8 flex md:mr-10 gap-4 bg-gray-100 border-l-4 border-[#021265] px-6 py-4">
              <div className="bg-gray-300  px-2 w-38 h-12 md:w-18 md:h-12 flex items-center justify-center rounded-full">
                <Image
                  src={growthImg}
                  alt="co-own property"
                  className="w-8 h-6 md:w-8 md:h-7"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold font-jakarta">
                  Proportional Returns
                </h2>
                <p className="text-gray-600 font-dm">
                  Earn rental income and capital appreciation exactly
                  proportional to your ownership share.
                </p>
              </div>
            </div>

            <div className="mt-8 flex md:mr-10 gap-4 bg-gray-100 border-l-4 border-[#021265] px-6 py-4">
              <div className="bg-gray-300 px-2 w-38 h-12 md:w-18 md:h-12 flex items-center justify-center rounded-full">
                <Image
                  src={managementImg}
                  alt="co-own property"
                  className="w-8 h-6 md:w-8 md:h-7"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold font-jakarta">
                  Managed For You
                </h2>
                <p className="text-gray-600 font-dm">
                  We handle all operations, compliance, tenant management, and
                  reporting so you simply earn.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:flex-[4]">
          <Image
            src={coOwnImg}
            alt="property image"
            className="aspect-[6/7] rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default CoownSection;
