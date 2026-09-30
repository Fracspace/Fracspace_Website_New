"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Style from "./CookieConsent.module.css";

// Helper functions to initialize cookies/scripts dynamically
export const initGTM = () => {
  if (typeof window === "undefined" || window.gtmInitialized) return;
  window.gtmInitialized = true;
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-N7T7HR3B");
};

export const initGtag = () => {
  if (typeof window === "undefined" || window.gtagInitialized) return;
  window.gtagInitialized = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=AW-17631871581";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", "AW-17631871581");
};

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
    // Check if consent has been given
    try {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        // Not decided yet, show banner
        setVisible(true);
      } else if (consent === "accept") {
        // User accepted before, enable cookies
        initGTM();
        initGtag();
        initFBPixel();
      }
    } catch (e) {
      // In case localStorage is disabled/restricted
      setVisible(true);
    }
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
    
    // Initialize scripts immediately
    initGTM();
    initGtag();
    initFBPixel();
    
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
    <div className={Style.banner}>
      <div className={Style.content}>
        <h4 className={Style.title}>
          <span>🍪</span>
          <span>We value your privacy</span>
        </h4>
        <p className={Style.description}>
          Fracspace uses cookies and similar technologies to ensure that the website functions properly, improve your browsing experience, analyze website traffic and, where applicable, support our marketing activities. Some cookies are strictly necessary for the operation of the website, while others help us understand website usage, enhance functionality and personalize content. By clicking &ldquo;Accept All Cookies&rdquo;, you consent to the use of all cookies. By clicking &ldquo;Reject Non-Essential Cookies&rdquo;, only strictly necessary cookies will be used. For more information on how we use cookies and process your Personal Data, please review our{" "}
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
          Reject Non-Essential Cookies
        </button>
        <button
          type="button"
          className={Style.acceptBtn}
          onClick={handleAcceptAll}
        >
          Accept All Cookies
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
