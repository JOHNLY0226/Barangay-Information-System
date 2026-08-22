"use client";

import React, { useState } from "react";
import { FileCheck, Printer, X, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  CertificateData,
  CertificateType,
  BarangayClearanceTemplate,
  IndigencyTemplate,
  ResidencyTemplate,
  BusinessPermitTemplate,
} from "./templates";

interface FormProps {
  onIssueSuccess?: (data: CertificateData) => void;
}

export function CertificateIssuanceForm({ onIssueSuccess }: FormProps) {
  const [formData, setFormData] = useState<CertificateData>({
    controlNumber: "BCIS-2026-1050",
    residentName: "",
    address: "Block 12, Lot 4, Sta. Lucia, Quezon City",
    purpose: "Employment Requirement",
    certificateType: "Barangay Clearance",
    orNumber: "OR-894-101",
    amountPaid: 50.0,
    dateIssued: "2026-08-21",
    issuingOfficer: "Sec. Maria Clara Santos",
    businessName: "",
    businessType: "",
    civilStatus: "Single",
    periodOfResidency: "5 years",
  });

  const [certified, setCertified] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleTypeChange = (type: CertificateType) => {
    let fee = 50.0;
    let defPurpose = "Employment Requirement";
    if (type === "Certificate of Indigency") {
      fee = 0.0;
      defPurpose = "Medical Assistance (DSWD/PAO)";
    } else if (type === "Business Permit") {
      fee = 350.0;
      defPurpose = "New Business Registration";
    } else if (type === "Certificate of Residency") {
      fee = 50.0;
      defPurpose = "Bank Account Opening / Postal ID";
    }
    setFormData((prev) => ({
      ...prev,
      certificateType: type,
      amountPaid: fee,
      purpose: defPurpose,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewOpen(true);
  };

  const handleFinalIssue = () => {
    if (onIssueSuccess) {
      onIssueSuccess(formData);
    }
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const handlePrintAndRecord = () => {
    handleFinalIssue();
    const prevTitle = document.title;
    document.title = formData.controlNumber || "Barangay-Certificate";
    setTimeout(() => {
      window.print();
      document.title = prevTitle;
    }, 100);
  };

  const renderActiveTemplate = () => {
    switch (formData.certificateType) {
      case "Certificate of Indigency":
        return <IndigencyTemplate data={formData} />;
      case "Certificate of Residency":
        return <ResidencyTemplate data={formData} />;
      case "Business Permit":
        return <BusinessPermitTemplate data={formData} />;
      case "Barangay Clearance":
      default:
        return <BarangayClearanceTemplate data={formData} />;
    }
  };

  return (
    <div className="space-y-6">
      {showSuccessToast && (
        <div className="bg-emerald-50 border border-[#10b981] p-4 rounded-xl flex items-center gap-3 text-slate-800 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">
              Certificate Processed Successfully
            </p>
            <p className="text-slate-600">
              Control Number {formData.controlNumber} registered to queue and
              ready for document printing.
            </p>
          </div>
        </div>
      )}

      {/* Form B2 Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#580011] bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                BIMS Form B2: Issuance Management (Certifications)
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              Frontline Certificate & Clearance Issuance
            </h2>
            <p className="text-xs text-slate-500">
              Fill out resident details and payment receipt metadata for
              immediate document generation.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            {formData.controlNumber}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Certificate Type Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Select Certificate Type (Indicate Clearance / Indigency / Others)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {(
                [
                  "Barangay Clearance",
                  "Certificate of Indigency",
                  "Certificate of Residency",
                  "Business Permit",
                ] as CertificateType[]
              ).map((type) => {
                const isSelected = formData.certificateType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#580011] text-white border-[#580011] shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-semibold">{type}</div>
                    <div
                      className={`text-[10px] ${isSelected ? "text-rose-100" : "text-slate-400"}`}
                    >
                      {type === "Certificate of Indigency"
                        ? "Gratis / Exempted"
                        : "Standard Form"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Applicant & Address Details (Memo Top Section) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Applicant Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.residentName}
                onChange={(e) =>
                  setFormData({ ...formData, residentName: e.target.value })
                }
                placeholder="e.g. Juan De La Cruz"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011] focus:border-[#580011]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Complete Address / Purok <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="e.g. Purok 3, Katipunan St., Sta. Lucia"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011] focus:border-[#580011]"
              />
            </div>
          </div>

          {/* Conditional Business Details */}
          {formData.certificateType === "Business Permit" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3.5 bg-amber-50/50 rounded-lg border border-amber-200/60">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Registered Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  placeholder="e.g. Sta. Lucia Sari-Sari Store"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Line of Business / Nature
                </label>
                <input
                  type="text"
                  value={formData.businessType || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, businessType: e.target.value })
                  }
                  placeholder="e.g. General Merchandise / Retail"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>
            </div>
          )}

          {/* Issued Date & Purpose (Memo Fields) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Issued Date (YYYY-MM-DD) <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.dateIssued}
                onChange={(e) =>
                  setFormData({ ...formData, dateIssued: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Date submitting application.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Purpose <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.purpose}
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
                placeholder='e.g. "for employment", "for scholarship", "for government assistance"'
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Reason for requesting clearance or certificate.
              </p>
            </div>
          </div>

          {/* Official Receipt & Fee Paid (Optional in Memo) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                OR Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.orNumber}
                onChange={(e) =>
                  setFormData({ ...formData, orNumber: e.target.value })
                }
                placeholder="e.g. OR-894-101"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Official Receipt number after payment.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Amount Paid (₱) <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                step="0.50"
                value={formData.amountPaid}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amountPaid: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Total amount paid for the clearance/certificate.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Issuing Officer
              </label>
              <input
                type="text"
                value={formData.issuingOfficer}
                onChange={(e) =>
                  setFormData({ ...formData, issuingOfficer: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Barangay desk officer in-charge.
              </p>
            </div>
          </div>

          {/* Memo Statutory Attestation & LGUSS-BIMS Data Consent */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-start gap-3">
              <input
                id="b2-consent"
                type="checkbox"
                required
                checked={certified}
                onChange={(e) => setCertified(e.target.checked)}
                className="h-4 w-4 mt-1 rounded accent-[#580011] shrink-0 cursor-pointer"
              />
              <label
                htmlFor="b2-consent"
                className="text-xs text-slate-800 leading-relaxed cursor-pointer select-none"
              >
                <span className="font-bold text-[#580011] flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#e5a623]" />
                  Statutory Certification & LGUSS-BIMS Data Consent (Sec. 394(d)(6)):
                </span>
                I hereby certify that the above information are true and correct to the
                best of my knowledge. I understand that for the Barangay to carry out its
                mandate pursuant to Section 394 (d)(6) of the Local Government Code of 1991,
                they must necessarily process my personal information for easy identification
                of inhabitants, as a tool in planning, and as an updated reference in the number
                of inhabitants of the Barangay. Therefore, I grant my consent that my data will
                be stored in the LGUSS-BIMS which is a highly secured tool that is being used by
                the barangay.
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  controlNumber: `BCIS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                  residentName: "",
                  purpose: "Employment Requirement",
                }));
                setCertified(false);
              }}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Clear Fields
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileCheck className="h-4 w-4" />
              Preview & Issue Document
            </button>
          </div>
        </form>
      </div>

      {/* Print / Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-rose-50 text-[#580011]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Certificate Print Preview
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Review layout before issuing or sending to desk printer.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Certificate Viewport */}
            <div className="p-6 overflow-y-auto bg-slate-100/70 flex-1">
              {renderActiveTemplate()}
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white rounded-b-xl">
              <div className="text-[11px] text-slate-500 font-mono">
                Status: Ready for clearance stamping
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={handlePrintAndRecord}
                  className="px-4 py-2 rounded-lg bg-[#e5a623] hover:bg-[#d97706] text-slate-950 text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  Print & Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
