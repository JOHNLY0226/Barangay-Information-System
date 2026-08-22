"use client";

import { GadProvider } from "@/components/gad/GadContext";
import GadDashboard from "@/components/gad/GadDashboard";

export default function BgadpbmsPage() {
  return (
    <GadProvider>
      <GadDashboard />
    </GadProvider>
  );
}
