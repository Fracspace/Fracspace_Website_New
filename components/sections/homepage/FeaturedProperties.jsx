"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MapPin, Flame, Ban, ChevronRight } from "lucide-react";
import imgFallback from "../../../assets/herobg.webp";

function FeaturedProperties() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("available");
  const [properties, setProperties] = useState([]);
  const [goaProperties, setGoaProperties] = useState([]);
  const [hyderabadProperties, setHyderabadProperties] = useState([]);
  const [keralaProperties, setKeralaProperties] = useState([]);
  const [karnatakaProperties, setKarnatakaProperties] = useState([]);
  const [varanasiProperties, setVaranasiProperties] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackProperties = [
    {
      _id: "6699195b0fe2df0a4cf02518",
      name: "ALLEPPEY BACKWATER COTTAGES",
      Location: "ALLEPPEY, KERALA, INDIA",
      city: "alleppey",
      region: "Kerala",
      price: 1000000,
      FC_Price: "10,00,000",
      yield: "8.4%",
      Type: "4 YURT COTTAGES + 1 X 2BHK KERALA HOME",
      area: "70 Cents",
      AvailableFractions: 4,
      H_property: true,
      PropertyType: "Domastic",
      image: { Image1: imgFallback }
    },
    {
      _id: "6699195b0fe2df0a4cf02517",
      name: "Manipal River Club (MRC) By Fracspace",
      Location: "MANIPAL, UDUPI, KARNATAKA",
      city: "manipal",
      region: "Karnataka",
      price: 1500000,
      FC_Price: "15,00,000",
      yield: "9.2%",
      Type: "CLUB / RECREATIONAL ASSET",
      area: "2.88 Acre",
      AvailableFractions: 3,
      H_property: true,
      PropertyType: "Domastic",
      image: { Image1: imgFallback }
    },
    {
      _id: "6699195b0fe2df0a4cf02519",
      name: "HILLTOP BY FRACSPACE",
      Location: "MUNNAR, KERALA, INDIA",
      city: "munnar",
      region: "Kerala",
      price: 1000000,
      FC_Price: "10,00,000",
      yield: "8.8%",
      Type: "RESORT COTTAGES",
      area: "1.5 Acre",
      AvailableFractions: 2,
      H_property: true,
      PropertyType: "Domastic",
      image: { Image1: imgFallback }
    },
    {
      _id: "6699195b0fe2df0a4cf02520",
      name: "BANJARA SKYLINE SUITES",
      Location: "BANJARA HILLS, HYDERABAD",
      city: "hyderabad",
      region: "Hyderabad",
      price: 1250000,
      FC_Price: "12,50,000",
      yield: "10.1%",
      Type: "SERVICED SUITES",
      area: "1200 Sq Ft",
      AvailableFractions: 5,
      H_property: true,
      PropertyType: "Domastic",
      image: { Image1: imgFallback }
    },
    {
      _id: "6699195b0fe2df0a4cf02521",
      name: "STREAM BY INDULGE POWERED BY FRACSPACE",
      Location: "REVORA, GOA",
      city: "goa",
      region: "Goa",
      price: 1800000,
      FC_Price: "18,00,000",
      yield: "11.3%",
      Type: "4 BHK VILLA",
      area: "Private Pool",
      AvailableFractions: 3,
      H_property: true,
      PropertyType: "Domastic",
      image: { Image1: imgFallback }
    },
    {
      _id: "6699195b0fe2df0a4cf02522",
      name: "Coorg Estate Retreat",
      Location: "KABINI, KARNATAKA",
      city: "kabini",
      region: "Karnataka",
      price: 1400000,
      FC_Price: "14,00,000",
      yield: "9.6%",
      Type: "ESTATE COTTAGES",
      area: "Coffee Estate",
      AvailableFractions: 1,
      H_property: true,
      PropertyType: "Domastic",
      image: { Image1: imgFallback }
    },
    {
      _id: "6699195b0fe2df0a4cf02523",
      name: "Ghat View Residences",
      Location: "VARANASI, UTTAR PRADESH",
      city: "varanasi",
      region: "Varanasi",
      price: 950000,
      FC_Price: "9,50,000",
      yield: "9.0%",
      Type: "HERITAGE RESIDENCE",
      area: "Ganga View",
      AvailableFractions: 6,
      H_property: true,
      PropertyType: "Domastic",
      image: { Image1: imgFallback }
    }
  ];

  const PROPERTIES_API =
    "https://apitest.fracspace.com/api/users/getPropertyDetails";

  const isPropertyAvailable = (p) => {
    const cityLower = p?.city?.toLowerCase() || "";
    if (cityLower === "hyderabad" || cityLower === "munnar" || cityLower === "alleppey") {
      return p?.AvailableFractions !== 0;
    }
    return p?.H_property === true || p?.AvailableFractions > 0;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(PROPERTIES_API, { headers: { "x-api-key": "Fracspace@2024" } })
      .then((res) => {
        const raw = (res?.data?.properties || []).filter(
          (p) =>
            p?.name?.toUpperCase() !== "LAKEVIEW BY FRACSPACE CEYLON" &&
            p?.PropertyType !== "forKiosk" &&
            (p?.PropertyType === "Domastic" || p?.PropertyType?.toLowerCase() === "domestic")
        );

        if (raw.length > 0) {
          const goa = raw
            .filter((p) => p?.city?.toLowerCase() === "goa")
            .map((p) => ({ ...p, region: "Goa" }))
            .sort((a, b) => (a.num || 0) - (b.num || 0));

          const hyd = raw
            .filter(
              (p) =>
                p?.city?.toLowerCase() === "hyderabad" &&
                p?.name !== "FRACSPACE DATES COUNTY"
            )
            .map((p) => ({ ...p, region: "Hyderabad" }))
            .sort((a, b) => (a.num || 0) - (b.num || 0));

          const kerala = raw
            .filter(
              (p) =>
                p?.city?.toLowerCase() === "munnar" ||
                p?.city?.toLowerCase() === "alleppey"
            )
            .map((p) => ({ ...p, region: "Kerala" }))
            .sort((a, b) => (a.num || 0) - (b.num || 0));

          const karnataka = raw
            .filter((p) => {
              const city = p?.city?.toLowerCase() || "";
              return city === "kabini" || city === "manipal";
            })
            .map((p) => ({ ...p, region: "Karnataka" }))
            .sort((a, b) => (a.num || 0) - (b.num || 0));

          const varanasi = raw
            .filter((p) => p?.city?.toLowerCase() === "varanasi")
            .map((p) => ({ ...p, region: "Varanasi" }))
            .sort((a, b) => (a.num || 0) - (b.num || 0));

          const combined = [
            ...kerala,
            ...karnataka,
            ...varanasi,
            ...hyd,
            ...goa
          ];

          const available = combined
            .filter((p) => isPropertyAvailable(p))
            .sort((a, b) => (a.num || 0) - (b.num || 0));

          setGoaProperties(goa);
          setHyderabadProperties(hyd);
          setKeralaProperties(kerala);
          setKarnatakaProperties(karnataka);
          setVaranasiProperties(varanasi);
          setProperties(combined);
          setAvailableProperties(available.length > 0 ? available : combined);
        } else {
          setProperties(fallbackProperties);
          setAvailableProperties(fallbackProperties);
          setKeralaProperties([fallbackProperties[0], fallbackProperties[2]]);
          setKarnatakaProperties([fallbackProperties[1], fallbackProperties[5]]);
          setHyderabadProperties([fallbackProperties[3]]);
          setGoaProperties([fallbackProperties[4]]);
          setVaranasiProperties([fallbackProperties[6]]);
        }
      })
      .catch((err) => {
        console.error("Error loading properties:", err);
        setProperties(fallbackProperties);
        setAvailableProperties(fallbackProperties);
        setKeralaProperties([fallbackProperties[0], fallbackProperties[2]]);
        setKarnatakaProperties([fallbackProperties[1], fallbackProperties[5]]);
        setHyderabadProperties([fallbackProperties[3]]);
        setGoaProperties([fallbackProperties[4]]);
        setVaranasiProperties([fallbackProperties[6]]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getFilteredList = () => {
    switch (selectedCategory) {
      case "kerala":
        return keralaProperties;
      case "karnataka":
        return karnatakaProperties;
      case "varanasi":
        return varanasiProperties;
      case "hyderabad":
        return hyderabadProperties;
      case "goa":
        return goaProperties;
      case "all":
        return properties;
      case "available":
      default:
        return availableProperties.length > 0
          ? availableProperties
          : properties;
    }
  };

  const displayList = getFilteredList();

  const formatPrice = (val) => {
    if (!val) return "₹10,00,000";
    const str = String(val).trim();
    if (str.startsWith("₹")) return str;
    const num = parseInt(str.replace(/\D/g, ""), 10);
    if (isNaN(num)) return `₹${str}`;
    return "₹" + num.toLocaleString("en-IN");
  };

  return (
    <section id="properties" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white font-manrope">
      <div className="max-w-[1180px] mx-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-[#14203A] mb-3">
              Featured Properties
            </h2>
            <p className="text-sm sm:text-[15px] text-[#5C6B8A] max-w-2xl leading-relaxed">
              Carefully selected assets with high potential for rental yield and long-term capital appreciation.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#021265] border border-[#021265] hover:bg-[#021265] hover:text-white px-6 py-2.5 rounded-full transition shadow-xs whitespace-nowrap self-start md:self-auto"
          >
            <span>All Properties</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dropdown Filter */}
        <div className="mb-10">
          <div className="relative inline-block w-full sm:w-[320px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white text-[#14203A] font-semibold text-sm px-5 py-3.5 pr-10 rounded-2xl border border-[#021265] focus:outline-none focus:ring-2 focus:ring-[#021265]/20 shadow-xs cursor-pointer transition"
            >
              <option value="available">
                Fast Selling Properties ({availableProperties.length})
              </option>
              <option value="kerala">
                Kerala ({keralaProperties.length})
              </option>
              <option value="karnataka">
                Karnataka ({karnatakaProperties.length})
              </option>
              <option value="varanasi">
                Varanasi ({varanasiProperties.length})
              </option>
              <option value="hyderabad">
                Hyderabad ({hyderabadProperties.length})
              </option>
              <option value="goa">
                Goa ({goaProperties.length})
              </option>
              <option value="all">
                All Properties ({properties.length})
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#14203A]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-[#021265] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-[#7B8AA8]">Loading properties...</p>
          </div>
        ) : displayList.length === 0 ? (
          <div className="border border-dashed border-[#D5DEEC] rounded-3xl p-12 text-center bg-[#F7F9FC]">
            <h3 className="font-jakarta text-lg font-bold text-[#14203A] mb-1">
              No properties available in this category
            </h3>
            <p className="text-xs sm:text-sm text-[#7B8AA8]">
              Try selecting another destination from the dropdown.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayList.map((pr, idx) => {
              const imgUrl = pr?.image?.Image1 || imgFallback;
              const cityLower = pr?.city?.toLowerCase() || "";
              
              // Exactly as in previous design
              const isHot =
                cityLower === "hyderabad" ||
                cityLower === "munnar" ||
                cityLower === "alleppey"
                  ? pr?.AvailableFractions !== 0
                  : pr?.H_property === true;

              let displayLocation = pr?.Location || "India";
              if (
                cityLower === "goa" &&
                pr?.name === "STREAM BY INDULGE POWERED BY FRACSPACE"
              ) {
                displayLocation = "Revora, Goa";
              }

              const isHilltopMunnar =
                cityLower === "munnar" &&
                pr?.name === "HILLTOP BY FRACSPACE";

              const categoryBadge =
                pr?.Type?.split(" | ")[0] ||
                pr?.Type ||
                pr?.area ||
                "CLUB / RECREATIONAL ASSET";

              const specsLine =
                pr?.Type && pr?.area
                  ? `${pr?.Type} | ${pr?.area}`
                  : pr?.area || pr?.Type || "Premium Hospitality Asset";

              return (
                <article
                  key={pr?._id || idx}
                  onClick={() => router.push(`/eachproperty?id=${pr?._id}`)}
                  className="bg-white rounded-[26px] overflow-hidden border border-[#E7EBF2] hover:border-[#16418C] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col h-full group"
                >
                  {/* Card Image */}
                  <div className="relative h-[250px] w-full bg-[#EEF2F8] overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={pr?.name || "Property image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>

                    {/* Top Left Fast Selling Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      {isHot ? (
                        <div className="flex items-center gap-1.5 bg-[#D97706]/95 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
                          <Flame className="w-3.5 h-3.5 fill-white text-white" />
                          <span>FAST SELLING</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-[#0B1526]/85 backdrop-blur-xs text-gray-200 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
                          <Ban className="w-3.5 h-3.5 text-gray-400" />
                          <span>SOLD OUT</span>
                        </div>
                      )}
                    </div>

                    {/* Top Right Property Subtype Badge */}
                    {categoryBadge && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-[#021265] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow-md border border-gray-100 max-w-[190px] truncate">
                        {categoryBadge}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-[#5C6B8A] font-dm text-xs uppercase tracking-wider font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
                      <span className="truncate">{displayLocation}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-jakarta text-lg sm:text-xl font-bold text-[#14203A] mt-2.5 group-hover:text-[#021265] transition-colors line-clamp-2 min-h-[56px] leading-snug">
                      {isHilltopMunnar ? (
                        <span className="capitalize">
                          hilltop munnar, munnar, kerala
                        </span>
                      ) : (
                        pr?.name || "Premium Villa Stays"
                      )}
                    </h3>

                    {/* Specs Subtitle */}
                    <div className="mt-2 text-xs sm:text-[13px] text-[#5C6B8A] font-dm line-clamp-1 border-b border-gray-100 pb-4 mb-4">
                      {specsLine}
                    </div>

                    {/* Price and Action Row */}
                    <div className="flex items-end justify-between mt-auto pt-2">
                      <div>
                        <p className="font-dm text-[10px] text-[#9AA9C4] uppercase tracking-widest font-bold">
                          FRAC PRICE
                        </p>
                        <p className="font-jakarta text-xl sm:text-2xl font-bold text-[#021265] mt-0.5 tracking-tight">
                          {formatPrice(pr?.FC_Price)}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/eachproperty?id=${pr?._id}`);
                        }}
                        className="cursor-pointer font-dm text-xs sm:text-[13px] text-white font-bold rounded-full px-5 py-2.5 bg-[#021265] hover:bg-[#000833] transition-all duration-300 shadow-md shadow-[#021265]/20 flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
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

export default FeaturedProperties;
