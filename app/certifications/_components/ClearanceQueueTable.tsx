"use client";

import React, { useState } from "react";
import { Search, Filter, Printer, Eye, X } from "lucide-react";
import {
  CertificateData,
  BarangayClearanceTemplate,
  IndigencyTemplate,
  ResidencyTemplate,
  BusinessPermitTemplate,
} from "./templates";

interface QueueProps {
  initialRecords?: CertificateData[];
}

const mockInitialRecords: CertificateData[] = [
  {
    controlNumber: "BCIS-2026-1049",
    residentName: "Eduardo Dela Vega",
    address: "Purok 2, Lot 14, Sta. Lucia",
    purpose: "PNP Police Clearance Requirement",
    certificateType: "Barangay Clearance",
    orNumber: "OR-892-019",
    amountPaid: 50.0,
    dateIssued: "2026-08-20",
    issuingOfficer: "Sec. Maria Clara Santos",
  },
  {
    controlNumber: "BCIS-2026-1048",
    residentName: "Althea Ramos",
    address: "Block 8, San Jose Compound, Sta. Lucia",
    purpose: "Financial Aid (DSWD AICS)",
    certificateType: "Certificate of Indigency",
    orNumber: "EXEMPTED",
    amountPaid: 0.0,
    dateIssued: "2026-08-20",
    issuingOfficer: "Hon. Punong Barangay",
  },
  {
    controlNumber: "BCIS-2026-1047",
    residentName: "Ricardo Gomez Jr.",
    address: "Purok 5, Sta. Lucia",
    purpose: "Passport Application (DFA)",
    certificateType: "Certificate of Residency",
    orNumber: "OR-892-015",
    amountPaid: 50.0,
    dateIssued: "2026-08-19",
    issuingOfficer: "Sec. Maria Clara Santos",
    periodOfResidency: "8 years",
  },
  {
    controlNumber: "BCIS-2026-1046",
    residentName: "Luzviminda Cruz",
    address: "102 Katipunan Ave., Sta. Lucia",
    purpose: "Water Station Commercial Renewal",
    certificateType: "Business Permit",
    orNumber: "OR-892-004",
    amountPaid: 350.0,
    dateIssued: "2026-08-18",
    issuingOfficer: "Sec. Maria Clara Santos",
    businessName: "AquaLucia Purified Water",
    businessType: "Water Refilling Station",
  },
];

export function ClearanceQueueTable({
  initialRecords = mockInitialRecords,
}: QueueProps) {
  const [records] = useState<CertificateData[]>(initialRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [selectedRecord, setSelectedRecord] = useState<CertificateData | null>(
    null,
  );

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.controlNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.orNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.purpose.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "All" || rec.certificateType === typeFilter;
    return matchesSearch && matchesType;
  });

  const renderModalTemplate = (record: CertificateData) => {
    switch (record.certificateType) {
      case "Certificate of Indigency":
        return <IndigencyTemplate data={record} />;
      case "Certificate of Residency":
        return <ResidencyTemplate data={record} />;
      case "Business Permit":
        return <BusinessPermitTemplate data={record} />;
      case "Barangay Clearance":
      default:
        return <BarangayClearanceTemplate data={record} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, control no, or OR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#580011]"
          >
            <option value="All">All Types</option>
            <option value="Barangay Clearance">Barangay Clearance</option>
            <option value="Certificate of Indigency">Indigency</option>
            <option value="Certificate of Residency">Residency</option>
            <option value="Business Permit">Business Permit</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Control No.</th>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Certificate Type</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">O.R. No.</th>
                <th className="py-3 px-4">Fee Paid</th>
                <th className="py-3 px-4">Date Issued</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    No certificate records match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => (
                  <tr
                    key={item.controlNumber}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-medium text-slate-800">
                      {item.controlNumber}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {item.residentName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-[#580011] border border-rose-200">
                        {item.certificateType}
                      </span>
                    </td>
                    <td
                      className="py-3 px-4 max-w-xs truncate text-slate-600"
                      title={item.purpose}
                    >
                      {item.purpose}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {item.orNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      ₱{Number(item.amountPaid).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.dateIssued}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedRecord(item)}
                          title="View / Re-print"
                          className="p-1.5 text-slate-600 hover:text-[#580011] hover:bg-rose-50 rounded transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Preview Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  View Issued Record
                </h3>
                <p className="text-[11px] font-mono text-slate-500">
                  {selectedRecord.controlNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto bg-slate-100/70 flex-1">
              {renderModalTemplate(selectedRecord)}
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200 bg-white rounded-b-xl">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Printer className="h-4 w-4" />
                Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
