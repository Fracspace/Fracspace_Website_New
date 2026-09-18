"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * AnimatedCounter component for smooth, high-performance number count-up animations.
 * Supports single numbers (e.g. 200+) and ranges (e.g. 8–12%).
 */
export default function AnimatedCounter({
  target,
  range,
  prefix = "",
  suffix = "",
  separator = "–",
  duration = 1800,
  delay = 0,
  className = ""
}) {
  const [displayValue, setDisplayValue] = useState(() => {
    if (range && Array.isArray(range)) {
      return `${prefix}0${separator}0${suffix}`;
    }
    return `${prefix}0${suffix}`;
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Intersection observer to trigger animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime = null;
    let animationFrameId = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const startTimeout = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = easeOutCubic(progress);

        if (range && Array.isArray(range) && range.length === 2) {
          const [startVal, endVal] = range;
          const currentStart = Math.round(startVal * easedProgress);
          const currentEnd = Math.round(endVal * easedProgress);
          setDisplayValue(`${prefix}${currentStart}${separator}${currentEnd}${suffix}`);
        } else if (typeof target === "number") {
          const currentVal = Math.round(target * easedProgress);
          setDisplayValue(`${prefix}${currentVal}${suffix}`);
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          // Ensure exact final value at completion
          if (range && Array.isArray(range) && range.length === 2) {
            setDisplayValue(`${prefix}${range[0]}${separator}${range[1]}${suffix}`);
          } else if (typeof target === "number") {
            setDisplayValue(`${prefix}${target}${suffix}`);
          }
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasAnimated, target, range, prefix, suffix, separator, duration, delay]);

  return (
    <span ref={elementRef} className={`inline-block tabular-nums transition-all ${className}`}>
      {displayValue}
    </span>
  );
}
