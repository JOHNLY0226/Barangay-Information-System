"use client";

import React, { useState } from "react";
import { useBams } from "./BamsContext";
import { AssetClassification, BarangayAsset } from "./types";
import {
  Boxes,
  Plus,
  Search,
  DollarSign,
  Calculator,
  Tag,
  Layers,
  X,
  Sparkles,
  TrendingUp,
  Package,
} from "lucide-react";

export default function FormE5Assets({
  onSelectAssetForIssuance,
}: {
  onSelectAssetForIssuance?: (assetId: string) => void;
}) {
  const { assets, addAsset } = useBams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [uacsCode, setUacsCode] = useState("1-07-05-020");
  const [classification, setClassification] =
    useState<AssetClassification>("Property Plant and Equipment (PPE)");
  const [unitOfMeasure, setUnitOfMeasure] = useState("units");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(1000);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto calculated total valuation
  const computedTotalValuation = (quantity || 0) * (unitPrice || 0);

  const handleOpenModal = () => {
    setUacsCode("1-07-05-020");
    setClassification("Property Plant and Equipment (PPE)");
    setUnitOfMeasure("units");
    setItemName("");
    setQuantity(1);
    setUnitPrice(1000);
    setDescription("");
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!uacsCode.trim()) newErrors.uacsCode = "UACS Code is required";
    if (!itemName.trim()) newErrors.itemName = "Item Name is required";
    if (!quantity || quantity <= 0) newErrors.quantity = "Quantity must be > 0";
    if (!unitPrice || unitPrice < 0) newErrors.unitPrice = "Unit Price must be >= 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addAsset({
      uacsCode,
      classification,
      unitOfMeasure,
      itemName,
      quantity,
      unitPrice,
      description,
    });

    setIsModalOpen(false);
  };

  // Grand Total Valuation Calculation
  const grandTotalValuation = assets.reduce((acc, curr) => acc + curr.totalValuation, 0);
  const ppeTotal = assets
    .filter((a) => a.classification === "Property Plant and Equipment (PPE)")
    .reduce((acc, curr) => acc + curr.totalValuation, 0);
  const semiTotal = assets
    .filter((a) => a.classification === "Semi-Expendable")
    .reduce((acc, curr) => acc + curr.totalValuation, 0);
  const expendableTotal = assets
    .filter((a) => a.classification === "Expendable")
    .reduce((acc, curr) => acc + curr.totalValuation, 0);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.uacsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = filterClass === "All" || asset.classification === filterClass;

    return matchesSearch && matchesClass;
  });

  const getClassificationBadge = (cls: AssetClassification) => {
    switch (cls) {
      case "Property Plant and Equipment (PPE)":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
            PPE
          </span>
        );
      case "Semi-Expendable":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
            Semi-Expendable
          </span>
        );
      case "Expendable":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            Expendable
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
              FORM E5
            </span>
            <span>DILG BIMS Barangay Asset Inventory</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Barangay Asset & Valuation Inventory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage UACS classified items (PPE, Semi-Expendable, Expendable) with dynamic valuation tracking.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4 text-[#E5A623]" /> Add Asset Item
        </button>
      </div>

      {/* TOTAL VALUATION SUMMARY CARD (Highlighted Premium Card) */}
      <div className="bg-gradient-to-r from-[#580011] via-[#6B0014] to-[#3D000C] text-white p-6 rounded-xl shadow-md border border-[#7A0018] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E5A623] bg-[#3D000C] px-2 py-0.5 rounded border border-[#7A0018]">
                Form E5 Total Valuation Summary Card
              </span>
            </div>
            <span className="text-xs text-rose-200 block">Total Capital Assets Valuation (PHP)</span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-1">
              <span className="text-[#E5A623]">₱</span>
              {grandTotalValuation.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-rose-200/80">
              Aggregated financial valuation across all {assets.length} registered asset inventory entries.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-[#7A0018] pt-4 md:pt-0 md:pl-6">
            <div className="bg-[#3D000C]/70 p-3 rounded-lg border border-[#7A0018]">
              <span className="text-[10px] uppercase font-bold text-rose-200 block">PPE Valuation</span>
              <span className="text-sm font-bold text-amber-300">
                ₱{ppeTotal.toLocaleString()}
              </span>
            </div>
            <div className="bg-[#3D000C]/70 p-3 rounded-lg border border-[#7A0018]">
              <span className="text-[10px] uppercase font-bold text-rose-200 block">Semi-Expendable</span>
              <span className="text-sm font-bold text-amber-300">
                ₱{semiTotal.toLocaleString()}
              </span>
            </div>
            <div className="bg-[#3D000C]/70 p-3 rounded-lg border border-[#7A0018]">
              <span className="text-[10px] uppercase font-bold text-rose-200 block">Expendable</span>
              <span className="text-sm font-bold text-amber-300">
                ₱{expendableTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search item name, UACS code, or description..."
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
          <span className="font-semibold text-slate-600 text-xs">Classification:</span>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#580011]"
          >
            <option value="All">All Classifications</option>
            <option value="Property Plant and Equipment (PPE)">PPE Only</option>
            <option value="Semi-Expendable">Semi-Expendable</option>
            <option value="Expendable">Expendable</option>
          </select>
        </div>
      </div>

      {/* Asset Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">UACS Code</th>
                <th className="py-3.5 px-4">Item Name & Description</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4 text-center">Qty / Unit</th>
                <th className="py-3.5 px-4 text-right">Unit Price (₱)</th>
                <th className="py-3.5 px-4 text-right">Total Valuation (₱)</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 bg-slate-50/50">
                    <Boxes className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold text-slate-600">No Asset Items Found</p>
                    <p className="text-[11px] text-slate-400">Click &quot;Add Asset Item&quot; to populate inventory.</p>
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#580011] whitespace-nowrap">
                      {asset.uacsCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs">{asset.itemName}</div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{asset.description}</p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getClassificationBadge(asset.classification)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800 whitespace-nowrap">
                      {asset.quantity}{" "}
                      <span className="text-[10px] font-normal text-slate-500">{asset.unitOfMeasure}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-700 whitespace-nowrap">
                      ₱{asset.unitPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#580011] whitespace-nowrap">
                      ₱{asset.totalValuation.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {onSelectAssetForIssuance && (
                        <button
                          onClick={() => onSelectAssetForIssuance(asset.id)}
                          className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 hover:bg-purple-700 hover:text-white transition-colors font-bold text-[10px] border border-purple-200 cursor-pointer"
                        >
                          Issue in FORM E6
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
            Showing <strong className="text-slate-800">{filteredAssets.length}</strong> of{" "}
            <strong className="text-slate-800">{assets.length}</strong> asset items
          </span>
          <span className="text-[10px] text-slate-400 font-mono">DILG BIMS Form E5 Compliant</span>
        </div>
      </div>

      {/* Add Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#580011] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#E5A623] text-slate-950 rounded-lg">
                  <Boxes className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Add Barangay Inventory Asset</h3>
                  <p className="text-xs text-rose-200">FORM E5: DILG Asset & Valuation Register</p>
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
                    UACS Object Code *
                  </label>
                  <input
                    type="text"
                    value={uacsCode}
                    onChange={(e) => setUacsCode(e.target.value)}
                    placeholder="e.g. 1-07-05-020"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-mono focus:outline-none focus:ring-2 ${
                      errors.uacsCode
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.uacsCode && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.uacsCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Classification *
                  </label>
                  <select
                    value={classification}
                    onChange={(e) => setClassification(e.target.value as AssetClassification)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  >
                    <option value="Property Plant and Equipment (PPE)">
                      Property Plant and Equipment (PPE)
                    </option>
                    <option value="Semi-Expendable">Semi-Expendable</option>
                    <option value="Expendable">Expendable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Motorola Two-Way Radio Transceiver Set"
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.itemName
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.itemName && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.itemName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Unit of Measure *
                  </label>
                  <input
                    type="text"
                    value={unitOfMeasure}
                    onChange={(e) => setUnitOfMeasure(e.target.value)}
                    placeholder="pcs, units, box, lot..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-bold focus:outline-none focus:ring-2 ${
                      errors.quantity
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011]"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Unit Price (₱) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-bold font-mono focus:outline-none focus:ring-2 ${
                      errors.unitPrice
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011]"
                    }`}
                  />
                </div>
              </div>

              {/* Real-time Auto-Calculation Display Box */}
              <div className="p-3 bg-[#580011] text-white rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#E5A623]" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-200 block">
                      Auto-Calculated Total Valuation (Qty * Unit Price)
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      {quantity || 0} {unitOfMeasure} × ₱{(unitPrice || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-xl font-black text-[#E5A623] font-mono">
                  ₱{computedTotalValuation.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Item Description & Specifications
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Technical specs, model number, brand name..."
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
                  <Sparkles className="h-4 w-4 text-[#E5A623]" /> Save Asset to Form E5
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
