import React from "react";

function Investors() {
  return (
    <section className="mt-12">
      <h2 className="text-center text-4xl font-jakarta">
        Trusted By Investors
      </h2>
      <p className="text-center mt-6 font-dm px-10">
        Join a community of forward-thinking individuals building long-term
        wealth.
      </p>
      <div className="flex flex-col md:flex-row items-center mt-8 justify-between mx-auto max-w-7xl px-10">
        <div className=" md:w-[30vw] shadow-lg py-4 rounded-lg">
          <video
            controls
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/AbdulBasith.mp4" type="video/mp4"></source>
          </video>
          <p className="mt-2 ml-2">Abdul Basith</p>
        </div>
        <div className="mt-4 md:mt-0 md:w-[30vw] md:ml-8 shadow-lg py-4 rounded-lg">
          <video
            autoplay
            muted
            loop
            controls
            src="/videos/PrashantGudipudi.mp4"
          />
          <p className="mt-2 ml-2">Prashanth Gudipudi</p>
        </div>
        <div className="mt-4 md:mt-0 md:w-[30vw] md:ml-8 shadow-lg py-4 rounded-lg">
          <video
            autoplay
            muted
            loop
            controls
            src="/videos/Srivivasbonnam.mp4"
          />
          <p className="mt-2 ml-2">Srinivas</p>
        </div>
      </div>
    </section>
  );
}

export default Investors;
