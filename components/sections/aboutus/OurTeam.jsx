import React from "react";
// import { Linkedin } from "lucide-react";
import Image from "next/image";
import Linkedin from "../../../assets/linkedin.png";
import unnathSirImg from "../../../assets/unnathSir.jpeg";
import dnsImg from "../../../assets/dns1.webp";

function OurTeam() {
  const teamMembers = [
    {
      name: "Divya",
      role: "Senior Consultant",
      image: dnsImg
    },
    {
      name: "Prasanth",
      role: "Special Projects Consultant",
      image: dnsImg
    },
    {
      name: "Rishab",
      role: "Director of Sales-Pacapace",
      image: dnsImg
    },
    {
      name: "Prashanth",
      role: "Hospitality & Growth Manager",
      image: dnsImg
    },
    {
      name: "Rishab",
      role: "Director of Sales-Pacapace",
      image: dnsImg
    },
    {
      name: "Prashanth",
      role: "Hospitality & Growth Manager",
      image: dnsImg
    },
    {
      name: "Prashanth",
      role: "Hospitality & Growth Manager",
      image: dnsImg
    },
    {
      name: "Prashanth",
      role: "Hospitality & Growth Manager",
      image: dnsImg
    }
  ];

  return (
    <section className="bg-[#f7f7f7] px-5 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="mb-4 text-3xl font-jakarta font-semibold text-gray-900">
            Our Team
          </h2>

          <p className="max-w-4xl font-dm text-sm leading-7 text-gray-600 sm:text-base">
            Meet Pacapace’s team of professionals with experience across real
            estate, finance, technology, and entrepreneurship.
          </p>

          <p className="mt-3 font-dm max-w-4xl text-sm leading-7 text-gray-600 sm:text-base">
            We believe structured ownership may unlock long-term opportunities
            for modern investors.
          </p>
        </div>

        {/* Founder Card */}
        <div className="mb-14 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Left Side */}
            <div className="flex flex-col items-center text-center lg:w-[280px]">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-gray-100">
                <Image
                  src={unnathSirImg}
                  alt="Founder"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="mt-5 font-jakarta text-xl font-semibold text-gray-900">
                Unnath Reddy
              </h3>

              <p className="mt-1 font-dm text-sm text-gray-500">
                Founder, Fracspace
              </p>
            </div>

            {/* Right Side */}
            <div className="flex-1">
              <h3 className="mb-4 font-jakarta text-2xl font-medium text-gray-900">
                Visionary in Chief
              </h3>

              <p className="mb-4 font-dm text-sm leading-7 text-gray-600 sm:text-base">
                Unnath Reddy is a visionary entrepreneur and the founder of
                Pacapace, a real estate technology platform transforming how
                people invest into structured property assets.
              </p>

              <p className="mb-4 font-dm text-sm leading-7 text-gray-600 sm:text-base">
                After years of experience in corporate real estate and
                entrepreneurship, Unnath identified the need for accessible and
                transparent property ownership models.
              </p>

              <p className="mb-5 font-dm text-sm leading-7 text-gray-600 sm:text-base">
                Today, he leads Pacapace’s mission to democratize real estate
                investing and provide secure access to modern real-estate backed
                opportunities.
              </p>

              {/* LinkedIn */}
              <a
                href="#"
                className="inline-flex font-dm items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Image
                  src={Linkedin}
                  alt="linkedin icon"
                  className="w-[12vw] md:w-[3vw] h-[6vh]"
                />
                View LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div>
          <h3 className="mb-8 font-jakarta text-2xl font-semibold text-gray-900">
            Business & Sales Team
          </h3>

          <div className="flex items-center justify-center flex-wrap gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="
                  w-full
                  rounded-2xl
                  bg-white
                  p-5
                  shadow-md
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  sm:w-[calc(50%-12px)]
                  lg:w-[calc(25%-18px)]
                "
              >
                <div className="flex flex-col items-center text-center">
                  {/* Image */}
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Name */}
                    <div>
                      <h4 className="text-lg font-dm font-semibold text-gray-900">
                        {member.name}
                      </h4>
                    </div>

                    <div>
                      <Image
                        src={Linkedin}
                        alt="linkedin icon"
                        className="ml-2 font-dm w-[6vw] md:w-[2vw] md:h-[4vh] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <p className="mt- font-dm text-sm leading-6 text-gray-500">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Team Grid */}
        <div className="mt-6">
          <h3 className="mb-8 font-jakarta text-2xl font-semibold text-gray-900">
            Tech Team
          </h3>

          <div className="flex items-center justify-center flex-wrap gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="
                  w-full
                  rounded-2xl
                  bg-white
                  p-5
                  shadow-md
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  sm:w-[calc(50%-12px)]
                  lg:w-[calc(25%-18px)]
                "
              >
                <div className="flex flex-col items-center text-center">
                  {/* Image */}
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Name */}
                    <div>
                      <h4 className="text-lg font-dm font-semibold text-gray-900">
                        {member.name}
                      </h4>
                    </div>

                    <div>
                      <Image
                        src={Linkedin}
                        alt="linkedin icon"
                        className="ml-2 font-dm w-[6vw] md:w-[2vw] md:h-[4vh] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <p className="mt- font-dm text-sm leading-6 text-gray-500">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
