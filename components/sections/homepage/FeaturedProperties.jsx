import React from "react";
import img1 from "../../../assets/herobg.webp";
import Image from "next/image";
import { MapPin } from "lucide-react";

function FeaturedProperties() {
  return (
    <section className="mt-12 mx-auto max-w-7xl px-10">
      <h2 className="text-4xl font-jakarta">Featured Properties</h2>
      <div className="mt-4 flex flex-col  md:flex-row md:items-center md:justify-between">
        <div className="text-gray-600 font-dm">
          Carefully selected assets with high potential for rental yield and
          long-term capital appreciation.
        </div>
        <div className="mt-4 md:mt-0">
          <button className="text-gray-600 font-dm cursor-pointer mr-4 px-2 py-1 border-2 border-gray-100 rounded-lg shadow-lg">
            View All
          </button>
          <select className="text-gray-600 font-dm cursor-pointer mr-4 px-2 py-1 border-2 border-gray-100 rounded-lg shadow-lg">
            <option>Kerala</option>
            <option>Goa</option>
            <option>Hyderabad</option>
          </select>
        </div>
      </div>
      <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="relative rounded-lg md:w-[30vw] shadow-lg">
          <Image
            src={img1}
            alt="property image"
            className="md:w-[30vw] rounded-t-lg"
          />
          <div className="absolute px-2 w-full top-4 flex items-center justify-between">
            <p className="font-dm text-xs rounded-full text-white bg-gray-400 px-4 py-2">
              Hilltop Cottages
            </p>
            <p className="font-dm text-xs rounded-full bg-[#C9A84C] px-4 py-2">
              ROI 10%
            </p>
          </div>
          <div className="mx-2 py-4">
            <p className="text-gray-400 font-dm flex items-center text-sm">
              <MapPin className="w-[15px]" /> Munnar,kerala
            </p>
            <p className="font-jakarta">Hilltop Munnar By Fracspace</p>
            <div className="flex  justify-between mt-2">
              <div>
                <p className="font-dm text-sm text-gray-400">Frac Price</p>
                <p className="font-jakarta text-lg">₹ 10 000 00</p>
              </div>
              <div>
                <button className="cursor-pointer font-dm rounded-lg px-2 py-2 border-1 border-gray-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 md:mt-0 rounded-lg md:w-[30vw] shadow-lg">
          <Image
            src={img1}
            alt="property image"
            className="md:w-[30vw] rounded-t-lg"
          />
          <div className="absolute px-2 w-full top-4 flex items-center justify-between">
            <p className="font-dm text-xs rounded-full text-white bg-gray-400 px-4 py-2">
              Hilltop Cottages
            </p>
            <p className="font-dm text-xs rounded-full bg-[#C9A84C] px-4 py-2">
              ROI 10%
            </p>
          </div>
          <div className="mx-2 py-4">
            <p className="text-gray-400 font-dm flex items-center text-sm">
              <MapPin className="w-[15px]" /> Munnar,kerala
            </p>
            <p className="font-jakarta">Hilltop Munnar By Fracspace</p>
            <div className="flex  justify-between mt-2">
              <div>
                <p className="font-dm text-sm text-gray-400">Frac Price</p>
                <p className="font-jakarta text-lg">₹ 10 000 00</p>
              </div>
              <div>
                <button className="cursor-pointer font-dm rounded-lg px-2 py-2 border-1 border-gray-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 md:mt-0 rounded-lg md:w-[30vw] shadow-lg">
          <Image
            src={img1}
            alt="property image"
            className="md:w-[30vw] rounded-t-lg"
          />
          <div className="absolute px-2 w-full top-4 flex items-center justify-between">
            <p className="font-dm text-xs rounded-full text-white bg-gray-400 px-4 py-2">
              Hilltop Cottages
            </p>
            <p className="font-dm text-xs rounded-full bg-[#C9A84C] px-4 py-2">
              ROI 10%
            </p>
          </div>
          <div className="mx-2 py-4">
            <p className="text-gray-400 font-dm flex items-center text-sm">
              <MapPin className="w-[15px]" /> Munnar,kerala
            </p>
            <p className="font-jakarta">Hilltop Munnar By Fracspace</p>
            <div className="flex  justify-between mt-2">
              <div>
                <p className="font-dm text-sm text-gray-400">Frac Price</p>
                <p className="font-jakarta text-lg">₹ 10 000 00</p>
              </div>
              <div>
                <button className="cursor-pointer font-dm rounded-lg px-2 py-2 border-1 border-gray-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProperties;
