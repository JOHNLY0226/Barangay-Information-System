"use client";

import React, { useState, useEffect } from "react";
import { useBams } from "./BamsContext";
import { DeliveryStatus, AIRReport } from "./types";
import {
  FileCheck,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  UserCheck,
  Building,
  Calendar,
  X,
  Sparkles,
  FileText,
} from "lucide-react";

export default function FormE4AIR({
  selectedSupplierIdFromE3,
}: {
  selectedSupplierIdFromE3?: string;
}) {
  const { airReports, suppliers, addAIRReport, showToast } = useBams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [drNumber, setDrNumber] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>("Accepted");
  const [inspectedBy, setInspectedBy] = useState("Kgwd. Jose Rizal (Asset Inspector)");
  const [approvedBy, setApprovedBy] = useState("Punong Barangay Juan Dela Cruz");
  const [inspectedDate, setInspectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [acceptedDate, setAcceptedDate] = useState(new Date().toISOString().split("T")[0]);
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedSupplierIdFromE3) {
      setSupplierId(selectedSupplierIdFromE3);
      setIsModalOpen(true);
    } else if (suppliers.length > 0 && !supplierId) {
      setSupplierId(suppliers[0].id);
    }
  }, [suppliers, selectedSupplierIdFromE3]);

  const handleOpenModal = () => {
    setDrNumber(`DR-${Math.floor(10000 + Math.random() * 90000)}`);
    setDeliveryStatus("Accepted");
    setInspectedBy("Kgwd. Jose Rizal (Asset Inspector)");
    setApprovedBy("Punong Barangay Juan Dela Cruz");
    setInspectedDate(new Date().toISOString().split("T")[0]);
    setAcceptedDate(new Date().toISOString().split("T")[0]);
    setRemarks("");
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!drNumber.trim()) newErrors.drNumber = "DR Number is required";
    if (!supplierId) newErrors.supplierId = "Supplier selection is required";
    if (!inspectedBy.trim()) newErrors.inspectedBy = "Inspector name is required";
    if (!approvedBy.trim()) newErrors.approvedBy = "Approving officer name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const supObj = suppliers.find((s) => s.id === supplierId);
    if (!supObj) return;

    addAIRReport({
      drNumber,
      supplierId,
      supplierName: supObj.supplierName,
      deliveryStatus,
      inspectedBy,
      approvedBy,
      inspectedDate,
      acceptedDate,
      remarks,
    });

    setIsModalOpen(false);
  };

  const filteredReports = airReports.filter((rep) => {
    const matchesSearch =
      rep.airNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.drNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.inspectedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "All" || rep.deliveryStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getDeliveryStatusBadge = (st: DeliveryStatus) => {
    switch (st) {
      case "Accepted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Accepted
          </span>
        );
      case "Partial":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <AlertCircle className="h-3.5 w-3.5 text-amber-600" /> Partial Delivery
          </span>
        );
      case "Under Inspection":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <Clock className="h-3.5 w-3.5 text-sky-600" /> Under Inspection
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-[#580011] border border-rose-200">
            <XCircle className="h-3.5 w-3.5 text-[#580011]" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              FORM E4
            </span>
            <span>DILG BIMS Acceptance & Inspection Reports</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Acceptance & Inspection Reports (A.I.R.)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Document delivery receipts, inspector verification, and Barangay Captain approvals for incoming property deliveries.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4 text-[#E5A623]" /> Create A.I.R. Report
        </button>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total AIR Reports</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{airReports.length}</div>
          <span className="text-[11px] text-slate-500">Inspection Certificates</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Fully Accepted</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {airReports.filter((r) => r.deliveryStatus === "Accepted").length}
          </div>
          <span className="text-[11px] text-slate-500">Passed Inspection</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">Under Inspection</span>
          <div className="text-2xl font-black text-sky-700 mt-1">
            {airReports.filter((r) => r.deliveryStatus === "Under Inspection").length}
          </div>
          <span className="text-[11px] text-slate-500">Pending Verification</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Suppliers Linked</span>
          <div className="text-2xl font-black text-amber-700 mt-1">{suppliers.length}</div>
          <span className="text-[11px] text-slate-500">From Form E3</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AIR Number, DR Number, Supplier name, Inspector..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011] focus:bg-white text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600 text-xs">Delivery Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#580011]"
          >
            <option value="All">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Partial">Partial</option>
            <option value="Under Inspection">Under Inspection</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* AIR Table View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">AIR Number</th>
                <th className="py-3.5 px-4">DR Number</th>
                <th className="py-3.5 px-4">Supplier Name (E3)</th>
                <th className="py-3.5 px-4">Delivery Status</th>
                <th className="py-3.5 px-4">Inspected & Approved By</th>
                <th className="py-3.5 px-4">Dates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 bg-slate-50/50">
                    <FileCheck className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold text-slate-600">No A.I.R. Reports Found</p>
                    <p className="text-[11px] text-slate-400">Click &quot;Create A.I.R. Report&quot; to add a record.</p>
                  </td>
                </tr>
              ) : (
                filteredReports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#580011] whitespace-nowrap">
                      {rep.airNumber}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 whitespace-nowrap">
                      {rep.drNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-[#580011]" /> {rep.supplierName}
                      </div>
                      {rep.remarks && (
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 italic">
                          &quot;{rep.remarks}&quot;
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getDeliveryStatusBadge(rep.deliveryStatus)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 font-semibold text-[11px]">
                        Inspected: <span className="font-normal text-slate-600">{rep.inspectedBy}</span>
                      </div>
                      <div className="text-slate-800 font-semibold text-[11px] mt-0.5">
                        Approved: <span className="font-normal text-slate-600">{rep.approvedBy}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                      <div>Insp: {rep.inspectedDate}</div>
                      <div>Acc: {rep.acceptedDate}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>
            Showing <strong className="text-slate-800">{filteredReports.length}</strong> of{" "}
            <strong className="text-slate-800">{airReports.length}</strong> inspection records
          </span>
          <span className="text-[10px] text-slate-400 font-mono">DILG BIMS Form E4 Compliant</span>
        </div>
      </div>

      {/* Create AIR Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#580011] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#E5A623] text-slate-950 rounded-lg">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Create Acceptance & Inspection Report</h3>
                  <p className="text-xs text-rose-200">FORM E4: DILG Barangay Inspection Report (A.I.R.)</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-rose-200 hover:text-white p-1 rounded-lg hover:bg-[#7A0018] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Delivery Receipt (DR) Number *
                  </label>
                  <input
                    type="text"
                    value={drNumber}
                    onChange={(e) => setDrNumber(e.target.value)}
                    placeholder="e.g. DR-88901"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-mono focus:outline-none focus:ring-2 ${
                      errors.drNumber
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.drNumber && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.drNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Supplier Name (Linked to Form E3) *
                  </label>
                  <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.supplierId
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011]"
                    }`}
                  >
                    <option value="" disabled>
                      -- Select Active Supplier --
                    </option>
                    {suppliers
                      .filter((s) => s.isActive)
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.supplierName} ({s.supplierCode})
                        </option>
                      ))}
                  </select>
                  {errors.supplierId && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.supplierId}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Delivery Inspection Status *
                </label>
                <select
                  value={deliveryStatus}
                  onChange={(e) => setDeliveryStatus(e.target.value as DeliveryStatus)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#580011]"
                >
                  <option value="Accepted">Accepted (Full Specifications Passed)</option>
                  <option value="Partial">Partial Delivery Accepted</option>
                  <option value="Under Inspection">Under Inspection / Pending Audit</option>
                  <option value="Rejected">Rejected (Defective / Non-compliant)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Inspected By (Property / Audit Committee) *
                  </label>
                  <input
                    type="text"
                    value={inspectedBy}
                    onChange={(e) => setInspectedBy(e.target.value)}
                    placeholder="Inspector name and designation"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.inspectedBy
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.inspectedBy && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.inspectedBy}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Approved By (Punong Barangay / Chairman) *
                  </label>
                  <input
                    type="text"
                    value={approvedBy}
                    onChange={(e) => setApprovedBy(e.target.value)}
                    placeholder="Approving official name"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.approvedBy
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.approvedBy && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.approvedBy}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Inspected Date *
                  </label>
                  <input
                    type="date"
                    value={inspectedDate}
                    onChange={(e) => setInspectedDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Accepted Date *
                  </label>
                  <input
                    type="date"
                    value={acceptedDate}
                    onChange={(e) => setAcceptedDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Inspection Remarks & Quantity Notes
                </label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Record serial numbers, box counts, physical condition notes..."
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011] text-slate-800"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4 text-[#E5A623]" /> Generate A.I.R. Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
