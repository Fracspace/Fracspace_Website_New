import React, { useContext } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import appStoreImg from "../../assets/appModal/appStore.png";
import playStoreImg from "../../assets/appModal/playstore.png";
import qrScannerImg from "../../assets/appModal/qr.png";
import phoneImg from "../../assets/appModal/iphone.png";
import { useDownloadApp } from "@/context/DownloadAppContext";
import { useMediaQuery } from "react-responsive";

function FracspaceAppModal() {
  const { closeDownloadModal } = useDownloadApp();
  const  isMobile  = useMediaQuery({ maxWidth: 600 });

  return (
    <section className="">
      <div className="fixed md:max-h-[70vh] inset-0 top-40 z-50 flex items-center justify-center  px-4">
        <div className="relative md:h-[70vh] w-full max-w-5xl rounded-sm bg-white px-6 py-8 md:px-10 md:py-10">
          {/* Close Button */}
          <button
            className="absolute cursor-pointer right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white transition hover:bg-gray-600"
            onClick={closeDownloadModal}
          >
            <X size={18} />
          </button>

          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="w-full max-w-2xl">
              {/* Heading */}
              <h2 className="max-w-2xl font-jakarta text-xl font-semibold leading-snug text-black md:text-4xl">
                Manage Your Fracspace Investments in the App
              </h2>

              {isMobile && (
                <div className="flex justify-center mt-3 mb-3">
                  <Image
                    src={phoneImg}
                    alt="Fracspace App"
                    className="h-[30vh] w-[30vw]"
                  />
                </div>
              )}

              {/* Description */}
              {!isMobile && (
                <p className="mt-5 max-w-xl font-dm text-base leading-8 text-gray-700 text-md md:text-xl">
                  Explore properties, invest in fractions, and track your
                  portfolio – all in the Fracspace app.
                </p>
              )}

              {/* QR Section */}

              <div className=" md:mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* QR Code */}
                {!isMobile && (
                  <div className="overflow-hidden rounded-2xl border border-gray-300 p-3">
                    <Image
                      src={qrScannerImg}
                      alt="QR Code"
                      width={140}
                      height={140}
                      className="h-[140px] w-[140px] object-cover"
                    />
                  </div>
                )}

                {/* QR Text */}
                <div>
                  {!isMobile && (
                    <h4 className="text-2xl font-dm font-medium text-black">
                      Scan the QR to Get the App
                    </h4>
                  )}

                  <p className="mt-3 text-lg font-dm italic text-gray-500">
                    Available on iOS and Android
                  </p>
                  <div className=" mt-2 md:mt-8 flex flex-wrap items-center gap-4">
                    <Image
                      src={appStoreImg}
                      alt="App Store"
                      className="h-auto w-[30vw] h-[6vh] md:w-[170px] cursor-pointer"
                    />

                    <Image
                      src={playStoreImg}
                      alt="Google Play"
                      width={170}
                      height={50}
                      className="h-auto w-[30vw] md:w-[170px] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mobile Mockup */}
            {!isMobile && (
              <div className="flex justify-center">
                <Image
                  src={phoneImg}
                  alt="Fracspace App"
                  className="h-[60vh] w-[220px] md:w-[280px] lg:w-[240px] md:mr-8"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FracspaceAppModal;
