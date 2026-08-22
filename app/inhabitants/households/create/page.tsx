"use client";

import React from "react";
import BIPSModuleShell from "@/components/inhabitants/BIPSModuleShell";
import HouseholdCreateForm from "@/components/inhabitants/households/HouseholdCreateForm";

export default function CreateHouseholdPage() {
  return (
    <BIPSModuleShell activeTab="households">
      <HouseholdCreateForm />
    </BIPSModuleShell>
  );
}
