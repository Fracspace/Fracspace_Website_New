"use client";

import React, { useState, useEffect } from "react";
import { FileText, Loader2 } from "lucide-react";
import axios from "axios";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { sendOtpApi, verifyOtpApi } from "../../utils/otpService";
import OtpModal from "./OtpModal";

const ENQUIRY_API = "https://apitest.fracspace.com/api/v1/webApi/enquiryFormRegardingCoownership";

function FloatingWidgets() {
  const [formOpen, setFormOpen] = useState(false);
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

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed right-4 sm:right-6 bottom-6 z-[80] flex flex-col gap-3 font-manrope">
        {/* Enquiry Form Button */}
        <button
          onClick={() => setFormOpen(true)}
          title="Investment enquiry"
          aria-label="Investment enquiry"
          className="animate-floating-form w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0B2452] hover:bg-[#16418C] text-white flex items-center justify-center shadow-2xl transition duration-300 transform hover:scale-110 active:scale-95 cursor-pointer border border-white/10"
        >
          <FileText className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919880626111?text=Hello%20Fracspace%2C%20I%20would%20like%20to%20enquire%20about%20your%20co-ownership%20opportunities."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (+91 98806 26111)"
          aria-label="Chat on WhatsApp (+91 98806 26111)"
          className="animate-floating-whatsapp w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer border border-white/20"
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>

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

