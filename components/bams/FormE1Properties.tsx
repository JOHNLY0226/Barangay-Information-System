"use client";

import React, { useState } from "react";
import { useBams } from "./BamsContext";
import { PropertyType, PropertyStatus, BarangayProperty } from "./types";
import {
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  XCircle,
  Clock,
  Trash2,
  X,
  MapPin,
  Tag,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

export default function FormE1Properties({
  onSelectPropertyForLocation,
}: {
  onSelectPropertyForLocation?: (propId: string) => void;
}) {
  const { properties, addProperty, updatePropertyStatus, deleteProperty } = useBams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<PropertyType>("Infrastructure - Vertical");
  const [status, setStatus] = useState<PropertyStatus>("Operational");
  const [category, setCategory] = useState("Peace & Order & Safety");
  const [subcategory, setSubcategory] = useState("Administrative Facility");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpenModal = () => {
    setName("");
    setDescription("");
    setType("Infrastructure - Vertical");
    setStatus("Operational");
    setCategory("Peace & Order & Safety");
    setSubcategory("Administrative Facility");
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Property Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!subcategory.trim()) newErrors.subcategory = "Subcategory is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addProperty({
      name,
      description,
      type,
      status,
      category,
      subcategory,
    });

    setIsModalOpen(false);
  };

  // Filters
  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "All" || prop.type === selectedType;
    const matchesStatus = selectedStatus === "All" || prop.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (st: PropertyStatus) => {
    switch (st) {
      case "Operational":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Operational
          </span>
        );
      case "Available":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <Clock className="h-3.5 w-3.5 text-sky-600" /> Available
          </span>
        );
      case "Under Maintenance":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <Wrench className="h-3.5 w-3.5 text-amber-600" /> Under Maintenance
          </span>
        );
      case "Under Construction":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Building2 className="h-3.5 w-3.5 text-purple-600" /> Under Construction
          </span>
        );
      case "Non-operational":
      case "Out of Service":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <XCircle className="h-3.5 w-3.5 text-slate-500" /> {st}
          </span>
        );
      case "Lost/Stolen":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-[#580011] border border-rose-200">
            <AlertTriangle className="h-3.5 w-3.5 text-[#580011]" /> Lost/Stolen
          </span>
        );
      default:
        return null;
    }
  };

  const propertyTypesList: PropertyType[] = [
    "Infrastructure - Horizontal",
    "Infrastructure - Vertical",
    "Infrastructure - Water",
    "Non-Infrastructure - Motor Vehicle",
    "Non-Infrastructure - ICT Equipment",
    "Non-Infrastructure - Others",
  ];

  const propertyStatusesList: PropertyStatus[] = [
    "Available",
    "Operational",
    "Under Maintenance",
    "Non-operational",
    "Under Construction",
    "Out of Service",
    "Lost/Stolen",
  ];

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              FORM E1
            </span>
            <span>DILG BIMS Asset Registry</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Barangay Properties Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Register and manage horizontal/vertical infrastructure and non-infrastructure barangay assets.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4 text-[#E5A623]" /> Add New Property
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Properties</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{properties.length}</div>
          <span className="text-[11px] text-slate-500">Registered Assets</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Operational</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {properties.filter((p) => p.status === "Operational").length}
          </div>
          <span className="text-[11px] text-slate-500">Active & Ready</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Maintenance</span>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {properties.filter((p) => p.status === "Under Maintenance").length}
          </div>
          <span className="text-[11px] text-slate-500">Servicing Required</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Infrastructure</span>
          <div className="text-2xl font-black text-purple-700 mt-1">
            {properties.filter((p) => p.type.startsWith("Infrastructure")).length}
          </div>
          <span className="text-[11px] text-slate-500">Vertical/Horizontal/Water</span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by property name, code, category..."
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

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 text-xs">
            <Filter className="h-3.5 w-3.5 text-slate-500" />
            <span className="font-semibold text-slate-600 text-[11px]">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none"
            >
              <option value="All">All Types</option>
              {propertyTypesList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600 text-[11px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              {propertyStatusesList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Property Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Property Name & Description</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Governance Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 bg-slate-50/50">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold text-slate-600">No Barangay Properties Found</p>
                    <p className="text-[11px] text-slate-400">Try clearing filters or add a new property.</p>
                  </td>
                </tr>
              ) : (
                filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#580011] whitespace-nowrap">
                      {prop.propertyCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs">{prop.name}</div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{prop.description}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          prop.type.startsWith("Infrastructure")
                            ? "bg-purple-50 text-purple-800 border-purple-200"
                            : "bg-blue-50 text-blue-800 border-blue-200"
                        }`}
                      >
                        {prop.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{prop.category}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{prop.subcategory}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(prop.status)}
                        <select
                          value={prop.status}
                          onChange={(e) =>
                            updatePropertyStatus(prop.id, e.target.value as PropertyStatus)
                          }
                          className="text-[10px] bg-slate-100 border border-slate-200 rounded px-1 py-0.5 font-medium text-slate-600 focus:outline-none"
                          title="Quick update status"
                        >
                          {propertyStatusesList.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {onSelectPropertyForLocation && (
                          <button
                            onClick={() => onSelectPropertyForLocation(prop.id)}
                            className="p-1.5 rounded-md bg-amber-50 text-[#E5A623] hover:bg-[#E5A623] hover:text-slate-950 transition-colors font-bold text-[10px] flex items-center gap-1 border border-amber-200"
                            title="Geotag / View Location in FORM E2"
                          >
                            <MapPin className="h-3.5 w-3.5" /> Geotag
                          </button>
                        )}
                        <button
                          onClick={() => deleteProperty(prop.id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete property record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>
            Showing <strong className="text-slate-800">{filteredProperties.length}</strong> of{" "}
            <strong className="text-slate-800">{properties.length}</strong> total property records
          </span>
          <span className="text-[10px] text-slate-400 font-mono">DILG BIMS Form E1 Compliant</span>
        </div>
      </div>

      {/* Add Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#580011] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#E5A623] text-slate-950 rounded-lg">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Add New Barangay Property</h3>
                  <p className="text-xs text-rose-200">FORM E1: DILG Barangay Properties Registry</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-rose-200 hover:text-white p-1 rounded-lg hover:bg-[#7A0018] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Property Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Barangay Sta. Lucia Rescue Truck #2"
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide technical specifications, capacity, or intended usage..."
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.description
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.description && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Property Type *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as PropertyType)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011] font-medium"
                  >
                    {propertyTypesList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Property Status *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011] font-medium"
                  >
                    {propertyStatusesList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Governance Category *
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Disaster Preparedness, Peace & Order"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.category
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.category && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Subcategory *
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Flood Control, Procurement of Equipment"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.subcategory
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.subcategory && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.subcategory}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4 text-[#E5A623]" /> Save Property Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
