import React from "react";
import Image from "next/image";
import howFsWorksBg from "../../../assets/howFsWorksBg.webp";
import searchIcon from "../../../assets/icons/search.png";
import diamondIcon from "../../../assets/icons/diamond.png";
import rocketIcon from "../../../assets/icons/rocket.png";
import moneyIcon from "../../../assets/icons/money.png";

function HowFsWorks() {
  return (
    <section className="mt-12">
      <div className="relative flex items-center w-full h-full py-20 overflow-hidden">
        <Image
          alt="how fracspace works"
          src={howFsWorksBg}
          className="z-0 w-full h-full absolute top-0 left-0"
        />
        <div className=" z-10 w-full h-full bg-gradient-to-r from-slate-900/90 to-blue-900/60 z-10 absolute top-0 left-0"></div>
        <div className="z-20 relative  w-full">
          <h2 className="text-4xl text-white text-center font-jakarta">
            How Fractional Investment Works?
          </h2>
          <p className="text-white text-center pt-8 mx-8 font-dm">
            Fractional ownership made accessible, transparent, and completely
            hassle-free.
          </p>

          <div className="flex flex-col md:flex-row mt-20 mx-auto max-w-7xl justify-center gap-8">
            <div className="mx-8 w-auto md:mx-0 md:w-[20vw] bg-[#17194f] border border-gray-400 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <Image
                    src={searchIcon}
                    alt="search icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="text-gray-400 text-2xl font-jakarta">01</div>
              </div>
              <p className="text-white mt-4 font-jakarta">Choose Property</p>
              <p className="text-gray-400 mt-1 font-dm">
                Browse curated premium assets vetted by our real estate and
                legal experts.
              </p>
            </div>

            <div className="mx-8 w-auto md:mx-0 md:w-[20vw] border border-gray-400 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <Image
                    src={diamondIcon}
                    alt="search icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="text-gray-400 text-2xl font-jakarta">02</div>
              </div>
              <p className="text-white mt-4 font-jakarta">Invest In Fraction</p>
              <p className="text-gray-400 mt-1 font-dm">
                Purchase fractional shares starting from just ₹10 Lakhs securely
                through our app.
              </p>
            </div>

            <div className="mx-8 w-auto md:mx-0 md:w-[20vw] border border-gray-400 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <Image
                    src={rocketIcon}
                    alt="search icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="text-gray-400 text-2xl font-jakarta">03</div>
              </div>
              <p className="text-white mt-4 font-jakarta">Earn Rental Income</p>
              <p className="text-gray-400 mt-1 font-dm">
                Receive steady monthly rental yields directly to your bank
                account.
              </p>
            </div>

            <div className="mx-8 w-auto md:mx-0 md:w-[20vw] border border-gray-400 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <Image
                    src={moneyIcon}
                    alt="search icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="text-gray-400 text-2xl font-jakarta">04</div>
              </div>
              <p className="text-white mt-4 font-jakarta">Exit Property</p>
              <p className="text-gray-400 mt-1 font-dm">
                Sell your Fracs on our secondary market for capital appreciation
                at your convenience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowFsWorks;
