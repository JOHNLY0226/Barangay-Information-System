"use client";

import React, { useState } from "react";
import BIPSModuleShell from "@/components/inhabitants/BIPSModuleShell";
import HouseholdTree from "@/components/inhabitants/HouseholdTree";
import ResidentRegistrationModal from "@/components/inhabitants/ResidentRegistrationModal";
import { INITIAL_HOUSEHOLDS } from "@/components/inhabitants/mockData";
import { Household, Resident } from "@/types/inhabitants";

export default function HouseholdsPage() {
  const [households, setHouseholds] = useState<Household[]>(INITIAL_HOUSEHOLDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetHouseholdId, setTargetHouseholdId] = useState<string>("");

  const handleAddMember = (householdId: string) => {
    setTargetHouseholdId(householdId);
    setIsModalOpen(true);
  };

  const handleSaveResident = (data: Partial<Resident>) => {
    const newMember: Resident = {
      id: `RES-2026-00${Math.floor(Math.random() * 900 + 100)}`,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      middleName: data.middleName || "",
      suffix: data.suffix || "",
      gender: data.gender || "Male",
      birthDate: data.birthDate || "2000-01-01",
      age: data.age || 26,
      civilStatus: data.civilStatus || "Single",
      contactNumber: data.contactNumber || "",
      email: data.email || "",
      address: data.address || "Brgy. Sta. Lucia, QC",
      street: data.street || "Sta. Lucia St.",
      householdId: targetHouseholdId || data.householdId || "HH-STL-0101",
      isHeadOfHousehold: false,
      relationshipToHead: data.relationshipToHead || "Child",
      voterStatus: data.voterStatus || "Registered",
      precinctNo: data.precinctNo || "",
      occupation: data.occupation || "Student",
      educationalAttainment: data.educationalAttainment || "College",
      isPwd: data.isPwd || false,
      pwdType: data.pwdType || "",
      isSenior: data.isSenior || false,
      isSoloParent: data.isSoloParent || false,
      isIndigent: data.isIndigent || false,
      status: "Active",
      emergencyContactName: data.emergencyContactName || "",
      emergencyContactPhone: data.emergencyContactPhone || "",
      emergencyContactRelation: data.emergencyContactRelation || "",
      dateRegistered: new Date().toISOString().split("T")[0],
    };

    setHouseholds((prev) =>
      prev.map((hh) => {
        if (hh.id === newMember.householdId) {
          return {
            ...hh,
            memberCount: hh.memberCount + 1,
            members: [...hh.members, newMember],
          };
        }
        return hh;
      })
    );
  };

  return (
    <BIPSModuleShell activeTab="households">
      <HouseholdTree
        households={households}
        onAddMemberClick={handleAddMember}
      />

      <ResidentRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveResident}
        initialData={targetHouseholdId ? { householdId: targetHouseholdId } as any : null}
      />
    </BIPSModuleShell>
  );
}
