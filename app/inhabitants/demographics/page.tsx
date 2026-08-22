"use client";

import React from "react";
import BIPSModuleShell from "@/components/inhabitants/BIPSModuleShell";
import DemographicsFilter from "@/components/inhabitants/DemographicsFilter";
import { INITIAL_DEMOGRAPHICS } from "@/components/inhabitants/mockData";

export default function DemographicsPage() {
  return (
    <BIPSModuleShell activeTab="demographics">
      <DemographicsFilter demographicData={INITIAL_DEMOGRAPHICS} />
    </BIPSModuleShell>
  );
}
