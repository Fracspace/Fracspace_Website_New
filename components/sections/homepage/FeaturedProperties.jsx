"use client";

import React, { useEffect, useState } from "react";
import imgFallback from "../../../assets/herobg.webp";
import Image from "next/image";
import { MapPin, Flame, Ban, ChevronRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

function FeaturedProperties() {
  const router = useRouter();
  const [goaProperties, setGoaProperties] = useState([]);
  const [hyderabadProperties, setHyderabadProperties] = useState([]);
  const [keralaProperties, setKeralaProperties] = useState([]);
  const [karnatakaProperties, setKarnatakaProperties] = useState([]);
  const [varanasiProperties, setVaranasiProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tab selection state: default is "available" to show Fast Selling Properties on load
  const [selectedProperties, setSelectedProperties] = useState("available");

  const PROPERTIES_API =
    "https://apitest.fracspace.com/api/users/getPropertyDetails";

  const headers = {
    "x-api-key": "Fracspace@2024"
  };

  const getProperties = () => {
    setLoading(true);
    axios
      .get(PROPERTIES_API, { headers })
      .then((response) => {
        const properties = (response?.data?.properties || []).filter(
          (p) => p?.name?.toUpperCase() !== "LAKEVIEW BY FRACSPACE CEYLON"
        );
        setAllProperties(properties);
        
        const goa = properties
          .filter(
            (property) =>
              property?.PropertyType === "Domastic" &&
              property?.city?.toLowerCase() === "goa"
          )
          .sort((a, b) => a.num - b.num);

        const hyd = properties
          .filter(
            (property) =>
              property?.PropertyType === "Domastic" &&
              property?.city?.toLowerCase() === "hyderabad"
          )
          .sort((a, b) => a.num - b.num);

        const kerala = properties
          .filter(
            (property) =>
              property?.PropertyType === "Domastic" &&
              (property?.city?.toLowerCase() === "munnar" ||
                property?.city?.toLowerCase() === "alleppey")
          )
          .sort((a, b) => a.num - b.num);

        const karnataka = properties
          .filter((property) => {
            const city = property?.city?.toLowerCase();
            return (
              property?.PropertyType === "Domastic" &&
              (city === "kabini" || city === "manipal")
            );
          })
          .sort((a, b) => a.num - b.num);

        const varanasi = properties
          .filter(
            (property) =>
              property?.PropertyType === "Domastic" &&
              property?.city?.toLowerCase() === "varanasi"
          )
          .sort((a, b) => a.num - b.num);

        const available = properties?.filter(
          (property) =>
            property?.AvailableFractions > 0 &&
            property?.PropertyType === "Domastic"
        );

        setGoaProperties(goa);
        setHyderabadProperties(hyd);
        setKeralaProperties(kerala);
        setKarnatakaProperties(karnataka);
        setVaranasiProperties(varanasi);
        setAvailableProperties(available);
      })
      .catch((error) => {
        console.log("error is", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProperties();
  }, []);

  const getFilteredProperties = () => {
    switch (selectedProperties) {
      case "goa":
        return goaProperties;
      case "hyderabad":
        return hyderabadProperties.filter(
          (p) => p?.name !== "FRACSPACE DATES COUNTY"
        );
      case "kerala":
        return keralaProperties;
      case "karnataka":
        return karnatakaProperties;
      case "varanasi":
        return varanasiProperties;
      case "all":
        const combined = allProperties.filter(
          (property) => property?.PropertyType === "Domastic"
        );
        // Sort combined list: hot properties first
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
      case "available":
      default:
        return availableProperties;
    }
  };

  const displayList = getFilteredProperties();

  // Location configuration matching the pills design with property counts
  const totalCount = allProperties.filter((p) => p?.PropertyType === "Domastic").length;
  
  const locations = [
    { id: "all", label: "View All", count: totalCount },
    { id: "kerala", label: "Kerala", count: keralaProperties.length },
    { id: "karnataka", label: "Karnataka", count: karnatakaProperties.length },
    { id: "varanasi", label: "Varanasi", count: varanasiProperties.length },
    { id: "hyderabad", label: "Hyderabad", count: hyderabadProperties.filter((p) => p?.name !== "FRACSPACE DATES COUNTY").length },
    { id: "goa", label: "Goa", count: goaProperties.length },
  ];

  return (
    <section className="mt-16 mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-10 bg-gradient-to-b from-white to-gray-50/30 rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-gray-900">Featured Properties</h2>
          <p className="text-gray-500 font-dm mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
            Carefully selected assets with high potential for rental yield and
            long-term capital appreciation.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            onClick={() => router.push("/properties")}
            className="text-[#021265] border border-[#021265] hover:bg-[#021265] hover:text-white font-dm font-bold cursor-pointer px-6 py-3 rounded-2xl shadow-sm hover:shadow transition duration-300 flex items-center gap-1 text-sm"
          >
            <span>All Properties</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dropdown filters replacement */}
      <div className="mb-10 pb-4 border-b border-gray-100 flex justify-start">
        <select
          value={selectedProperties}
          onChange={(e) => setSelectedProperties(e?.target?.value)}
          className="text-gray-700 font-dm cursor-pointer px-5 py-3.5 border border-gray-200 rounded-2xl bg-white shadow-sm outline-none font-semibold text-sm focus:border-[#021265] focus:ring-2 focus:ring-blue-900/10 transition w-full sm:w-[280px]"
        >
          <option value="available">Fast Selling Properties ({availableProperties.length})</option>
          <option value="kerala">Kerala ({keralaProperties.length})</option>
          <option value="karnataka">Karnataka ({karnatakaProperties.length})</option>
          <option value="varanasi">Varanasi ({varanasiProperties.length})</option>
          <option value="hyderabad">Hyderabad ({hyderabadProperties.filter((p) => p?.name !== "FRACSPACE DATES COUNTY").length})</option>
          <option value="goa">Goa ({goaProperties.length})</option>
        </select>
      </div>

      {/* Cards list matching the exact premium details template of properties listing */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-dm text-gray-500 animate-pulse text-sm">Loading properties...</p>
        </div>
      ) : displayList.length === 0 ? (
        <p className="text-gray-500 font-dm py-12 text-center col-span-3">No properties available in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayList.map((property, index) => {
            // Check isHot dynamically
            const cityLower = property?.city?.toLowerCase();
            const isHot = (cityLower === "hyderabad" || cityLower === "munnar" || cityLower === "alleppey")
              ? property?.AvailableFractions !== 0
              : property?.H_property === true;

            // Location formatting helper
            let displayLocation = property?.Location || "India";
            if (
              property?.city?.toLowerCase() === "goa" &&
              property?.name === "STREAM BY INDULGE POWERED BY FRACSPACE"
            ) {
              displayLocation = "Revora, Goa";
            }

            // Title helper
            const isHilltopMunnar =
              property?.city?.toLowerCase() === "munnar" &&
              property?.name === "HILLTOP BY FRACSPACE";

            return (
              <article
                key={property?._id || index}
                onClick={() => router.push(`/eachproperty?id=${property?._id}`)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer flex flex-col h-full"
              >
                {/* Image gallery area with status overlays */}
                <div className="relative h-[240px] w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={property?.image?.Image1 || imgFallback}
                    alt={property?.name || "Property image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Status Overlay Badges */}
                  <div className="absolute left-5 top-5 z-10">
                    {isHot ? (
                      <div className="flex items-center gap-1.5 bg-amber-500 text-white text-[11px] font-bold tracking-wider uppercase px-3.5 py-2 rounded-full shadow-lg shadow-amber-500/25 animate-pulse">
                        <Flame className="w-3.5 h-3.5 fill-white text-white" />
                        <span>Fast Selling</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-md text-gray-200 text-[11px] font-bold tracking-wider uppercase px-3.5 py-2 rounded-full shadow-md">
                        <Ban className="w-3.5 h-3.5 text-gray-400" />
                        <span>Sold Out</span>
                      </div>
                    )}
                  </div>

                  {property?.Type && (
                    <div className="absolute right-5 top-5 bg-white/95 backdrop-blur-md text-[#021265] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow-sm border border-gray-100 max-w-[180px] truncate">
                      {property?.Type.split(" | ")[0] || "Asset"}
                    </div>
                  )}
                </div>

                {/* Details layout */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-gray-400 font-dm text-xs uppercase tracking-wider font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{displayLocation}</span>
                  </div>

                  <h3 className="font-jakarta text-xl font-bold text-gray-900 mt-3 group-hover:text-[#021265] transition-colors line-clamp-2 min-h-[56px] leading-snug">
                    {isHilltopMunnar ? (
                      <span className="capitalize text-lg font-bold text-gray-800">
                        hilltop munnar, munnar, kerala
                      </span>
                    ) : (
                      property?.name || "Premium Villa Stays"
                    )}
                  </h3>

                  <div className="mt-2 text-sm text-gray-500 font-dm line-clamp-1 border-b border-gray-50 pb-4 mb-5">
                    {property?.Type && property?.area
                      ? `${property?.Type} | ${property?.area}`
                      : property?.area || "Premium Stay Area"}
                  </div>

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
    </section>
  );
}

export default FeaturedProperties;
