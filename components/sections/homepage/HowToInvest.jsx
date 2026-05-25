import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

function HowToInvest() {
  return (
    <section className="mt-12">
      <h2 className="text-center text-4xl font-jakarta">
        How To Start Investing
      </h2>
      <div>
        <div className="z-30 relative py-8 md:py-12 mx-auto max-w-7xl">
          <div className="md:mt-12 mx-10 max-w-7xl flex flex-col md:flex-row  justify-between">
            <div className=" w-auto md:w-[40vw] rounded-lg">
              <h2 className="font-jakarta text-2xl font-jakarta">
                Start Investing in Four Simple Steps
              </h2>
              {/* <Image
                alt="hero image"
                src={heroImg}
                className="aspect-[3/3] rounded-xl"
              /> */}
              <p className="pt-4">
                A seamless, app-first experience - from discovery to earnings in
                days.
              </p>
              <button className="bg-black mt-4 text-white font-dm px-3 py-2 flex items-center justify-center">
                Download App <ArrowRight />
              </button>
            </div>
            <div className="mt-12 md:mt-0 w-auto md:w-[45vw]">
              <div className="flex border-b border-gray-400 py-4">
                <div className="">
                  <h2 className="text-4xl text-gray-400">01</h2>
                </div>
                <div className="ml-4 md:ml-2">
                  <p className=" font-jakarta text-lg">Browse Properties</p>
                  <p className="text-gray-600 font-dm text-md">
                    Explore curated premium assets through our app. Filter by
                    location, type, price, and expected returns to find your
                    ideal investment.
                  </p>
                </div>
              </div>

              <div className="flex mt-4 border-b border-gray-400 py-4">
                <div className="">
                  <h2 className="text-4xl text-gray-400">02</h2>
                </div>
                <div className="ml-4 md:ml-2">
                  <p className="font-jakarta text-lg">Consult Our Experts</p>
                  <p className="text-gray-600 font-dm text-md">
                    Get personalized investment advice from our concierge team -
                    no commitment, no pressure. Just clarity.
                  </p>
                </div>
              </div>

              <div className="flex mt-4 border-b border-gray-400 py-4">
                <div className="">
                  <h2 className="text-4xl text-gray-400">03</h2>
                </div>
                <div className="ml-4 md:ml-2">
                  <p className=" font-jakarta text-lg">Invest & Own</p>
                  <p className="text-gray-600 font-dm text-md">
                    Complete your investment through our secure app with full
                    paperless documentation and legal co-ownership registration.
                  </p>
                </div>
              </div>

              <div className="flex mt-4  py-4">
                <div className="">
                  <h2 className="text-4xl text-gray-400">04</h2>
                </div>
                <div className="ml-4 md:ml-2">
                  <p className="font-jakarta text-lg">Track & Earn</p>
                  <p className="text-gray-600 font-dm text-md">
                    Monitor your portfolio performance, rental yields, and
                    appreciation in real time through your personal investor
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToInvest;
