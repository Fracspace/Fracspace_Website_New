"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  Flame,
  Zap,
  Mountain,
  UtensilsCrossed,
  Trees,
  ChevronDown,
  Phone,
  CheckCircle2,
  Loader2
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import hilltopImg from "../../../assets/hilltopImg.webp";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { sendOtpApi, verifyOtpApi } from "../../../utils/otpService";
import OtpModal from "../../ui/OtpModal";

const ENQUIRY_API = "https://apitest.fracspace.com/api/v1/webApi/enquiryFormRegardingCoownership";

function PropertyDetails() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    contact: "",
    phone: "",
    budget: ""
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

  const isIndian =
    formData.countryCode === "+91" ||
    (formData.contact ? formData.contact.startsWith("+91") || formData.contact.startsWith("91") : true);

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
          budget: formData.budget,
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
        budget: ""
      });
      setOtp("");
      setShowOtpModal(false);
    } catch (err) {
      console.error("Enquiry form error:", err);
      setError(err.response?.data?.message || err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please provide your name and email.");
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

  const amenities = [
    { icon: Car, label: "Parking" },
    { icon: Flame, label: "Bonfire" },
    { icon: Zap, label: "Power Backup" },
    { icon: Mountain, label: "Trek" },
    { icon: UtensilsCrossed, label: "Restaurant" },
    { icon: Trees, label: "Safari" }
  ];

  const nearbyPlaces = [
    "Kolukkumalai",
    "Eravikulam National Park",
    "Attukal Waterfalls",
    "Kolukkumalai",
    "Eravikulam National Park",
    "Attukal Waterfalls"
  ];

  return (
    <section className="w-full max-w-6xl mx-auto rounded-lg bg-[#f5f5f5] py-8 mt-12 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-8">
          {/* Left Side */}
          <div>
            {/* Amenities */}
            <h3 className="text-2xl text-gray-800 mb-5 font-jakarta">
              Distinctive Amenities
            </h3>

            <div className="grid grid-cols-2 gap-y-5 gap-x-10 max-w-md">
              {amenities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-[#0A1F7A]" />
                      <span className="text-md text-gray-700 font-dm">
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More */}
            <button className="flex font-dm items-center gap-1 mt-6 text-md text-blue-700 hover:text-blue-900 cursor-pointer">
              View more
              <ChevronDown size={14} />
            </button>

            {/* Neighborhood */}
            <div className="mt-10">
              <h3 className="text-lg font-dm font-medium text-gray-800 mb-8">
                The Neighborhood
              </h3>

              <div className="flex justify-center items-center flex-wrap gap-10 text-sm text-gray-700">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center md:justify-between"
                  >
                    <Image
                      src={hilltopImg}
                      alt="place image"
                      className="mx-auto w-[80vw] md:w-[12vw] md:h-[16vh] rounded-lg"
                    />
                    <span className="font-dm mt-2" key={place}>
                      {place}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            {/* Enquiry Form */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-center font-medium text-gray-700 mb-5 font-jakarta text-xl">
                Enquiry form
              </h3>

              {sent ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs text-center space-y-2 border border-emerald-100">
                  <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600" />
                  <p className="font-semibold">We have received your enquiry and will get back to you shortly!</p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs text-[#081C7B] font-bold hover:underline cursor-pointer"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full font-dm h-9 px-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-700"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full font-dm h-9 px-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-700"
                  />

                  <div className="space-y-1">
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
                          height: "38px",
                          fontSize: "0.875rem",
                          backgroundColor: "#FFFFFF",
                          borderColor: "#D1D5DB",
                          borderRadius: "0.5rem",
                          color: "#1F2937",
                          fontFamily: "inherit"
                        }}
                        buttonStyle={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#D1D5DB",
                          borderTopLeftRadius: "0.5rem",
                          borderBottomLeftRadius: "0.5rem"
                        }}
                        dropdownStyle={{
                          borderRadius: "0.5rem",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          zIndex: 50
                        }}
                      />
                    </div>
                  </div>

                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full font-dm h-9 px-3 border border-gray-300 rounded-lg text-sm text-gray-500 outline-none focus:border-blue-700"
                  >
                    <option value="">Select Your Budget</option>
                    <option value="₹10 Lakh - ₹25 Lakh">₹10 Lakh - ₹25 Lakh</option>
                    <option value="₹25 Lakh - ₹50 Lakh">₹25 Lakh - ₹50 Lakh</option>
                    <option value="₹50 Lakh+">₹50 Lakh+</option>
                  </select>

                  {error && <p className="text-xs text-red-600">{error}</p>}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting || otpLoading}
                      className="w-full font-dm h-9 mx-auto flex items-center justify-center text-sm font-medium rounded-lg transition shadow-sm bg-[#081C7B] hover:bg-[#061660] disabled:bg-gray-300 disabled:text-gray-500 text-white cursor-pointer disabled:cursor-not-allowed"
                    >
                      {submitting || otpLoading ? (
                        <div className="flex items-center gap-1.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{otpLoading ? "Sending OTP..." : "Submitting..."}</span>
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Guidance Card */}
            <div className="bg-[#081C7B] text-white p-5 rounded-2xl">
              <h3 className="font-semibold text-xl mb-2 font-jakarta">
                Need Guidance?
              </h3>
              <p className="text-lg text-white/80 font-dm">
                Speak with our investment experts
              </p>

              <p className="text-sm text-white/60 mt-1 font-dm">
                Mon-Sat : 9AM-6:30PM
              </p>

              <a
                href="tel:+919880626111"
                className="mt-4 bg-white rounded-xl flex items-center justify-center gap-2 h-9 hover:bg-white/90 transition text-decoration-none"
              >
                <Phone size={14} className="text-[#081C7B]" />
                <span className="text-[#081C7B] text-base sm:text-lg font-medium font-dm">
                  +91 98806 26111
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
}

export default PropertyDetails;

