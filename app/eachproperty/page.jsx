"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {
  MapPin,
  Home,
  Maximize,
  Grid,
  Users,
  Tag,
  Flame,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import imgFallback from "../../assets/herobg.webp";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import dynamic from "next/dynamic";
import { sendOtpApi, verifyOtpApi } from "../../utils/otpService";

const OtpModal = dynamic(() => import("../../components/ui/OtpModal"), { ssr: false });

const ENQUIRY_API = "https://apitest.fracspace.com/api/v1/webApi/enquiryFormRegardingCoownership";

function PropertyDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enquiry form state
  const initialState = {
    name: "",
    email: "",
    contact: "",
    countryCode: "+91",
    phoneNumber: "",
    budget: "",
    agreeToContact: false
  };

  const [formData, setFormData] = useState(initialState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // OTP Verification state
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

  const PROPERTY_API = `https://apitest.fracspace.com/api/users/getPropertyById/${id}`;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No property ID provided. Please return to the properties listing.");
      return;
    }

    setLoading(true);
    const headers = {
      "x-api-key": "Fracspace@2024"
    };

    axios
      .get(PROPERTY_API, { headers })
      .then((response) => {
        if (response?.data?.property) {
          setPropertyDetails(response.data.property);
        } else {
          setError("Property details could not be found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching property:", err);
        setError("Unable to retrieve property data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const target = e.target;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value
    }));
    setFormError("");
  };

  const handlePhoneChange = (value, country) => {
    const dialCode = country?.dialCode || "91";
    const cleanDigits = (value || "").replace(/\D/g, "");
    const phone = cleanDigits.startsWith(dialCode) ? cleanDigits.slice(dialCode.length) : cleanDigits;
    const formattedContact = value ? (value.startsWith("+") ? value : `+${value}`) : "";
    const countryCode = `+${dialCode}`;

    setFormError("");
    setFormData((prev) => ({
      ...prev,
      contact: formattedContact,
      countryCode: countryCode,
      phoneNumber: phone
    }));
  };

  const executeFormSubmit = async () => {
    setSubmitting(true);
    setFormError("");

    const cleanPhone = (formData.phoneNumber || "").trim().replace(/\D/g, "");
    const fullContact = formData.contact || `${formData.countryCode} ${cleanPhone}`;
    const payload = {
      name: formData.name,
      email: formData.email,
      contact: fullContact,
      countryCode: formData.countryCode,
      phoneNumber: cleanPhone,
      phone: fullContact,
      budget: formData.budget,
      agreeToContact: formData.agreeToContact
    };

    try {
      await axios.post(ENQUIRY_API, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "Fracspace@2024"
        }
      });
      setFormSubmitted(true);
      setFormData(initialState);
      setOtp("");
      setShowOtpModal(false);
    } catch (err) {
      console.error("Enquiry form error:", err);
      setFormError(err.response?.data?.message || err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Please enter your name and email.");
      return;
    }

    const cleanPhone = (formData.phoneNumber || "").trim().replace(/\D/g, "");
    if (!cleanPhone) {
      setFormError("Phone number is required");
      return;
    }

    // For Indian numbers: trigger send OTP and open OTP modal
    if (isIndian) {
      if (cleanPhone.length !== 10) {
        setFormError("Please enter a valid 10-digit Indian mobile number.");
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
        setFormError(err.message || "Failed to send OTP. Please check your mobile number.");
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
    const cleanPhone = (formData.phoneNumber || "").replace(/\D/g, "");
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
    const cleanPhone = (formData.phoneNumber || "").replace(/\D/g, "");
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

  // Autoclose thank you notification
  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-gray-50/50">
        <Loader2 className="w-10 h-10 text-blue-900 animate-spin" />
        <p className="font-dm text-gray-500 animate-pulse">Loading property details...</p>
      </div>
    );
  }

  if (error || !propertyDetails) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-6 text-center bg-gray-50/50">
        <AlertCircle className="w-14 h-14 text-red-500" />
        <h3 className="font-jakarta text-2xl font-bold text-gray-800">Oops! Something went wrong</h3>
        <p className="text-gray-500 font-dm max-w-md">{error || "Property not found."}</p>
      </div>
    );
  }

  // Extract images from API
  const propertyImages = propertyDetails?.image
    ? Object.values(propertyDetails.image).filter(Boolean)
    : [];

  return (
    <div className="bg-gray-50/30 min-h-screen font-dm">

      {/* Premium Hero Header Section */}
      <section className="relative w-full h-[380px] lg:h-[480px] flex items-end overflow-hidden">
        <Image
          src={propertyImages[0] || imgFallback}
          alt={propertyDetails.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 pb-12 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-blue-600/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {propertyDetails.Type?.split(" | ")[0] || "Fractional Asset"}
            </span>
            {propertyDetails.AvailableFractions > 0 && (
              <span className="bg-amber-500/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 text-white fill-white" />
                Hot Deal
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-jakarta leading-tight max-w-4xl tracking-tight">
            {propertyDetails.name}
          </h1>

          <div className="flex items-center gap-2 text-gray-200 mt-4 text-sm sm:text-base">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <span>{propertyDetails.Location}</span>
          </div>
        </div>
      </section>

      {/* Main Grid Content Layout */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Left Columns - Details, Attributes, and Carousel */}
          <div className="lg:col-span-2 space-y-12">

            {/* Gallery Carousel Container */}
            {propertyImages.length > 0 && (
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100/60 overflow-hidden">
                <Carousel
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  interval={4000}
                  stopOnHover
                  className="rounded-2xl overflow-hidden shadow-inner"
                  renderArrowPrev={(onClickHandler, hasPrev) =>
                    hasPrev && (
                      <button
                        type="button"
                        onClick={onClickHandler}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md hover:scale-105 transition cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )
                  }
                  renderArrowNext={(onClickHandler, hasNext) =>
                    hasNext && (
                      <button
                        type="button"
                        onClick={onClickHandler}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md hover:scale-105 transition cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )
                  }
                >
                  {propertyImages.map((img, index) => (
                    <div key={index} className="relative h-[300px] sm:h-[450px] w-full">
                      <Image
                        src={img}
                        alt={`${propertyDetails.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}

            {/* About Stays Section */}
            <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-jakarta text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                About this property
              </h3>
              <p className="text-gray-600 leading-8 text-base whitespace-pre-line font-light">
                {propertyDetails.Description || "No detailed description available for this premium stay."}
              </p>
            </section>

            {/* Attributes Grid List */}
            <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-jakarta text-2xl font-bold text-gray-900 mb-8 pb-2 border-b border-gray-100">
                Property Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-900">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Property Type</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{propertyDetails.Type || "Fractional Stay"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-900">
                    <Maximize className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Property Area</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{propertyDetails.area || "Premium Area"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-900">
                    <Grid className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Fractions</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{propertyDetails.TotalFractions || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-900">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Available Fractions</p>
                    <p className="text-sm font-bold text-emerald-600 mt-0.5">{propertyDetails.AvailableFractions ?? "Sold Out"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50 sm:col-span-2">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-900">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Fraction Price</p>
                    <p className="text-lg font-extrabold text-[#021265] mt-0.5">₹ {propertyDetails.FC_Price || "Request Pricing"}</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Distinctive Amenities */}
            {propertyDetails.DistinctiveAmenities?.length > 0 && (
              <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-jakarta text-2xl font-bold text-gray-900 mb-8 pb-2 border-b border-gray-100">
                  Distinctive Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {propertyDetails.DistinctiveAmenities.map((amenity, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50/30 rounded-2xl border border-gray-100/60 hover:bg-gray-50 transition">
                      {amenity?.image && (
                        <div className="relative w-12 h-12 mb-3 bg-white p-1 rounded-xl shadow-sm border border-gray-50 overflow-hidden">
                          <Image
                            src={amenity.image}
                            alt={amenity.name || "Amenity"}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      )}
                      <p className="text-xs font-semibold text-gray-700">{amenity?.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Location Highlights */}
            {propertyDetails.locationHighlights?.length > 0 && (
              <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-jakarta text-2xl font-bold text-gray-900 mb-8 pb-2 border-b border-gray-100">
                  Location Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {propertyDetails.locationHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50/30 rounded-2xl border border-gray-100/60">
                      {highlight?.image && (
                        <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                          <Image
                            src={highlight.image}
                            alt={highlight.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <p className="text-sm font-semibold text-gray-700 leading-snug">{highlight?.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Enquiry Form Section (Right Column) */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 relative overflow-hidden">

              {/* Highlight background element */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#021265]"></div>

              <h2 className="font-jakarta text-2xl font-bold text-gray-900 mb-6">
                Request Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Form status notification banner */}
                {formError && (
                  <div className="p-3.5 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {formSubmitted && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-start gap-2 border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                    <p className="font-semibold leading-relaxed">
                      We have received your enquiry and will get back to you shortly!
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-900/10 focus:border-[#021265] transition outline-none text-sm text-gray-800 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Number *</label>
                  <div className="relative">
                    <PhoneInput
                      country={"in"}
                      value={formData.contact ? formData.contact.replace(/^\+/, "") : ""}
                      onChange={handlePhoneChange}
                      enableSearch={true}
                      searchPlaceholder="Search country..."
                      inputProps={{
                        required: true,
                        name: "phoneNumber"
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "48px",
                        fontSize: "0.875rem",
                        backgroundColor: "#F9FAFB",
                        borderColor: "#E5E7EB",
                        borderRadius: "1rem",
                        color: "#1F2937",
                        fontFamily: "inherit"
                      }}
                      buttonStyle={{
                        backgroundColor: "#F9FAFB",
                        borderColor: "#E5E7EB",
                        borderTopLeftRadius: "1rem",
                        borderBottomLeftRadius: "1rem"
                      }}
                      dropdownStyle={{
                        borderRadius: "1rem",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        zIndex: 50
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-900/10 focus:border-[#021265] transition outline-none text-sm text-gray-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-900/10 focus:border-[#021265] transition outline-none text-sm text-gray-700 font-medium"
                  >
                    <option value="">Select Budget</option>
                    <option value="below 10,00,000">Below 10,00,000</option>
                    <option value="10,00,000 - 20,00,000">10,00,000 - 20,00,000</option>
                    <option value="above 20,00,000">Above 20,00,000</option>
                  </select>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="agreeToContact"
                    name="agreeToContact"
                    checked={formData.agreeToContact}
                    onChange={handleChange}
                    required
                    className="w-4.5 h-4.5 border-gray-300 rounded text-blue-900 focus:ring-blue-900/25 mt-0.5 cursor-pointer accent-[#021265]"
                  />
                  <label htmlFor="agreeToContact" className="text-[11px] text-gray-400 leading-snug cursor-pointer select-none">
                    By submitting your contact details, you authorize Fracspace and its representatives to contact you.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting || otpLoading}
                    className="w-full py-4 font-bold rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 bg-[#021265] hover:bg-blue-900 disabled:bg-gray-300 disabled:text-gray-500 text-white cursor-pointer disabled:cursor-not-allowed shadow-blue-900/10 hover:shadow-xl"
                  >
                    {submitting || otpLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{otpLoading ? "Sending OTP..." : "Submitting..."}</span>
                      </>
                    ) : (
                      <span>Submit Request</span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </main>

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        phoneNumber={formData.contact || `${formData.countryCode} ${formData.phoneNumber}`}
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

export default function EachPropertyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-900 animate-spin" />
        </div>
      }
    >
      <PropertyDetailsContent />
    </Suspense>
  );
}
