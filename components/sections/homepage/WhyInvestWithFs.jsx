import React from "react";
import Image from "next/image";
import heroImg from "../../../assets/herobg.webp";
import complemtaryIcon from "../../../assets/icons/complementaryStays.png";
import lockIcon from "../../../assets/icons/lock.png";
import dualIncomeIcon from "../../../assets/icons/dualIncome.png";
import managedAssetIcon from "../../../assets/icons/managedAsset.png";

import hilltopImg from "../../../assets/hilltopImg.webp";

import { useMediaQuery } from "react-responsive";

function WhyInvestWithFs() {
  const isMobile = useMediaQuery({ maxWidth: 350 });

  return (
    <div>
      <section className="mt-12 relative overflow-hidden">
        <div className="w-full h-auto md:min-h-screen absolute bg-[linear-gradient(to_right,#021265cc,#003399aa),radial-gradient(circle_at_top,#00a6ff55,transparent_30%),radial-gradient(circle_at_bottom_left,#7c3aed55,transparent_30%)]   inset-0 md:bg-gradient-to-r md:from-[#122d66]/95 md:via-[#28519a]/90 md:to-[#122d66]/95  z-20"></div>
        {!isMobile && (
          <Image
            alt="hero image"
            src={heroImg}
            className="absolute z-10 w-full h-full min-h-screen"
          />
        )}
        <div className="z-30 h-auto relative py-12 mx-auto max-w-7xl">
          {/* inset-0 bg-gradient-to-r from-[#122d66]/95 via-[#28519a]/90 to-[#122d66]/95  ........... md:bg-gradient-to-r md:from-slate-900/90 md:to-bule-900/60*/}
          <h2 className="text-center font-jakarta text-3xl md:text-4xl text-white font-jakarta">
            Why Invest with Fracspace?
          </h2>
          <div className="mt-12 mx-10 max-w-7xl flex flex-col md:flex-row  justify-between">
            <div className=" w-auto md:w-[40vw] rounded-lg relative">
              <Image
                alt="hero image"
                src={hilltopImg}
                className="aspect-[3/3] rounded-xl relative"
              />
              <div className="bg-white md:w-[10vw] p-2 rounded-lg absolute top-[-20] left-[-20]">
                <p className="text-xl text-center font-jakarta">200+</p>
                <p className="text-xs text-center font-dm">Happy Investors</p>
              </div>
            </div>
            <div className="mt-12 ml-12 md:mt-0 w-auto md:w-[45vw]">
              <div className="flex border-b border-gray-400 py-4">
                <div className="w-[50vw] md:w-auto">
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
                    registered title deeds,& agreements that safeguard every
                    rupee you invest.
                  </p>
                </div>
              </div>

              <div className="flex mt-4 border-b border-gray-400 py-4">
                <div className="w-[50vw] md:w-auto">
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
                <div className="w-[50vw] md:w-auto">
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
                <div className="w-[50vw] md:w-auto">
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
                    Enjoy exclusive stay privileges and premium owner benefits
                    at every property you hold a frac in - reward yourself as
                    you earn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WhyInvestWithFs;
