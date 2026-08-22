// BDP Planning Cycle Stages
export type BDPStage = 
  | 'situational-analysis'
  | 'vision-mission'
  | 'program-formulation'
  | 'budget-allocations'
  | 'implementation'
  | 'monitoring-evaluation'
  | 'adoption';

export interface BDP {
  id: number;
  barangay: string;
  period: string; // e.g., "2023-2028"
  vision: string;
  mission: string;
  goals: string[];
  stage: BDPStage;
  status: 'draft' | 'for-adoption' | 'adopted' | 'for-review' | 'completed';
}

// Barangay Situation
export interface BarangaySituation {
  id: number;
  bdpId: number;
  population: number;
  households: number;
  incomeLevel: string;
  primaryLivelihood: string[];
  challenges: string[];
  opportunities: string[];
  // Health Indicators
  malnutritionRate: number;
  maternalMortality: number;
  infantMortality: number;
  // Education
  literacyRate: number;
  schoolEnrollment: number;
  // Infrastructure
  roadAccess: string;
  waterSupply: string;
  electricity: string;
  // Peace & Order
  crimeRate: number;
  // Environment
  hazardProneAreas: string[];
  // Agriculture
  agriculturalArea: number;
  fishProduction: number;
}

// Barangay Development Council
export interface BDC {
  id: number;
  bdpId: number;
  members: BDCMember[];
  meetings: BDCMeeting[];
  approvalDate?: string;
  resolutionNumber?: string;
}

export interface BDCMember {
  id: number;
  name: string;
  position: string;
  organization: string;
  sector: 'government' | 'civil-society' | 'private' | 'academe';
  contact: string;
}

export interface BDCMeeting {
  id: number;
  date: string;
  attendees: string[];
  agenda: string[];
  minutes: string;
  resolutions: string[];
}

// Programs, Projects, Activities (PPAs)
export interface PPA {
  id: number;
  bdpId: number;
  title: string;
  description: string;
  sector: string;
  category: 'program' | 'project' | 'activity';
  targetBeneficiaries: string;
  implementingOffice: string;
  partners: string[];
  timeline: PPA_Timeline[];
  budget: PPABudget[];
  status: 'planning' | 'ongoing' | 'completed' | 'suspended' | 'cancelled';
  progress: number;
  outputs: string[];
  outcomes: string[];
  indicators: string[];
  risk: string;
  sustainability: string;
}

export interface PPA_Timeline {
  year: string;
  quarter: string;
  activities: string[];
  milestones: string[];
}

export interface PPABudget {
  year: string;
  amount: number;
  source: string;
  status: 'allocated' | 'released' | 'utilized';
}

// Annual Investment Plan (AIP)
export interface AIP {
  id: number;
  bdpId: number;
  year: string;
  totalBudget: number;
  allocations: AIPAllocation[];
  status: 'draft' | 'approved' | 'implemented';
}

export interface AIPAllocation {
  sector: string;
  program: string;
  amount: number;
  priority: number;
}

// Monitoring & Evaluation
export interface M_E_Plan {
  id: number;
  bdpId: number;
  indicators: M_E_Indicator[];
  baselineData: any;
  targets: any;
  actualAccomplishments: any;
  reports: M_E_Report[];
  evaluationResults: string;
  lessonsLearned: string[];
  recommendations: string[];
}

export interface M_E_Indicator {
  id: number;
  name: string;
  baseline: number;
  target: number;
  actual: number;
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  sourceOfData: string;
  personResponsible: string;
}

export interface M_E_Report {
  id: number;
  date: string;
  period: string;
  findings: string;
  status: string;
  nextSteps: string[];
}

// Public Consultation
export interface PublicConsultation {
  id: number;
  bdpId: number;
  date: string;
  venue: string;
  participants: number;
  attendees: string[];
  agenda: string[];
  feedback: string[];
  decisions: string[];
  resolution: string;
}