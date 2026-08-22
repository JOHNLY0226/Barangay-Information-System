"use client";

import React, { useState } from "react";
import BIPSModuleShell from "@/components/inhabitants/BIPSModuleShell";
import BIPSResidentTable from "@/components/inhabitants/BIPSResidentTable";
import ResidentRegistrationModal from "@/components/inhabitants/ResidentRegistrationModal";
import { INITIAL_RESIDENTS } from "@/components/inhabitants/mockData";
import { Resident } from "@/types/inhabitants";

export default function CitizensPage() {
  const [residents, setResidents] = useState<Resident[]>(INITIAL_RESIDENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);

  const handleAddNew = () => {
    setEditingResident(null);
    setIsModalOpen(true);
  };

  const handleEdit = (resident: Resident) => {
    setEditingResident(resident);
    setIsModalOpen(true);
  };

  const handleArchive = (id: string) => {
    if (confirm("Are you sure you want to archive this citizen record?")) {
      setResidents((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Archived" } : r))
      );
    }
  };

  const handleSaveResident = (data: Partial<Resident>) => {
    if (editingResident) {
      // Edit existing resident
      setResidents((prev) =>
        prev.map((r) => (r.id === editingResident.id ? ({ ...r, ...data } as Resident) : r))
      );
    } else {
      // Add new resident
      const newRes: Resident = {
        id: `RES-2026-00${residents.length + 1}`,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        middleName: data.middleName || "",
        suffix: data.suffix || "",
        gender: data.gender || "Male",
        birthDate: data.birthDate || "1995-01-01",
        age: data.age || 31,
        civilStatus: data.civilStatus || "Single",
        contactNumber: data.contactNumber || "",
        email: data.email || "",
        address: data.address || "Brgy. Sta. Lucia, QC",
        street: data.street || "Sta. Lucia St.",
        householdId: data.householdId || "HH-STL-0101",
        isHeadOfHousehold: data.isHeadOfHousehold || false,
        relationshipToHead: data.relationshipToHead || "Head",
        voterStatus: data.voterStatus || "Registered",
        precinctNo: data.precinctNo || "",
        occupation: data.occupation || "Employed",
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
      setResidents((prev) => [newRes, ...prev]);
    }
  };

  return (
    <BIPSModuleShell activeTab="citizens">
      <BIPSResidentTable
        residents={residents}
        onEditResident={handleEdit}
        onArchiveResident={handleArchive}
        onAddNewClick={handleAddNew}
      />

      <ResidentRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveResident}
        initialData={editingResident}
      />
    </BIPSModuleShell>
  );
}
