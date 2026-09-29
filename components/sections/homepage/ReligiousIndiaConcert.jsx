"use client";
import React, { useState, useEffect } from "react";
import Style from "./ReligiousIndiaConcert.module.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import {
  Calendar,
  MapPin,
  Music,
  CheckCircle,
  Sparkles,
  Ticket,
  ChevronRight,
  ArrowLeft,
  Clock,
  Info,
  Wallet,
  X
} from "lucide-react";

const bandPosterImg = "/religiousIndiaPoster.jpg";
const religiousIndiaPoster = "/religiousIndiaPoster.jpg";

export default function ReligiousIndiaConcert({ concertId = "religious-india-2026" }) {
  const [concertData, setConcertData] = useState(null);
  const [fetching, setFetching] = useState(true);

  // Form step: 1 = Contact details & City, 2 = Select Ticket Tiers & Quantities, 3 = Review Booking & Checkout
  const [formStep, setFormStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    countryCode: "+91",
    phoneNumber: "",
    cityId: "hyd",
    agreeUpdates: true,
    requiredLogin: false
  });

  // State to track quantities per ticket tier ID, e.g. { vip: 1, general: 0, silver: 0 }
  const [ticketQuantities, setTicketQuantities] = useState({});

  // Wallet & Timer state for Step 3 Review Booking
  const [useWallet, setUseWallet] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  // Terms and Conditions state
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // OTP & Web-Auth state
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpMessage, setOtpMessage] = useState("");
  const [otpError, setOtpError] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Helper function to extract token from various localStorage keys
  const getValidToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("userToken") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwtToken") ||
      localStorage.getItem("fracspace_token") ||
      ""
    );
  };

  // Helper function to decode JWT payload and extract phone number if present
  const extractPhoneFromToken = (tokenStr) => {
    if (!tokenStr) return "";
    try {
      const parts = tokenStr.split(".");
      if (parts.length === 3) {
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const payload = JSON.parse(jsonPayload);

        const raw =
          payload.phoneNumber ||
          payload.phone_number ||
          payload.phone ||
          payload.phone_no ||
          payload.userPhone ||
          payload.user_phone ||
          payload.contact ||
          payload.contact_no ||
          payload.mobile ||
          payload.mobile_no ||
          payload.sub ||
          payload.user?.phoneNumber ||
          payload.user?.phone_number ||
          payload.user?.phone ||
          payload.user?.contact ||
          payload.data?.phoneNumber ||
          payload.data?.phone_number ||
          payload.data?.phone ||
          "";

        const digits = String(raw).replace(/\D/g, "");
        return digits.length >= 7 ? String(raw) : "";
      }
    } catch (err) {
      // Ignore invalid JWT decode errors
    }
    return "";
  };

  // Helper function to normalize phone number digits by stripping non-digits and removing dialCode prefix if present
  const normalizePhoneDigits = (raw, dialCode = "91") => {
    if (!raw) return "";
    const digitsOnly = String(raw).replace(/\D/g, "");
    const cleanDial = (dialCode || "91").replace(/\D/g, "");
    if (cleanDial && digitsOnly.startsWith(cleanDial) && digitsOnly.length > cleanDial.length + 5) {
      return digitsOnly.slice(cleanDial.length);
    }
    return digitsOnly;
  };

  // Check for existing JWT token & pre-fill saved verified phone number on mount
  useEffect(() => {
    const existingToken = getValidToken();

    const savedPhone =
      localStorage.getItem("userPhone") ||
      localStorage.getItem("phoneNumber") ||
      localStorage.getItem("phone") ||
      localStorage.getItem("userContact") ||
      extractPhoneFromToken(existingToken) ||
      "";

    const savedCountryCode =
      localStorage.getItem("countryCode") || "+91";

    const dialCode = savedCountryCode.replace(/\D/g, "") || "91";
    const cleanSavedPhone = normalizePhoneDigits(savedPhone, dialCode);

    const savedContact = cleanSavedPhone ? `${savedCountryCode}${cleanSavedPhone}` : "";

    if (existingToken && cleanSavedPhone.length >= 7) {
      localStorage.setItem("userPhone", cleanSavedPhone);
      localStorage.setItem("userContact", savedContact);
      setVerifiedPhoneNumber(cleanSavedPhone);
      setIsVerified(true);
      setFormData((prev) => ({
        ...prev,
        phoneNumber: cleanSavedPhone,
        countryCode: savedCountryCode,
        contact: savedContact
      }));
    } else {
      setIsVerified(false);
      setVerifiedPhoneNumber("");
    }
  }, []);

  // Listen for storage changes (e.g., if user deletes token from localStorage in DevTools)
  useEffect(() => {
    const handleStorageChange = () => {
      const activeToken = getValidToken();
      if (!activeToken) {
        setIsVerified(false);
        setVerifiedPhoneNumber("");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // OTP Resend timer countdown
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  useEffect(() => {
    const fetchConcertDetails = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          "https://apitest.fracspace.com/api/v1/concerts/section?platform=web&appVersion=1.4.0",
          {
            headers: {
              "x-api-key": "Fracspace@2024"
            }
          }
        );
        if (res.data?.success && res.data?.data?.concerts?.length > 0) {
          const concert = res.data.data.concerts[0];
          setConcertData(concert);

          const defaultCity =
            concert?.details?.schedule?.defaultCityId ||
            concert?.details?.schedule?.cities?.[0]?.id ||
            "hyd";

          setFormData((prev) => ({
            ...prev,
            cityId: defaultCity
          }));
        }
      } catch (err) {
        console.error("Error fetching concert section data:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchConcertDetails();
  }, []);

  // Dynamic Data Extraction from API Response
  const presentsTagText = concertData?.branding?.presentsTag?.text || "FRACSPACE PRESENTS";
  const mainTitle = concertData?.title || "RELIGIOUS INDIA";
  const artistName = concertData?.artist || "HARISH SAGANE & BAND";
  const subtitle = concertData?.subtitle || "An evening of devotion, rhythm & soul.";
  const posterImg = religiousIndiaPoster;

  const cities = concertData?.details?.schedule?.cities || [];
  const selectedVenue = cities.find((v) => v.id === formData.cityId) || cities[0];

  const interestFormConfig = concertData?.interestForm;
  const formTitle = interestFormConfig?.title || "Register Your Interest";
  const maxTickets = interestFormConfig?.tickets?.max || 10;

  // Sync ticket quantities when selected city or concert data changes
  useEffect(() => {
    if (!selectedVenue?.ticketTypes) return;
    setTicketQuantities((prev) => {
      const next = {};
      selectedVenue.ticketTypes.forEach((tier, index) => {
        if (prev[tier.id] !== undefined) {
          next[tier.id] = prev[tier.id];
        } else {
          next[tier.id] = index === 0 ? 1 : 0;
        }
      });
      return next;
    });
  }, [formData.cityId, concertData]);

  const handleQuantityChange = (tierId, delta) => {
    setTicketQuantities((prev) => {
      const current = prev[tierId] || 0;
      const updated = Math.max(0, Math.min(maxTickets, current + delta));
      return { ...prev, [tierId]: updated };
    });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setError("");
  };

  const handlePhoneChange = (value, country) => {
    const dialCode = country?.dialCode || "91";
    const countryCode = dialCode ? `+${dialCode}` : "+91";

    const cleanInputPhone = normalizePhoneDigits(value, dialCode);
    const activeToken = getValidToken();

    setFormData((prev) => ({
      ...prev,
      contact: value ? (value.startsWith("+") ? value : `+${value}`) : "",
      countryCode: countryCode,
      phoneNumber: cleanInputPhone
    }));

    // Edge Case: If user deleted token from localStorage, force unverified state
    if (!activeToken) {
      setIsVerified(false);
      setOtpSent(false);
      setOtp("");
      setOtpError("");
      setOtpMessage("");
      setError("");
      return;
    }

    if (cleanInputPhone.length < 7) {
      // Phone input cleared or incomplete -> remove verified badge immediately
      setIsVerified(false);
      setOtpSent(false);
      setOtp("");
      setOtpError("");
      setOtpMessage("");
      setError("");
      return;
    }

    const rawSavedPhone =
      verifiedPhoneNumber ||
      localStorage.getItem("userPhone") ||
      localStorage.getItem("phoneNumber") ||
      localStorage.getItem("phone") ||
      localStorage.getItem("userContact") ||
      extractPhoneFromToken(activeToken) ||
      "";

    const targetVerifiedPhone = normalizePhoneDigits(rawSavedPhone, dialCode);

    // If no target verified phone was previously saved/decoded, but user has activeToken:
    // Establish this input phone as the initial verified phone number for the active token session!
    if (activeToken && (!targetVerifiedPhone || targetVerifiedPhone.length < 7) && cleanInputPhone.length >= 7) {
      setVerifiedPhoneNumber(cleanInputPhone);
      localStorage.setItem("userPhone", cleanInputPhone);
      setIsVerified(true);
      setOtpSent(false);
      setOtp("");
      setOtpError("");
      setOtpMessage("");
      setError("");
      return;
    }

    // Verified badge shows ONLY IF entered number EQUALS the decoded/saved verified phone number!
    const isExactMatch =
      targetVerifiedPhone.length >= 7 &&
      cleanInputPhone.length >= 7 &&
      (cleanInputPhone === targetVerifiedPhone ||
        (value && value.replace(/\D/g, "").endsWith(targetVerifiedPhone)) ||
        (rawSavedPhone && rawSavedPhone.replace(/\D/g, "").endsWith(cleanInputPhone)));

    if (isExactMatch && activeToken) {
      setIsVerified(true);
      setVerifiedPhoneNumber(targetVerifiedPhone);
      setOtpSent(false);
      setOtp("");
      setOtpError("");
      setOtpMessage("");
    } else {
      // Different number or partial number -> hide verified badge, display verify button for new OTP
      setIsVerified(false);
      setOtpSent(false);
      setOtp("");
      setOtpError("");
      setOtpMessage("");
    }
    setError("");
  };

  // API Call to Send OTP
  const handleSendOtp = async () => {
    if (!formData.name.trim()) {
      setOtpError("Please enter your full name before requesting OTP.");
      return;
    }
    if (!formData.email.trim()) {
      setOtpError("Please enter your email address before requesting OTP.");
      return;
    }
    const cleanPhone = (formData.phoneNumber || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 7) {
      setOtpError("Please enter a valid phone number before requesting OTP.");
      return;
    }

    setSendingOtp(true);
    setOtpError("");
    setOtpMessage("");

    try {
      const payload = {
        phoneNumber: cleanPhone,
        countryCode: formData.countryCode.startsWith("+") ? formData.countryCode : `+${formData.countryCode}`,
        name: formData.name.trim(),
        email: formData.email.trim()
      };

      const res = await axios.post(
        `https://apitest.fracspace.com/api/v1/concerts/${concertId}/web-auth/send-otp`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "Fracspace@2024"
          }
        }
      );

      if (res.data?.success) {
        setOtpSent(true);
        setOtpTimer(res.data?.data?.resendAfterSeconds || 30);
        setOtpMessage(res.data?.message || "OTP sent successfully to your mobile number.");
      } else {
        setOtpError(res.data?.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Send OTP Error:", err.response?.data || err);
      setOtpError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to send OTP. Please try again."
      );
    } finally {
      setSendingOtp(false);
    }
  };

  // API Call to Verify OTP
  const handleVerifyOtp = async () => {
    const cleanPhone = (formData.phoneNumber || "").replace(/\D/g, "");
    if (!otp || otp.trim().length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP code.");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");
    setOtpMessage("");

    try {
      const payload = {
        phoneNumber: cleanPhone,
        countryCode: formData.countryCode.startsWith("+") ? formData.countryCode : `+${formData.countryCode}`,
        otp: otp.trim()
      };

      const res = await axios.post(
        `https://apitest.fracspace.com/api/v1/concerts/${concertId}/web-auth/verify-otp`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "Fracspace@2024"
          }
        }
      );

      if (res.data?.success) {
        // Erase old tokens when verifying a new number
        localStorage.removeItem("token");
        localStorage.removeItem("userToken");
        localStorage.removeItem("authToken");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("fracspace_token");

        const newToken = res.data?.data?.token;
        if (newToken) {
          localStorage.setItem("token", newToken);
          localStorage.setItem("userToken", newToken);
          localStorage.setItem("authToken", newToken);
          localStorage.setItem("jwtToken", newToken);
          localStorage.setItem("fracspace_token", newToken);
        }

        // Store user details in localStorage
        const currentCleanPhone = cleanPhone;
        const currentCountryCode = formData.countryCode.startsWith("+") ? formData.countryCode : `+${formData.countryCode}`;
        
        localStorage.setItem("userPhone", currentCleanPhone);
        localStorage.setItem("countryCode", currentCountryCode);
        localStorage.setItem("userContact", formData.contact || `${currentCountryCode}${currentCleanPhone}`);
        if (formData.name) localStorage.setItem("userName", formData.name.trim());
        if (formData.email) localStorage.setItem("userEmail", formData.email.trim());

        if (res.data?.data?.user) {
          const u = res.data.data.user;
          const uName = u.userName || u.name || formData.name;
          const uEmail = u.email || formData.email;
          const uCountry = u.countryCode || currentCountryCode;
          const dialCode = uCountry.replace(/\D/g, "") || "91";
          const rawUPhone = u.phoneNumber ? String(u.phoneNumber) : currentCleanPhone;
          const uPhone = normalizePhoneDigits(rawUPhone, dialCode);

          if (uName) localStorage.setItem("userName", uName);
          if (uEmail) localStorage.setItem("userEmail", uEmail);
          if (uPhone) localStorage.setItem("userPhone", uPhone);
          if (uCountry) localStorage.setItem("countryCode", uCountry);

          setFormData((prev) => ({
            ...prev,
            name: uName || prev.name,
            email: uEmail || prev.email,
            countryCode: uCountry,
            phoneNumber: uPhone,
            contact: `${uCountry}${uPhone}`
          }));
        }

        const rawVerified = res.data?.data?.user?.phoneNumber || currentCleanPhone;
        const finalVerifiedPhone = normalizePhoneDigits(rawVerified, formData.countryCode);

        setVerifiedPhoneNumber(finalVerifiedPhone);
        localStorage.setItem("userPhone", finalVerifiedPhone);
        setIsVerified(true);
        setOtpSent(false);
        setOtp("");
        setOtpMessage("Phone number verified successfully!");
        setOtpError("");
        setError("");
      } else {
        setOtpError(res.data?.message || "Invalid OTP code. Please try again.");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err.response?.data || err);
      setOtpError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to verify OTP. Please try again."
      );
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Countdown timer for Step 3 Review Booking
  useEffect(() => {
    if (formStep !== 3) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [formStep]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Step 1 Submission: Validate user details and move to Step 2
  const handleNextStep = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const cleanPhone = (formData.phoneNumber || "").replace(/\D/g, "");
    if (!formData.contact || cleanPhone.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!formData.cityId) {
      setError("Please select your preferred city.");
      return;
    }

    const activeToken = getValidToken();

    // Check if user deleted token or phone is not verified
    if (!isVerified || (!activeToken && !verifiedPhoneNumber)) {
      setIsVerified(false);
      if (!otpSent) {
        handleSendOtp();
        setError("Please enter the OTP sent to your phone number to verify before proceeding.");
      } else {
        setError("Please enter and verify the 6-digit OTP sent to your phone number.");
      }
      return;
    }

    setError("");
    setFormStep(2);
  };

  // Step 2 Submission: Validate ticket selection and move to Step 3 Review Booking
  const handleStep2Next = (e) => {
    if (e) e.preventDefault();

    if (totalTickets <= 0) {
      setError("Please select at least 1 ticket to proceed.");
      return;
    }

    if (!formData.agreeUpdates) {
      setError("Please check the agreement box to receive updates and proceed.");
      return;
    }

    setError("");
    setFormStep(3);
  };

  const redirectToPayU = (payuConfig) => {
    if (!payuConfig || !payuConfig.action || !payuConfig.data) return;

    // Remove any existing payment form
    const existingForm = document.getElementById("payu_concert_post_form");
    if (existingForm) {
      existingForm.remove();
    }

    const form = document.createElement("form");
    form.id = "payu_concert_post_form";
    form.method = payuConfig.method || "POST";

    // 1. Ensure action URL uses HTTPS to eliminate Chrome's "Form is not secure" warning
    let actionUrl = payuConfig.action;
    if (actionUrl && actionUrl.startsWith("http://")) {
      actionUrl = actionUrl.replace("http://", "https://");
    }
    form.action = actionUrl;

    // 2. Prepare PayU form data object
    const formDataObj = { ...payuConfig.data };
    const currentOrigin = window.location.origin;
    const txnId = formDataObj.txnid || "";

    // 3. Override surl and furl so PayU redirects browser directly to frontend success/failure pages
    formDataObj.surl = `${currentOrigin}/paymentsuccess?txnid=${txnId}&status=success`;
    formDataObj.furl = `${currentOrigin}/paymentfailure?txnid=${txnId}&status=failure`;

    Object.entries(formDataObj).forEach(([key, val]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = val !== null && val !== undefined ? String(val) : "";
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  // Calculate order totals
  const totalTickets = (selectedVenue?.ticketTypes || []).reduce(
    (sum, tier) => sum + (ticketQuantities[tier.id] || 0),
    0
  );

  const totalAmount = (selectedVenue?.ticketTypes || []).reduce(
    (sum, tier) => sum + (ticketQuantities[tier.id] || 0) * (tier.price || 0),
    0
  );

  const walletDeduction = useWallet ? totalAmount : 0;
  const finalToPay = Math.max(0, totalAmount - walletDeduction);

  // Step 3 Final Submission: Book tickets & redirect to PayU
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanPhone = (formData.phoneNumber || "").replace(/\D/g, "");

    const items = (selectedVenue?.ticketTypes || [])
      .map((tier) => ({
        ticketTypeId: tier.id,
        quantity: ticketQuantities[tier.id] || 0
      }))
      .filter((item) => item.quantity > 0);

    if (items.length === 0) {
      setError("Please select at least 1 ticket to proceed.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the Terms and Conditions to proceed with booking.");
      return;
    }

    setLoading(true);
    setError("");

    const currentOrigin = window.location.origin;
    const surl = `${currentOrigin}/paymentsuccess`;
    const furl = `${currentOrigin}/paymentfailure`;

    const payload = {
      cityId: formData.cityId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      countryCode: formData.countryCode.startsWith("+") ? formData.countryCode : `+${formData.countryCode}`,
      phoneNumber: cleanPhone,
      items: items,
      useWallet: useWallet,
      platform: "web",
      surl: surl,
      furl: furl,
      successUrl: surl,
      failureUrl: furl,
      redirectUrl: surl,
      callbackUrl: surl
    };

    const userToken =
      localStorage.getItem("token") ||
      localStorage.getItem("userToken") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwtToken") ||
      localStorage.getItem("fracspace_token");

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "Fracspace@2024"
    };

    if (userToken) {
      headers["Authorization"] = `Bearer ${userToken}`;
      headers["x-auth-token"] = userToken;
    }

    const apiUrl = `https://apitest.fracspace.com/api/v1/concerts/${concertId}/book`;
    console.log("Submitting Concert Booking Request to:", apiUrl);
    console.log("Request Payload:", payload);

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: headers,
        timeout: 15000
      });

      console.log("Concert Booking API Success Response:", response.data);

      if (response.data?.success) {
        const data = response.data?.data;
        if (data?.requiresPayU && data?.payu) {
          redirectToPayU(data.payu);
        } else {
          setSubmitted(true);
        }
      } else {
        setError(response.data?.message || "Failed to process booking. Please try again.");
      }
    } catch (err) {
      console.error("Concert Booking API Error Response:", err.response?.data || err);
      const apiErrMsg = err.response?.data?.message || err.response?.data?.error;

      // If backend requires auth token for /book, fall back to registering interest for guest users
      if (apiErrMsg && apiErrMsg.toLowerCase().includes("no token provided")) {
        console.log("No auth token present. Registering guest booking interest...");
        try {
          const interestUrl = `https://apitest.fracspace.com/api/v1/concerts/${concertId}/interest`;
          const interestPayload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            countryCode: formData.countryCode.startsWith("+") ? formData.countryCode : `+${formData.countryCode}`,
            phoneNumber: cleanPhone,
            cityId: formData.cityId,
            ticketsNeeded: totalTickets,
            requiredLogin: false
          };

          const interestRes = await axios.post(interestUrl, interestPayload, {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "Fracspace@2024"
            },
            timeout: 10000
          });

          if (interestRes.data?.success) {
            setSubmitted(true);
            return;
          }
        } catch (fallbackErr) {
          console.error("Fallback Interest API Error:", fallbackErr);
        }
      }

      const errMsg =
        apiErrMsg ||
        err.message ||
        "Something went wrong while processing your booking. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError("");
    setFormStep(1);
    const defaultCity =
      concertData?.details?.schedule?.defaultCityId ||
      concertData?.details?.schedule?.cities?.[0]?.id ||
      "hyd";
    setFormData({
      name: "",
      email: "",
      contact: "",
      countryCode: "+91",
      phoneNumber: "",
      cityId: defaultCity,
      agreeUpdates: true,
      requiredLogin: false
    });
    setTicketQuantities({});
    setAgreeTerms(false);
  };

  return (
    <section id="concert" className={Style.concertSection}>
      <div className={Style.bgGlowTop}></div>
      <div className={Style.bgGlowBottom}></div>

      <div className={Style.container}>
        {/* Top Header */}
        <div className={Style.header}>
          <div className={Style.presenterTag}>
            <Sparkles size={13} className={Style.sparkleIcon} />
            <span>{presentsTagText}</span>
          </div>
          <h2 className={Style.mainHeading}>
            {mainTitle} — <span className={Style.artistSub}>{artistName.toUpperCase()}</span>
          </h2>
          <p className={Style.tagline}>{subtitle}</p>
        </div>

        {/* Main Content: Left Visuals & Right Registration Form */}
        <div className={Style.contentGrid}>
          {/* Left Visual Column */}
          <div className={Style.visualColumn}>
            <div className={Style.posterCard}>
              <div className={Style.posterImageWrapper}>
                <div
                  className={Style.posterBgBlur}
                  style={{ backgroundImage: `url(${posterImg})` }}
                />
                <img
                  src={posterImg}
                  alt={`${mainTitle} Live in Concert Poster`}
                  className={Style.posterImage}
                />
                {/* <div className={Style.posterOverlay}>
                  <div className={Style.earlyBirdBadge}>
                    <Ticket size={15} />
                    <span>Early Bird Passes Available</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className={Style.formColumn}>
            <div className={Style.formCard}>
              {!submitted ? (
                <>
                  {formStep === 1 ? (
                    <form onSubmit={handleNextStep} className={Style.form}>
                      <div className={Style.formHeader}>
                        <span className={Style.formTag}>Step 1 of 3</span>
                        <h3 className={Style.formTitle}>{formTitle}</h3>
                        <p className={Style.formSubtitle}>
                          Enter your contact details and choose your concert city to view available ticket tiers.
                        </p>
                      </div>

                      {error && <div className={Style.errorAlert}>{error}</div>}

                      <div className={Style.formGroup}>
                        <label className={Style.label}>
                          Full Name <span className={Style.star}>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={Style.input}
                          required
                        />
                      </div>

                      <div className={Style.formGroup}>
                        <label className={Style.label}>
                          Email Address <span className={Style.star}>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={Style.input}
                          required
                        />
                      </div>

                      <div className={Style.formGroup}>
                        <div className={Style.labelRow}>
                          <label className={Style.label}>
                            Phone Number <span className={Style.star}>*</span>
                          </label>
                          {isVerified && (
                            <span className={Style.verifiedBadge}>
                              <CheckCircle size={13} /> Phone number already verified
                            </span>
                          )}
                        </div>
                        <div className={Style.phoneRow}>
                          <div className={`${Style.phoneInputWrapper} ${Style.phoneInputFlex}`}>
                            <PhoneInput
                              country={"in"}
                              value={formData.contact}
                              onChange={handlePhoneChange}
                              inputClass={Style.phoneInput}
                              buttonClass={Style.phoneButton}
                              dropdownClass={Style.phoneDropdown}
                              placeholder="Phone number"
                              enableSearch={true}
                              countryCodeEditable={false}
                            />
                          </div>
                          {!isVerified && (
                            <div className={Style.btnTooltipWrapper}>
                              <button
                                type="button"
                                className={Style.sendOtpBtn}
                                onClick={handleSendOtp}
                                disabled={sendingOtp || (otpTimer > 0 && otpSent)}
                              >
                                {sendingOtp ? (
                                  "Sending..."
                                ) : otpSent ? (
                                  otpTimer > 0 ? `Resend (${otpTimer}s)` : "Resend OTP"
                                ) : (
                                  "Verify"
                                )}
                              </button>
                              <span className={Style.tooltipBox}>
                                Please verify your phone number
                              </span>
                            </div>
                          )}
                        </div>

                        {otpMessage && <div className={Style.otpSuccessAlert}>{otpMessage}</div>}
                        {otpError && <div className={Style.otpErrorAlert}>{otpError}</div>}

                        {otpSent && !isVerified && (
                          <div className={Style.otpBox}>
                            <div className={Style.otpBoxHeader}>
                              <span>Enter 6-digit OTP sent to {formData.countryCode} {formData.phoneNumber}</span>
                            </div>
                            <div className={Style.otpInputGroup}>
                              <input
                                type="text"
                                maxLength="6"
                                placeholder="000000"
                                value={otp}
                                onChange={(e) => {
                                  setOtp(e.target.value.replace(/\D/g, ""));
                                  setOtpError("");
                                }}
                                className={Style.otpInput}
                              />
                              <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={verifyingOtp || otp.length !== 6}
                                className={Style.verifyBtn}
                              >
                                {verifyingOtp ? "Verifying..." : "Verify"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={Style.formGroup}>
                        <label className={Style.label}>
                          Choose Preferred City / Venue <span className={Style.star}>*</span>
                        </label>
                        <div className={Style.venueSelectGrid}>
                          {cities.map((v) => {
                            const isSelected = formData.cityId === v.id;
                            return (
                              <div
                                key={v.id}
                                className={`${Style.venueOption} ${isSelected ? Style.venueOptionSelected : ""
                                  }`}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    cityId: v.id
                                  }))
                                }
                              >
                                <div className={Style.optionHeader}>
                                  <span className={Style.optionCity}>
                                    {v.city}
                                  </span>
                                  <div
                                    className={`${Style.radioCheck} ${isSelected ? Style.radioCheckActive : ""
                                      }`}
                                  >
                                    {isSelected && <span className={Style.radioDot} />}
                                  </div>
                                </div>
                                <div className={Style.optionDate}>
                                  {v.display?.dateLabel || `${v.display?.day} ${v.display?.month}`}
                                </div>
                                <div className={Style.optionPlace}>{v.venueAddress || v.venue}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <button type="submit" className={Style.submitButton}>
                        <div className={Style.buttonContent}>
                          <span>Continue to Tickets</span>
                          <ChevronRight size={18} />
                        </div>
                      </button>
                    </form>
                  ) : formStep === 2 ? (
                    <form onSubmit={handleStep2Next} className={Style.form}>
                      <div className={Style.formHeader}>
                        <div className={Style.stepHeaderRow}>
                          <span className={Style.formTag}>Step 2 of 3</span>
                          <button
                            type="button"
                            className={Style.backButton}
                            onClick={() => {
                              setError("");
                              setFormStep(1);
                            }}
                          >
                            <ArrowLeft size={14} />
                            <span>Back</span>
                          </button>
                        </div>
                        <h3 className={Style.formTitle}>Select Tickets & Quantities</h3>
                        <p className={Style.formSubtitle}>
                          Choose your ticket tiers and quantities for <strong>{selectedVenue?.city}</strong>.
                        </p>
                      </div>

                      {error && <div className={Style.errorAlert}>{error}</div>}

                      {/* User Info Summary Card */}
                      <div className={Style.userInfoBar}>
                        <div className={Style.userInfoLeft}>
                          <span className={Style.userName}>{formData.name}</span>
                          <span className={Style.userDetails}>
                            {formData.email} • {selectedVenue?.city}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={Style.editStepBtn}
                          onClick={() => {
                            setError("");
                            setFormStep(1);
                          }}
                        >
                          Edit Info
                        </button>
                      </div>

                      {/* Select Ticket Tiers & Quantities (Compact Row Matrix) */}
                      {selectedVenue?.ticketTypes && selectedVenue.ticketTypes.length > 0 && (
                        <div className={Style.formGroup}>
                          <div className={Style.ticketRowGrid}>
                            {selectedVenue.ticketTypes.map((tier) => {
                              const qty = ticketQuantities[tier.id] || 0;
                              const isSelected = qty > 0;
                              return (
                                <div
                                  key={tier.id}
                                  className={`${Style.ticketRowOption} ${isSelected ? Style.ticketRowOptionSelected : ""
                                    }`}
                                >
                                  <div className={Style.ticketRowInfo}>
                                    <div className={Style.ticketRowTitleLine}>
                                      <span className={Style.ticketRowTitle}>{tier.label}</span>
                                      {tier.badge && (
                                        <span className={Style.ticketRowBadge}>{tier.badge}</span>
                                      )}
                                    </div>
                                    {tier.description && (
                                      <span className={Style.ticketRowSubtext}>{tier.description}</span>
                                    )}
                                  </div>

                                  <div className={Style.ticketRowRight}>
                                    <div className={Style.ticketRowPriceWrapper}>
                                      <span className={Style.ticketRowPrice}>
                                        ₹{Number(tier.price || 0).toLocaleString("en-IN")}
                                      </span>
                                      {tier.compareAtPrice && Number(tier.compareAtPrice) > Number(tier.price) && (
                                        <span className={Style.ticketRowComparePrice}>
                                          ₹{Number(tier.compareAtPrice).toLocaleString("en-IN")}
                                        </span>
                                      )}
                                    </div>
                                    <div className={Style.tierCounterContainer}>
                                      <button
                                        type="button"
                                        className={Style.tierCounterBtn}
                                        onClick={() => handleQuantityChange(tier.id, -1)}
                                        disabled={qty <= 0}
                                        aria-label={`Decrease ${tier.label} tickets`}
                                      >
                                        −
                                      </button>
                                      <span className={Style.tierQtyValue}>{qty}</span>
                                      <button
                                        type="button"
                                        className={Style.tierCounterBtn}
                                        onClick={() => handleQuantityChange(tier.id, 1)}
                                        disabled={qty >= maxTickets}
                                        aria-label={`Increase ${tier.label} tickets`}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Order Total Summary */}
                      {totalTickets > 0 && (
                        <div className={Style.orderSummaryBox}>
                          <span>
                            Total Selection: <strong>{totalTickets} {totalTickets === 1 ? "Pass" : "Passes"}</strong>
                          </span>
                          <span className={Style.summaryAmount}>
                            ₹{totalAmount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}

                      <div className={Style.checkboxWrapper}>
                        <label className={Style.checkboxLabel}>
                          <input
                            type="checkbox"
                            name="agreeUpdates"
                            checked={formData.agreeUpdates}
                            onChange={handleChange}
                            className={Style.checkbox}
                            required
                          />
                          <span>
                            I agree to receive concert updates, early bird ticket alerts, and event notifications. <span className={Style.star}>*</span>
                          </span>
                        </label>
                      </div>

                      <button type="submit" className={Style.submitButton}>
                        <div className={Style.buttonContent}>
                          <Ticket size={18} />
                          <span>Review Booking</span>
                          <ChevronRight size={18} />
                        </div>
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit} className={Style.form}>
                      <div className={Style.formHeader}>
                        <div className={Style.stepHeaderRow}>
                          <span className={Style.formTag}>Step 3 of 3</span>
                          <button
                            type="button"
                            className={Style.backButton}
                            onClick={() => {
                              setError("");
                              setFormStep(2);
                            }}
                          >
                            <ArrowLeft size={14} />
                            <span>Back</span>
                          </button>
                        </div>
                        <h3 className={Style.formTitle}>Review Booking</h3>
                      </div>

                      {error && <div className={Style.errorAlert}>{error}</div>}

                      {/* Seats held countdown timer bar */}
                      <div className={Style.timerBanner}>
                        <Clock size={16} />
                        <span>
                          Seats held for <strong>{formatTime(timeLeft)}</strong>
                        </span>
                      </div>

                      {/* Event & Selected Tickets Card */}
                      <div className={Style.reviewCard}>
                        <div className={Style.reviewVenueHeader}>
                          {/* {selectedVenue?.city},  */}
                          {selectedVenue?.venue || selectedVenue?.city}
                        </div>
                        <div className={Style.reviewVenueSub}>
                          {selectedVenue?.display?.dateLabel || `${selectedVenue?.display?.day} ${selectedVenue?.display?.month}`} • {selectedVenue?.city}
                        </div>
                        <div className={Style.reviewDivider} />
                        {(selectedVenue?.ticketTypes || [])
                          .filter((tier) => (ticketQuantities[tier.id] || 0) > 0)
                          .map((tier) => {
                            const qty = ticketQuantities[tier.id];
                            return (
                              <div key={tier.id} className={Style.reviewItemRow}>
                                <span>
                                  {tier.label} × {qty}
                                </span>
                                <span>₹{(tier.price * qty).toLocaleString("en-IN")}</span>
                              </div>
                            );
                          })}
                      </div>

                      {/* Payment Summary Card */}
                      <div className={Style.reviewCard}>
                        <div className={Style.reviewPriceRow}>
                          <span>Subtotal</span>
                          <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                        </div>

                        {/* <div className={Style.reviewWalletRow}>
                          <label className={Style.walletCheckboxLabel}>
                            <input
                              type="checkbox"
                              checked={useWallet}
                              onChange={(e) => setUseWallet(e.target.checked)}
                              className={Style.checkbox}
                            />
                            <div className={Style.walletLabelText}>
                              <Wallet size={15} />
                              <span>Pay using Fracspace wallet</span>
                            </div>
                          </label>
                          {useWallet && (
                            <span className={Style.walletDiscountText}>
                              - ₹{walletDeduction.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div> */}

                        <div className={Style.reviewDivider} />

                        <div className={Style.reviewTotalRow}>
                          <span>To Pay</span>
                          <span>₹{finalToPay.toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      {/* Mandatory Terms & Conditions Checkbox */}
                      <div className={Style.termsCheckboxWrapper}>
                        <label className={Style.termsCheckboxLabel}>
                          <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => {
                              setAgreeTerms(e.target.checked);
                              setError("");
                            }}
                            className={Style.checkbox}
                            required
                          />
                          <span>
                            I agree to the{" "}
                            <a
                              href="#terms"
                              className={Style.termsLink}
                              onClick={(e) => {
                                e.preventDefault();
                                setShowTermsModal(true);
                              }}
                            >
                              Terms and Conditions
                            </a>{" "}
                            <span className={Style.star}>*</span>
                          </span>
                        </label>
                      </div>

                      {/* Submit to PayU Payment Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className={Style.submitButton}
                      >
                        {loading ? (
                          <div className={Style.loadingState}>
                            <span className={Style.spinner}></span>
                            <span>Redirecting to PayU Payment...</span>
                          </div>
                        ) : (
                          <div className={Style.buttonContent}>
                            {useWallet && finalToPay === 0 ? (
                              <>
                                <Wallet size={18} />
                                <span>Confirm with wallet</span>
                              </>
                            ) : (
                              <>
                                <Music size={18} />
                                <span>Proceed to Payment</span>
                                <ChevronRight size={18} />
                              </>
                            )}
                          </div>
                        )}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div className={Style.successState}>
                  <div className={Style.successCheckWrapper}>
                    <CheckCircle size={58} className={Style.successCheck} />
                  </div>
                  <h3 className={Style.successHeading}>
                    {interestFormConfig?.successSheet?.title || "You're on the Guest List!"}
                  </h3>
                  <p className={Style.successMessage}>
                    Thank you, <strong>{formData.name}</strong>! Your interest
                    for <strong>{selectedVenue?.city || "your city"} ({totalTickets} {totalTickets === 1 ? "pass" : "passes"})</strong> has been successfully registered.
                  </p>
                  {interestFormConfig?.successSheet?.message && (
                    <p className={Style.formSubtitle} style={{ marginTop: "10px" }}>
                      {interestFormConfig.successSheet.message}
                    </p>
                  )}

                  <button
                    onClick={handleReset}
                    className={Style.registerAnotherBtn}
                  >
                    Register Another Person
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className={Style.modalOverlay} onClick={() => setShowTermsModal(false)}>
          <div className={Style.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={Style.modalHeader}>
              <h4 className={Style.modalTitle}>T&C and Cancellation</h4>
              <button
                type="button"
                className={Style.modalCloseBtn}
                onClick={() => setShowTermsModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className={Style.modalBody}>
              {/* Cancellation & Refund Policy */}
              <div className={Style.tcSectionCard}>
                <h5 className={Style.tcSectionHeading}>Cancellation & Refund Policy</h5>
                <p className={Style.tcSectionSubtext}>
                  You may cancel your concert booking after purchase, subject to the cancellation charges below.
                </p>

                <div className={Style.policyGroup}>
                  <div className={Style.policyHeader}>
                    <span className={Style.dotGreen}></span>
                    <span className={Style.policyRuleTitle}>Cancel 5 or more days before the concert</span>
                  </div>
                  <div className={Style.policyFeeBadge}>10% cancellation fee</div>
                  <p className={Style.policyDetail}>
                    You will receive a refund of 90% of the eligible booking amount, after applicable charges/fees, if any.
                  </p>
                </div>

                <div className={Style.policyGroup}>
                  <div className={Style.policyHeader}>
                    <span className={Style.dotRed}></span>
                    <span className={Style.policyRuleTitle}>Cancel 4 days or less before the concert</span>
                  </div>
                  <div className={Style.policyFeeBadge}>100% cancellation fee</div>
                  <p className={Style.policyDetail}>
                    No refund will be provided for cancellations made within 4 days of the concert date.
                  </p>
                </div>
              </div>

              {/* Terms & Conditions Sections */}
              <div className={Style.termsMainBlock}>
                <h5 className={Style.tcSectionHeading}>Terms & Conditions</h5>

                <div className={Style.termSubSection}>
                  <h6>1. Booking</h6>
                  <ul>
                    <li>Each booking is subject to ticket availability and successful payment confirmation.</li>
                    <li>A booking is confirmed only after successful payment and generation of a valid Booking ID / Ticket.</li>
                    <li>Please verify the event, city, date, time, ticket category and number of tickets before completing your booking.</li>
                  </ul>
                </div>

                <div className={Style.termSubSection}>
                  <h6>2. Tickets</h6>
                  <ul>
                    <li>Each ticket is valid only for the selected event, city, date and ticket category.</li>
                    <li>Tickets are non-transferable unless transfer is specifically enabled by Fracspace.</li>
                    <li>Entry is permitted only with a valid ticket/QR code and may be subject to venue security and verification procedures.</li>
                    <li>The same QR code must not be duplicated or shared with others. Entry will be permitted only against a valid, successfully verified ticket.</li>
                  </ul>
                </div>

                <div className={Style.termSubSection}>
                  <h6>3. Event Changes</h6>
                  <ul>
                    <li>Event date, venue, timings, artist lineup or other event details may be subject to change due to circumstances beyond the organizer's control.</li>
                    <li>In case of an event cancellation or postponement, refund or ticket-transfer arrangements will be communicated to registered ticket holders separately.</li>
                    <li>Any refund arising from event cancellation or postponement will be handled according to the organizer's announced policy for that specific situation.</li>
                  </ul>
                </div>

                <div className={Style.termSubSection}>
                  <h6>4. Venue Entry</h6>
                  <ul>
                    <li>Attendees must follow the venue's security and entry requirements.</li>
                    <li>The organizer/venue reserves the right to refuse entry in accordance with applicable venue rules and security requirements.</li>
                    <li>Attendees may be required to carry a valid ID for verification.</li>
                  </ul>
                </div>

                <div className={Style.termSubSection}>
                  <h6>5. Age & Accompanying Guests</h6>
                  <ul>
                    <li>Entry requirements, including age restrictions where applicable, will be communicated on the event page.</li>
                    <li>Children/minors, if permitted, must comply with the venue's applicable entry requirements and may need to be accompanied by an adult.</li>
                  </ul>
                </div>

                <div className={Style.termSubSection}>
                  <h6>6. Prohibited Items & Conduct</h6>
                  <ul>
                    <li>Attendees must comply with venue security guidelines.</li>
                    <li>Prohibited items will not be allowed inside the venue.</li>
                    <li>The organizer/venue may take appropriate action against disruptive, unsafe or unlawful conduct.</li>
                  </ul>
                </div>

                <div className={Style.termSubSection}>
                  <h6>7. Payment</h6>
                  <ul>
                    <li>Ticket prices, applicable taxes and convenience/payment gateway charges will be displayed before the user confirms payment.</li>
                    <li>Where Fracspace Wallet is selected, the applicable wallet amount will be deducted upon confirmation of the booking.</li>
                    <li>If the available wallet balance is insufficient, the available wallet balance may be applied first and the remaining amount will be collected through the selected payment gateway.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={Style.modalFooter}>
              <button
                type="button"
                className={Style.modalAcceptBtn}
                onClick={() => {
                  setAgreeTerms(true);
                  setShowTermsModal(false);
                }}
              >
                I Agree & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
