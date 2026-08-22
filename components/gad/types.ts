export type GpbStatus = "Draft" | "Endorsed" | "Approved";

export interface GpbEntry {
  id: string;
  gpbCode: string;
  year: number;
  genderIssue: string;
  causeOfIssue: string;
  gadObjective: string;
  relevantLguProgram: string;
  proposedActivity: string;
  targetOutput: string;
  budget: number;
  status: GpbStatus;
  category: "Client-Focused" | "Organization-Focused";
  dateCreated: string;
}

export interface AccomplishmentReport {
  id: string;
  arCode: string;
  gpbId: string; // References GpbEntry.id
  gpbCode: string;
  proposedActivity: string;
  plannedTarget: string;
  plannedBudget: number;
  actualAccomplishment: string;
  actualCost: number;
  variance: number; // plannedBudget - actualCost
  remarks: string; // Reason for under/overutilization
  dateReported: string;
}

export interface SexDisaggregatedMetrics {
  totalFemalePopulation: number;
  totalMalePopulation: number;
  femaleHeadedHouseholds: number;
  totalHouseholds: number;
  vawcCasesReported: number;
  vawcCasesResolved: number;
  pregnantLactatingMothers: number;
  femaleSeniorPwdCount: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info";
}
