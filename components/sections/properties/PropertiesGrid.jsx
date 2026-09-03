"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Flame, Ban, ChevronRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import imgFallback from "../../../assets/herobg.webp";

function PropertiesGrid() {
  const router = useRouter();
  
  // Tab/Location selection state (Default is All)
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [loading, setLoading] = useState(true);

  // Property list states matching the local logic of OurPortfolio.jsx
  const [goaProperties, setGoaProperties] = useState([]);
  const [hyderabadProperties, setHyderabadProperties] = useState([]);
  const [keralaProperties, setKeralaProperties] = useState([]);
  const [karnatakaProperties, setKarnatakaProperties] = useState([]);
  const [varanasiProperties, setVaranasiProperties] = useState([]);
  const [nelloreProperties, setNelloreProperties] = useState([]);

  const PROPERTIES_API =
    "https://apitest.fracspace.com/api/users/getPropertyDetails";

  const headers = {
    "x-api-key": "Fracspace@2024"
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(PROPERTIES_API, { headers })
      .then((response) => {
        const properties = (response?.data?.properties || []).filter(
          (p) => p?.name?.toUpperCase() !== "LAKEVIEW BY FRACSPACE CEYLON"
        );

        // Apply exactly the same filters and sorts as in OurPortfolio
        const goa = properties
          .filter(
            (p) =>
              p?.PropertyType !== "forKiosk" &&
              p?.city?.toLowerCase() === "goa"
          )
          .sort((a, b) => (a.num || 0) - (b.num || 0));

        const hyd = properties
          .filter((p) => p?.city?.toLowerCase() === "hyderabad")
          .sort((a, b) => (a.num || 0) - (b.num || 0));

        const kerala = properties
          .filter(
            (p) =>
              p?.PropertyType !== "forKiosk" &&
              (p?.city?.toLowerCase() === "munnar" ||
                p?.city?.toLowerCase() === "alleppey")
          )
          .sort((a, b) => (a.num || 0) - (b.num || 0));

        const karnataka = properties
          .filter((p) => {
            const city = p?.city?.toLowerCase();
            return city === "kabini" || city === "manipal";
          })
          .sort((a, b) => (a.num || 0) - (b.num || 0));

        const varanasi = properties
          .filter((p) => p?.city?.toLowerCase() === "varanasi")
          .sort((a, b) => (a.num || 0) - (b.num || 0));

        const nellore = properties
          .filter((p) => p?.city?.toLowerCase() === "nellore")
          .sort((a, b) => (a.num || 0) - (b.num || 0));

        setGoaProperties(goa);
        setHyderabadProperties(hyd);
        setKeralaProperties(kerala);
        setKarnatakaProperties(karnataka);
        setVaranasiProperties(varanasi);
        setNelloreProperties(nellore);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Get active properties list based on selected location
  const getActiveProperties = () => {
    switch (selectedLocation) {
      case "all":
        const combined = [
          ...keralaProperties,
          ...karnatakaProperties,
          ...varanasiProperties,
          ...hyderabadProperties.filter(
            (p) => p?.name !== "FRACSPACE DATES COUNTY"
          ),
          ...goaProperties
        ];
        return combined.sort((a, b) => {
          const aCity = a?.city?.toLowerCase();
          const bCity = b?.city?.toLowerCase();
          const aHot = (aCity === "hyderabad" || aCity === "munnar" || aCity === "alleppey")
            ? a?.AvailableFractions !== 0
            : a?.H_property === true;
          const bHot = (bCity === "hyderabad" || bCity === "munnar" || bCity === "alleppey")
            ? b?.AvailableFractions !== 0
            : b?.H_property === true;
          if (aHot && !bHot) return -1;
          if (!aHot && bHot) return 1;
          return 0;
        });
      case "kerala":
        return keralaProperties;
      case "karnataka":
        return karnatakaProperties;
      case "varanasi":
        return varanasiProperties;
      case "hyderabad":
        // Filter out "FRACSPACE DATES COUNTY" as in user's logic
        return hyderabadProperties.filter(
          (p) => p?.name !== "FRACSPACE DATES COUNTY"
        );
      case "goa":
        return goaProperties;
      case "nellore":
        return nelloreProperties;
      default:
        return [];
    }
  };

  const activeProperties = getActiveProperties();

  // Location Tab Configuration with display names and count indicators
  const totalCount =
    keralaProperties.length +
    karnatakaProperties.length +
    varanasiProperties.length +
    hyderabadProperties.filter((p) => p?.name !== "FRACSPACE DATES COUNTY").length +
    goaProperties.length;

  const locations = [
    { id: "all", label: "View All", count: totalCount },
    { id: "kerala", label: "Kerala", count: keralaProperties.length },
    { id: "karnataka", label: "Karnataka", count: karnatakaProperties.length },
    { id: "varanasi", label: "Varanasi", count: varanasiProperties.length },
    { id: "hyderabad", label: "Hyderabad", count: hyderabadProperties.filter((p) => p?.name !== "FRACSPACE DATES COUNTY").length },
    { id: "goa", label: "Goa", count: goaProperties.length },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Mobile Dropdown (shown only on mobile) */}
        <div className="block md:hidden mb-10 flex justify-center">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-gray-700 font-dm cursor-pointer px-5 py-3.5 border border-gray-200 rounded-2xl bg-white shadow-sm outline-none font-semibold text-sm focus:border-[#021265] focus:ring-2 focus:ring-blue-900/10 transition w-full max-w-[280px]"
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.label} ({loc.count})
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Location Filter Tabs (hidden on mobile, visible on desktop) */}
        <div className="hidden md:flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {locations.map((loc) => {
            const isActive = selectedLocation === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`relative px-6 py-3.5 rounded-2xl font-dm text-sm font-semibold transition-all duration-350 cursor-pointer flex items-center gap-2.5 shadow-sm border ${
                  isActive
                    ? "bg-[#021265] text-white border-[#021265] shadow-lg shadow-blue-900/10 scale-[1.03]"
                    : "bg-white text-gray-600 border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <MapPin className={`w-4 h-4 ${isActive ? "text-blue-300" : "text-gray-400"}`} />
                <span>{loc.label}</span>
                {loc.count > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {loc.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Properties Listing Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-dm text-gray-500 animate-pulse">Loading amazing properties...</p>
          </div>
        ) : activeProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <Ban className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-jakarta text-lg font-bold text-gray-800">No Properties Found</h3>
            <p className="text-gray-500 font-dm mt-1 px-6">
              There are currently no listed properties under {locations.find(l => l.id === selectedLocation)?.label} destination.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {activeProperties.map((property, index) => {
              // Badge logic helper matching OurPortfolio rules
              const cityLower = property?.city?.toLowerCase();
              const isHot = (cityLower === "hyderabad" || cityLower === "munnar" || cityLower === "alleppey")
                ? property?.AvailableFractions !== 0
                : property?.H_property === true;

              // Location formatting helper
              let displayLocation = property?.Location || "India";
              if (
                selectedLocation === "goa" &&
                property?.name === "STREAM BY INDULGE POWERED BY FRACSPACE"
              ) {
                displayLocation = "Revora, Goa";
              }

              // Name formatting helper
              const isHilltopMunnar =
                selectedLocation === "kerala" &&
                property?.name === "HILLTOP BY FRACSPACE";

              return (
                <article
                  key={property?._id || index}
                  onClick={() => router.push(`/eachproperty?id=${property?._id}`)}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer flex flex-col h-full"
                >
                  {/* Property Image & Status Badges */}
                  <div className="relative h-[250px] w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={property?.image?.Image1 || imgFallback}
                      alt={property?.name || "Property Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={index < 3}
                      className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    
                    {/* Dark gradient overlay on bottom of image for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute left-5 top-5 z-10">
                      {isHot ? (
                        <div className="flex items-center gap-1.5 bg-amber-500 text-white text-[11px] font-bold tracking-wider uppercase px-3.5 py-2 rounded-full shadow-lg shadow-amber-500/25 animate-pulse">
                          <Flame className="w-3.5 h-3.5" />
                          <span>Fast Selling</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-md text-gray-200 text-[11px] font-bold tracking-wider uppercase px-3.5 py-2 rounded-full shadow-md">
                          <Ban className="w-3.5 h-3.5" />
                          <span>Sold Out</span>
                        </div>
                      )}
                    </div>

                    {/* Property category badge if available */}
                    {property?.Type && (
                      <div className="absolute right-5 top-5 bg-white/95 backdrop-blur-md text-[#021265] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow-sm border border-gray-100">
                        {property?.Type.split(" | ")[0] || "Asset"}
                      </div>
                    )}
                  </div>

                  {/* Property Info Details */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Location Pin */}
                    <div className="flex items-center gap-1.5 text-gray-400 font-dm text-xs uppercase tracking-wider font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">{displayLocation}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-jakarta text-xl font-bold text-gray-900 mt-3 group-hover:text-[#021265] transition-colors line-clamp-2 min-h-[56px] leading-snug">
                      {isHilltopMunnar ? (
                        <span className="capitalize text-lg font-bold text-gray-800">
                          hilltop munnar, munnar, kerala
                        </span>
                      ) : (
                        property?.name || "Premium Villa Stays"
                      )}
                    </h3>

                    {/* Area & Details specifications */}
                    <div className="mt-2 text-sm text-gray-500 font-dm line-clamp-1 border-b border-gray-50 pb-4 mb-5">
                      {property?.Type && property?.area
                        ? `${property?.Type} | ${property?.area}`
                        : property?.area || "Premium Stay Area"}
                    </div>

                    {/* Price and Action Button */}
                    <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100/60">
                      <div>
                        <p className="font-dm text-[10px] text-gray-400 uppercase tracking-widest font-bold">Frac Price</p>
                        <p className="font-jakarta text-xl font-extrabold text-[#021265] mt-1 tracking-tight">
                          ₹ {property?.FC_Price || "Negotiable"}
                        </p>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/eachproperty?id=${property?._id}`);
                        }}
                        className="cursor-pointer font-dm text-xs text-white font-bold rounded-2xl px-5 py-3.5 bg-[#021265] hover:bg-blue-900 transition-all duration-300 shadow-md shadow-blue-900/10 flex items-center gap-1 group/btn"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default PropertiesGrid;
