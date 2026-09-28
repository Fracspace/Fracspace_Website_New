"use client";

import React, { useEffect, useRef } from "react";
import { ShieldCheck, X, Loader2, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

export default function OtpModal({
  isOpen,
  onClose,
  phoneNumber,
  otp,
  setOtp,
  onVerify,
  loading = false,
  error = "",
  onResend,
  resendLoading = false,
  resendSuccess = "",
  timer = 0
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && otp && otp.length === 6 && !loading) {
      e.preventDefault();
      onVerify();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 bg-[#EEF4FF] rounded-2xl flex items-center justify-center text-[#0B2452] shadow-inner">
            <ShieldCheck size={32} className="text-[#16418C]" />
          </div>
          <div>
            <h3 className="font-jakarta text-xl sm:text-2xl font-bold text-[#14203A]">
              Verify Mobile Number
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B8A] mt-1.5 leading-relaxed">
              We&apos;ve sent a 6-digit verification code to
              <br />
              <span className="font-semibold text-[#14203A] tracking-wide">{phoneNumber}</span>
            </p>
          </div>
        </div>

        {/* OTP Input Form */}
        <div className="space-y-4">
          <div>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              onKeyDown={handleKeyDown}
              placeholder="••••••"
              className="w-full bg-[#F7F9FC] focus:bg-white border-2 border-[#DDE4EF] focus:border-[#0B2452] rounded-2xl px-4 py-3.5 text-2xl tracking-[0.45em] text-center font-bold text-[#14203A] outline-none transition placeholder:tracking-[0.3em] placeholder:text-gray-300"
            />
            <p className="text-[11px] text-gray-400 mt-1.5">Enter 6-digit OTP</p>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-100 py-2.5 px-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {resendSuccess && !error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 py-2.5 px-3 rounded-xl">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{resendSuccess}</span>
            </div>
          )}

          {/* Verify & Submit Button */}
          <button
            type="button"
            onClick={onVerify}
            disabled={loading || !otp || otp.length !== 6}
            className="w-full bg-[#0B2452] hover:bg-[#16418C] disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 rounded-2xl text-sm font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying & Submitting...</span>
              </>
            ) : (
              <span>Verify &amp; Submit</span>
            )}
          </button>

          {/* Resend & Change Number */}
          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-[#5C6B8A] hover:text-[#14203A] font-medium underline cursor-pointer"
            >
              Change phone number
            </button>

            <div>
              {timer > 0 ? (
                <span className="text-gray-400 font-medium">Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={onResend}
                  disabled={resendLoading}
                  className="text-[#16418C] hover:text-[#0B2452] font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {resendLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
