"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle2, ShieldCheck, Loader2, RefreshCw, AlertCircle } from "lucide-react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { sendOtpApi, verifyOtpApi } from "../../../utils/otpService";
import OtpModal from "../../ui/OtpModal";

const ENQUIRY_API = "https://apitest.fracspace.com/api/v1/webApi/enquiryFormRegardingCoownership";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    contact: "",
    phone: "",
    topic: "I want to invest in a fraction",
    message: ""
  });

  // OTP Modal & verification state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const isIndian =
    formData.countryCode === "+91" ||
    (formData.contact ? formData.contact.startsWith("+91") || formData.contact.startsWith("91") : true);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handlePhoneChange = (value, country) => {
    const dialCode = country?.dialCode || "91";
    const cleanDigits = (value || "").replace(/\D/g, "");
    const phone = cleanDigits.startsWith(dialCode) ? cleanDigits.slice(dialCode.length) : cleanDigits;
    const formattedContact = value ? (value.startsWith("+") ? value : `+${value}`) : "";
    const countryCode = `+${dialCode}`;

    setError("");
    setFormData((prev) => ({
      ...prev,
      contact: formattedContact,
      countryCode: countryCode,
      phone: phone,
      phoneNumber: phone
    }));
  };

  const executeFormSubmit = async () => {
    setSubmitting(true);
    setError("");

    const cleanPhone = (formData.phone || "").replace(/\D/g, "");
    const fullContact = formData.contact || `${formData.countryCode} ${cleanPhone}`;

    try {
      await axios.post(
        ENQUIRY_API,
        {
          name: formData.name,
          email: formData.email,
          phoneNumber: cleanPhone,
          countryCode: formData.countryCode,
          contact: fullContact,
          phone: fullContact,
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
        countryCode: "+91",
        contact: "",
        phone: "",
        topic: "I want to invest in a fraction",
        message: ""
      });
      setOtp("");
      setShowOtpModal(false);
    } catch (err) {
      console.error("Form error:", err);
      setError(err.response?.data?.message || err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please provide your full name and email.");
      return;
    }

    const cleanPhone = (formData.phone || "").replace(/\D/g, "");
    if (!cleanPhone) {
      setError("Please provide your phone number.");
      return;
    }

    // For Indian numbers: trigger send OTP and show OTP popup
    if (isIndian) {
      if (cleanPhone.length !== 10) {
        setError("Please enter a valid 10-digit Indian mobile number.");
        return;
      }

      setOtpLoading(true);
      setOtpError("");
      setResendSuccess("");
      setOtp("");

      const fullContact = formData.contact || `+91${cleanPhone}`;
      try {
        await sendOtpApi(fullContact);
        setTimer(30);
        setShowOtpModal(true);
      } catch (err) {
        console.error("Send OTP error:", err);
        setError(err.message || "Failed to send OTP. Please check your mobile number.");
      } finally {
        setOtpLoading(false);
      }
      return;
    }

    // For international numbers: submit directly!
    await executeFormSubmit();
  };

  const handleVerifyOtp = async () => {
    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");
    const cleanPhone = (formData.phone || "").replace(/\D/g, "");
    const fullContact = formData.contact || `+91${cleanPhone}`;

    try {
      const res = await verifyOtpApi(fullContact, cleanOtp);
      if (res && res.success !== false) {
        setShowOtpModal(false);
        await executeFormSubmit();
      } else {
        setOtpError(res?.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setOtpError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setOtpError("");
    setResendSuccess("");
    const cleanPhone = (formData.phone || "").replace(/\D/g, "");
    const fullContact = formData.contact || `+91${cleanPhone}`;
    try {
      await sendOtpApi(fullContact);
      setResendSuccess("A new OTP has been sent to your phone number.");
      setTimer(30);
      setTimeout(() => setResendSuccess(""), 4000);
    } catch (err) {
      setOtpError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
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
                  className="mt-4 bg-[#0B2452] hover:bg-[#16418C] text-white px-7 py-2.5 rounded-full text-xs font-bold transition cursor-pointer"
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

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-[#4A5878] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <PhoneInput
                      country={"in"}
                      value={formData.contact ? formData.contact.replace(/^\+/, "") : ""}
                      onChange={handlePhoneChange}
                      enableSearch={true}
                      searchPlaceholder="Search country..."
                      inputProps={{
                        required: true,
                        name: "phone"
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "46px",
                        fontSize: "0.875rem",
                        backgroundColor: "#F7F9FC",
                        borderColor: "#DDE4EF",
                        borderRadius: "0.75rem",
                        color: "#14203A",
                        fontFamily: "inherit"
                      }}
                      buttonStyle={{
                        backgroundColor: "#F7F9FC",
                        borderColor: "#DDE4EF",
                        borderTopLeftRadius: "0.75rem",
                        borderBottomLeftRadius: "0.75rem"
                      }}
                      dropdownStyle={{
                        borderRadius: "0.75rem",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        zIndex: 50
                      }}
                    />
                  </div>
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
                  <p className="text-xs text-red-600 font-medium">{error}</p>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={submitting || otpLoading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold transition shadow-md flex items-center justify-center gap-2 bg-[#0B2452] hover:bg-[#16418C] disabled:bg-gray-300 disabled:text-gray-500 text-white cursor-pointer disabled:cursor-not-allowed"
                  >
                    {submitting || otpLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{otpLoading ? "Sending OTP..." : "Sending message..."}</span>
                      </>
                    ) : (
                      <span>Send message →</span>
                    )}
                  </button>
                </div>
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
                    Office Address:
                  </span>
                  4th Floor, Dreamscape Hotel, MLA Colony, NBT Nagar, Road No. 12, Banjara Hills, Hyderabad, Telangana, 500034
                </div>

                <div>
                  <span className="font-bold text-[#14203A] block mb-1">
                    Operating Hours:
                  </span>
                  Monday – Saturday · 9:00 AM – 5:30 PM IST<br />
                  Sunday closed
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Dreamscape+Hotel+MLA+Colony+Road+No+12+Banjara+Hills+Hyderabad"
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

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        phoneNumber={formData.contact || `${formData.countryCode} ${formData.phone}`}
        otp={otp}
        setOtp={setOtp}
        onVerify={handleVerifyOtp}
        loading={otpLoading || submitting}
        error={otpError}
        onResend={handleResendOtp}
        resendLoading={resendLoading}
        resendSuccess={resendSuccess}
        timer={timer}
      />
    </div>
  );
}

export default ContactForm;

