"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.protocol === "https:" || window.location.hostname === "localhost") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Service worker registration ignored if unavailable
      });
    }
  }, []);

  return null;
}
