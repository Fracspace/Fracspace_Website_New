import React from "react";

function PropertyAvailability() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-12">
      <div className="w-full bg-gray-100 rounded-lg p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Left Section */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <p className="text-gray-700 text-lg mb-4 font-dm">
              Ownership starting at
            </p>

            <h2 className="text-4xl font-semibold text-black font-jakarta">
              ₹10,00,000
            </h2>

            <p className="text-gray-500 mt-2 font-dm">Per frac</p>

            <p className="text-gray-700 mt-8 text-lg font-dm">
              Estimated 10% Annual ROI
            </p>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-gray-300" />

          {/* Right Section */}
          <div className="lg:flex-1 flex items-center">
            <div className="bg-[#001B7A] rounded-xl w-full text-white overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Property */}
                <div className="p-6 text-center border-r border-white/20">
                  <p className="text-sm md:text-base opacity-90 font-dm">
                    Overall Property
                  </p>

                  <h3 className="text-3xl font-semibold mt-3 font-dm">
                    4 Cottages
                  </h3>

                  <p className="text-sm opacity-70 mt-2 font-dm">37000 Sq Ft</p>
                </div>

                {/* Total Fracs */}
                <div className="p-6 text-center border-r border-white/20">
                  <p className="text-sm md:text-base opacity-90 font-dm">
                    Total Fracs
                  </p>

                  <h3 className="text-3xl font-semibold mt-3 font-dm">30</h3>
                </div>

                {/* Available Fracs */}
                <div className="p-6 text-center">
                  <p className="text-sm md:text-base opacity-90 font-dm">
                    Available Fracs
                  </p>

                  <h3 className="text-3xl font-semibold mt-3 font-dm">0</h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyAvailability;
