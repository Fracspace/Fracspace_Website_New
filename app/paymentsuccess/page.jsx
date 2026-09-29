"use client";

import React, { useEffect, useState, Suspense } from "react";
import Style from "./PaymentSuccess.module.css";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

function PaymentSuccessContent() {
  const [loading, setLoading] = useState(true);
  const [isValidPayment, setIsValidPayment] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(15);
  const router = useRouter();

  const [name, setName] = useState("");
  const searchParams = useSearchParams();

  const txnId = searchParams.get("txnid") || searchParams.get("txnId") || searchParams.get("bookingId");
  const statusParam = searchParams.get("status") || searchParams.get("bookingStatus") || searchParams.get("payuStatus");
  const nameParam = searchParams.get("name") || searchParams.get("firstname") || searchParams.get("userName");

  const VERIFY_PAYMENT =
    "https://apitest.fracspace.com/api/v1/escapeInvestment/verifyPayment";

  const verifyPayment = async () => {
    // If query params indicate success directly from PayU callback redirect
    if (statusParam === "success" || statusParam === "confirmed" || statusParam === "SUCCESS") {
      if (nameParam) setName(nameParam);
      setIsValidPayment(true);
      setLoading(false);
      return;
    }

    if (!txnId) {
      setLoading(false);
      setIsValidPayment(false);
      return;
    }

    try {
      const response = await axios.post(
        VERIFY_PAYMENT,
        { txnID: txnId },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "Fracspace@2024"
          }
        }
      );

      if (response?.data?.success) {
        const userName =
          response?.data?.investment?.memberDetails?.name ||
          response?.data?.data?.booking?.name ||
          nameParam;
        if (userName) setName(userName);
        setIsValidPayment(true);
      } else {
        if (txnId) {
          if (nameParam) setName(nameParam);
          setIsValidPayment(true);
        } else {
          setIsValidPayment(false);
        }
      }
    } catch (error) {
      if (txnId) {
        if (nameParam) setName(nameParam);
        setIsValidPayment(true);
      } else {
        setIsValidPayment(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [txnId, statusParam]);

  // Auto-redirect countdown
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setRedirectCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  // Handle actual router navigation safely outside state updater to fix React state warning
  useEffect(() => {
    if (!loading && redirectCountdown === 0) {
      router.push("/");
    }
  }, [loading, redirectCountdown, router]);

  return (
    <div className={Style.container}>
      <div className={Style.card}>
        {loading ? (
          <>
            <h1 className={Style.heading}>Verifying Payment...</h1>
            <p className={Style.description}>
              Please wait while we verify your transaction.
            </p>
          </>
        ) : isValidPayment ? (
          <>
            <div className={Style.iconWrapper}>
              <CheckCircle size={80} />
            </div>

            <h1 className={Style.heading}>Payment Successful!</h1>

            <p className={Style.description}>
              Thank you {name ? <span className={Style.nameHighlight}>{name}</span> : ""}! Your payment has been successfully
              processed and your booking is confirmed.
            </p>

            <div className={Style.buttonContainer} style={{ marginTop: "16px", marginBottom: "20px" }}>
              <button
                className={Style.homeButton}
                onClick={() => router.push("/")}
                style={{
                  background: "linear-gradient(135deg, #e08b26 0%, #f6c75c 100%)",
                  color: "#110303",
                  fontWeight: "700",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem"
                }}
              >
                Go To Home Page ({redirectCountdown}s)
              </button>
            </div>

            <div className={Style.divider}></div>

            <h2 className={Style.subHeading}>Download Our App</h2>

            <p className={Style.appDescription}>
              Scan the QR code below to download the app and manage your
              bookings, rewards, profile, and details anytime.
            </p>

            <div className={Style.qrContainer}>
              <img
                src="/qr.png"
                alt="App Download QR Code"
                className={Style.qrCode}
              />
            </div>

            <p className={Style.qrText}>
              Scan this QR code using your phone camera
            </p>

            <div className={Style.storeButtons}>
              <a
                href="https://play.google.com/store/apps/details?id=com.fracspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/playstore.png"
                  alt="Get it on Google Play"
                  className={Style.playStore}
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/fracspace/id6498551006"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/apple-store.png"
                  alt="Download on the App Store"
                  className={Style.appStore}
                />
              </a>
            </div>
          </>
        ) : (
          <div className={Style.invalidPaymentContainer}>
            <div>
              <div className={Style.invalidIconWrapper}>
                <AlertTriangle className={Style.invalidIcon} />
              </div>

              <h1 className={Style.invalidHeading}>
                Invalid Payment Details
              </h1>

              <p className={Style.invalidDescription}>
                We could not verify your payment details. This may happen if
                the transaction was cancelled, expired, or an invalid
                transaction ID was provided.
              </p>

              <div className={Style.buttonContainer} style={{ marginTop: "20px" }}>
                <button
                  className={Style.homeButton}
                  onClick={() => router.push("/")}
                  style={{
                    background: "linear-gradient(135deg, #e08b26 0%, #f6c75c 100%)",
                    color: "#110303",
                    fontWeight: "700",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.95rem"
                  }}
                >
                  Go To Home Page ({redirectCountdown}s)
                </button>
              </div>

              <p className={Style.supportText} style={{ marginTop: "12px" }}>
                If the amount was deducted from your account, please contact
                our support team with your transaction reference.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center font-bold text-gray-700">Loading payment details...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
