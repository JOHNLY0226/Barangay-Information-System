"use client";

import React, { useState, useEffect } from "react";
import { useBams } from "./BamsContext";
import { IssuanceType, IssuedItem, PropertyIssuance } from "./types";
import {
  FileUp,
  Plus,
  Search,
  UserCheck,
  Building,
  CheckCircle2,
  Clock,
  Layers,
  X,
  Sparkles,
  ShoppingBag,
  Trash2,
  FileText,
} from "lucide-react";

export default function FormE6Issuances({
  selectedAssetIdFromE5,
  onSelectIssuanceForReturn,
}: {
  selectedAssetIdFromE5?: string;
  onSelectIssuanceForReturn?: (issuanceId: string) => void;
}) {
  const { issuances, assets, addIssuance } = useBams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [issuanceType, setIssuanceType] = useState<IssuanceType>("PAR");
  const [requestingOffice, setRequestingOffice] = useState("BPOC / Tanod Desk");
  const [issuedDate, setIssuedDate] = useState(new Date().toISOString().split("T")[0]);
  const [issuedBy, setIssuedBy] = useState("Property Custodian Alan Poe");
  const [receivedBy, setReceivedBy] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [purpose, setPurpose] = useState("");

  // Multi-item picker state (linked to E5 assets)
  const [selectedItems, setSelectedItems] = useState<IssuedItem[]>([]);

  // Temp item selection row in modal
  const [currentAssetId, setCurrentAssetId] = useState<string>("");
  const [currentQty, setCurrentQty] = useState<number>(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (assets.length > 0 && !currentAssetId) {
      setCurrentAssetId(assets[0].id);
    }
  }, [assets, currentAssetId]);

  useEffect(() => {
    if (selectedAssetIdFromE5) {
      const ast = assets.find((a) => a.id === selectedAssetIdFromE5);
      if (ast) {
        setSelectedItems([
          {
            assetId: ast.id,
            itemName: ast.itemName,
            uacsCode: ast.uacsCode,
            quantityIssued: 1,
            unitPrice: ast.unitPrice,
            unitOfMeasure: ast.unitOfMeasure,
          },
        ]);
      }
      setIsModalOpen(true);
    }
  }, [selectedAssetIdFromE5, assets]);

  const handleOpenModal = () => {
    setIssuanceType("PAR");
    setRequestingOffice("BPOC / Tanod Desk");
    setIssuedDate(new Date().toISOString().split("T")[0]);
    setIssuedBy("Property Custodian Alan Poe");
    setReceivedBy("");
    setContactNumber("");
    setPurpose("");
    setSelectedItems([]);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleAddItemToIssuance = () => {
    if (!currentAssetId) return;
    const ast = assets.find((a) => a.id === currentAssetId);
    if (!ast) return;

    if (currentQty <= 0) {
      setErrors((prev) => ({ ...prev, itemQty: "Quantity must be > 0" }));
      return;
    }

    if (currentQty > ast.quantity) {
      setErrors((prev) => ({
        ...prev,
        itemQty: `Cannot exceed available inventory qty (${ast.quantity})`,
      }));
      return;
    }

    // Check if already in list
    const existingIndex = selectedItems.findIndex((i) => i.assetId === ast.id);
    if (existingIndex >= 0) {
      const updated = [...selectedItems];
      updated[existingIndex].quantityIssued += currentQty;
      setSelectedItems(updated);
    } else {
      setSelectedItems((prev) => [
        ...prev,
        {
          assetId: ast.id,
          itemName: ast.itemName,
          uacsCode: ast.uacsCode,
          quantityIssued: currentQty,
          unitPrice: ast.unitPrice,
          unitOfMeasure: ast.unitOfMeasure,
        },
      ]);
    }

    setErrors((prev) => ({ ...prev, itemQty: "", items: "" }));
  };

  const handleRemoveItem = (assetId: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.assetId !== assetId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!requestingOffice.trim()) newErrors.requestingOffice = "Requesting Office is required";
    if (!receivedBy.trim()) newErrors.receivedBy = "Received By (Recipient) is required";
    if (!purpose.trim()) newErrors.purpose = "Purpose is required";
    if (selectedItems.length === 0) newErrors.items = "At least 1 item must be selected from E5 Assets";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addIssuance({
      issuanceType,
      requestingOffice,
      issuedDate,
      issuedBy,
      receivedBy,
      contactNumber,
      purpose,
      items: selectedItems,
    });

    setIsModalOpen(false);
  };

  const filteredIssuances = issuances.filter((iss) => {
    const matchesSearch =
      iss.issuanceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      iss.requestingOffice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      iss.receivedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      iss.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "All" || iss.issuanceType === filterType;

    return matchesSearch && matchesType;
  });

  const getIssuanceBadge = (type: IssuanceType) => {
    switch (type) {
      case "PAR":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#580011] text-[#E5A623] border border-[#7A0018]">
            PAR (PPE)
          </span>
        );
      case "ICS":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
            ICS (Semi-Exp)
          </span>
        );
      case "RIS":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            RIS (Requisition)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              FORM E6
            </span>
            <span>DILG BIMS Property & Equipment Issuance</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Issuance of Property & Equipment (PAR / ICS / RIS)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Issue barangay inventory equipment (linked to E5 assets) with Property Acknowledgment Receipts (PAR) or Custodian Slips (ICS).
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4 text-[#E5A623]" /> New Equipment Issuance
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Issuances</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{issuances.length}</div>
          <span className="text-[11px] text-slate-500">Issued Slips</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#580011]">PAR Slips (PPE)</span>
          <div className="text-2xl font-black text-[#580011] mt-1">
            {issuances.filter((i) => i.issuanceType === "PAR").length}
          </div>
          <span className="text-[11px] text-slate-500">Property Receipts</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">ICS Slips (Semi)</span>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {issuances.filter((i) => i.issuanceType === "ICS").length}
          </div>
          <span className="text-[11px] text-slate-500">Custodian Slips</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Available E5 Assets</span>
          <div className="text-2xl font-black text-purple-700 mt-1">{assets.length}</div>
          <span className="text-[11px] text-slate-500">In Master Inventory</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search issuance number, office, recipient, purpose..."
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
          <span className="font-semibold text-slate-600 text-xs">Issuance Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#580011]"
          >
            <option value="All">All Types</option>
            <option value="PAR">PAR (Property Acknowledgment)</option>
            <option value="ICS">ICS (Inventory Custodian Slip)</option>
            <option value="RIS">RIS (Requisition and Issue)</option>
          </select>
        </div>
      </div>

      {/* Issuance Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Issuance No</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Requesting Office & Purpose</th>
                <th className="py-3.5 px-4">Issued To (Recipient)</th>
                <th className="py-3.5 px-4">Items Issued (From E5)</th>
                <th className="py-3.5 px-4">Issued Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIssuances.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 bg-slate-50/50">
                    <FileUp className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold text-slate-600">No Issuance Records Found</p>
                    <p className="text-[11px] text-slate-400">Create a PAR, ICS, or RIS issuance form.</p>
                  </td>
                </tr>
              ) : (
                filteredIssuances.map((iss) => (
                  <tr key={iss.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#580011] whitespace-nowrap">
                      {iss.issuanceNumber}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getIssuanceBadge(iss.issuanceType)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-[#580011]" /> {iss.requestingOffice}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{iss.purpose}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{iss.receivedBy}</div>
                      {iss.contactNumber && (
                        <div className="text-[10px] text-slate-500 font-mono">{iss.contactNumber}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        {iss.items.map((item, idx) => (
                          <div key={idx} className="text-[11px] flex items-center gap-1 text-slate-700">
                            <span className="font-bold bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded border border-purple-200">
                              x{item.quantityIssued} {item.unitOfMeasure}
                            </span>
                            <span className="font-medium truncate max-w-xs">{item.itemName}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                      {iss.issuedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {onSelectIssuanceForReturn && (
                        <button
                          onClick={() => onSelectIssuanceForReturn(iss.id)}
                          className="px-2.5 py-1 rounded bg-amber-50 text-[#D97706] hover:bg-[#E5A623] hover:text-slate-950 transition-colors font-bold text-[10px] border border-amber-200 cursor-pointer"
                        >
                          Return in FORM E7
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>
            Showing <strong className="text-slate-800">{filteredIssuances.length}</strong> of{" "}
            <strong className="text-slate-800">{issuances.length}</strong> issuance records
          </span>
          <span className="text-[10px] text-slate-400 font-mono">DILG BIMS Form E6 Compliant</span>
        </div>
      </div>

      {/* New Issuance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#580011] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#E5A623] text-slate-950 rounded-lg">
                  <FileUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Create Property / Equipment Issuance</h3>
                  <p className="text-xs text-rose-200">FORM E6: DILG Issuance Voucher (PAR / ICS / RIS)</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Issuance Voucher Type *
                  </label>
                  <select
                    value={issuanceType}
                    onChange={(e) => setIssuanceType(e.target.value as IssuanceType)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  >
                    <option value="PAR">PAR - Property Acknowledgment Receipt (PPE)</option>
                    <option value="ICS">ICS - Inventory Custodian Slip (Semi-Exp)</option>
                    <option value="RIS">RIS - Requisition & Issue Slip</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Requesting Office / Unit *
                  </label>
                  <input
                    type="text"
                    value={requestingOffice}
                    onChange={(e) => setRequestingOffice(e.target.value)}
                    placeholder="e.g. BPOC / Tanod Desk"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.requestingOffice
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011]"
                    }`}
                  />
                  {errors.requestingOffice && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.requestingOffice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Issued Date *
                  </label>
                  <input
                    type="date"
                    value={issuedDate}
                    onChange={(e) => setIssuedDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Issued By (Property Custodian) *
                  </label>
                  <input
                    type="text"
                    value={issuedBy}
                    onChange={(e) => setIssuedBy(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Received By (Custodian / Recipient) *
                  </label>
                  <input
                    type="text"
                    value={receivedBy}
                    onChange={(e) => setReceivedBy(e.target.value)}
                    placeholder="Full name of recipient"
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

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Recipient Mobile Number
                  </label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="0919-XXX-XXXX"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Purpose of Request / Deployment *
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Nightly Tanod patrol in Zone 4, Disaster drills..."
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.purpose
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011]"
                  }`}
                />
                {errors.purpose && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.purpose}</p>
                )}
              </div>

              {/* DYNAMIC MULTI-ITEM PICKER FROM FORM E5 ASSETS */}
              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                  <span className="text-xs font-extrabold text-purple-950 flex items-center gap-1.5">
                    <ShoppingBag className="h-4 w-4 text-purple-700" /> Multi-Item Selector (Linked to FORM E5 Assets)
                  </span>
                  <span className="text-[10px] font-bold text-purple-800">
                    {selectedItems.length} items added to slip
                  </span>
                </div>

                {/* Add Item Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
                  <div className="sm:col-span-7">
                    <label className="block text-[10px] font-bold text-purple-900 uppercase mb-1">
                      Select Asset Item from E5
                    </label>
                    <select
                      value={currentAssetId}
                      onChange={(e) => setCurrentAssetId(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-purple-300 rounded-lg font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {assets.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.uacsCode} - {a.itemName} (Avail: {a.quantity} {a.unitOfMeasure})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-bold text-purple-900 uppercase mb-1">
                      Qty to Issue
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={currentQty}
                      onChange={(e) => setCurrentQty(parseInt(e.target.value) || 1)}
                      className="w-full text-xs p-2 bg-white border border-purple-300 rounded-lg font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddItemToIssuance}
                      className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add
                    </button>
                  </div>
                </div>

                {errors.itemQty && <p className="text-[11px] text-rose-600 font-medium">{errors.itemQty}</p>}
                {errors.items && <p className="text-[11px] text-rose-600 font-bold">{errors.items}</p>}

                {/* Selected Items List */}
                <div className="space-y-1.5 pt-2">
                  {selectedItems.length === 0 ? (
                    <div className="text-center py-4 text-purple-400 text-xs italic">
                      No items selected yet. Choose an asset above and click &quot;Add&quot;.
                    </div>
                  ) : (
                    selectedItems.map((item) => (
                      <div
                        key={item.assetId}
                        className="flex items-center justify-between p-2 rounded-lg bg-white border border-purple-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#580011] text-[10px]">
                            {item.uacsCode}
                          </span>
                          <span className="font-bold text-slate-800">{item.itemName}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                            {item.quantityIssued} {item.unitOfMeasure}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.assetId)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
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
                  <Sparkles className="h-4 w-4 text-[#E5A623]" /> Generate Issuance Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
