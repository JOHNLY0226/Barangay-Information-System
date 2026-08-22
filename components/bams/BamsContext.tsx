"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  BarangayProperty,
  PropertyLocation,
  BarangaySupplier,
  AIRReport,
  BarangayAsset,
  PropertyIssuance,
  PropertyReturn,
  ToastMessage,
} from "./types";

// Seed Data for Form E1: Barangay Properties
const initialProperties: BarangayProperty[] = [
  {
    id: "prop-1",
    propertyCode: "PROP-2026-001",
    name: "Barangay Sta. Lucia Multipurpose Complex Hall",
    description: "Main administrative building housing Barangay Hall, Sangguniang Session Room, and Emergency Desk.",
    type: "Infrastructure - Vertical",
    status: "Operational",
    category: "Peace & Order & Safety",
    subcategory: "Administrative Facility",
    dateAdded: "2026-01-10",
  },
  {
    id: "prop-2",
    propertyCode: "PROP-2026-002",
    name: "San Antonio Flood Control Dike & Pumping Station",
    description: "Concrete flood embankment dike with automated submersible pump station along Tullahan tributary.",
    type: "Infrastructure - Water",
    status: "Under Maintenance",
    category: "Disaster Preparedness",
    subcategory: "Flood Control & Storm Drainage",
    dateAdded: "2026-02-15",
  },
  {
    id: "prop-3",
    propertyCode: "PROP-2026-003",
    name: "Toyota Hilux Rescue & Patrol Vehicle #1",
    description: "4x4 Emergency Response unit equipped with siren, emergency lights, and rescue equipment.",
    type: "Non-Infrastructure - Motor Vehicle",
    status: "Operational",
    category: "Disaster Preparedness",
    subcategory: "Emergency Response & Rescue",
    dateAdded: "2026-03-01",
  },
  {
    id: "prop-4",
    propertyCode: "PROP-2026-004",
    name: "Barangay Central CCTV Monitoring Grid Server",
    description: "High-definition 32-channel NVR server and wall display matrix located at BPOC Command Center.",
    type: "Non-Infrastructure - ICT Equipment",
    status: "Operational",
    category: "Peace & Order & Safety",
    subcategory: "Security Infrastructure",
    dateAdded: "2026-03-20",
  },
  {
    id: "prop-5",
    propertyCode: "PROP-2026-005",
    name: "Barangay Evacuation Center Annex (Zone 4)",
    description: "Covered sports complex designated as primary evacuation site during typhoon alerts.",
    type: "Infrastructure - Vertical",
    status: "Available",
    category: "Disaster Preparedness",
    subcategory: "Evacuation Center",
    dateAdded: "2026-04-05",
  },
];

// Seed Data for Form E2: Barangay Property Location
const initialLocations: PropertyLocation[] = [
  {
    id: "loc-1",
    propertyId: "prop-1",
    propertyName: "Barangay Sta. Lucia Multipurpose Complex Hall",
    latitude: 14.7012,
    longitude: 121.0543,
    exactLocation: "123 Katipunan Ave. cor. Regalado Hwy, Brgy. Sta. Lucia, District V, Quezon City",
    geotagSource: "map_picker",
    updatedAt: "2026-01-12",
  },
  {
    id: "loc-2",
    propertyId: "prop-2",
    propertyName: "San Antonio Flood Control Dike & Pumping Station",
    latitude: 14.7058,
    longitude: 121.0589,
    exactLocation: "Block 14 Riverside Drive, San Antonio Area, Brgy. Sta. Lucia, Quezon City",
    geotagSource: "geotagged_photo",
    geotaggedPhotoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=400&q=80",
    updatedAt: "2026-02-16",
  },
  {
    id: "loc-3",
    propertyId: "prop-3",
    propertyName: "Toyota Hilux Rescue & Patrol Vehicle #1",
    latitude: 14.7025,
    longitude: 121.0520,
    exactLocation: "Barangay Motorpool Annex, Quirino Highway, Brgy. Sta. Lucia, Quezon City",
    geotagSource: "manual",
    updatedAt: "2026-03-02",
  },
];

// Seed Data for Form E3: Barangay Supplier
const initialSuppliers: BarangaySupplier[] = [
  {
    id: "sup-1",
    supplierCode: "SUP-2026-001",
    supplierName: "Fil-Safety Equipment & Tactical Corp.",
    address: "789 EDSA cor. West Ave, Quezon City",
    tin: "234-567-890-000",
    contactPerson: "Engr. Ramon Santos",
    contactNumber: "0917-555-0192",
    email: "sales@filsafety.com.ph",
    dtiSecRegNo: "CS201845123",
    philGepsNo: "2021-987654",
    isActive: true,
    dateRegistered: "2026-01-05",
  },
  {
    id: "sup-[#E5A623]",
    supplierCode: "SUP-2026-002",
    supplierName: "QC Heavy Tech & Motors Sales",
    address: "45 Mindanao Avenue, Project 8, Quezon City",
    tin: "109-876-543-000",
    contactPerson: "Maria Clara Cruz",
    contactNumber: "0920-888-4321",
    email: "info@qcheavytech.ph",
    dtiSecRegNo: "CS201999812",
    philGepsNo: "2020-456123",
    isActive: true,
    dateRegistered: "2026-01-18",
  },
  {
    id: "sup-3",
    supplierCode: "SUP-2026-003",
    supplierName: "Metro Manila IT Solutions Inc.",
    address: "102 Fairview Center Mall Commercial Complex, Quezon City",
    tin: "456-789-012-000",
    contactPerson: "David Tan",
    contactNumber: "0918-333-7711",
    email: "bids@mmit-solutions.com",
    dtiSecRegNo: "CS202011234",
    philGepsNo: "2023-112233",
    isActive: true,
    dateRegistered: "2026-02-10",
  },
];

// Seed Data for Form E4: Barangay Acceptance and Inspection Report (A.I.R.)
const initialAirReports: AIRReport[] = [
  {
    id: "air-1",
    airNumber: "AIR-2026-001",
    drNumber: "DR-88901",
    supplierId: "sup-1",
    supplierName: "Fil-Safety Equipment & Tactical Corp.",
    deliveryStatus: "Accepted",
    inspectedBy: "Kgwd. Jose Rizal (Committee on Asset Audit)",
    approvedBy: "Punong Barangay Juan Dela Cruz",
    inspectedDate: "2026-02-10",
    acceptedDate: "2026-02-11",
    remarks: "All 15 Motorola VHF radios delivered in factory sealed boxes with charger docks.",
  },
  {
    id: "air-2",
    airNumber: "AIR-2026-002",
    drNumber: "DR-77412",
    supplierId: "sup-3",
    supplierName: "Metro Manila IT Solutions Inc.",
    deliveryStatus: "Accepted",
    inspectedBy: "IT Admin Staff Sarah Lin",
    approvedBy: "Punong Barangay Juan Dela Cruz",
    inspectedDate: "2026-03-22",
    acceptedDate: "2026-03-23",
    remarks: "32-channel NVR server passed full bandwidth burn-in test.",
  },
];

// Seed Data for Form E5: Barangay Asset
const initialAssets: BarangayAsset[] = [
  {
    id: "asset-1",
    uacsCode: "1-07-05-020",
    classification: "Property Plant and Equipment (PPE)",
    unitOfMeasure: "units",
    itemName: "Motorola Two-Way Radio Transceiver Set",
    quantity: 15,
    unitPrice: 8500,
    totalValuation: 127500,
    description: "VHF Heavy-duty waterproof handheld radios for Tanod and Rescue teams.",
    dateAdded: "2026-02-12",
  },
  {
    id: "asset-2",
    uacsCode: "1-07-05-030",
    classification: "Property Plant and Equipment (PPE)",
    unitOfMeasure: "units",
    itemName: "High-Capacity Submersible Water Pump 5HP",
    quantity: 3,
    unitPrice: 45000,
    totalValuation: 135000,
    description: "Heavy discharge flood control pump with diesel generator bypass.",
    dateAdded: "2026-02-18",
  },
  {
    id: "asset-3",
    uacsCode: "1-07-04-020",
    classification: "Semi-Expendable",
    unitOfMeasure: "pcs",
    itemName: "Foldable Evacuation Stretcher Bed",
    quantity: 25,
    unitPrice: 2400,
    totalValuation: 60000,
    description: "Aluminum alloy emergency rescue folding stretchers with safety straps.",
    dateAdded: "2026-03-05",
  },
  {
    id: "asset-4",
    uacsCode: "1-07-04-010",
    classification: "Expendable",
    unitOfMeasure: "pcs",
    itemName: "Emergency LED Searchlight Flashlight",
    quantity: 50,
    unitPrice: 650,
    totalValuation: 32500,
    description: "Rechargeable 20W high-lumen waterproof tactical flashlights.",
    dateAdded: "2026-03-15",
  },
];

// Seed Data for Form E6: Property Issuance
const initialIssuances: PropertyIssuance[] = [
  {
    id: "iss-1",
    issuanceType: "PAR",
    issuanceNumber: "PAR-2026-001",
    requestingOffice: "BPOC / Tanod Security Desk",
    issuedDate: "2026-02-15",
    issuedBy: "Property Custodian Alan Poe",
    receivedBy: "Chief Officer Mario Santos",
    contactNumber: "0919-111-2233",
    purpose: "Nightly Barangay peace and order patrol operations in Zone 1 to 5.",
    items: [
      {
        assetId: "asset-1",
        itemName: "Motorola Two-Way Radio Transceiver Set",
        uacsCode: "1-07-05-020",
        quantityIssued: 4,
        unitPrice: 8500,
        unitOfMeasure: "units",
      },
    ],
    status: "Issued",
  },
  {
    id: "iss-2",
    issuanceType: "ICS",
    issuanceNumber: "ICS-2026-002",
    requestingOffice: "BDRRMC Emergency Operations Center",
    issuedDate: "2026-03-10",
    issuedBy: "Property Custodian Alan Poe",
    receivedBy: "Captain Teresa Gomez",
    contactNumber: "0917-444-5566",
    purpose: "Monsoon readiness and rescue staging at Evacuation Complex.",
    items: [
      {
        assetId: "asset-3",
        itemName: "Foldable Evacuation Stretcher Bed",
        uacsCode: "1-07-04-020",
        quantityIssued: 10,
        unitPrice: 2400,
        unitOfMeasure: "pcs",
      },
    ],
    status: "Partially Returned",
  },
];

// Seed Data for Form E7: Property Return
const initialReturns: PropertyReturn[] = [
  {
    id: "ret-1",
    returnNumber: "RET-2026-001",
    issuanceId: "iss-2",
    issuanceNumber: "ICS-2026-002",
    returnedBy: "Captain Teresa Gomez",
    receivedBy: "Property Custodian Alan Poe",
    returnDate: "2026-03-18",
    itemsReturned: [
      {
        assetId: "asset-3",
        itemName: "Foldable Evacuation Stretcher Bed",
        quantityReturned: 5,
        conditionStatus: "Good Condition",
      },
    ],
    reasonForReturn: "Post-typhoon drill cleanup and storage back to central warehouse.",
  },
];

interface BamsContextType {
  properties: BarangayProperty[];
  locations: PropertyLocation[];
  suppliers: BarangaySupplier[];
  airReports: AIRReport[];
  assets: BarangayAsset[];
  issuances: PropertyIssuance[];
  returns: PropertyReturn[];
  toasts: ToastMessage[];

  // Actions
  addProperty: (prop: Omit<BarangayProperty, "id" | "propertyCode" | "dateAdded">) => void;
  updatePropertyStatus: (id: string, status: BarangayProperty["status"]) => void;
  deleteProperty: (id: string) => void;

  saveLocation: (loc: Omit<PropertyLocation, "id" | "updatedAt">) => void;

  addSupplier: (sup: Omit<BarangaySupplier, "id" | "supplierCode" | "dateRegistered">) => void;
  toggleSupplierActive: (id: string) => void;

  addAIRReport: (air: Omit<AIRReport, "id" | "airNumber">) => void;

  addAsset: (asset: Omit<BarangayAsset, "id" | "totalValuation" | "dateAdded">) => void;
  updateAsset: (id: string, asset: Omit<BarangayAsset, "id" | "totalValuation" | "dateAdded">) => void;

  addIssuance: (iss: Omit<PropertyIssuance, "id" | "issuanceNumber" | "status">) => void;

  addReturn: (ret: Omit<PropertyReturn, "id" | "returnNumber">) => void;

  showToast: (title: string, message: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

const BamsContext = createContext<BamsContextType | undefined>(undefined);

export const BamsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<BarangayProperty[]>(initialProperties);
  const [locations, setLocations] = useState<PropertyLocation[]>(initialLocations);
  const [suppliers, setSuppliers] = useState<BarangaySupplier[]>(initialSuppliers);
  const [airReports, setAirReports] = useState<AIRReport[]>(initialAirReports);
  const [assets, setAssets] = useState<BarangayAsset[]>(initialAssets);
  const [issuances, setIssuances] = useState<PropertyIssuance[]>(initialIssuances);
  const [returns, setReturns] = useState<PropertyReturn[]>(initialReturns);
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

  // E1 Actions
  const addProperty = (propData: Omit<BarangayProperty, "id" | "propertyCode" | "dateAdded">) => {
    const count = properties.length + 1;
    const propertyCode = `PROP-2026-${count.toString().padStart(3, "0")}`;
    const newProp: BarangayProperty = {
      ...propData,
      id: `prop-${Date.now()}`,
      propertyCode,
      dateAdded: new Date().toISOString().split("T")[0],
    };
    setProperties((prev) => [newProp, ...prev]);
    showToast("Property Registered", `Added ${newProp.name} to E1 Property Registry.`);
  };

  const updatePropertyStatus = (id: string, status: BarangayProperty["status"]) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    showToast("Status Updated", "Property operational status updated.");
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast("Property Removed", "Property record deleted.", "info");
  };

  // E2 Actions
  const saveLocation = (locData: Omit<PropertyLocation, "id" | "updatedAt">) => {
    setLocations((prev) => {
      const existing = prev.find((l) => l.propertyId === locData.propertyId);
      if (existing) {
        return prev.map((l) =>
          l.propertyId === locData.propertyId
            ? { ...locData, id: l.id, updatedAt: new Date().toISOString().split("T")[0] }
            : l
        );
      } else {
        return [
          {
            ...locData,
            id: `loc-${Date.now()}`,
            updatedAt: new Date().toISOString().split("T")[0],
          },
          ...prev,
        ];
      }
    });
    showToast("Location Geotagged", `Updated coordinates for ${locData.propertyName}.`);
  };

  // E3 Actions
  const addSupplier = (supData: Omit<BarangaySupplier, "id" | "supplierCode" | "dateRegistered">) => {
    const count = suppliers.length + 1;
    const supplierCode = `SUP-2026-${count.toString().padStart(3, "0")}`;
    const newSup: BarangaySupplier = {
      ...supData,
      id: `sup-${Date.now()}`,
      supplierCode,
      dateRegistered: new Date().toISOString().split("T")[0],
    };
    setSuppliers((prev) => [newSup, ...prev]);
    showToast("Supplier Added", `Registered ${newSup.supplierName} in E3 Supplier Directory.`);
  };

  const toggleSupplierActive = (id: string) => {
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // E4 Actions
  const addAIRReport = (airData: Omit<AIRReport, "id" | "airNumber">) => {
    const count = airReports.length + 1;
    const airNumber = `AIR-2026-${count.toString().padStart(3, "0")}`;
    const newAir: AIRReport = {
      ...airData,
      id: `air-${Date.now()}`,
      airNumber,
    };
    setAirReports((prev) => [newAir, ...prev]);
    showToast("A.I.R. Created", `Generated Inspection Report ${airNumber}.`);
  };

  // E5 Actions
  const addAsset = (assetData: Omit<BarangayAsset, "id" | "totalValuation" | "dateAdded">) => {
    const totalValuation = assetData.quantity * assetData.unitPrice;
    const newAsset: BarangayAsset = {
      ...assetData,
      id: `asset-${Date.now()}`,
      totalValuation,
      dateAdded: new Date().toISOString().split("T")[0],
    };
    setAssets((prev) => [newAsset, ...prev]);
    showToast("Asset Added", `Added ${newAsset.itemName} with total valuation ₱${totalValuation.toLocaleString()}.`);
  };

  const updateAsset = (id: string, assetData: Omit<BarangayAsset, "id" | "totalValuation" | "dateAdded">) => {
    const totalValuation = assetData.quantity * assetData.unitPrice;
    setAssets((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              ...assetData,
              totalValuation,
            }
          : a
      )
    );
    showToast("Asset Updated", "Updated inventory record.");
  };

  // E6 Actions
  const addIssuance = (issData: Omit<PropertyIssuance, "id" | "issuanceNumber" | "status">) => {
    const count = issuances.length + 1;
    const prefix = issData.issuanceType;
    const issuanceNumber = `${prefix}-2026-${count.toString().padStart(3, "0")}`;
    const newIss: PropertyIssuance = {
      ...issData,
      id: `iss-${Date.now()}`,
      issuanceNumber,
      status: "Issued",
    };
    setIssuances((prev) => [newIss, ...prev]);
    showToast("Issuance Recorded", `Created ${issData.issuanceType} #${issuanceNumber} for ${issData.receivedBy}.`);
  };

  // E7 Actions
  const addReturn = (retData: Omit<PropertyReturn, "id" | "returnNumber">) => {
    const count = returns.length + 1;
    const returnNumber = `RET-2026-${count.toString().padStart(3, "0")}`;
    const newRet: PropertyReturn = {
      ...retData,
      id: `ret-${Date.now()}`,
      returnNumber,
    };
    setReturns((prev) => [newRet, ...prev]);

    // Also update parent issuance status
    setIssuances((prev) =>
      prev.map((i) => (i.id === retData.issuanceId ? { ...i, status: "Partially Returned" } : i))
    );

    showToast("Return Processed", `Logged Receipt ${returnNumber} for returned equipment.`);
  };

  return (
    <BamsContext.Provider
      value={{
        properties,
        locations,
        suppliers,
        airReports,
        assets,
        issuances,
        returns,
        toasts,
        addProperty,
        updatePropertyStatus,
        deleteProperty,
        saveLocation,
        addSupplier,
        toggleSupplierActive,
        addAIRReport,
        addAsset,
        updateAsset,
        addIssuance,
        addReturn,
        showToast,
        removeToast,
      }}
    >
      {children}
    </BamsContext.Provider>
  );
};

export const useBams = () => {
  const context = useContext(BamsContext);
  if (!context) {
    throw new Error("useBams must be used within a BamsProvider");
  }
  return context;
};
