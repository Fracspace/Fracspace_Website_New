"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, FileText, Phone, X, Landmark } from "lucide-react";
import axios from "axios";

function FloatingWidgets() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopupCard, setShowPopupCard] = useState(false);
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const PROPERTIES_API =
    "https://apitest.fracspace.com/api/users/getPropertyDetails";
  const headers = {
    "x-api-key": "Fracspace@2024"
  };

  useEffect(() => {
    axios
      .get(PROPERTIES_API, { headers })
      .then((response) => {
        setProperties(response?.data?.properties || []);
      })
      .catch((error) => {
        console.error("Error fetching properties for enquiry:", error);
      });

    // Show popup card notification after 2.5s
    const timer = setTimeout(() => {
      setShowPopupCard(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg("");

    // Simulate enquiry submission or connect with API.
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMsg("Thank you! Your enquiry has been submitted.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      // Hide modal after short success display
      setTimeout(() => {
        setIsOpen(false);
        setStatusMsg("");
      }, 2000);
    }, 1200);
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hello Fracspace, I would like to enquire about your co-ownership properties.");
    window.open(`https://wa.me/919880626111?text=${message}`, "_blank");
  };

  const handlePhoneCall = () => {
    window.open("tel:+919880626111", "_self");
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 md:bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {/* Enquiry Form Icon - Navy/White */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#021265] hover:bg-[#000833] text-white w-12 h-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-110 flex items-center justify-center cursor-pointer border border-white/10"
          aria-label="Open Enquiry Form"
        >
          <FileText className="w-6 h-6 stroke-white" strokeWidth={2} />
        </button>

        {/* WhatsApp Icon - Navy/White */}
        <button
          onClick={handleWhatsAppRedirect}
          className="bg-[#021265] hover:bg-[#000833] text-white w-12 h-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-110 flex items-center justify-center cursor-pointer border border-white/10"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 stroke-white" strokeWidth={2} />
        </button>

        {/* Phone Call Icon - Navy/White */}
        <button
          onClick={handlePhoneCall}
          className="bg-[#021265] hover:bg-[#000833] text-white w-12 h-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-110 flex items-center justify-center cursor-pointer border border-white/10"
          aria-label="Call Fracspace"
        >
          <Phone className="w-6 h-6 stroke-white" strokeWidth={2} />
        </button>
      </div>

      {/* Enquiry Form Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl sm:text-2xl font-bold font-jakarta text-gray-900 text-center mb-6">
              Investment Enquiry Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 font-dm uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full font-dm h-10 px-3.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#021265] focus:ring-1 focus:ring-[#021265]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 font-dm uppercase tracking-wider mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className="w-full font-dm h-10 px-3.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#021265] focus:ring-1 focus:ring-[#021265]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 font-dm uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full font-dm h-10 px-3.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#021265] focus:ring-1 focus:ring-[#021265]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 font-dm uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share any specific queries or requirements..."
                  className="w-full font-dm p-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#021265] focus:ring-1 focus:ring-[#021265] resize-none"
                />
              </div>

              {statusMsg && (
                <p className="text-center text-sm font-dm font-semibold text-green-600">
                  {statusMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-dm h-11 bg-[#021265] text-white text-sm font-semibold hover:bg-blue-800 transition cursor-pointer rounded-xl flex items-center justify-center shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingWidgets;
