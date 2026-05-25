import React from "react";
import Image from "next/image";
import howFsWorksBg from "../../assets/howFsWorksBg.webp";
import logo from "../../assets/logo22.png";

function Footer() {
  return (
    <section>
      <div className="mt-16  relative w-full h-full py-12 overflow-hidden">
        <Image
          alt="how fracspace works"
          src={howFsWorksBg}
          className="z-0 w-full h-full absolute top-0 left-0"
        />
        <div className="absolute z-10 w-full h-full bg-gradient-to-r from-slate-900/90 to-blue-900/60 top-0 left-0"></div>
        <div className="flex flex-col md:flex-row justify-between md:max-w-7xl mx-5 md:mx-20">
          <div className="z-20 text-white w-full md:w-[30vw]">
            <div className="">
              <Image
                alt="fracspace logo"
                aspect
                className="w-60 h-12"
                src={logo}
              />
              <p className="ml-2 mt-4 font-dm">
                Fracspace Offers Innovative Fractional Investment
                Opportunities,allowing you to own a share of luxury properites
                and unique real estate projects.
              </p>
              <div></div>
            </div>
          </div>
          <div className="z-20 ml-2  text-white md:w-[10vw] mt-2">
            <p className="text-xl font-600 font-jakarta">Quick Links</p>
            <ul className="mt-4">
              <li className="cursor-pointer font-dm">Home</li>
              <li className="cursor-pointer pt-2 font-dm">About Us</li>
              <li className="cursor-pointer pt-2 font-dm">Agents</li>
              <li className="cursor-pointer pt-2 font-dm">Contact Us</li>
            </ul>
          </div>
          <div className="z-20 ml-2 text-white md:w-[20vw] mt-2">
            <p className="text-xl font-600 font-jakarta">Contact</p>
            <ul className="mt-4">
              <li className="font-dm">
                4th Floor, Dreamscape Hotel, MLA Colony, NBT Nagar, Road No.12,
                Banjara Hills, Hyderabad,Telangana, 500034
              </li>
              <li className="pt-2 font-dm">support@fracspace.com</li>
              <li className="pt-2 font-dm">
                {" "}
                +91 93555 65604, +91 98806 26111
              </li>
            </ul>
          </div>
          <div className="z-20 ml-2 text-white mt-2">
            <p className="text-xl font-600 font-jakarta">Legal</p>
            <ul className="mt-4">
              <li className="cursor-pointer font-dm">Terms Of Service</li>
              <li className="pt-2 cursor-pointer font-dm">Privacy Policy</li>
              <li className="pt-2 cursor-pointer font-dm">Refund Policy</li>
              <li className="pt-2 cursor-pointer font-dm">Data Deletion</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
