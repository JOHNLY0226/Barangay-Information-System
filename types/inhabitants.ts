export interface Resident {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  suffix?: string;
  gender: "Male" | "Female" | "Other";
  birthDate: string;
  age: number;
  civilStatus: "Single" | "Married" | "Widowed" | "Separated" | "Divorced";
  contactNumber: string;
  email?: string;
  address: string;
  street: string;
  householdId: string;
  isHeadOfHousehold: boolean;
  relationshipToHead: string;
  voterStatus: "Registered" | "Non-Registered";
  precinctNo?: string;
  occupation: string;
  educationalAttainment: "Elementary" | "High School" | "Vocational" | "College" | "Post-Graduate" | "None";
  isPwd: boolean;
  pwdType?: string;
  isSenior: boolean;
  isSoloParent: boolean;
  isIndigent: boolean;
  avatarUrl?: string;
  status: "Active" | "Archived" | "Deceased" | "Transferred";
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  dateRegistered: string;
}

export interface Household {
  id: string;
  householdNo: string;
  headName: string;
  headId: string;
  street: string;
  fullAddress: string;
  memberCount: number;
  familyIncomeCategory: "Low Income" | "Lower Middle" | "Middle" | "Upper Middle" | "High Income";
  housingType: "Owned" | "Rented" | "Informal Settler" | "Care Taker";
  members: Resident[];
}

export interface DemographicCategoryStat {
  category: string;
  count: number;
  percentage: number;
}

export interface DemographicStat {
  totalPopulation: number;
  totalHouseholds: number;
  totalSeniorCitizens: number;
  totalPwds: number;
  totalSoloParents: number;
  totalIndigents: number;
  totalRegisteredVoters: number;
  ageDistribution: DemographicCategoryStat[];
  genderRatio: {
    maleCount: number;
    femaleCount: number;
    malePercentage: number;
    femalePercentage: number;
  };
  employmentStats: DemographicCategoryStat[];
  educationStats: DemographicCategoryStat[];
}
