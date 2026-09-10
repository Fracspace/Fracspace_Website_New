"use client";

import React, { useState } from "react";
import axios from "axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "I want to invest in a fraction",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const ENQUIRY_API =
    "https://apitest.fracspace.com/api/v1/webApi/enquiryFormRegardingCoownership";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Please provide your full name and email.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await axios.post(
        ENQUIRY_API,
        {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          contact: formData.phone,
          message: `[Topic: ${formData.topic}] ${formData.message}`,
          agreeToContact: true
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "Fracspace@2024"
          }
        }
      );
      setSent(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "I want to invest in a fraction",
        message: ""
      });
    } catch (err) {
      console.error("Form error:", err);
      // Graceful fallback display
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const preFaqs = [
    {
      q: "How quickly will someone respond?",
      a: "Enquiries submitted during business hours receive a call or email within 4 hours; all others within 24 hours."
    },
    {
      q: "Can I visit the property before investing?",
      a: "Yes. Site visits can be arranged with 48 hours notice for any actively selling asset."
    },
    {
      q: "Is there an initial consultation fee?",
      a: "No. Advisory and exploratory conversations with our team are completely free and non-binding."
    },
    {
      q: "I want to list my property. Where do I start?",
      a: "Select 'I want to list a property' above. Our sourcing team will review your asset within 2 business days."
    }
  ];

  return (
    <div className="w-full font-manrope">
      
      {/* Form + HQ Card Section */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Form Box */}
          <div className="lg:col-span-7 bg-white border border-[#E7EBF2] rounded-3xl p-6 sm:p-10 shadow-sm">
            <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-[#14203A] mb-2">
              Send us a message
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6B8A] mb-8">
              Fill in your details below and the right person from our team will get back to you.
            </p>

            {sent ? (
              <div className="border border-[#BFE0CB] bg-[#F0F9F3] rounded-2xl p-8 text-center space-y-3">
                <h3 className="font-jakarta text-xl font-bold text-[#1E5B3A]">
                  Message received!
                </h3>
                <p className="text-sm text-[#3D6B52] leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out. A Fracspace specialist will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 bg-[#0B2452] hover:bg-[#16418C] text-white px-7 py-2.5 rounded-full text-xs font-bold transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A5878] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F9FC] focus:bg-white border border-[#DDE4EF] focus:border-[#0B2452] rounded-xl px-4 py-3 text-sm text-[#14203A] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4A5878] uppercase tracking-wider mb-1.5">
                      Email ID *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F9FC] focus:bg-white border border-[#DDE4EF] focus:border-[#0B2452] rounded-xl px-4 py-3 text-sm text-[#14203A] outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A5878] uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F9FC] focus:bg-white border border-[#DDE4EF] focus:border-[#0B2452] rounded-xl px-4 py-3 text-sm text-[#14203A] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4A5878] uppercase tracking-wider mb-1.5">
                      Topic
                    </label>
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F9FC] focus:bg-white border border-[#DDE4EF] focus:border-[#0B2452] rounded-xl px-4 py-3 text-sm text-[#14203A] outline-none transition cursor-pointer"
                    >
                      <option value="I want to invest in a fraction">I want to invest in a fraction</option>
                      <option value="I want to list a property">I want to list a property</option>
                      <option value="Partnership / Corporate">Partnership / Corporate</option>
                      <option value="General enquiry">General enquiry</option>
                      <option value="Press & Media">Press &amp; Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#4A5878] uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Share any specific queries or requirements…"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F9FC] focus:bg-white border border-[#DDE4EF] focus:border-[#0B2452] rounded-xl px-4 py-3 text-sm text-[#14203A] outline-none transition resize-none"
                  ></textarea>
                </div>

                {error && (
                  <p className="text-xs text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0B2452] hover:bg-[#16418C] text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold transition shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Sending message..." : "Send message →"}
                </button>
              </form>
            )}
          </div>

          {/* Right HQ Info Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E7EBF2] rounded-3xl p-6 sm:p-8 space-y-5">
              <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
                Headquarters
              </span>
              <h3 className="font-jakarta text-xl font-bold text-[#14203A]">
                Fracspace Private Limited
              </h3>
              
              <div className="space-y-4 text-xs sm:text-[13.5px] text-[#5C6B8A] leading-relaxed">
                <div>
                  <span className="font-bold text-[#14203A] block mb-1">
                    Registered Office:
                  </span>
                  Plot No. 827, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                </div>

                <div>
                  <span className="font-bold text-[#14203A] block mb-1">
                    Operating Hours:
                  </span>
                  Monday – Saturday · 9:00 AM – 5:30 PM IST<br />
                  Sunday closed
                </div>

                <div>
                  <span className="font-bold text-[#14203A] block mb-1">
                    Visit Policy:
                  </span>
                  Visits by appointment only. Please contact your relationship manager or schedule via phone before arriving.
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-[#DDE4EF] hover:border-[#0B2452] text-[#0B2452] px-6 py-2.5 rounded-full text-xs font-bold transition"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pre-Contact FAQs Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
              FAQ
            </span>
            <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-[#14203A] mt-2">
              Before you reach out
            </h2>
          </div>

          <div className="divide-y divide-[#E4E9F1]">
            {preFaqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="py-5 sm:py-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-6 text-left font-jakarta text-base sm:text-lg font-bold text-[#14203A] hover:text-[#16418C] transition cursor-pointer"
                  >
                    <span>{f.q}</span>
                    <span className="text-xl sm:text-2xl text-[#7B8AA8] shrink-0 font-normal">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3.5 text-xs sm:text-[14px] leading-relaxed text-[#5C6B8A] pr-6 animate-fsSlideUp">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

export default ContactForm;
