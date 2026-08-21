import { Phone, Mail, MapPin } from "lucide-react";

import React from "react";
import Image from "next/image";
import bg1 from "../../../assets/herobg.webp";


function ContactDetails() {
  return (
    <section className=" py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold text-center font-jakarta mb-12">
          We'd love to hear from you
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-10 ml-20">
            {/* Contact Us */}
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-white shadow-sm rounded-md flex items-center justify-center">
                <Phone size={20} className="text-gray-700" />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 font-jakarta">
                  Contact Us
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-dm">
                  Mon–Sat 9AM–5:30PM
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href="tel:+919880626111"
                    className="text-blue-600 hover:underline font-dm"
                  >
                    +91-9880626111
                  </a>

                  <a
                    href="tel:+919355565604"
                    className="text-blue-600 hover:underline font-dm"
                  >
                    +91-9355565604
                  </a>
                </div>
              </div>
            </div>

            {/* Write Us */}
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-white shadow-sm rounded-md flex items-center justify-center">
                <Mail size={20} className="text-gray-700" />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 font-jakarta">
                  Write Us
                </h3>

                <a
                  href="mailto:support@fracspace.com"
                  className="text-blue-600 hover:underline mt-2 inline-block font-dm"
                >
                  support@fracspace.com
                </a>
              </div>
            </div>

            {/* Visit */}
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-white shadow-sm rounded-md flex items-center justify-center">
                <MapPin size={20} className="text-gray-700" />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 font-jakarta">
                  Make a visit
                </h3>

                <a
                  href="#"
                  className="text-blue-600 hover:underline mt-2 inline-block font-dm"
                >
                  View on Google map
                </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div>
            <Image
              src={bg1}
              alt="Beach House"
              width={500}
              height={300}
              className="w-full h-[380px] object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactDetails;
