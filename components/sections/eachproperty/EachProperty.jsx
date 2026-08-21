import React from "react";
import bg1 from "../../../assets/herobg.webp";

import Image from "next/image";

function EachProperty() {
  return (
    <section>
      <div className="md:flex md:items-center md:justify-center relative">
        <div className="flex ml-4 mr-4 md:ml-0 md:mr-0 flex-col md:flex-row md:absolute bg-blue-950 px-4 py-4 rounded-lg right-[2vw] top-[-9vh]">
          <div className="mr-2 py-2 md:py-0 border-b md:border-b-0 md:border-r border-gray-400 px-4">
            <p className="text-gray-300 font-dm">Overall Property</p>
            <p className="text-4xl text-white font-dm py-2 text-center md:text-left">4 Cottages</p>
            <p className="text-gray-300 font-dm">37000 Sq Ft</p>
          </div>
          <div className="mr-2 py-2 md:py-0 border-b md:border-b-0 md:border-r border-gray-400 px-4">
            <p className="text-gray-300 font-dm">Total Fracs</p>
            <p className="text-4xl text-white text-center font-dm py-2">30</p>
          </div>
          <div className="mr-2 py-2 md:py-0">
            <p className="text-gray-300 font-dm">Available Fracs</p>
            <p className="text-4xl text-white font-dm text-center py-2">0</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:w-[95vw] justify-center items-center md:justify-between md:overflow-auto">
          <Image
            src={bg1}
            alt="herobg"
            className="mx-auto w-[80vw] mt-4 md:mt-0 md:w-[20vw] md:h-[40vh] rounded-lg"
          />
          <Image
            src={bg1}
            alt="herobg"
            className="mx-auto w-[80vw] mt-4 md:mt-0 md:w-[20vw] md:h-[40vh] rounded-lg"
          />
          <Image
            src={bg1}
            alt="herobg"
            className="mx-auto w-[80vw] mt-4 md:mt-0 md:w-[20vw] md:h-[40vh] rounded-lg"
          />
          <Image
            src={bg1}
            alt="herobg"
            className="mx-auto w-[80vw] mt-4 md:mt-0 md:w-[20vw] md:h-[40vh] rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default EachProperty;
