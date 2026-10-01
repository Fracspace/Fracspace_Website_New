"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Style from "./CookieConsent.module.css";

// Helper function for Facebook Pixel
export const initFBPixel = () => {
  if (typeof window === "undefined" || window.fbInitialized) return;
  window.fbInitialized = true;
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  window.fbq("init", "1657371702315992");
  window.fbq("track", "PageView");
};

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer = null;
    try {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        // Defer appearance slightly after initial paint to prevent mobile LCP occlusion
        timer = setTimeout(() => {
          setVisible(true);
        }, 1000);
      } else if (consent === "accept") {
        initFBPixel();
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({ event: "cookie_consent_accepted" });
        }
      }
    } catch (e) {
      timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Listen for custom event to show banner again (e.g. from footer)
    const handleShow = () => {
      setVisible(true);
    };
    window.addEventListener("show-cookie-banner", handleShow);
    return () => {
      window.removeEventListener("show-cookie-banner", handleShow);
    };
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("cookieConsent", "accept");
    } catch (e) {}
    
    // Dispatch event so other components can update
    window.dispatchEvent(new Event("cookie-consent-change"));
    
    // Initialize tracking
    initFBPixel();
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "cookie_consent_accepted" });
    }
    
    setVisible(false);
  };

  const handleRejectAll = () => {
    try {
      localStorage.setItem("cookieConsent", "reject");
    } catch (e) {}
    
    // Dispatch event so other components can update
    window.dispatchEvent(new Event("cookie-consent-change"));
    
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside aria-label="Cookie consent banner" className={Style.banner}>
      <div className={Style.content}>
        <h4 className={Style.title}>
          <span aria-hidden="true">🍪</span>
          <span>We value your privacy</span>
        </h4>
        <p className={Style.description}>
          Fracspace uses cookies to optimize your browsing experience, analyze traffic and assist marketing efforts. By clicking &ldquo;Accept All Cookies&rdquo;, you consent to the storage of cookies on your device. Review our{" "}
          <Link href="/privacypolicy" className={Style.link}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className={Style.buttons}>
        <button
          type="button"
          className={Style.rejectBtn}
          onClick={handleRejectAll}
        >
          Reject Non-Essential
        </button>
        <button
          type="button"
          className={Style.acceptBtn}
          onClick={handleAcceptAll}
        >
          Accept All Cookies
        </button>
      </div>
    </aside>
  );
}

export default CookieConsent;
