import React from "react";
import bg1 from "../../../assets/herobg.webp";

import Image from "next/image";

function EachProperty() {
  return (
    <section className="relative px-6 py-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 md:absolute md:right-[2vw] md:top-[-11vh] z-30 bg-blue-950 px-6 py-6 rounded-2xl shadow-xl border border-white/10 w-full md:w-auto">
        <div className="flex-1 md:flex-none py-2 md:py-0 border-b md:border-b-0 md:border-r border-white/20 md:pr-6 text-center md:text-left">
          <p className="text-gray-400 font-dm text-xs uppercase tracking-wider">Overall Property</p>
          <p className="text-3xl text-white font-jakarta font-bold py-1">4 Cottages</p>
          <p className="text-gray-400 font-dm text-xs">37,000 Sq Ft</p>
        </div>
        <div className="flex-1 md:flex-none py-2 md:py-0 border-b md:border-b-0 md:border-r border-white/20 md:pr-6 text-center">
          <p className="text-gray-400 font-dm text-xs uppercase tracking-wider">Total Fracs</p>
          <p className="text-3xl text-white font-jakarta font-bold py-1">30</p>
        </div>
        <div className="flex-1 md:flex-none py-2 md:py-0 text-center">
          <p className="text-gray-400 font-dm text-xs uppercase tracking-wider">Available Fracs</p>
          <p className="text-3xl text-white font-jakarta font-bold py-1 text-red-400">0</p>
        </div>
      </div>

      <div className="mt-8 md:mt-24 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src={bg1}
              alt="herobg"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src={bg1}
              alt="herobg"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src={bg1}
              alt="herobg"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src={bg1}
              alt="herobg"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EachProperty;
