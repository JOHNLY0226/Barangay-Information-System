"use client";

import { BamsProvider } from "@/components/bams/BamsContext";
import BamsDashboard from "@/components/bams/BamsDashboard";

export default function AssetsPage() {
  return (
    <BamsProvider>
      <BamsDashboard />
    </BamsProvider>
  );
}
