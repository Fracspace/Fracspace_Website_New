"use client";

import dynamic from "next/dynamic";

const InvestorVideos = dynamic(
  () => import("./InvestorVideos"),
  { ssr: false }
);

export default function DynamicInvestorVideos(props) {
  return <InvestorVideos {...props} />;
}
