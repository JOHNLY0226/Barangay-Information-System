"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  GpbEntry,
  AccomplishmentReport,
  SexDisaggregatedMetrics,
  ToastMessage,
  GpbStatus,
} from "./types";

// Seed Data for GAD Plan & Budget (GPB)
const initialGpbEntries: GpbEntry[] = [
  {
    id: "gpb-1",
    gpbCode: "GPB-2026-001",
    year: 2026,
    genderIssue:
      "Lack of economic livelihood opportunities & financial independence among solo mothers and unemployed women in Barangay Sta. Lucia.",
    causeOfIssue:
      "Limited access to technical vocational skills training, micro-finance capital, and digital marketing workshops.",
    gadObjective:
      "Empower 150 solo mothers and women heads of households with sustainable livelihood skills and seed capital.",
    relevantLguProgram: "Quezon City Small Business & Livelihood Development Program (QC-SBD)",
    proposedActivity:
      "Barangay Women Enterprise & High-Value Craftsmanship Skills Training (Dressmaking, Soap Making, Food Processing).",
    targetOutput: "150 women certified; 3 women livelihood cooperatives established.",
    budget: 350000,
    status: "Approved",
    category: "Client-Focused",
    dateCreated: "2026-01-08",
  },
  {
    id: "gpb-2",
    gpbCode: "GPB-2026-002",
    year: 2026,
    genderIssue:
      "Underreporting and delay in response to Violence Against Women and Children (VAWC) and domestic abuse cases.",
    causeOfIssue:
      "Stigma, lack of private intake rooms at barangay desk, and insufficient paralegal training among desk officers.",
    gadObjective:
      "Establish a trauma-informed, 24/7 confidential VAWC intake desk and legal assistance counseling service.",
    relevantLguProgram: "LGU Gender-Responsive Governance & Domestic Peace Initiative",
    proposedActivity:
      "Renovation of Barangay VAWC Protection Desk Intake Suite & Paralegal Capacitation Seminar for Tanod/Kagawad.",
    targetOutput: "1 modern confidential intake suite operational; 25 desk officers trained.",
    budget: 480000,
    status: "Approved",
    category: "Organization-Focused",
    dateCreated: "2026-01-15",
  },
  {
    id: "gpb-3",
    gpbCode: "GPB-2026-003",
    year: 2026,
    genderIssue:
      "High incidence of maternal health complications and lack of specialized cervical/breast cancer screening for low-income women.",
    causeOfIssue:
      "Inadequate diagnostic equipment at health center and low awareness of free screening drives.",
    gadObjective:
      "Provide free comprehensive reproductive health screening and pre-natal care kits for 500 women.",
    relevantLguProgram: "Quezon City Universal Health Care & Maternal Wellness Campaign",
    proposedActivity:
      "Quarterly Mobile Medical Caravan for Women (Pap Smear, Breast Examination, Pre-natal Ultrasound & Vitamins).",
    targetOutput: "500 women screened; 100% high-risk cases referred to QC General Hospital.",
    budget: 520000,
    status: "Approved",
    category: "Client-Focused",
    dateCreated: "2026-01-22",
  },
  {
    id: "gpb-4",
    gpbCode: "GPB-2026-004",
    year: 2026,
    genderIssue:
      "Underrepresentation of female youth in barangay sports, STEM, and civic leadership councils.",
    causeOfIssue:
      "Male-dominated sports leagues and lack of targeted female youth empowerment summits.",
    gadObjective: "Increase female youth civic engagement and leadership participation by 45%.",
    relevantLguProgram: "SK Youth Leadership & Gender Empowerment Drive",
    proposedActivity:
      "Barangay Sta. Lucia Young Women in Leadership & STEM Innovation Camp.",
    targetOutput: "80 young women leaders trained; 5 youth advocacy projects funded.",
    budget: 200000,
    status: "Endorsed",
    category: "Client-Focused",
    dateCreated: "2026-02-05",
  },
  {
    id: "gpb-5",
    gpbCode: "GPB-2026-005",
    year: 2026,
    genderIssue:
      "Gender bias and lack of gender-sensitivity training among barangay administrative personnel and frontline staff.",
    causeOfIssue: "Absence of mandatory GAD orientation during staff onboarding.",
    gadObjective: "Achieve 100% GAD sensitivity compliance across all barangay plantilla personnel.",
    relevantLguProgram: "Quezon City Gender Mainstreaming Audit Framework",
    proposedActivity: "Mandatory Gender Sensitivity & Sexual Harassment Prevention Workshop (Safe Spaces Act).",
    targetOutput: "45 barangay staff certified compliant with Republic Act 11313.",
    budget: 150000,
    status: "Draft",
    category: "Organization-Focused",
    dateCreated: "2026-02-12",
  },
];

// Seed Data for GAD Accomplishment Report (AR)
const initialAccomplishmentReports: AccomplishmentReport[] = [
  {
    id: "ar-1",
    arCode: "AR-2026-001",
    gpbId: "gpb-1",
    gpbCode: "GPB-2026-001",
    proposedActivity:
      "Barangay Women Enterprise & High-Value Craftsmanship Skills Training (Dressmaking, Soap Making, Food Processing).",
    plannedTarget: "150 women certified; 3 women livelihood cooperatives established.",
    plannedBudget: 350000,
    actualAccomplishment:
      "Successfully conducted 4-week intensive livelihood workshops. 165 solo mothers completed the training; 3 cooperatives registered under CDA.",
    actualCost: 325000,
    variance: 25000, // Underutilized by 25k (positive variance = savings)
    remarks:
      "Savings of ₱25,000 achieved due to free venue sponsorship by Barangay Multipurpose Center.",
    dateReported: "2026-03-20",
  },
  {
    id: "ar-2",
    arCode: "AR-2026-002",
    gpbId: "gpb-2",
    gpbCode: "GPB-2026-002",
    proposedActivity:
      "Renovation of Barangay VAWC Protection Desk Intake Suite & Paralegal Capacitation Seminar for Tanod/Kagawad.",
    plannedTarget: "1 modern confidential intake suite operational; 25 desk officers trained.",
    plannedBudget: 480000,
    actualAccomplishment:
      "Completed soundproof VAWC Intake Room with private counseling area. Trained 28 barangay officers in handling GBV intake.",
    actualCost: 495000,
    variance: -15000, // Overutilized by 15k
    remarks:
      "Additional ₱15,000 utilized for installation of dedicated confidential hotline phone system and CCTV security.",
    dateReported: "2026-04-10",
  },
];

// Initial Sex-Disaggregated Demographic & M&E Metrics
const initialMetrics: SexDisaggregatedMetrics = {
  totalFemalePopulation: 24680,
  totalMalePopulation: 23570,
  femaleHeadedHouseholds: 3420,
  totalHouseholds: 12410,
  vawcCasesReported: 14,
  vawcCasesResolved: 12,
  pregnantLactatingMothers: 840,
  femaleSeniorPwdCount: 4120,
};

interface GadContextType {
  gpbEntries: GpbEntry[];
  accomplishmentReports: AccomplishmentReport[];
  metrics: SexDisaggregatedMetrics;
  toasts: ToastMessage[];

  // Actions
  addGpbEntry: (entry: Omit<GpbEntry, "id" | "gpbCode" | "dateCreated">) => void;
  updateGpbStatus: (id: string, status: GpbStatus) => void;
  deleteGpbEntry: (id: string) => void;

  addAccomplishmentReport: (
    report: Omit<AccomplishmentReport, "id" | "arCode" | "variance" | "dateReported">
  ) => void;
  deleteAccomplishmentReport: (id: string) => void;

  showToast: (title: string, message: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

const GadContext = createContext<GadContextType | undefined>(undefined);

export const GadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gpbEntries, setGpbEntries] = useState<GpbEntry[]>(initialGpbEntries);
  const [accomplishmentReports, setAccomplishmentReports] = useState<AccomplishmentReport[]>(
    initialAccomplishmentReports
  );
  const [metrics] = useState<SexDisaggregatedMetrics>(initialMetrics);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message: string, type: ToastMessage["type"] = "success") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // GPB Actions
  const addGpbEntry = (
    entryData: Omit<GpbEntry, "id" | "gpbCode" | "dateCreated">
  ) => {
    const count = gpbEntries.length + 1;
    const gpbCode = `GPB-${entryData.year}-${count.toString().padStart(3, "0")}`;
    const newEntry: GpbEntry = {
      ...entryData,
      id: `gpb-${Date.now()}`,
      gpbCode,
      dateCreated: new Date().toISOString().split("T")[0],
    };
    setGpbEntries((prev) => [newEntry, ...prev]);
    showToast("GPB Entry Created", `Added ${gpbCode} with budget ₱${newEntry.budget.toLocaleString()}.`);
  };

  const updateGpbStatus = (id: string, status: GpbStatus) => {
    setGpbEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    showToast("Status Updated", `GPB item status changed to ${status}.`);
  };

  const deleteGpbEntry = (id: string) => {
    setGpbEntries((prev) => prev.filter((e) => e.id !== id));
    showToast("GPB Item Removed", "Entry removed from plan.", "info");
  };

  // Accomplishment Report Actions
  const addAccomplishmentReport = (
    reportData: Omit<AccomplishmentReport, "id" | "arCode" | "variance" | "dateReported">
  ) => {
    const count = accomplishmentReports.length + 1;
    const arCode = `AR-${new Date().getFullYear()}-${count.toString().padStart(3, "0")}`;
    const variance = reportData.plannedBudget - reportData.actualCost;

    const newReport: AccomplishmentReport = {
      ...reportData,
      id: `ar-${Date.now()}`,
      arCode,
      variance,
      dateReported: new Date().toISOString().split("T")[0],
    };

    setAccomplishmentReports((prev) => [newReport, ...prev]);
    showToast(
      "Accomplishment Logged",
      `Reported ${arCode} for ${reportData.gpbCode}. Variance: ₱${variance.toLocaleString()}`
    );
  };

  const deleteAccomplishmentReport = (id: string) => {
    setAccomplishmentReports((prev) => prev.filter((r) => r.id !== id));
    showToast("Report Deleted", "Accomplishment report deleted.", "info");
  };

  return (
    <GadContext.Provider
      value={{
        gpbEntries,
        accomplishmentReports,
        metrics,
        toasts,
        addGpbEntry,
        updateGpbStatus,
        deleteGpbEntry,
        addAccomplishmentReport,
        deleteAccomplishmentReport,
        showToast,
        removeToast,
      }}
    >
      {children}
    </GadContext.Provider>
  );
};

export const useGad = () => {
  const context = useContext(GadContext);
  if (!context) {
    throw new Error("useGad must be used within a GadProvider");
  }
  return context;
};
