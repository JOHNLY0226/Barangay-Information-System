export type CertificateType =
  | "Barangay Clearance"
  | "Certificate of Indigency"
  | "Certificate of Residency"
  | "Business Permit";

export interface CertificateData {
  controlNumber: string;
  residentName: string;
  address: string;
  purpose: string;
  certificateType: CertificateType;
  orNumber: string;
  amountPaid: number;
  dateIssued: string;
  issuingOfficer: string;
  civilStatus?: "Single" | "Married" | "Widowed" | "Separated";
  periodOfResidency?: string;
  businessName?: string;
  businessType?: string;
  remarks?: string;
}
