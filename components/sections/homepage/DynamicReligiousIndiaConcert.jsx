"use client";

import dynamic from "next/dynamic";

const ReligiousIndiaConcert = dynamic(
  () => import("./ReligiousIndiaConcert"),
  { ssr: false }
);

export default function DynamicReligiousIndiaConcert(props) {
  return <ReligiousIndiaConcert {...props} />;
}
