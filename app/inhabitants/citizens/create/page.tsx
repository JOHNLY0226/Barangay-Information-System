"use client";

import React from "react";
import BIPSModuleShell from "@/components/inhabitants/BIPSModuleShell";
import CitizenCreateWizard from "@/components/inhabitants/citizens/CitizenCreateWizard";

export default function CreateCitizenPage() {
  return (
    <BIPSModuleShell activeTab="citizens">
      <CitizenCreateWizard />
    </BIPSModuleShell>
  );
}
