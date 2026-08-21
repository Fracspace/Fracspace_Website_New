// 

"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Image from "next/image";
import axios from "axios";

function ImagesCaraousal({ isOpen, onClose }) {
  const [propertyDetails, setPropertyDetails] = useState();

  const PROPERTY_API =
    "https://apitest.fracspace.com/api/users/getPropertyById/69fac3c7e47d1b2aee13f773";

  const headers = {
    "x-api-key": "Fracspace@2024"
  };

  useEffect(() => {
    axios.get(PROPERTY_API, { headers }).then(
      (response) => {
        setPropertyDetails(response?.data?.property);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-black text-white rounded-full p-2 transition cursor-pointer"
        >
          <X size={24} />
        </button>

        <Carousel
          swipeable
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus
          showIndicators
          stopOnHover
          className="w-full"
        >
          {propertyDetails?.image &&
            Object?.values(propertyDetails?.image)?.map((img, index) => (
              <div
                key={index}
                className="relative h-[80vh] w-full"
              >
                <Image
                  src={img}
                  alt={`Property Image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ImagesCaraousal;