import React from "react";
import {
  Car,
  Flame,
  Zap,
  Mountain,
  UtensilsCrossed,
  Trees,
  ChevronDown,
  Phone
} from "lucide-react";
import Image from "next/image";
import hilltopImg from "../../../assets/hilltopImg.webp";

function PropertyDetails() {
  const amenities = [
    { icon: Car, label: "Parking" },
    { icon: Flame, label: "Bonfire" },
    { icon: Zap, label: "Power Backup" },
    { icon: Mountain, label: "Trek" },
    { icon: UtensilsCrossed, label: "Restaurant" },
    { icon: Trees, label: "Safari" }
  ];

  const nearbyPlaces = [
    "Kolukkumalai",
    "Eravikulam National Park",
    "Attukal Waterfalls",
    "Kolukkumalai",
    "Eravikulam National Park",
    "Attukal Waterfalls"
  ];

  return (
    <section className="w-full max-w-6xl mx-auto rounded-lg bg-[#f5f5f5] py-8 mt-12 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-8">
          {/* Left Side */}
          <div>
            {/* Amenities */}
            <h3 className="text-2xl text-gray-800 mb-5 font-jakarta">
              Distinctive Amenities
            </h3>

            <div className="grid grid-cols-2 gap-y-5 gap-x-10 max-w-md">
              {amenities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-[#0A1F7A]" />
                      <span className="text-md text-gray-700 font-dm">
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More */}
            <button className="flex font-dm items-center gap-1 mt-6 text-md text-blue-700 hover:text-blue-900 cursor-pointer">
              View more
              <ChevronDown size={14} />
            </button>

            {/* Neighborhood */}
            <div className="mt-10">
              <h3 className="text-lg font-dm font-medium text-gray-800 mb-8">
                The Neighborhood
              </h3>

              <div className="flex justify-center items-center flex-wrap gap-10 text-sm text-gray-700">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center md:justify-between"
                  >
                    <Image
                      src={hilltopImg}
                      alt="place image"
                      className="mx-auto w-[80vw] md:w-[12vw] md:h-[16vh] rounded-lg"
                    />
                    <span className="font-dm mt-2" key={place}>
                      {place}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            {/* Enquiry Form */}
            <div className="bg-white p-5 rounded shadow-sm border border-gray-100">
              <h3 className="text-center font-medium text-gray-700 mb-5 font-jakarta text-xl">
                Enquiry form
              </h3>

              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full font-dm h-9 px-3 border border-gray-300 text-sm outline-none focus:border-blue-700"
                />

                <input
                  type="email"
                  placeholder="Email ID"
                  className="w-full font-dm h-9 px-3 border border-gray-300 text-sm outline-none focus:border-blue-700"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full font-dm h-9 px-3 border border-gray-300 text-sm outline-none focus:border-blue-700"
                />

                <select className="w-full font-dm h-9 px-3 border border-gray-300 text-sm text-gray-500 outline-none focus:border-blue-700">
                  <option>Select Your Budget</option>
                  <option>₹10 Lakh - ₹25 Lakh</option>
                  <option>₹25 Lakh - ₹50 Lakh</option>
                  <option>₹50 Lakh+</option>
                </select>

                <button
                  type="submit"
                  className="w-24 font-dm h-8 mx-auto block bg-[#081C7B] text-white text-sm font-medium hover:bg-[#061660] cursor-pointer rounded-lg"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Guidance Card */}
            <div className="bg-[#081C7B] text-white p-5 rounded">
              <h3 className="font-semibold text-xl mb-2 font-jakarta">
                Need Guidance?
              </h3>
              <p className="text-lg text-white/80 font-dm">
                Speak with our investment experts
              </p>

              <p className="text-sm text-white/60 mt-1 font-dm">
                Mon-Sat : 9AM-6:30PM
              </p>

              <a
                href="tel:+919880626111"
                className="mt-4 bg-white rounded flex items-center justify-center gap-2 h-9 hover:bg-white/90 transition text-decoration-none"
              >
                <Phone size={14} className="text-[#081C7B]" />
                <span className="text-[#081C7B] text-base sm:text-lg font-medium font-dm">
                  +91 98806 26111
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails;
