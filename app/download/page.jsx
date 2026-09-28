"use client";

import { useEffect } from "react";

export default function DownloadPage() {
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;

        if (/iPad|iPhone|iPod/.test(userAgent)) {
            window.location.href =
                "https://apps.apple.com/in/app/fracspace/id6498551006";
        } else if (/android/i.test(userAgent)) {
            window.location.href =
                "https://play.google.com/store/apps/details?id=com.fracspace";
        }
    }, []);

    return (
        <main>
            <h1>Download Fracspace</h1>
            <p>Redirecting you to the appropriate app store...</p>

            <div>
                <a href="https://apps.apple.com/in/app/fracspace/id6498551006">
                    Download on the App Store
                </a>

                <br />

                <a href="https://play.google.com/store/apps/details?id=com.fracspace">
                    Get it on Google Play
                </a>
            </div>
        </main>
    );
}