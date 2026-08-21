"use client";

import React, { useEffect, useState } from "react";
import img1 from "../../../assets/herobg.webp";
import Image from "next/image";
import { MapPin } from "lucide-react";
import axios from "axios";

function FeaturedProperties() {
  const [goaProperties, setGoaProperties] = useState([{}]);
  const [hyderabadProperties, setHyderabadProperties] = useState([{}]);
  const [keralaProperties, setKeralaProperties] = useState([{}]);
  const [karnatakaProperties, setKarnatakaProperties] = useState([{}]);
  const [varanasiProperties, setVaranasiProperties] = useState([{}]);
  const [allProperties, setAllProperties] = useState([{}]);
  const [availableProperties, setAvailableProperties] = useState([{}]);

  const [selectedProperties, setSelectedProperties] = useState("available");

  const PROPERTIES_API =
    "https://apitest.fracspace.com/api/users/getPropertyDetails";

  const headers = {
    "x-api-key": "Fracspace@2024"
  };

  let properties;
  let goaProp;
  let hydProp;
  let keralaProp;
  let karnatakaProp;
  let varanasiProp;
  let availableProp;

  const getProperties = () => {
    axios
      .get(PROPERTIES_API, { headers })
      .then((response) => {
        console.log("response is", response);
        setAllProperties(response?.data?.properties);
        properties = response?.data?.properties;
        goaProp = properties
          .filter((property) => property?.city?.toLowerCase() == "goa")
          .sort((a, b) => a.num - b.num);
        hydProp = properties
          .filter((property) => property?.city?.toLowerCase() == "hyderabad")
          .sort((a, b) => a.num - b.num);
        keralaProp = properties
          .filter(
            (property) =>
              property?.city?.toLowerCase() == "munnar" ||
              property?.city?.toLowerCase() === "alleppey"
          )
          .sort((a, b) => a.num - b.num);

        karnatakaProp = properties
          .filter((property) => property?.city?.toLowerCase() == "kabini")
          .sort((a, b) => a.num - b.num);

        varanasiProp = properties
          .filter((property) => property?.city?.toLowerCase() == "varanasi")
          .sort((a, b) => a.num - b.num);

        availableProp = properties?.filter(
          (property) =>
            property?.AvailableFractions > 0 &&
            property?.PropertyType == "Domastic"
        );

        console.log("hello");

        console.log("avail props are", availableProp);
        console.log("image url is", properties[0]?.image?.Image1);

        setGoaProperties(goaProp);
        setHyderabadProperties(hydProp);
        setKeralaProperties(keralaProp);
        setKarnatakaProperties(karnatakaProp);
        setVaranasiProperties(varanasiProp);
        setAvailableProperties(availableProp);
      })
      .catch((error) => {
        console.log("error is", error);
      });
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <section className="mt-12 mx-auto max-w-7xl px-10">
      <h2 className="text-3xl md:text-4xl font-jakarta">Featured Properties</h2>
      <div className="mt-4 flex flex-col  md:flex-row md:items-center md:justify-between">
        <div className="text-gray-600 font-dm">
          Carefully selected assets with high potential for rental yield and
          long-term capital appreciation.
        </div>
        <div className="mt-4 md:mt-0">
          <button className="text-gray-600 font-dm cursor-pointer mr-4 px-2 py-1 border-2 border-gray-100 rounded-lg shadow-lg">
            View All
          </button>
          <select
            value={selectedProperties}
            onChange={(e) => setSelectedProperties(e?.target?.value)}
            className="text-gray-600 font-dm cursor-pointer mr-4 px-2 py-1 border-2 border-gray-100 rounded-lg shadow-lg"
          >
            <option value="available">Available Properties</option>
            <option value="kerala">Kerala</option>
            <option value="goa">Goa</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="kabani">Kabini</option>
            <option value="varanasi">Varanasi</option>
          </select>
        </div>
      </div>
      <div className="mt-12 mb-4 flex flex-col gap-5 md:flex-row  md:items-center  w-[90vw] overflow-x-auto hide-scrollbar">
        {}{" "}
        {goaProperties?.map((property, index) => (
          <div
            key={index}
            className="relative rounded-lg mb-4 md:w-[30vw] flex-shrink-0 shadow-lg ml-5"
          >
            <Image
              src={property?.image?.Image1 || null}
              alt={property.name}
              width={400}
              height={500}
              className="md:w-[40vw] h-[30vh] rounded-t-lg object-cover"
            />

            <div className="absolute px-2 w-full top-4 flex items-center justify-between">
              <p className="font-dm text-xs rounded-full text-white bg-gray-400 px-4 py-2">
                {property?.P_Type}
              </p>
              <p className="font-dm text-xs rounded-full bg-[#C9A84C] px-4 py-2">
                ROI 10%
              </p>
            </div>
            <div className="mx-2 py-4">
              <p className="text-gray-400 font-dm flex items-center text-sm uppercase">
                <MapPin className="w-[15px]" /> {property?.city}
              </p>
              <p className="font-jakarta">{property?.name}</p>
              <div className="flex  justify-between mt-2">
                <div>
                  <p className="font-dm text-sm text-gray-400">Frac Price</p>
                  <p className="font-jakarta text-lg">₹ {property?.FC_Price}</p>
                </div>
                <div>
                  <button className="cursor-pointer font-dm rounded-lg px-2 py-2 border-1 border-gray-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProperties;
