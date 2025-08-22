"use client";
import { useEffect } from "react";

export default function Vitals() {
  useEffect(() => {
    import("web-vitals").then(({ onCLS, onLCP, onINP, onTTFB }) => {
      const send = (metric: import('web-vitals').Metric) => {
        const body = JSON.stringify({
          ...metric,
          path: location.pathname,
          ts: Date.now(),
        });
        const blob = new Blob([body], { type: "application/json" });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        navigator.sendBeacon?.("/vitals", blob) ||
          fetch("/vitals", {
            method: "POST",
            body,
            headers: { "Content-Type": "application/json" },
          });
      };
      onCLS(send);
      onLCP(send);
      onINP(send);
      onTTFB(send);
    });
  }, []);
  return null;
}
