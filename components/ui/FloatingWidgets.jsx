"use client";

import React, { useState, useEffect } from "react";
import { FileText, MessageCircle, Phone, X, Send, Loader2 } from "lucide-react";
import axios from "axios";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { sendOtpApi, verifyOtpApi } from "../../utils/otpService";
import OtpModal from "./OtpModal";

const ENQUIRY_API = "https://apitest.fracspace.com/api/v1/webApi/enquiryFormRegardingCoownership";

function FloatingWidgets() {
  const [formOpen, setFormOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    contact: "",
    phone: "",
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

  // Auto-show enquiry modal once after scroll or timer if not already shown in session
  useEffect(() => {
    try {
      const shown = sessionStorage.getItem("fs-enquiry-autoshown");
      if (!shown) {
        const t = setTimeout(() => {
          setFormOpen(true);
          sessionStorage.setItem("fs-enquiry-autoshown", "1");
        }, 12000);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // ignore storage restriction
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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
    setIsSubmitting(true);
    setError("");

    const cleanPhone = (formData.phone || "").replace(/\D/g, "");
    const fullPhone = formData.contact || `${formData.countryCode} ${cleanPhone}`;

    try {
      await axios.post(
        ENQUIRY_API,
        {
          name: formData.name,
          email: formData.email,
          phoneNumber: cleanPhone,
          countryCode: formData.countryCode,
          contact: fullPhone,
          phone: fullPhone,
          message: formData.message || "General investment enquiry via popup widget",
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
      setFormData({ name: "", email: "", countryCode: "+91", contact: "", phone: "", message: "" });
      setOtp("");
      setShowOtpModal(false);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setError(err.response?.data?.message || err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please add your full name and email.");
      return;
    }

    const cleanPhone = (formData.phone || "").replace(/\D/g, "");
    if (!cleanPhone) {
      setError("Please add your phone number.");
      return;
    }

    // For Indian numbers: trigger send OTP and open OTP modal
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

    // International numbers: submit directly!
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

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      "Hello Fracspace, I would like to enquire about your co-ownership opportunities."
    );
    window.open(`https://wa.me/919880626111?text=${message}`, "_blank");
  };

  const quickPrompts = [
    "How does co-ownership work?",
    "What returns can I expect?",
    "Book a property site visit"
  ];

  const handlePromptClick = (prompt) => {
    const message = encodeURIComponent(`Hello Fracspace! ${prompt}`);
    window.open(`https://wa.me/919880626111?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed right-4 sm:right-6 bottom-6 z-[80] flex flex-col gap-3 font-manrope">
        {/* Enquiry Form Button */}
        <button
          onClick={() => {
            setFormOpen(true);
            setChatOpen(false);
          }}
          title="Investment enquiry"
          aria-label="Investment enquiry"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0B2452] hover:bg-[#16418C] text-white flex items-center justify-center shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer border border-white/10"
        >
          <FileText className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
        </button>

        {/* WhatsApp / Chat Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          title="Chat with us"
          aria-label="Chat with us"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0B2452] hover:bg-[#16418C] text-white flex items-center justify-center shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer border border-white/10"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
        </button>
      </div>

      {/* Quick Chat Popup */}
      {chatOpen && (
        <div className="fixed right-4 sm:right-6 bottom-24 z-[85] w-[calc(100vw-32px)] max-w-xs sm:max-w-sm bg-white border border-[#E2E9F4] rounded-2xl shadow-2xl overflow-hidden font-manrope animate-fsSlideUp">
          <div className="bg-[#0B2452] text-white px-5 py-4 flex items-center justify-between">
            <div>
              <div className="font-jakarta text-sm font-bold">
                Chat with Fracspace
              </div>
              <div className="text-[11px] text-[#A9BDE2] mt-0.5">
                Mon–Sat · 9:00 AM – 5:30 PM IST
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-[#A9BDE2] hover:text-white text-xl leading-none cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-3">
            <div className="bg-[#F2F5FA] rounded-xl p-3 text-xs leading-relaxed text-[#33415F]">
              Hi! Ask us anything about co-ownership, yields, or documentation.
            </div>

            <div className="flex flex-col gap-2 pt-1">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(p)}
                  className="text-left bg-white hover:bg-[#16418C] hover:text-white text-[#16418C] border border-[#DDE4EF] rounded-full px-3.5 py-2 text-xs font-semibold transition cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#EEF1F7] flex items-center gap-2">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-[#0B2452] hover:bg-[#16418C] text-white py-2.5 rounded-full text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={14} />
                Continue on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Investment Enquiry Modal */}
      {formOpen && (
        <div
          onClick={() => setFormOpen(false)}
          className="fixed inset-0 z-[100] bg-[#0A1428]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-manrope"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7EBF2] animate-fsSlideUp my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setFormOpen(false);
                setSent(false);
              }}
              aria-label="Close form"
              className="absolute top-5 right-5 text-[#7B8AA8] hover:text-[#0B2452] text-2xl leading-none cursor-pointer"
            >
              ×
            </button>

            <h2 className="font-jakarta text-xl sm:text-2xl font-bold text-[#14203A] text-center mb-6">
              Investment Enquiry Form
            </h2>

            {sent ? (
              <div className="border border-[#BFE0CB] bg-[#F0F9F3] rounded-2xl p-6 text-center space-y-3">
                <h3 className="font-jakarta text-lg font-bold text-[#1E5B3A]">
                  Enquiry Received
                </h3>
                <p className="text-sm text-[#3D6B52] leading-relaxed">
                  A Fracspace specialist will call you within one business day.
                </p>
                <button
                  onClick={() => {
                    setFormOpen(false);
                    setSent(false);
                  }}
                  className="mt-2 bg-[#0B2452] hover:bg-[#16418C] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#4A5878] uppercase tracking-wider mb-1.5">
                    Full Name
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
                    Email ID
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
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Share any specific queries or requirements…"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F9FC] focus:bg-white border border-[#DDE4EF] focus:border-[#0B2452] rounded-xl px-4 py-3 text-sm text-[#14203A] outline-none transition resize-none"
                  ></textarea>
                </div>

                {error && (
                  <p className="text-xs text-red-600 text-center font-medium">{error}</p>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || otpLoading}
                    className="w-full py-3.5 rounded-xl text-sm font-bold transition shadow-md flex items-center justify-center gap-2 bg-[#0B2452] hover:bg-[#16418C] disabled:bg-gray-300 disabled:text-gray-500 text-white cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting || otpLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{otpLoading ? "Sending OTP..." : "Submitting..."}</span>
                      </>
                    ) : (
                      <span>Submit Enquiry</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        phoneNumber={formData.contact || `${formData.countryCode} ${formData.phone}`}
        otp={otp}
        setOtp={setOtp}
        onVerify={handleVerifyOtp}
        loading={otpLoading || isSubmitting}
        error={otpError}
        onResend={handleResendOtp}
        resendLoading={resendLoading}
        resendSuccess={resendSuccess}
        timer={timer}
      />
    </>
  );
}

export default FloatingWidgets;

