"use client";

import React, { useEffect, useState, Suspense } from "react";
import Style from "./PaymentFailure.module.css";
import { XCircle, AlertTriangle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function PaymentFailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txnId = searchParams.get("txnid");

  const [loading, setLoading] = useState(true);
  const [isValidTransaction, setIsValidTransaction] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(15);

  const VERIFY_PAYMENT =
    "https://apitest.fracspace.com/api/v1/escapeInvestment/verifyPayment";

  const verifyPayment = async () => {
    if (!txnId) {
      setLoading(false);
      setIsValidTransaction(false);
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
        setIsValidTransaction(true);
      } else {
        setIsValidTransaction(false);
      }
    } catch (error) {
      setIsValidTransaction(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [txnId]);

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
        ) : !isValidTransaction ? (
          <>
            <div className={Style.iconWrapper}>
              <AlertTriangle size={80} />
            </div>

            <h1 className={Style.heading}>Invalid Payment Details</h1>

            <p className={Style.description}>
              We could not find any payment associated with the provided
              transaction ID.
            </p>

            <div className={Style.buttonContainer}>
              <button
                className={Style.homeButton}
                onClick={() => router.push("/")}
              >
                Go To Home
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={Style.iconWrapper}>
              <XCircle size={80} />
            </div>

            <h1 className={Style.heading}>Payment Failed</h1>

            <p className={Style.description}>
              Unfortunately, your payment could not be completed. This may
              have occurred due to network issues, payment interruption, bank
              decline, insufficient balance, or an unexpected technical issue.
            </p>

            <div className={Style.reasonBox}>
              <h3>What can you do?</h3>

              <ul>
                <li>Verify your payment details.</li>

                <li>Ensure sufficient account balance.</li>

                <li>Check your internet connection.</li>

                <li>Try a different payment method if available.</li>

                <li>Retry the payment after a few minutes.</li>
              </ul>
            </div>

            <div className={Style.buttonContainer}>
              <button
                className={Style.retryButton}
                onClick={() => router.back()}
              >
                Retry Payment
              </button>

              <button
                className={Style.homeButton}
                onClick={() => router.push("/")}
              >
                Go To Home ({redirectCountdown}s)
              </button>
            </div>

            <p className={Style.supportText}>
              If the amount was debited but your payment still shows as
              failed, please contact our support team with your transaction
              reference number.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentFailure() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center font-bold text-gray-700">Loading transaction details...</div>}>
      <PaymentFailureContent />
    </Suspense>
  );
}
