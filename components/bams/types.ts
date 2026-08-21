export type PropertyType = 
  | "Infrastructure - Horizontal" 
  | "Infrastructure - Vertical" 
  | "Infrastructure - Water" 
  | "Non-Infrastructure - Motor Vehicle" 
  | "Non-Infrastructure - ICT Equipment" 
  | "Non-Infrastructure - Others";

export type PropertyStatus = 
  | "Available" 
  | "Operational" 
  | "Under Maintenance" 
  | "Non-operational" 
  | "Under Construction" 
  | "Out of Service" 
  | "Lost/Stolen";

export interface BarangayProperty {
  id: string;
  propertyCode: string;
  name: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  category: string;
  subcategory: string;
  dateAdded: string;
}

export interface PropertyLocation {
  id: string;
  propertyId: string;
  propertyName: string;
  latitude: number;
  longitude: number;
  exactLocation: string;
  geotagSource: "manual" | "map_picker" | "geotagged_photo";
  geotaggedPhotoUrl?: string;
  updatedAt: string;
}

export interface BarangaySupplier {
  id: string;
  supplierCode: string;
  supplierName: string;
  address: string;
  tin: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  dtiSecRegNo: string;
  philGepsNo: string;
  isActive: boolean;
  dateRegistered: string;
}

export type DeliveryStatus = "Accepted" | "Partial" | "Rejected" | "Under Inspection";

export interface AIRReport {
  id: string;
  airNumber: string;
  drNumber: string;
  supplierId: string;
  supplierName: string;
  deliveryStatus: DeliveryStatus;
  inspectedBy: string;
  approvedBy: string;
  inspectedDate: string;
  acceptedDate: string;
  remarks?: string;
}

export type AssetClassification = 
  | "Expendable" 
  | "Semi-Expendable" 
  | "Property Plant and Equipment (PPE)";

export interface BarangayAsset {
  id: string;
  uacsCode: string;
  classification: AssetClassification;
  unitOfMeasure: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalValuation: number; // Quantity * Unit Price
  description: string;
  dateAdded: string;
}

export type IssuanceType = "RIS" | "ICS" | "PAR"; // Requisition & Issue Slip, Inventory Custodian Slip, Property Acknowledgment Receipt

export interface IssuedItem {
  assetId: string;
  itemName: string;
  uacsCode: string;
  quantityIssued: number;
  unitPrice: number;
  unitOfMeasure: string;
}

export interface PropertyIssuance {
  id: string;
  issuanceType: IssuanceType;
  issuanceNumber: string;
  requestingOffice: string;
  issuedDate: string;
  issuedBy: string;
  receivedBy: string;
  contactNumber: string;
  purpose: string;
  items: IssuedItem[];
  status: "Issued" | "Partially Returned" | "Fully Returned";
}

export type ItemConditionStatus = 
  | "Good Condition" 
  | "Damaged - Needs Repair" 
  | "Unserviceable / Scrap" 
  | "Transferred";

export interface ReturnedItem {
  assetId: string;
  itemName: string;
  quantityReturned: number;
  conditionStatus: ItemConditionStatus;
}

export interface PropertyReturn {
  id: string;
  returnNumber: string;
  issuanceId: string;
  issuanceNumber: string;
  returnedBy: string;
  receivedBy: string; // Property Custodian
  returnDate: string;
  itemsReturned: ReturnedItem[];
  reasonForReturn: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info";
}
