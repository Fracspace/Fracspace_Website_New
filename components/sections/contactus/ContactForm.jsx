"use client";
import React from "react";
import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="px-4 py-10 md:py-16">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="p-6 md:p-10 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-8 md:mb-10 font-jakarta">
            Get in touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm mb-2 text-gray-700 font-jakarta">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full h-11 px-3 font-dm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700 font-jakarta">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full h-11 px-3 font-dm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm mb-2 text-gray-700 font-jakarta">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-11 px-3 font-dm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700 font-jakarta">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 px-3 font-dm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 font-jakarta">
                Select your service
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full h-11 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select a service type</option>
                <option value="fractional-investment">
                  Fractional Investment
                </option>
                <option value="property-management">Property Management</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 font-jakarta">
                Message
              </label>

              <textarea
                name="message"
                rows={4}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full font-dm px-3 py-3 border border-gray-300 rounded-md resize-none outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-[#061A78] hover:bg-[#04145f] cursor-pointer text-white px-10 py-3 rounded-lg font-jakarta font-medium transition-all duration-300 min-w-[160px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
