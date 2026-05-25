import React from "react";
import Image from "next/image";
import heroImg from "../../../assets/herobg.webp";
import complemtaryIcon from "../../../assets/icons/complementaryStays.png";
import lockIcon from "../../../assets/icons/lock.png";
import dualIncomeIcon from "../../../assets/icons/dualIncome.png";
import managedAssetIcon from "../../../assets/icons/managedAsset.png";

function WhyInvestWithFs() {
  return (
    <section className="mt-12 relative">
      <div className="w-full h-full min-h-screen absolute bg-gradient-to-r from-blue-900/90 to-bule-900/90  z-20"></div>
      <Image
        alt="hero image"
        src={heroImg}
        className="absolute z-10 w-full h-full min-h-screen"
      />
      <div className="z-30 relative py-12 mx-auto max-w-7xl">
        <h2 className="text-center font-jakarta text-4xl text-white font-jakarta">
          Why Invest with Fracspace?
        </h2>
        <div className="mt-12 mx-10 max-w-7xl flex flex-col md:flex-row  justify-between">
          <div className=" w-auto md:w-[40vw] rounded-lg">
            <Image
              alt="hero image"
              src={heroImg}
              className="aspect-[3/3] rounded-xl"
            />
          </div>
          <div className="mt-12 md:mt-0 w-auto md:w-[45vw]">
            <div className="flex border-b border-gray-400 py-4">
              <div className="">
                <Image
                  src={lockIcon}
                  alt="lock icon"
                  className="w-[30vw] md:w-[6vw] px-2 py-2 bg-[#EDE6DA] rounded-lg"
                />
              </div>
              <div className="ml-4 md:ml-2">
                <p className="text-white font-jakarta text-lg">
                  Secure Legal Structure
                </p>
                <p className="text-gray-200 font-dm text-md">
                  Legally defined co-own with transparent documentation,
                  registered title deeds,& agreements that safeguard every rupee
                  you invest.
                </p>
              </div>
            </div>

            <div className="flex mt-4 border-b border-gray-400 py-4">
              <div className="">
                <Image
                  src={managedAssetIcon}
                  alt="lock icon"
                  className="w-[30vw] md:w-[6vw] px-2 py-2 bg-[#EDE6DA] rounded-lg"
                />
              </div>
              <div className="ml-4 md:ml-2">
                <p className="text-white font-jakarta text-lg">
                  Fully Managed Assets
                </p>
                <p className="text-gray-200 font-dm text-md">
                  We handle operations, tenants, maintenance and compliance -
                  you simply earn, without ever managing a property yourself.
                </p>
              </div>
            </div>

            <div className="flex mt-4 border-b border-gray-400 py-4">
              <div className="">
                <Image
                  src={dualIncomeIcon}
                  alt="lock icon"
                  className="w-[30vw] md:w-[6vw] px-2 py-2 bg-[#EDE6DA] rounded-lg"
                />
              </div>
              <div className="ml-4 md:ml-2">
                <p className="text-white font-jakarta text-lg">
                  Dual Income Stream
                </p>
                <p className="text-gray-200 font-dm text-md">
                  Earn monthly rental income while your asset appreciates in
                  value - creating a powerful compounding wealth effect over
                  time.
                </p>
              </div>
            </div>

            <div className="flex mt-4  py-4">
              <div className="">
                <Image
                  src={complemtaryIcon}
                  alt="lock icon"
                  className="w-[30vw] md:w-[6vw] px-2 py-2 bg-[#EDE6DA] rounded-lg"
                />
              </div>
              <div className="ml-4 md:ml-2">
                <p className="text-white font-jakarta text-lg">
                  Complimentary Stays
                </p>
                <p className="text-gray-200 font-dm text-md">
                  Enjoy exclusive stay privileges and premium owner benefits at
                  every property you hold a frac in - reward yourself as you
                  earn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyInvestWithFs;
