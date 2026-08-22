"use client";

import React, { useState } from "react";
import { useBams } from "./BamsContext";
import { BarangaySupplier } from "./types";
import {
  Truck,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Building,
  FileCheck2,
  X,
  Sparkles,
  ShieldCheck,
  User,
} from "lucide-react";

export default function FormE3Suppliers({
  onSelectSupplierForAIR,
}: {
  onSelectSupplierForAIR?: (supplierId: string) => void;
}) {
  const { suppliers, addSupplier, toggleSupplierActive } = useBams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [supplierName, setSupplierName] = useState("");
  const [address, setAddress] = useState("");
  const [tin, setTin] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dtiSecRegNo, setDtiSecRegNo] = useState("");
  const [philGepsNo, setPhilGepsNo] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpenModal = () => {
    setSupplierName("");
    setAddress("");
    setTin("");
    setContactPerson("");
    setContactNumber("");
    setEmail("");
    setDtiSecRegNo("");
    setPhilGepsNo("");
    setIsActive(true);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!supplierName.trim()) newErrors.supplierName = "Supplier Name is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!tin.trim()) newErrors.tin = "TIN is required";
    if (!contactPerson.trim()) newErrors.contactPerson = "Contact Person is required";
    if (!contactNumber.trim()) newErrors.contactNumber = "Contact Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addSupplier({
      supplierName,
      address,
      tin,
      contactPerson,
      contactNumber,
      email,
      dtiSecRegNo,
      philGepsNo,
      isActive,
    });

    setIsModalOpen(false);
  };

  const filteredSuppliers = suppliers.filter((sup) => {
    const matchesSearch =
      sup.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.supplierCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.tin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.philGepsNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesActive =
      filterActive === "All" ||
      (filterActive === "Active" && sup.isActive) ||
      (filterActive === "Inactive" && !sup.isActive);

    return matchesSearch && matchesActive;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              FORM E3
            </span>
            <span>DILG BIMS Accredited Suppliers</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Barangay Suppliers Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain accredited contractors, PhilGEPS registrants, and equipment vendors for procurement and inspection.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4 text-[#E5A623]" /> Add Accredited Supplier
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Suppliers</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{suppliers.length}</div>
          <span className="text-[11px] text-slate-500">In Database</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Active Vendors</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {suppliers.filter((s) => s.isActive).length}
          </div>
          <span className="text-[11px] text-slate-500">Eligible for Bids</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">PhilGEPS Registered</span>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {suppliers.filter((s) => s.philGepsNo.length > 0).length}
          </div>
          <span className="text-[11px] text-slate-500">Verified Govt Bidders</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Inactive</span>
          <div className="text-2xl font-black text-rose-800 mt-1">
            {suppliers.filter((s) => !s.isActive).length}
          </div>
          <span className="text-[11px] text-slate-500">Suspended / Deactivated</span>
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
            placeholder="Search supplier name, TIN, PhilGEPS number, or contact person..."
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
          <span className="font-semibold text-slate-600 text-xs">Status:</span>
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#580011]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Supplier Directory Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Supplier & Address</th>
                <th className="py-3.5 px-4">Tax ID (TIN) & Reg.</th>
                <th className="py-3.5 px-4">Contact Person & Info</th>
                <th className="py-3.5 px-4">PhilGEPS Badge</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 bg-slate-50/50">
                    <Truck className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold text-slate-600">No Barangay Suppliers Found</p>
                    <p className="text-[11px] text-slate-400">Add a new supplier to populate FORM E3.</p>
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map((sup) => (
                  <tr key={sup.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#580011] whitespace-nowrap">
                      {sup.supplierCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-[#580011]" /> {sup.supplierName}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{sup.address}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <div>TIN: <strong className="text-slate-800">{sup.tin}</strong></div>
                      {sup.dtiSecRegNo && (
                        <div className="text-[10px] text-slate-500">DTI/SEC: {sup.dtiSecRegNo}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <User className="h-3 w-3 text-slate-400" /> {sup.contactPerson}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5 font-mono">
                        <span className="flex items-center gap-0.5">
                          <Phone className="h-3 w-3 text-slate-400" /> {sup.contactNumber}
                        </span>
                        {sup.email && (
                          <span className="flex items-center gap-0.5">
                            <Mail className="h-3 w-3 text-slate-400" /> {sup.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {sup.philGepsNo ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                          <FileCheck2 className="h-3.5 w-3.5 text-[#D97706]" /> {sup.philGepsNo}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">Not Registered</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleSupplierActive(sup.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                          sup.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                        }`}
                      >
                        {sup.isActive ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Active
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3.5 w-3.5 text-rose-600" /> Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {onSelectSupplierForAIR && sup.isActive && (
                        <button
                          onClick={() => onSelectSupplierForAIR(sup.id)}
                          className="px-2.5 py-1 rounded bg-amber-50 text-[#D97706] hover:bg-[#E5A623] hover:text-slate-950 transition-colors font-bold text-[10px] border border-amber-200 cursor-pointer"
                        >
                          Use in FORM E4
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
            Showing <strong className="text-slate-800">{filteredSuppliers.length}</strong> of{" "}
            <strong className="text-slate-800">{suppliers.length}</strong> supplier records
          </span>
          <span className="text-[10px] text-slate-400 font-mono">DILG BIMS Form E3 Compliant</span>
        </div>
      </div>

      {/* Add Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#580011] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#E5A623] text-slate-950 rounded-lg">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Add Accredited Supplier</h3>
                  <p className="text-xs text-rose-200">FORM E3: Barangay Supplier Accreditation Record</p>
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
                  Supplier / Company Name *
                </label>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  placeholder="e.g. Fil-Safety Equipment & Tactical Corp."
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.supplierName
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.supplierName && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.supplierName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Complete Office Address *
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, City, Province..."
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.address
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.address && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Tax Identification Number (TIN) *
                  </label>
                  <input
                    type="text"
                    value={tin}
                    onChange={(e) => setTin(e.target.value)}
                    placeholder="000-000-000-000"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-mono focus:outline-none focus:ring-2 ${
                      errors.tin
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.tin && <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.tin}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    PhilGEPS Registration No.
                  </label>
                  <input
                    type="text"
                    value={philGepsNo}
                    onChange={(e) => setPhilGepsNo(e.target.value)}
                    placeholder="2026-XXXXXX"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Key representative name"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.contactPerson
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.contactPerson && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.contactPerson}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Contact Mobile/Phone *
                  </label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="0917-XXX-XXXX"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-mono focus:outline-none focus:ring-2 ${
                      errors.contactNumber
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.contactNumber && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.contactNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="supplier@company.com"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    DTI / SEC Registration No.
                  </label>
                  <input
                    type="text"
                    value={dtiSecRegNo}
                    onChange={(e) => setDtiSecRegNo(e.target.value)}
                    placeholder="CS2026XXXXX"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 text-[#580011] focus:ring-[#580011] rounded"
                />
                <label htmlFor="isActive" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Mark Supplier as Active & Eligible for Procurement Bids
                </label>
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
                  <Sparkles className="h-4 w-4 text-[#E5A623]" /> Register Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
