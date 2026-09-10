"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MapPin, Flame, Ban, ChevronRight } from "lucide-react";
import imgFallback from "../../../assets/herobg.webp";
import { useDownloadApp } from "@/context/DownloadAppContext";

function PropertiesGrid() {
  const router = useRouter();
  const { openDownloadModal } = useDownloadApp();
  const [selectedRegion, setSelectedRegion] = useState("View All");
  const [sortByAvailable, setSortByAvailable] = useState(true);
  const [properties, setProperties] = useState([]);
  const [goaProperties, setGoaProperties] = useState([]);
  const [hyderabadProperties, setHyderabadProperties] = useState([]);
  const [keralaProperties, setKeralaProperties] = useState([]);
  const [karnatakaProperties, setKarnatakaProperties] = useState([]);
  const [varanasiProperties, setVaranasiProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackList = [
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
      image: { Image1: imgFallback }
    }
  ];

  const PROPERTIES_API =
    "https://apitest.fracspace.com/api/users/getPropertyDetails";

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

          // Combine strictly the curated domestic properties across the 5 destinations
          const combined = [
            ...kerala,
            ...karnataka,
            ...varanasi,
            ...hyd,
            ...goa
          ];

          setGoaProperties(goa);
          setHyderabadProperties(hyd);
          setKeralaProperties(kerala);
          setKarnatakaProperties(karnataka);
          setVaranasiProperties(varanasi);
          setProperties(combined);
        } else {
          setProperties(fallbackList);
          setKeralaProperties([fallbackList[0], fallbackList[2]]);
          setKarnatakaProperties([fallbackList[1], fallbackList[5]]);
          setHyderabadProperties([fallbackList[3]]);
          setGoaProperties([fallbackList[4]]);
          setVaranasiProperties([fallbackList[6]]);
        }
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setProperties(fallbackList);
        setKeralaProperties([fallbackList[0], fallbackList[2]]);
        setKarnatakaProperties([fallbackList[1], fallbackList[5]]);
        setHyderabadProperties([fallbackList[3]]);
        setGoaProperties([fallbackList[4]]);
        setVaranasiProperties([fallbackList[6]]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const regions = ["View All", "Kerala", "Karnataka", "Varanasi", "Hyderabad", "Goa"];

  const getRegionList = (r) => {
    switch (r) {
      case "Kerala":
        return keralaProperties;
      case "Karnataka":
        return karnatakaProperties;
      case "Varanasi":
        return varanasiProperties;
      case "Hyderabad":
        return hyderabadProperties;
      case "Goa":
        return goaProperties;
      case "View All":
      default:
        return properties;
    }
  };

  const getCount = (r) => {
    return getRegionList(r).length;
  };

  const isPropertyAvailable = (p) => {
    const cityLower = p?.city?.toLowerCase() || "";
    if (cityLower === "hyderabad" || cityLower === "munnar" || cityLower === "alleppey") {
      return p?.AvailableFractions !== 0;
    }
    return p?.H_property === true || p?.AvailableFractions > 0;
  };

  let list = [...getRegionList(selectedRegion)];

  if (sortByAvailable) {
    list.sort((a, b) => {
      const aAvail = isPropertyAvailable(a);
      const bAvail = isPropertyAvailable(b);
      if (aAvail && !bAvail) return -1;
      if (!aAvail && bAvail) return 1;
      return (a.num || 0) - (b.num || 0);
    });
  } else {
    list.sort((a, b) => (a.num || 0) - (b.num || 0));
  }

  const formatPrice = (val) => {
    if (!val) return "₹10,00,000";
    const str = String(val).trim();
    if (str.startsWith("₹")) return str;
    const num = parseInt(str.replace(/\D/g, ""), 10);
    if (isNaN(num)) return `₹${str}`;
    return "₹" + num.toLocaleString("en-IN");
  };

  const vetting = [
    {
      n: "01",
      icon: "◎",
      title: "Destination demand",
      body: "Location screened for occupancy history, tourism trends and long-term appeal."
    },
    {
      n: "02",
      icon: "⚖",
      title: "Title & legal",
      body: "Clear title, encumbrance checks and a registered co-ownership structure."
    },
    {
      n: "03",
      icon: "₹",
      title: "Yield modelling",
      body: "Conservative income projections stress-tested against seasonality."
    },
    {
      n: "04",
      icon: "⚙",
      title: "Operator quality",
      body: "A professional hospitality operator committed before the asset is listed."
    }
  ];

  return (
    <div className="w-full font-manrope">
      
      {/* Listings Section with Filters */}
      <section id="listings" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1180px] mx-auto">
          
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E7EBF2] mb-6">
            
            {/* Region Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {regions.map((r) => {
                const active = selectedRegion === r;
                return (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                      active
                        ? "bg-[#16418C] text-white border border-[#16418C] shadow-sm"
                        : "bg-white text-[#4A5878] border border-[#DDE4EF] hover:border-[#16418C]"
                    }`}
                  >
                    {r} ({getCount(r)})
                  </button>
                );
              })}
            </div>

            {/* Sort By Available Option */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <span className="font-mono-plex text-xs text-[#9AA9C4] uppercase tracking-wider mr-1">
                Sort By
              </span>
              <button
                onClick={() => setSortByAvailable(!sortByAvailable)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  sortByAvailable
                    ? "bg-[#16418C] text-white border border-[#16418C] shadow-sm"
                    : "bg-white text-[#4A5878] border border-[#DDE4EF] hover:border-[#16418C]"
                }`}
              >
                <span>Available</span>
                {sortByAvailable && <span className="text-[10px] bg-white text-[#16418C] rounded-full px-1.5 font-bold">✓</span>}
              </button>
            </div>

          </div>

          {/* Results Summary */}
          <div className="text-xs sm:text-sm text-[#7B8AA8] mb-8">
            Showing {list.length} {list.length === 1 ? "property" : "properties"} {sortByAvailable ? "· available first" : ""}
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 border-4 border-[#16418C] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-[#7B8AA8]">Loading curated properties...</p>
            </div>
          ) : list.length === 0 ? (
            <div className="border border-dashed border-[#D5DEEC] rounded-3xl p-12 text-center bg-[#F7F9FC]">
              <h3 className="font-jakarta text-lg font-bold text-[#14203A] mb-1">
                No properties available in this category
              </h3>
              <p className="text-xs sm:text-sm text-[#7B8AA8]">
                Try selecting another destination.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {list.map((pr, idx) => {
                const imgUrl = pr?.image?.Image1 || imgFallback;
                const isFastSelling = isPropertyAvailable(pr);

                let displayLocation = pr?.Location || "India";
                if (
                  pr?.city?.toLowerCase() === "goa" &&
                  pr?.name === "STREAM BY INDULGE POWERED BY FRACSPACE"
                ) {
                  displayLocation = "Revora, Goa";
                }

                const isHilltopMunnar =
                  pr?.city?.toLowerCase() === "munnar" &&
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
                        {isFastSelling ? (
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

      {/* Vetting Selection Process Section */}
      <section className="relative bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#0F2A57] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 96px)"
          }}
        ></div>

        <div className="relative max-w-[1180px] mx-auto text-center">
          <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            How every property is selected
          </h2>
          <p className="text-sm sm:text-base text-[#A9BDE2] max-w-xl mx-auto mb-12 leading-relaxed">
            Fewer than 5% of sourced assets make it onto the platform. Here's what each one passes through.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {vetting.map((v, idx) => (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition backdrop-blur-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-8 h-2 rounded-full bg-white/35"></span>
                    <span className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white/30">
                      {v.n}
                    </span>
                  </div>
                  <h3 className="font-jakarta text-base font-bold text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-[#A9BDE2]">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve Fraction Banner */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1180px] mx-auto bg-[#F1F5FB] border border-[#E2E9F4] rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-[#14203A] leading-tight">
              Found something you like? Reserve your fraction.
            </h2>
            <p className="text-sm sm:text-base text-[#5C6B8A] max-w-xl leading-relaxed">
              Talk to an ownership specialist or download the app to review documentation, yields and stay entitlements.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-3.5 justify-start lg:justify-end">
            <Link
              href="/contact"
              className="bg-[#0B2452] hover:bg-[#16418C] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold transition shadow-md"
            >
              Talk to an expert
            </Link>
            <button
              onClick={openDownloadModal}
              className="border border-[#C3CEE2] hover:border-[#0B2452] text-[#0B2452] hover:bg-[#0B2452] hover:text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer shadow-xs"
            >
              Download app
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default PropertiesGrid;
