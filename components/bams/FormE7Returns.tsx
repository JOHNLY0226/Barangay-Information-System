"use client";

import React, { useState, useEffect } from "react";
import { useBams } from "./BamsContext";
import { ItemConditionStatus, ReturnedItem, PropertyReturn } from "./types";
import {
  RotateCcw,
  Plus,
  Search,
  CheckCircle2,
  Wrench,
  AlertOctagon,
  ArrowLeftRight,
  UserCheck,
  Calendar,
  X,
  Sparkles,
  ShieldCheck,
  FileCheck2,
} from "lucide-react";

export default function FormE7Returns({
  selectedIssuanceIdFromE6,
}: {
  selectedIssuanceIdFromE6?: string;
}) {
  const { returns, issuances, addReturn } = useBams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCondition, setFilterCondition] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [issuanceId, setIssuanceId] = useState("");
  const [returnedBy, setReturnedBy] = useState("");
  const [receivedBy, setReceivedBy] = useState("Property Custodian Alan Poe");
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split("T")[0]);
  const [conditionStatus, setConditionStatus] = useState<ItemConditionStatus>("Good Condition");
  const [reasonForReturn, setReasonForReturn] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedIssuanceIdFromE6) {
      setIssuanceId(selectedIssuanceIdFromE6);
      const iss = issuances.find((i) => i.id === selectedIssuanceIdFromE6);
      if (iss) {
        setReturnedBy(iss.receivedBy);
      }
      setIsModalOpen(true);
    } else if (issuances.length > 0 && !issuanceId) {
      setIssuanceId(issuances[0].id);
      setReturnedBy(issuances[0].receivedBy);
    }
  }, [issuances, selectedIssuanceIdFromE6, issuanceId]);

  const handleIssuanceSelectChange = (id: string) => {
    setIssuanceId(id);
    const iss = issuances.find((i) => i.id === id);
    if (iss) {
      setReturnedBy(iss.receivedBy);
    }
  };

  const handleOpenModal = () => {
    if (issuances.length > 0) {
      setIssuanceId(issuances[0].id);
      setReturnedBy(issuances[0].receivedBy);
    }
    setReceivedBy("Property Custodian Alan Poe");
    setReturnDate(new Date().toISOString().split("T")[0]);
    setConditionStatus("Good Condition");
    setReasonForReturn("");
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!issuanceId) newErrors.issuanceId = "Issuance selection is required";
    if (!returnedBy.trim()) newErrors.returnedBy = "Returned By custodian name is required";
    if (!receivedBy.trim()) newErrors.receivedBy = "Received By custodian is required";
    if (!reasonForReturn.trim()) newErrors.reasonForReturn = "Reason for return is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const parentIssuance = issuances.find((i) => i.id === issuanceId);
    if (!parentIssuance) return;

    // Prepare returned items list from parent issuance
    const itemsReturned: ReturnedItem[] = parentIssuance.items.map((i) => ({
      assetId: i.assetId,
      itemName: i.itemName,
      quantityReturned: i.quantityIssued,
      conditionStatus,
    }));

    addReturn({
      issuanceId,
      issuanceNumber: parentIssuance.issuanceNumber,
      returnedBy,
      receivedBy,
      returnDate,
      itemsReturned,
      reasonForReturn,
    });

    setIsModalOpen(false);
  };

  const filteredReturns = returns.filter((ret) => {
    const matchesSearch =
      ret.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.issuanceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.returnedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.reasonForReturn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCondition =
      filterCondition === "All" ||
      ret.itemsReturned.some((i) => i.conditionStatus === filterCondition);

    return matchesSearch && matchesCondition;
  });

  const getConditionBadge = (st: ItemConditionStatus) => {
    switch (st) {
      case "Good Condition":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Good Condition
          </span>
        );
      case "Damaged - Needs Repair":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <Wrench className="h-3.5 w-3.5 text-amber-600" /> Damaged / Repair Needed
          </span>
        );
      case "Unserviceable / Scrap":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-[#580011] border border-rose-200">
            <AlertOctagon className="h-3.5 w-3.5 text-[#580011]" /> Unserviceable / Scrap
          </span>
        );
      case "Transferred":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
            <ArrowLeftRight className="h-3.5 w-3.5 text-purple-600" /> Transferred
          </span>
        );
      default:
        return null;
    }
  };

  const selectedIssuanceObj = issuances.find((i) => i.id === issuanceId);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              FORM E7
            </span>
            <span>DILG BIMS Return & Receipt of Property</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Return & Receipt of Property / Equipment
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Log return receipts of issued assets from custodians, update item condition status, and restock warehouse logs.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4 text-[#E5A623]" /> Process Property Return
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Returns Logged</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{returns.length}</div>
          <span className="text-[11px] text-slate-500">Return Vouchers</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Good Condition</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {
              returns.filter((r) =>
                r.itemsReturned.some((i) => i.conditionStatus === "Good Condition")
              ).length
            }
          </div>
          <span className="text-[11px] text-slate-500">Ready for Re-issue</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Damaged / Repair</span>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {
              returns.filter((r) =>
                r.itemsReturned.some((i) => i.conditionStatus === "Damaged - Needs Repair")
              ).length
            }
          </div>
          <span className="text-[11px] text-slate-500">Needs Servicing</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Issuances Linked</span>
          <div className="text-2xl font-black text-purple-700 mt-1">{issuances.length}</div>
          <span className="text-[11px] text-slate-500">From Form E6</span>
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
            placeholder="Search return number, issuance ref, custodian, reason..."
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
          <span className="font-semibold text-slate-600 text-xs">Condition:</span>
          <select
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#580011]"
          >
            <option value="All">All Conditions</option>
            <option value="Good Condition">Good Condition</option>
            <option value="Damaged - Needs Repair">Damaged - Needs Repair</option>
            <option value="Unserviceable / Scrap">Unserviceable / Scrap</option>
            <option value="Transferred">Transferred</option>
          </select>
        </div>
      </div>

      {/* Return Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Return Receipt No</th>
                <th className="py-3.5 px-4">Issuance Ref (E6)</th>
                <th className="py-3.5 px-4">Returned By (Custodian)</th>
                <th className="py-3.5 px-4">Received By</th>
                <th className="py-3.5 px-4">Items Returned & Condition</th>
                <th className="py-3.5 px-4">Return Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReturns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 bg-slate-50/50">
                    <RotateCcw className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold text-slate-600">No Return Records Logged</p>
                    <p className="text-[11px] text-slate-400">Click &quot;Process Property Return&quot; to log a return.</p>
                  </td>
                </tr>
              ) : (
                filteredReturns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#580011] whitespace-nowrap">
                      {ret.returnNumber}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-purple-700 font-bold whitespace-nowrap">
                      {ret.issuanceNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs">{ret.returnedBy}</div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 italic">
                        &quot;{ret.reasonForReturn}&quot;
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {ret.receivedBy}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5">
                        {ret.itemsReturned.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-[11px]">
                              {item.itemName} (x{item.quantityReturned})
                            </span>
                            {getConditionBadge(item.conditionStatus)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                      {ret.returnDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>
            Showing <strong className="text-slate-800">{filteredReturns.length}</strong> of{" "}
            <strong className="text-slate-800">{returns.length}</strong> return records
          </span>
          <span className="text-[10px] text-slate-400 font-mono">DILG BIMS Form E7 Compliant</span>
        </div>
      </div>

      {/* Return Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#580011] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#E5A623] text-slate-950 rounded-lg">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Process Property & Equipment Return</h3>
                  <p className="text-xs text-rose-200">FORM E7: DILG Return and Receipt Voucher</p>
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
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Select Property Issuance Voucher (Linked to Form E6) *
                </label>
                <select
                  value={issuanceId}
                  onChange={(e) => handleIssuanceSelectChange(e.target.value)}
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.issuanceId
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011]"
                  }`}
                >
                  <option value="" disabled>
                    -- Select Active Issuance Slip --
                  </option>
                  {issuances.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.issuanceNumber} ({i.issuanceType}) - Issued to: {i.receivedBy} ({i.requestingOffice})
                    </option>
                  ))}
                </select>
                {errors.issuanceId && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.issuanceId}</p>
                )}

                {selectedIssuanceObj && (
                  <div className="mt-2 p-3 bg-purple-50/70 border border-purple-200 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-purple-950 flex items-center justify-between">
                      <span>Purpose: {selectedIssuanceObj.purpose}</span>
                      <span className="font-mono text-[10px] text-purple-700">{selectedIssuanceObj.issuedDate}</span>
                    </div>
                    <div className="text-[11px] text-purple-800 font-medium">
                      Items Issued:{" "}
                      {selectedIssuanceObj.items.map((i) => `${i.itemName} (x${i.quantityIssued})`).join(", ")}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Returned By (Original Custodian) *
                  </label>
                  <input
                    type="text"
                    value={returnedBy}
                    onChange={(e) => setReturnedBy(e.target.value)}
                    placeholder="Custodian returning the equipment"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.returnedBy
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011]"
                    }`}
                  />
                  {errors.returnedBy && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.returnedBy}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Received By (Property Custodian) *
                  </label>
                  <input
                    type="text"
                    value={receivedBy}
                    onChange={(e) => setReceivedBy(e.target.value)}
                    placeholder="Receiving officer name"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.receivedBy
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011]"
                    }`}
                  />
                  {errors.receivedBy && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.receivedBy}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Returned Item Condition Status *
                  </label>
                  <select
                    value={conditionStatus}
                    onChange={(e) => setConditionStatus(e.target.value as ItemConditionStatus)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  >
                    <option value="Good Condition">Good Condition (Operational)</option>
                    <option value="Damaged - Needs Repair">Damaged - Needs Repair / Servicing</option>
                    <option value="Unserviceable / Scrap">Unserviceable / Beyond Economic Repair</option>
                    <option value="Transferred">Transferred to Other Facility</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Reason for Return & Physical Inspection Notes *
                </label>
                <textarea
                  rows={2}
                  value={reasonForReturn}
                  onChange={(e) => setReasonForReturn(e.target.value)}
                  placeholder="e.g. End of duty deployment, battery replacement required..."
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.reasonForReturn
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] text-slate-800"
                  }`}
                />
                {errors.reasonForReturn && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.reasonForReturn}</p>
                )}
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
                  <Sparkles className="h-4 w-4 text-[#E5A623]" /> Record Property Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
