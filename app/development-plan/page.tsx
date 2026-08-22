"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Map,
  ArrowLeft,
  Plus,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Package,
  AlertTriangle,
  Search,
  X,
  Edit2,
  Trash,
  Save,
  Menu,
  Calendar,
  FileText,
  BarChart3,
  Home,
  BookOpen,
  Bell,
  User,
  MapPin,
  Building2,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Shield,
  Trash2,
  Wallet,
  Landmark,
  Heart,
  Baby,
  Activity,
  Droplets,
  Wind,
  Mountain,
  Waves,
  Thermometer,
  Utensils,
  PiggyBank,
  School,
  Hospital,
  Truck,
  Phone,
  Zap,
  Wifi
} from "lucide-react";

// ============================================
// TYPES
// ============================================

interface BDPDemography {
  id: number;
  barangayName: string;
  totalPopulation: number;
  malePopulation: number;
  femalePopulation: number;
  numberOfHouseholds: number;
  averageHouseholdSize: number;
  totalFamilies: number;
  populationDensity: number;
  dateUpdated: string;
}

interface ChildHealthDemographics {
  id: number;
  bdpId: number;
  liveBirths: { male: number; female: number; total: number };
  malnourishedChildren: { total: number; male: number };
  infantMortality: { total: number; male: number };
  deathsByAge: {
    under5: { male: number; female: number };
    '5-9': { male: number; female: number };
    '10-14': { male: number; female: number };
    '15-19': { male: number; female: number };
    '20-24': { male: number; female: number };
    '25-29': { male: number; female: number };
    '30-34': { male: number; female: number };
    '35-39': { male: number; female: number };
    '40-44': { male: number; female: number };
    '45-49': { male: number; female: number };
    '50-54': { male: number; female: number };
    '55-59': { male: number; female: number };
    '60-64': { male: number; female: number };
    '65-69': { male: number; female: number };
    '70-74': { male: number; female: number };
    '75-80': { male: number; female: number };
    '80andOver': { male: number; female: number };
  };
  deathsByCause: {
    heartDisease: number;
    cancer: number;
    respiratory: number;
    stroke: number;
    accidents: number;
    alzheimers: number;
    diabetes: number;
    pneumoniaInfluenza: number;
    kidneyDisease: number;
    suicide: number;
    hiv: number;
    otherCauses: number;
  };
  maternalMortality: {
    age12to17: number;
    age18to24: number;
    age25to34: number;
    age35to44: number;
    age45plus: number;
  };
}

interface WomenRepresentation {
  id: number;
  bdpId: number;
  sangguniangBarangay: number;
  sangguniangKabataan: number;
  barangayDevelopmentCouncil: number;
  barangayPeaceOrderCouncil: number;
  barangayAntiDrugAbuseCouncil: number;
  barangayDRRMC: number;
  barangayCouncilProtectionChildren: number;
  womenHeadsHouseholds: number;
  womenBusinessOwners: number;
  livelihoodProgramsForWomen: number;
  womenCooperativeMembers: number;
}

interface WomenInBarangay {
  id: number;
  bdpId: number;
  womenBarangayStaff: number;
  womenTanods: number;
  womenBHWs: number;
  womenLupongTagapamayapa: number;
  womenAvailingMaternalCare: number;
  womenAvailingFamilyPlanning: number;
  womenAvailingCounseling: number;
  womenAvailingDiseaseControl: number;
  womenAvailingPapSmear: number;
  womenAvailingBreastCancerExam: number;
  womenUsingLyingInFacilities: number;
  womenUsingSeparateToilets: number;
  womenUsingVAWDesk: number;
  womenUsingStreetlighting: number;
  genderSensitivityTrainingParticipants: number;
  womenRelatedLawsOrientationParticipants: number;
  genderResponsivePlanningParticipants: number;
  vawComplaintsReceived: number;
  vawComplaintsActedUpon: number;
  vawcVictims: number;
  vawcCases: number;
  vawcPhysical: number;
  vawcSexual: number;
  vawcEconomic: number;
  vawcPsychological: number;
  vawcCasesActedUpon: number;
}

interface DRRMData {
  id: number;
  bdpId: number;
  garbageCollectionFrequency: string;
  materialsRecoveryFacilities: number;
  hazardFrequency: {
    typhoon: string;
    flood: string;
    earthquake: string;
    tsunami: string;
    volcanicEruption: string;
    stormSurge: string;
  };
  hazardProneAreas: {
    typhoon: string;
    flood: string;
    earthquake: string;
    tsunami: string;
    volcanicEruption: string;
    stormSurge: string;
  };
  populationAffected: {
    typhoon: number;
    flood: number;
    earthquake: number;
    tsunami: number;
    volcanicEruption: number;
    stormSurge: number;
  };
  drrmFacilities: {
    barangayOperationCenter: { location: string; remarks: string };
    evacuationCenter: { location: string; remarks: string };
    floodDrainageFacilities: { location: string; remarks: string };
    rainWaterCollecting: { location: string; remarks: string };
    spineBoard: { location: string; remarks: string };
    axe: { location: string; remarks: string };
    fuel: { location: string; remarks: string };
    emergencyKit: { location: string; remarks: string };
    handheldRadio: { location: string; remarks: string };
    hardhats: { location: string; remarks: string };
    batteries: { location: string; remarks: string };
    portableGenerator: { location: string; remarks: string };
    boots: { location: string; remarks: string };
    ropes: { location: string; remarks: string };
    searchLights: { location: string; remarks: string };
    ppe: { location: string; remarks: string };
    flashLights: { location: string; remarks: string };
    megaphone: { location: string; remarks: string };
    chainsaw: { location: string; remarks: string };
    ladders: { location: string; remarks: string };
    handTools: { location: string; remarks: string };
  };
  drrmSystems: {
    contingencyPlan: string;
    communityRiskAssessment: string;
    drrmInformationSystem: string;
    incidentCommandSystem: string;
    earlyWarningSystem: string;
    landClassification: {
      landlocked: number;
      forest: number;
      agricultural: number;
      urban: number;
      coastalMarine: number;
      freshwaterEcosystem: number;
    };
    endangeredSpecies: number;
  };
}

interface FiscalInformation {
  id: number;
  bdpId: number;
  incomeSources: {
    ira: number;
    donationGrant: number;
    shareNationalWealth: number;
    subsidy: number;
    rptShare: number;
    feesCharges: number;
    otherSources: number;
  };
  householdIncome: {
    agricultural: number;
    fishing: number;
    commercial: number;
    industrial: number;
  };
  laborForce: { male: number; female: number };
  employedPersons: {
    private: { male: number; female: number };
    public: { male: number; female: number };
    selfEmployed: { male: number; female: number };
  };
  livelihood: {
    farming: number;
    fishing: number;
    poultryLivestock: number;
    carpentry: number;
    professional: number;
    governmentEmployee: number;
    privateEmployee: number;
    vending: number;
    licensedDriver: number;
    baker: number;
    porter: number;
    masseur: number;
    househelpers: number;
    electricians: number;
    laborer: number;
    mining: number;
    lending: number;
  };
  agriculturalCrops: {
    rice: number;
    corn: number;
    sugar: number;
    coconuts: number;
    garlic: number;
    onion: number;
    fruits: number;
    vegetables: number;
    others: number;
  };
}

interface Facilities {
  id: number;
  bdpId: number;
  healthFacilities: {
    hospital: number;
    healthCenters: number;
    healthStations: number;
    lyingInBirthing: number;
    privateClinics: number;
  };
  educationalFacilities: {
    dayCareCenters: number;
    primarySchools: number;
    secondarySchools: number;
    tertiarySchools: number;
    readingCenters: number;
  };
  communityFacilities: {
    socializedHousing: number;
    policeCommunityPrecincts: number;
    barangayTanodOutposts: number;
  };
  commercialEstablishments: {
    sariSariStore: number;
    groceryWholesale: number;
    publicMarket: number;
    satelliteMarket: number;
    buyingStation: number;
    businessEstablishments: number;
    hotels: number;
    others: number;
  };
  roadBridgeInfrastructure: {
    roadsStreets: number;
    bridges: number;
  };
  transportationFacilities: {
    airports: number;
    ports: number;
    terminals: number;
    parkingLots: number;
  };
  registeredVehicles: {
    tricycle: number;
    jeepney: number;
    pedicabs: number;
    others: number;
  };
  communicationUtilities: {
    telecommunicationUnits: number;
    householdsWithElectricity: number;
    powerUtilities: number;
  };
  waterSupply: {
    type1System: number;
    type2System: number;
    otherSources: number;
    waterSourceLocations: string;
  };
}

interface BasicCommunityFacilities {
  id: number;
  bdpId: number;
  facilities: {
    barangayHall: { quantity: number; status: 'operational' | 'under-maintenance' | 'non-operational' | 'needs-repair' | 'new' | 'planned' | 'abandoned' };
    dayCareCenters: { quantity: number; status: 'operational' | 'under-maintenance' | 'non-operational' | 'needs-repair' | 'new' | 'planned' | 'abandoned' };
    informationLearningCenter: { quantity: number; status: 'operational' | 'under-maintenance' | 'non-operational' | 'needs-repair' | 'new' | 'planned' | 'abandoned' };
    multiPurposeHall: { quantity: number; status: 'operational' | 'under-maintenance' | 'non-operational' | 'needs-repair' | 'new' | 'planned' | 'abandoned' };
    plaza: { quantity: number; status: 'operational' | 'under-maintenance' | 'non-operational' | 'needs-repair' | 'new' | 'planned' | 'abandoned' };
    farmProduceCollection: { quantity: number; status: 'operational' | 'under-maintenance' | 'non-operational' | 'needs-repair' | 'new' | 'planned' | 'abandoned' };
  };
}

interface BarangayOfficials {
  id: number;
  bdpId: number;
  punongBarangay: string;
  sbMembers: string[];
  skChairperson: string;
  skMembers: string[];
  barangaySecretary: string;
  skSecretary: string;
  barangayTreasurer: string;
  skTreasurer: string;
  dayCareWorkers: {
    barangay: number;
    cityMunicipality: number;
  };
  healthNutritionStaff: {
    barangayHealthWorkers: number;
    barangayNutritionScholars: number;
  };
  otherBarangayStaff: {
    barangayVAWDeskOfficer: number;
    badacDutyOfficer: number;
    kasambahayDeskOfficer: number;
    bhrao: number;
  };
  barangayTanods: number;
  lupongTagapamayapa: number;
}

interface BarangayBasedInstitutions {
  id: number;
  bdpId: number;
  bdc: boolean;
  badac: boolean;
  bpoc: boolean;
  bcpc: boolean;
  beswmc: boolean;
  bdrrmc: boolean;
  bfarmc: boolean;
  bpfdc: boolean;
  accreditedCSOs: { category: string; quantity: number }[];
  bdcMembers: number;
  badacMembers: number;
  bpocMembers: number;
  bcpcMembers: number;
  beswmcMembers: number;
  bdrrmcMembers: number;
  bfarmcMembers: number;
  bpfdcMembers: number;
}

interface BDPData {
  id: number;
  barangay: string;
  period: string;
  status: 'draft' | 'for-adoption' | 'adopted' | 'for-review' | 'completed';
  demography: BDPDemography;
  childHealth: ChildHealthDemographics;
  womenRepresentation: WomenRepresentation;
  womenInBarangay: WomenInBarangay;
  drrmData: DRRMData;
  fiscalInfo: FiscalInformation;
  facilities: Facilities;
  communityFacilities: BasicCommunityFacilities;
  officials: BarangayOfficials;
  institutions: BarangayBasedInstitutions;
  dateCreated: string;
  dateUpdated: string;
}

// ============================================
// INITIAL DATA
// ============================================
const initialBDPData: BDPData = {
  id: 1,
  barangay: 'Sta. Lucia',
  period: '2023-2028',
  status: 'adopted',
  demography: {
    id: 1,
    barangayName: 'Sta. Lucia',
    totalPopulation: 48250,
    malePopulation: 23800,
    femalePopulation: 24450,
    numberOfHouseholds: 12410,
    averageHouseholdSize: 3.9,
    totalFamilies: 11200,
    populationDensity: 120,
    dateUpdated: '2026-08-22'
  },
  childHealth: {
    id: 1,
    bdpId: 1,
    liveBirths: { male: 450, female: 420, total: 870 },
    malnourishedChildren: { total: 85, male: 42 },
    infantMortality: { total: 8, male: 5 },
    deathsByAge: {
      under5: { male: 3, female: 2 },
      '5-9': { male: 1, female: 1 },
      '10-14': { male: 0, female: 1 },
      '15-19': { male: 1, female: 0 },
      '20-24': { male: 2, female: 1 },
      '25-29': { male: 1, female: 1 },
      '30-34': { male: 2, female: 1 },
      '35-39': { male: 1, female: 2 },
      '40-44': { male: 2, female: 1 },
      '45-49': { male: 3, female: 2 },
      '50-54': { male: 4, female: 3 },
      '55-59': { male: 5, female: 4 },
      '60-64': { male: 6, female: 5 },
      '65-69': { male: 7, female: 6 },
      '70-74': { male: 8, female: 7 },
      '75-80': { male: 6, female: 8 },
      '80andOver': { male: 4, female: 5 }
    },
    deathsByCause: {
      heartDisease: 12,
      cancer: 8,
      respiratory: 10,
      stroke: 6,
      accidents: 4,
      alzheimers: 3,
      diabetes: 5,
      pneumoniaInfluenza: 7,
      kidneyDisease: 4,
      suicide: 1,
      hiv: 0,
      otherCauses: 8
    },
    maternalMortality: {
      age12to17: 0,
      age18to24: 1,
      age25to34: 2,
      age35to44: 1,
      age45plus: 0
    }
  },
  womenRepresentation: {
    id: 1,
    bdpId: 1,
    sangguniangBarangay: 3,
    sangguniangKabataan: 4,
    barangayDevelopmentCouncil: 5,
    barangayPeaceOrderCouncil: 4,
    barangayAntiDrugAbuseCouncil: 3,
    barangayDRRMC: 4,
    barangayCouncilProtectionChildren: 6,
    womenHeadsHouseholds: 3200,
    womenBusinessOwners: 850,
    livelihoodProgramsForWomen: 12,
    womenCooperativeMembers: 450
  },
  womenInBarangay: {
    id: 1,
    bdpId: 1,
    womenBarangayStaff: 15,
    womenTanods: 8,
    womenBHWs: 25,
    womenLupongTagapamayapa: 6,
    womenAvailingMaternalCare: 120,
    womenAvailingFamilyPlanning: 250,
    womenAvailingCounseling: 80,
    womenAvailingDiseaseControl: 150,
    womenAvailingPapSmear: 60,
    womenAvailingBreastCancerExam: 45,
    womenUsingLyingInFacilities: 100,
    womenUsingSeparateToilets: 0,
    womenUsingVAWDesk: 1,
    womenUsingStreetlighting: 0,
    genderSensitivityTrainingParticipants: 45,
    womenRelatedLawsOrientationParticipants: 38,
    genderResponsivePlanningParticipants: 30,
    vawComplaintsReceived: 15,
    vawComplaintsActedUpon: 12,
    vawcVictims: 12,
    vawcCases: 15,
    vawcPhysical: 6,
    vawcSexual: 2,
    vawcEconomic: 4,
    vawcPsychological: 3,
    vawcCasesActedUpon: 12
  },
  drrmData: {
    id: 1,
    bdpId: 1,
    garbageCollectionFrequency: 'Daily',
    materialsRecoveryFacilities: 2,
    hazardFrequency: {
      typhoon: '4-5/year',
      flood: '2-3/year',
      earthquake: '1-2/year',
      tsunami: 'Rare',
      volcanicEruption: 'Rare',
      stormSurge: '1/year'
    },
    hazardProneAreas: {
      typhoon: 'All zones',
      flood: 'Zone 3, 5, 7',
      earthquake: 'All zones',
      tsunami: 'Coastal areas',
      volcanicEruption: 'N/A',
      stormSurge: 'Coastal areas'
    },
    populationAffected: {
      typhoon: 2500,
      flood: 1800,
      earthquake: 500,
      tsunami: 0,
      volcanicEruption: 0,
      stormSurge: 800
    },
    drrmFacilities: {
      barangayOperationCenter: { location: 'Barangay Hall', remarks: 'Fully operational' },
      evacuationCenter: { location: 'Sta. Lucia Elementary School', remarks: 'Capacity: 200' },
      floodDrainageFacilities: { location: 'Zone 3, 5, 7', remarks: 'Functional' },
      rainWaterCollecting: { location: 'Zone 2', remarks: '1 unit' },
      spineBoard: { location: 'Health Center', remarks: '2 units' },
      axe: { location: 'Operation Center', remarks: '5 units' },
      fuel: { location: 'Operation Center', remarks: '100L reserve' },
      emergencyKit: { location: 'Operation Center', remarks: '20 kits' },
      handheldRadio: { location: 'Operation Center', remarks: '10 units' },
      hardhats: { location: 'Operation Center', remarks: '30 units' },
      batteries: { location: 'Operation Center', remarks: '50 units' },
      portableGenerator: { location: 'Barangay Hall', remarks: '2 units - 10kW' },
      boots: { location: 'Operation Center', remarks: '20 pairs' },
      ropes: { location: 'Operation Center', remarks: '10 coils' },
      searchLights: { location: 'Operation Center', remarks: '10 units' },
      ppe: { location: 'Operation Center', remarks: '20 sets' },
      flashLights: { location: 'Operation Center', remarks: '15 units' },
      megaphone: { location: 'Operation Center', remarks: '3 units' },
      chainsaw: { location: 'Operation Center', remarks: '2 units' },
      ladders: { location: 'Operation Center', remarks: '4 units' },
      handTools: { location: 'Operation Center', remarks: '20 sets' }
    },
    drrmSystems: {
      contingencyPlan: 'Approved 2025',
      communityRiskAssessment: 'Updated 2025',
      drrmInformationSystem: 'Integrated',
      incidentCommandSystem: 'Trained personnel',
      earlyWarningSystem: 'Operational',
      landClassification: {
        landlocked: 0,
        forest: 150,
        agricultural: 450,
        urban: 850,
        coastalMarine: 200,
        freshwaterEcosystem: 50
      },
      endangeredSpecies: 3
    }
  },
  fiscalInfo: {
    id: 1,
    bdpId: 1,
    incomeSources: {
      ira: 4500000,
      donationGrant: 500000,
      shareNationalWealth: 100000,
      subsidy: 200000,
      rptShare: 300000,
      feesCharges: 150000,
      otherSources: 100000
    },
    householdIncome: {
      agricultural: 2500000,
      fishing: 1500000,
      commercial: 3000000,
      industrial: 1000000
    },
    laborForce: { male: 15000, female: 12000 },
    employedPersons: {
      private: { male: 6000, female: 4000 },
      public: { male: 1000, female: 1500 },
      selfEmployed: { male: 3000, female: 2000 }
    },
    livelihood: {
      farming: 2500,
      fishing: 800,
      poultryLivestock: 600,
      carpentry: 400,
      professional: 500,
      governmentEmployee: 800,
      privateEmployee: 3000,
      vending: 1500,
      licensedDriver: 300,
      baker: 100,
      porter: 200,
      masseur: 50,
      househelpers: 400,
      electricians: 150,
      laborer: 2000,
      mining: 0,
      lending: 100
    },
    agriculturalCrops: {
      rice: 250,
      corn: 80,
      sugar: 0,
      coconuts: 120,
      garlic: 30,
      onion: 25,
      fruits: 60,
      vegetables: 45,
      others: 20
    }
  },
  facilities: {
    id: 1,
    bdpId: 1,
    healthFacilities: {
      hospital: 0,
      healthCenters: 1,
      healthStations: 3,
      lyingInBirthing: 1,
      privateClinics: 2
    },
    educationalFacilities: {
      dayCareCenters: 5,
      primarySchools: 3,
      secondarySchools: 2,
      tertiarySchools: 0,
      readingCenters: 2
    },
    communityFacilities: {
      socializedHousing: 2,
      policeCommunityPrecincts: 1,
      barangayTanodOutposts: 3
    },
    commercialEstablishments: {
      sariSariStore: 250,
      groceryWholesale: 15,
      publicMarket: 1,
      satelliteMarket: 2,
      buyingStation: 3,
      businessEstablishments: 45,
      hotels: 0,
      others: 20
    },
    roadBridgeInfrastructure: {
      roadsStreets: 15,
      bridges: 2
    },
    transportationFacilities: {
      airports: 0,
      ports: 0,
      terminals: 1,
      parkingLots: 2
    },
    registeredVehicles: {
      tricycle: 350,
      jeepney: 25,
      pedicabs: 80,
      others: 30
    },
    communicationUtilities: {
      telecommunicationUnits: 3,
      householdsWithElectricity: 12400,
      powerUtilities: 1
    },
    waterSupply: {
      type1System: 8000,
      type2System: 2000,
      otherSources: 2410,
      waterSourceLocations: 'Zone 1, 2, 3'
    }
  },
  communityFacilities: {
    id: 1,
    bdpId: 1,
    facilities: {
      barangayHall: { quantity: 1, status: 'operational' },
      dayCareCenters: { quantity: 5, status: 'operational' },
      informationLearningCenter: { quantity: 2, status: 'operational' },
      multiPurposeHall: { quantity: 1, status: 'operational' },
      plaza: { quantity: 1, status: 'operational' },
      farmProduceCollection: { quantity: 2, status: 'operational' }
    }
  },
  officials: {
    id: 1,
    bdpId: 1,
    punongBarangay: 'Kapitan Juan Dela Cruz',
    sbMembers: ['Hon. Maria Santos', 'Hon. Jose Rizal', 'Hon. Andres Bonifacio', 'Hon. Emilio Aguinaldo', 'Hon. Apolinario Mabini', 'Hon. Gabriela Silang', 'Hon. Melchora Aquino'],
    skChairperson: 'SK Chairperson Juan Luna',
    skMembers: ['SK Member 1', 'SK Member 2', 'SK Member 3', 'SK Member 4', 'SK Member 5', 'SK Member 6', 'SK Member 7'],
    barangaySecretary: 'Ana Reyes',
    skSecretary: 'SK Secretary Maria Clara',
    barangayTreasurer: 'Jose Panganiban',
    skTreasurer: 'SK Treasurer Josefa Llanes',
    dayCareWorkers: {
      barangay: 10,
      cityMunicipality: 5
    },
    healthNutritionStaff: {
      barangayHealthWorkers: 25,
      barangayNutritionScholars: 8
    },
    otherBarangayStaff: {
      barangayVAWDeskOfficer: 2,
      badacDutyOfficer: 3,
      kasambahayDeskOfficer: 1,
      bhrao: 1
    },
    barangayTanods: 30,
    lupongTagapamayapa: 12
  },
  institutions: {
    id: 1,
    bdpId: 1,
    bdc: true,
    badac: true,
    bpoc: true,
    bcpc: true,
    beswmc: true,
    bdrrmc: true,
    bfarmc: true,
    bpfdc: false,
    accreditedCSOs: [
      { category: 'Women\'s Group', quantity: 3 },
      { category: 'Youth Organization', quantity: 2 },
      { category: 'Farmers Association', quantity: 1 }
    ],
    bdcMembers: 15,
    badacMembers: 12,
    bpocMembers: 10,
    bcpcMembers: 8,
    beswmcMembers: 7,
    bdrrmcMembers: 12,
    bfarmcMembers: 0,
    bpfdcMembers: 0
  },
  dateCreated: '2025-01-15',
  dateUpdated: '2026-08-22'
};

// ============================================
// MAIN BDP PAGE
// ============================================
export default function DevelopmentPlanPage() {
  const [activeForm, setActiveForm] = useState<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'h9' | 'h10' | 'dashboard'>('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Main data state
  const [bdpData, setBdpData] = useState<BDPData>(initialBDPData);

  // Edit mode states
  const [editingForm, setEditingForm] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalFields, setModalFields] = useState<{ key: string; label: string; value: any; type: string }[]>([]);

  // ============================================
  // FORM DEFINITIONS
  // ============================================

  const forms = [
    { id: 'h1', label: 'Form H1', title: 'BDP Demography', icon: Users },
    { id: 'h2', label: 'Form H2', title: 'Child Health & Demographics', icon: Baby },
    { id: 'h3', label: 'Form H3', title: 'Women Representation', icon: Users },
    { id: 'h4', label: 'Form H4', title: 'Women in Barangay / VAW', icon: Heart },
    { id: 'h5', label: 'Form H5', title: 'DRRM-Related Data', icon: Shield },
    { id: 'h6', label: 'Form H6', title: 'Fiscal Information / Livelihood', icon: Wallet },
    { id: 'h7', label: 'Form H7', title: 'Health / Education / Facilities', icon: Building2 },
    { id: 'h8', label: 'Form H8', title: 'Basic Community Facilities', icon: Home },
    { id: 'h9', label: 'Form H9', title: 'Barangay Officials', icon: User },
    { id: 'h10', label: 'Form H10', title: 'Barangay-Based Institutions', icon: Landmark }
  ];

  // ============================================
  // EDIT HANDLERS
  // ============================================

  const openEditModal = (formId: string, data: any, title: string, fields: { key: string; label: string; value: any; type: string }[]) => {
    setEditingForm(formId);
    setEditData({ ...data });
    setModalTitle(title);
    setModalFields(fields);
    setIsModalOpen(true);
  };

  const handleFieldChange = (key: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleNestedFieldChange = (parent: string, key: string, value: any) => {
    setEditData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value
      }
    }));
  };

  const handleSaveEdit = () => {
    if (!editingForm) return;

    switch(editingForm) {
      case 'h1':
        setBdpData({ ...bdpData, demography: editData });
        break;
      case 'h2':
        setBdpData({ ...bdpData, childHealth: editData });
        break;
      case 'h3':
        setBdpData({ ...bdpData, womenRepresentation: editData });
        break;
      case 'h4':
        setBdpData({ ...bdpData, womenInBarangay: editData });
        break;
      case 'h5':
        setBdpData({ ...bdpData, drrmData: editData });
        break;
      case 'h6':
        setBdpData({ ...bdpData, fiscalInfo: editData });
        break;
      case 'h7':
        setBdpData({ ...bdpData, facilities: editData });
        break;
      case 'h8':
        setBdpData({ ...bdpData, communityFacilities: editData });
        break;
      case 'h9':
        setBdpData({ ...bdpData, officials: editData });
        break;
      case 'h10':
        setBdpData({ ...bdpData, institutions: editData });
        break;
    }

    // Update timestamp
    setBdpData((prev) => ({
      ...prev,
      dateUpdated: new Date().toISOString().split('T')[0]
    }));

    setIsModalOpen(false);
    setEditingForm(null);
    setEditData(null);
  };

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  const renderContent = () => {
    switch(activeForm) {
      case 'dashboard':
        return <DashboardTab bdpData={bdpData} />;
      case 'h1':
        return <FormH1 data={bdpData.demography} onEdit={() => {
          const fields = [
            { key: 'barangayName', label: 'Barangay Name', value: bdpData.demography.barangayName, type: 'text' },
            { key: 'totalPopulation', label: 'Total Population', value: bdpData.demography.totalPopulation, type: 'number' },
            { key: 'malePopulation', label: 'Male Population', value: bdpData.demography.malePopulation, type: 'number' },
            { key: 'femalePopulation', label: 'Female Population', value: bdpData.demography.femalePopulation, type: 'number' },
            { key: 'numberOfHouseholds', label: 'Number of Households', value: bdpData.demography.numberOfHouseholds, type: 'number' },
            { key: 'averageHouseholdSize', label: 'Average Household Size', value: bdpData.demography.averageHouseholdSize, type: 'number' },
            { key: 'totalFamilies', label: 'Total Families', value: bdpData.demography.totalFamilies, type: 'number' },
            { key: 'populationDensity', label: 'Population Density', value: bdpData.demography.populationDensity, type: 'number' }
          ];
          openEditModal('h1', bdpData.demography, 'Edit BDP Demography (Form H1)', fields);
        }} />;
      case 'h2':
        return <FormH2 data={bdpData.childHealth} onEdit={() => {
          const fields = [
            { key: 'liveBirths', label: 'Live Births (Total)', value: bdpData.childHealth.liveBirths.total, type: 'number' },
            { key: 'malnourishedChildren', label: 'Malnourished Children', value: bdpData.childHealth.malnourishedChildren.total, type: 'number' },
            { key: 'infantMortality', label: 'Infant Mortality', value: bdpData.childHealth.infantMortality.total, type: 'number' }
          ];
          openEditModal('h2', bdpData.childHealth, 'Edit Child Health & Demographics (Form H2)', fields);
        }} />;
      case 'h3':
        return <FormH3 data={bdpData.womenRepresentation} onEdit={() => {
          const fields = [
            { key: 'sangguniangBarangay', label: 'Women in SB', value: bdpData.womenRepresentation.sangguniangBarangay, type: 'number' },
            { key: 'sangguniangKabataan', label: 'Women in SK', value: bdpData.womenRepresentation.sangguniangKabataan, type: 'number' },
            { key: 'barangayDevelopmentCouncil', label: 'Women in BDC', value: bdpData.womenRepresentation.barangayDevelopmentCouncil, type: 'number' },
            { key: 'womenHeadsHouseholds', label: 'Women Heads of Households', value: bdpData.womenRepresentation.womenHeadsHouseholds, type: 'number' }
          ];
          openEditModal('h3', bdpData.womenRepresentation, 'Edit Women Representation (Form H3)', fields);
        }} />;
      case 'h4':
        return <FormH4 data={bdpData.womenInBarangay} onEdit={() => {
          const fields = [
            { key: 'womenBHWs', label: 'Women BHWs', value: bdpData.womenInBarangay.womenBHWs, type: 'number' },
            { key: 'womenTanods', label: 'Women Tanods', value: bdpData.womenInBarangay.womenTanods, type: 'number' },
            { key: 'vawComplaintsReceived', label: 'VAW Complaints Received', value: bdpData.womenInBarangay.vawComplaintsReceived, type: 'number' },
            { key: 'vawcCases', label: 'VAWC Cases', value: bdpData.womenInBarangay.vawcCases, type: 'number' }
          ];
          openEditModal('h4', bdpData.womenInBarangay, 'Edit Women in Barangay / VAW (Form H4)', fields);
        }} />;
      case 'h5':
        return <FormH5 data={bdpData.drrmData} onEdit={() => {
          const fields = [
            { key: 'garbageCollectionFrequency', label: 'Garbage Collection Frequency', value: bdpData.drrmData.garbageCollectionFrequency, type: 'text' },
            { key: 'materialsRecoveryFacilities', label: 'MRF Count', value: bdpData.drrmData.materialsRecoveryFacilities, type: 'number' }
          ];
          openEditModal('h5', bdpData.drrmData, 'Edit DRRM-Related Data (Form H5)', fields);
        }} />;
      case 'h6':
        return <FormH6 data={bdpData.fiscalInfo} onEdit={() => {
          const fields = [
            { key: 'incomeSources', label: 'IRA Amount', value: bdpData.fiscalInfo.incomeSources.ira, type: 'number' },
            { key: 'laborForce', label: 'Labor Force (Total)', value: bdpData.fiscalInfo.laborForce.male + bdpData.fiscalInfo.laborForce.female, type: 'number' }
          ];
          openEditModal('h6', bdpData.fiscalInfo, 'Edit Fiscal Information (Form H6)', fields);
        }} />;
      case 'h7':
        return <FormH7 data={bdpData.facilities} onEdit={() => {
          const fields = [
            { key: 'healthCenters', label: 'Health Centers', value: bdpData.facilities.healthFacilities.healthCenters, type: 'number' },
            { key: 'primarySchools', label: 'Primary Schools', value: bdpData.facilities.educationalFacilities.primarySchools, type: 'number' }
          ];
          openEditModal('h7', bdpData.facilities, 'Edit Facilities (Form H7)', fields);
        }} />;
      case 'h8':
        return <FormH8 data={bdpData.communityFacilities} onEdit={() => {
          const fields = [
            { key: 'barangayHall', label: 'Barangay Hall Quantity', value: bdpData.communityFacilities.facilities.barangayHall.quantity, type: 'number' },
            { key: 'dayCareCenters', label: 'Day Care Centers Quantity', value: bdpData.communityFacilities.facilities.dayCareCenters.quantity, type: 'number' }
          ];
          openEditModal('h8', bdpData.communityFacilities, 'Edit Community Facilities (Form H8)', fields);
        }} />;
      case 'h9':
        return <FormH9 data={bdpData.officials} onEdit={() => {
          const fields = [
            { key: 'punongBarangay', label: 'Punong Barangay', value: bdpData.officials.punongBarangay, type: 'text' },
            { key: 'barangaySecretary', label: 'Barangay Secretary', value: bdpData.officials.barangaySecretary, type: 'text' },
            { key: 'barangayTanods', label: 'Number of Tanods', value: bdpData.officials.barangayTanods, type: 'number' }
          ];
          openEditModal('h9', bdpData.officials, 'Edit Barangay Officials (Form H9)', fields);
        }} />;
      case 'h10':
        return <FormH10 data={bdpData.institutions} onEdit={() => {
          const fields = [
            { key: 'bdcMembers', label: 'BDC Members', value: bdpData.institutions.bdcMembers, type: 'number' },
            { key: 'badacMembers', label: 'BADAC Members', value: bdpData.institutions.badacMembers, type: 'number' }
          ];
          openEditModal('h10', bdpData.institutions, 'Edit Barangay-Based Institutions (Form H10)', fields);
        }} />;
      default:
        return <div>Select a form</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Map className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900">BDP</h1>
                <p className="text-[10px] text-slate-500">Barangay Development Plan</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              bdpData.status === 'adopted' ? 'bg-emerald-100 text-emerald-800' :
              bdpData.status === 'for-adoption' ? 'bg-amber-100 text-amber-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {bdpData.status.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400">Updated: {bdpData.dateUpdated}</span>
          </div>
        </div>
      </div>

      {/* Form Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="flex gap-1 px-4 max-w-7xl mx-auto overflow-x-auto">
          <button
            onClick={() => setActiveForm('dashboard')}
            className={`px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
              activeForm === 'dashboard'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Dashboard
          </button>
          {forms.map((form) => {
            const Icon = form.icon;
            const isActive = activeForm === form.id;
            return (
              <button
                key={form.id}
                onClick={() => setActiveForm(form.id as any)}
                className={`px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4 inline mr-2" />
                {form.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6">
        {renderContent()}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{modalTitle}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {modalFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={field.type === 'number' ? Number(field.value) : field.value}
                    onChange={(e) => {
                      const value = field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
                      // Handle nested fields (e.g., incomeSources.ira, laborForce.male)
                      if (field.key.includes('.')) {
                        const parts = field.key.split('.');
                        const parent = parts[0];
                        const child = parts[1];
                        handleNestedFieldChange(parent, child, value);
                      } else {
                        handleFieldChange(field.key, value);
                      }
                    }}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// DASHBOARD TAB
// ============================================
function DashboardTab({ bdpData }: { bdpData: BDPData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Population</p>
          <p className="text-2xl font-bold text-slate-900">{bdpData.demography.totalPopulation.toLocaleString()}</p>
          <p className="text-xs text-slate-500">{bdpData.demography.numberOfHouseholds.toLocaleString()} households</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Women Representation</p>
          <p className="text-2xl font-bold text-slate-900">{bdpData.womenRepresentation.sangguniangBarangay}</p>
          <p className="text-xs text-slate-500">in Sangguniang Barangay</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Budget</p>
          <p className="text-2xl font-bold text-slate-900">
            ₱{(bdpData.fiscalInfo.incomeSources.ira + bdpData.fiscalInfo.incomeSources.donationGrant + bdpData.fiscalInfo.incomeSources.rptShare).toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">Annual Barangay Budget</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">BDP Status</p>
          <p className="text-2xl font-bold text-slate-900">{bdpData.period}</p>
          <p className="text-xs text-slate-500">{bdpData.status.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Live Births (Annual)</span>
              <span className="font-medium">{bdpData.childHealth.liveBirths.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Infant Mortality</span>
              <span className="font-medium">{bdpData.childHealth.infantMortality.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Malnourished Children</span>
              <span className="font-medium">{bdpData.childHealth.malnourishedChildren.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">VAW Cases</span>
              <span className="font-medium">{bdpData.womenInBarangay.vawcCases}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">BBIs Present</h3>
          <div className="space-y-1">
            {[
              { key: 'bdc', label: 'BDC' },
              { key: 'badac', label: 'BADAC' },
              { key: 'bpoc', label: 'BPOC' },
              { key: 'bcpc', label: 'BCPC' },
              { key: 'bdrrmc', label: 'BDRRMC' }
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-2 text-sm">
                <span className={bdpData.institutions[item.key as keyof typeof bdpData.institutions] ? 'text-emerald-600' : 'text-red-500'}>
                  {bdpData.institutions[item.key as keyof typeof bdpData.institutions] ? '✅' : '❌'}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FORM H1: BDP Demography
// ============================================
function FormH1({ data, onEdit }: { data: BDPDemography; onEdit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H1: BDP Demography</h2>
          <p className="text-sm text-slate-500">Barangay demographic profile</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Barangay Demographics</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Barangay</p>
            <p className="text-base font-medium">{data.barangayName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Date Updated</p>
            <p className="text-base font-medium">{data.dateUpdated}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Population</p>
            <p className="text-base font-medium">{data.totalPopulation.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Gender Distribution</p>
            <p className="text-base font-medium">Male: {data.malePopulation.toLocaleString()} | Female: {data.femalePopulation.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Households</p>
            <p className="text-base font-medium">{data.numberOfHouseholds.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Avg Household Size</p>
            <p className="text-base font-medium">{data.averageHouseholdSize}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Families</p>
            <p className="text-base font-medium">{data.totalFamilies.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Population Density</p>
            <p className="text-base font-medium">{data.populationDensity}/km²</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FORM H2: Child Health & Demographics
// ============================================
function FormH2({ data, onEdit }: { data: ChildHealthDemographics; onEdit: () => void }) {
  const ageGroups = [
    { key: 'under5', label: 'Under 5' },
    { key: '5-9', label: '5-9' },
    { key: '10-14', label: '10-14' },
    { key: '15-19', label: '15-19' },
    { key: '20-24', label: '20-24' },
    { key: '25-29', label: '25-29' },
    { key: '30-34', label: '30-34' },
    { key: '35-39', label: '35-39' },
    { key: '40-44', label: '40-44' },
    { key: '45-49', label: '45-49' },
    { key: '50-54', label: '50-54' },
    { key: '55-59', label: '55-59' },
    { key: '60-64', label: '60-64' },
    { key: '65-69', label: '65-69' },
    { key: '70-74', label: '70-74' },
    { key: '75-80', label: '75-80' },
    { key: '80andOver', label: '80 and over' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H2: Child Health & Demographics</h2>
          <p className="text-sm text-slate-500">Child health statistics and demographic data</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Live Births</p>
          <p className="text-xl font-bold text-slate-900">{data.liveBirths.total}</p>
          <p className="text-xs text-slate-500">Male: {data.liveBirths.male} | Female: {data.liveBirths.female}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Malnourished Children</p>
          <p className="text-xl font-bold text-slate-900">{data.malnourishedChildren.total}</p>
          <p className="text-xs text-slate-500">Male: {data.malnourishedChildren.male}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Infant Mortality</p>
          <p className="text-xl font-bold text-slate-900">{data.infantMortality.total}</p>
          <p className="text-xs text-slate-500">Male: {data.infantMortality.male}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Deaths by Age Group</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ageGroups.map((group) => {
              const deaths = data.deathsByAge[group.key as keyof typeof data.deathsByAge];
              return (
                <div key={group.key} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">{group.label}</p>
                  <p className="text-base font-semibold">{deaths.male + deaths.female}</p>
                  <p className="text-xs text-slate-500">M: {deaths.male} | F: {deaths.female}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Deaths by Cause</h3>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(data.deathsByCause).map(([cause, count]) => (
            <div key={cause} className="bg-slate-50 rounded-lg p-3 flex justify-between">
              <span className="text-sm">{cause.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// FORM H3: Women Representation
// ============================================
function FormH3({ data, onEdit }: { data: WomenRepresentation; onEdit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H3: Women Representation</h2>
          <p className="text-sm text-slate-500">Women participation in barangay bodies</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Sangguniang Barangay', value: data.sangguniangBarangay },
          { label: 'Sangguniang Kabataan', value: data.sangguniangKabataan },
          { label: 'Barangay Development Council', value: data.barangayDevelopmentCouncil },
          { label: 'Barangay Peace & Order Council', value: data.barangayPeaceOrderCouncil },
          { label: 'Barangay Anti-Drug Abuse Council', value: data.barangayAntiDrugAbuseCouncil },
          { label: 'Barangay DRRM Committee', value: data.barangayDRRMC },
          { label: 'Barangay Council Protection of Children', value: data.barangayCouncilProtectionChildren }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// FORM H4: Women in Barangay / VAW
// ============================================
function FormH4({ data, onEdit }: { data: WomenInBarangay; onEdit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H4: Women in Barangay / VAW</h2>
          <p className="text-sm text-slate-500">Women participation and Violence Against Women data</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Women BHWs</p>
          <p className="text-2xl font-bold text-slate-900">{data.womenBHWs}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Women Tanods</p>
          <p className="text-2xl font-bold text-slate-900">{data.womenTanods}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">VAW Complaints</p>
          <p className="text-2xl font-bold text-slate-900">{data.vawComplaintsReceived}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">VAWC Cases</p>
          <p className="text-2xl font-bold text-slate-900">{data.vawcCases}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FORM H5: DRRM-Related Data
// ============================================
function FormH5({ data, onEdit }: { data: DRRMData; onEdit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H5: DRRM-Related Data</h2>
          <p className="text-sm text-slate-500">Disaster risk reduction and management data</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Garbage Collection Frequency</p>
          <p className="text-base font-medium">{data.garbageCollectionFrequency}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Materials Recovery Facilities</p>
          <p className="text-base font-medium">{data.materialsRecoveryFacilities}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FORM H6: Fiscal Information / Livelihood
// ============================================
function FormH6({ data, onEdit }: { data: FiscalInformation; onEdit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H6: Fiscal Information / Livelihood</h2>
          <p className="text-sm text-slate-500">Barangay income, labor force, and livelihood data</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Income Sources</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(data.incomeSources).map(([source, amount]) => (
            <div key={source} className="bg-slate-50 rounded-lg p-3 flex justify-between">
              <span className="text-sm">{source.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-medium">₱{amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// FORM H7: Health / Education / Facilities
// ============================================
function FormH7({ data, onEdit }: { data: Facilities; onEdit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H7: Health / Education / Facilities</h2>
          <p className="text-sm text-slate-500">Barangay facilities and services</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Health Facilities</h3>
          </div>
          <div className="p-4 space-y-2">
            {Object.entries(data.healthFacilities).map(([name, count]) => (
              <div key={name} className="flex justify-between text-sm">
                <span>{name.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Educational Facilities</h3>
          </div>
          <div className="p-4 space-y-2">
            {Object.entries(data.educationalFacilities).map(([name, count]) => (
              <div key={name} className="flex justify-between text-sm">
                <span>{name.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Community Facilities</h3>
          </div>
          <div className="p-4 space-y-2">
            {Object.entries(data.communityFacilities).map(([name, count]) => (
              <div key={name} className="flex justify-between text-sm">
                <span>{name.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FORM H8: Basic Community Facilities
// ============================================
function FormH8({ data, onEdit }: { data: BasicCommunityFacilities; onEdit: () => void }) {
  const getStatusBadge = (status: string) => {
    const colors = {
      'operational': 'bg-emerald-100 text-emerald-800',
      'under-maintenance': 'bg-amber-100 text-amber-800',
      'non-operational': 'bg-red-100 text-red-800',
      'needs-repair': 'bg-orange-100 text-orange-800',
      'new': 'bg-blue-100 text-blue-800',
      'planned': 'bg-purple-100 text-purple-800',
      'abandoned': 'bg-slate-100 text-slate-600'
    };
    return colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-600';
  };

  const facilityLabels: Record<string, string> = {
    barangayHall: 'Barangay Hall',
    dayCareCenters: 'Day Care Centers',
    informationLearningCenter: 'Information/Learning Center',
    multiPurposeHall: 'Multi-Purpose Hall',
    plaza: 'Plaza',
    farmProduceCollection: 'Farm Produce Collection/Buying Station'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H8: Basic Community Facilities</h2>
          <p className="text-sm text-slate-500">Inventory of community facilities with status</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data.facilities).map(([key, facility]) => {
          const label = facilityLabels[key] || key;
          return (
            <div key={key} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-900">{label}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(facility.status)}`}>
                  {facility.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">Quantity: {facility.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// FORM H9: Barangay Officials
// ============================================
function FormH9({ data, onEdit }: { data: BarangayOfficials; onEdit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H9: Barangay Officials</h2>
          <p className="text-sm text-slate-500">Barangay officials and staff</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Elected Officials</h3>
          </div>
          <div className="p-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Punong Barangay</span>
              <span className="text-sm">{data.punongBarangay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">SB Members</span>
              <span className="text-sm">{data.sbMembers.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">SK Chairperson</span>
              <span className="text-sm">{data.skChairperson}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Appointed Staff</h3>
          </div>
          <div className="p-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Barangay Secretary</span>
              <span className="text-sm">{data.barangaySecretary}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Barangay Treasurer</span>
              <span className="text-sm">{data.barangayTreasurer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Barangay Tanods</span>
              <span className="text-sm">{data.barangayTanods}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FORM H10: Barangay-Based Institutions
// ============================================
function FormH10({ data, onEdit }: { data: BarangayBasedInstitutions; onEdit: () => void }) {
  const institutions = [
    { key: 'bdc', label: 'Barangay Development Council (BDC)', members: data.bdcMembers },
    { key: 'badac', label: 'Barangay Anti-Drug Abuse Council (BADAC)', members: data.badacMembers },
    { key: 'bpoc', label: 'Barangay Peace & Order Council (BPOC)', members: data.bpocMembers },
    { key: 'bcpc', label: 'Barangay Council Protection of Children (BCPC)', members: data.bcpcMembers },
    { key: 'bdrrmc', label: 'Barangay DRRM Committee (BDRRMC)', members: data.bdrrmcMembers }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Form H10: Barangay-Based Institutions</h2>
          <p className="text-sm text-slate-500">BBIs presence and membership</p>
        </div>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" /> Edit Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {institutions.map((inst) => (
          <div key={inst.key} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900">{inst.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                data[inst.key as keyof BarangayBasedInstitutions] ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {data[inst.key as keyof BarangayBasedInstitutions] ? '✅ Present' : '❌ Not Present'}
              </span>
            </div>
            {data[inst.key as keyof BarangayBasedInstitutions] && (
              <p className="text-sm text-slate-500 mt-1">Members: {inst.members}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}