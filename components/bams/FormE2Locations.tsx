"use client";

import React, { useState, useEffect } from "react";
import { useBams } from "./BamsContext";
import { PropertyLocation } from "./types";
import {
  MapPin,
  Map as MapIcon,
  UploadCloud,
  Crosshair,
  Save,
  Building2,
  Navigation,
  Image as ImageIcon,
  CheckCircle2,
  Info,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export default function FormE2Locations({
  selectedPropertyIdFromE1,
}: {
  selectedPropertyIdFromE1?: string;
}) {
  const { properties, locations, saveLocation, showToast } = useBams();

  const [selectedPropId, setSelectedPropId] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(14.7012);
  const [longitude, setLongitude] = useState<number>(121.0543);
  const [exactLocation, setExactLocation] = useState<string>("");
  const [isMapPickerActive, setIsMapPickerActive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"map" | "geotag" | "manual">("map");

  // Geotag upload simulation state
  const [geotagPhotoUrl, setGeotagPhotoUrl] = useState<string>("");
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);

  // Set default selected property
  useEffect(() => {
    if (selectedPropertyIdFromE1) {
      setSelectedPropId(selectedPropertyIdFromE1);
    } else if (properties.length > 0 && !selectedPropId) {
      setSelectedPropId(properties[0].id);
    }
  }, [properties, selectedPropertyIdFromE1]);

  // When property selection changes, load existing location data if available
  useEffect(() => {
    if (selectedPropId) {
      const existingLoc = locations.find((l) => l.propertyId === selectedPropId);
      if (existingLoc) {
        setLatitude(existingLoc.latitude);
        setLongitude(existingLoc.longitude);
        setExactLocation(existingLoc.exactLocation);
        setGeotagPhotoUrl(existingLoc.geotaggedPhotoUrl || "");
      } else {
        const propObj = properties.find((p) => p.id === selectedPropId);
        setExactLocation(
          propObj
            ? `123 Main Street, Barangay Sta. Lucia, District V, Quezon City`
            : "Barangay Sta. Lucia, Quezon City"
        );
      }
    }
  }, [selectedPropId, locations, properties]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMapPickerActive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Map click coordinates relative calculation simulation around Brgy Sta. Lucia (14.7000 - 14.7100, 121.0500 - 121.0600)
    const mockLat = Number((14.7000 + (1 - y / rect.height) * 0.012).toFixed(6));
    const mockLng = Number((121.0500 + (x / rect.width) * 0.015).toFixed(6));

    setLatitude(mockLat);
    setLongitude(mockLng);
    showToast("Pin Dropped", `Set coordinates to ${mockLat}, ${mockLng}`, "info");
  };

  const handleSimulatedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsSimulatingUpload(true);
      setTimeout(() => {
        // Mock extracted GPS metadata from image
        const extractedLat = Number((14.7000 + Math.random() * 0.01).toFixed(6));
        const extractedLng = Number((121.0500 + Math.random() * 0.012).toFixed(6));
        setLatitude(extractedLat);
        setLongitude(extractedLng);
        setGeotagPhotoUrl(
          "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80"
        );
        setIsSimulatingUpload(false);
        showToast(
          "Geotag EXIF Extracted",
          `EXIF metadata populated Lat: ${extractedLat}, Lng: ${extractedLng}`
        );
      }, 1200);
    }
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPropId) {
      showToast("Select Property", "Please select a property from E1 dropdown.", "error");
      return;
    }
    if (!exactLocation.trim()) {
      showToast("Address Required", "Please enter the exact location address.", "error");
      return;
    }

    const propObj = properties.find((p) => p.id === selectedPropId);
    if (!propObj) return;

    saveLocation({
      propertyId: selectedPropId,
      propertyName: propObj.name,
      latitude,
      longitude,
      exactLocation,
      geotagSource: activeTab === "geotag" ? "geotagged_photo" : isMapPickerActive ? "map_picker" : "manual",
      geotaggedPhotoUrl: geotagPhotoUrl || undefined,
    });
  };

  const selectedProperty = properties.find((p) => p.id === selectedPropId);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              FORM E2
            </span>
            <span>DILG BIMS Property Location & Geotagging</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Barangay Property Location & Geotagging
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Geotag barangay infrastructure and assets with GPS coordinates, map pin dropping, and EXIF image parser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-[#580011]" /> Linked to E1 ({properties.length} Properties)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Geotagging Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#E5A623]" /> Geotag Property Record
              </h3>
              <span className="text-[10px] font-mono font-bold bg-amber-50 text-[#D97706] px-2 py-0.5 rounded">
                FORM E2
              </span>
            </div>

            <form onSubmit={handleSaveLocation} className="space-y-4">
              {/* Dropdown linked to E1 Properties */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Select Property Name (Linked to Form E1) *
                </label>
                <select
                  value={selectedPropId}
                  onChange={(e) => setSelectedPropId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011] font-bold text-slate-900"
                >
                  <option value="" disabled>
                    -- Select Property from E1 --
                  </option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.propertyCode} - {p.name}
                    </option>
                  ))}
                </select>
                {selectedProperty && (
                  <div className="mt-2 p-2.5 rounded-lg bg-rose-50/60 border border-rose-100 text-[11px] text-slate-600 flex items-center justify-between">
                    <span>
                      Type: <strong className="text-[#580011]">{selectedProperty.type}</strong>
                    </span>
                    <span className="font-semibold text-slate-700">{selectedProperty.status}</span>
                  </div>
                )}
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold text-slate-600">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("map");
                    setIsMapPickerActive(true);
                  }}
                  className={`py-1.5 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === "map" ? "bg-[#580011] text-white shadow-2xs" : "hover:bg-slate-200"
                  }`}
                >
                  <Crosshair className="h-3.5 w-3.5" /> Map Pin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("geotag");
                    setIsMapPickerActive(false);
                  }}
                  className={`py-1.5 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === "geotag" ? "bg-[#580011] text-white shadow-2xs" : "hover:bg-slate-200"
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5" /> Photo GPS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("manual");
                    setIsMapPickerActive(false);
                  }}
                  className={`py-1.5 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === "manual" ? "bg-[#580011] text-white shadow-2xs" : "hover:bg-slate-200"
                  }`}
                >
                  <Navigation className="h-3.5 w-3.5" /> Manual
                </button>
              </div>

              {/* Mode Specific Inputs */}
              {activeTab === "geotag" && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1">
                      <UploadCloud className="h-4 w-4 text-[#D97706]" /> Geotagged Photo Upload Simulator
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-tight">
                    Upload an asset photograph. The system will automatically extract GPS EXIF metadata coordinates.
                  </p>

                  <label className="block w-full text-center py-3 border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-lg cursor-pointer bg-white transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSimulatedImageUpload}
                      className="hidden"
                    />
                    {isSimulatingUpload ? (
                      <span className="text-xs font-bold text-[#D97706] flex items-center justify-center gap-1.5">
                        <RefreshCw className="h-4 w-4 animate-spin" /> Extracting EXIF Metadata...
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5">
                        <ImageIcon className="h-4 w-4 text-[#D97706]" /> Click to Upload Photo
                      </span>
                    )}
                  </label>

                  {geotagPhotoUrl && (
                    <div className="relative mt-2 rounded-lg overflow-hidden border border-amber-200 h-28">
                      <img
                        src={geotagPhotoUrl}
                        alt="Geotagged Asset"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-900/75 text-white p-1.5 text-[10px] font-mono flex justify-between">
                        <span>EXIF Verified</span>
                        <span>
                          {latitude}, {longitude}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Lat/Long Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  />
                </div>
              </div>

              {/* Exact Location Full Address */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Exact Location / Full Address *
                </label>
                <textarea
                  rows={2}
                  value={exactLocation}
                  onChange={(e) => setExactLocation(e.target.value)}
                  placeholder="Street name, landmark, building number, Barangay Sta. Lucia..."
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011] text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Save className="h-4 w-4 text-[#E5A623]" /> Save Location Data (Form E2)
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Simulated Interactive Map Viewer & Location Directory (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Simulated Interactive Map Picker Box */}
          <div className="bg-slate-900 text-white rounded-xl border border-slate-800 shadow-md overflow-hidden flex flex-col">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapIcon className="h-4 w-4 text-[#E5A623]" />
                <span className="text-xs font-bold">Barangay Sta. Lucia GIS Map Canvas</span>
              </div>
              <button
                onClick={() => setIsMapPickerActive(!isMapPickerActive)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                  isMapPickerActive
                    ? "bg-[#E5A623] text-slate-950"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Crosshair className="h-3 w-3" />
                {isMapPickerActive ? "Map Picker: Active (Click map)" : "Enable Pin Dropping"}
              </button>
            </div>

            {/* Interactive Simulated Map Box */}
            <div
              onClick={handleMapClick}
              className={`relative h-64 w-full bg-[#1e293b] cursor-crosshair overflow-hidden select-none transition-all ${
                isMapPickerActive ? "ring-2 ring-inset ring-[#E5A623]" : ""
              }`}
              style={{
                backgroundImage:
                  "radial-gradient(#334155 1.5px, transparent 1.5px), radial-gradient(#334155 1.5px, #0f172a 1.5px)",
                backgroundSize: "30px 30px",
                backgroundPosition: "0 0, 15px 15px",
              }}
            >
              {/* Map Road Grid Overlay simulation lines */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full">
                  <line x1="0" y1="30%" x2="100%" y2="40%" stroke="#E5A623" strokeWidth="4" />
                  <line x1="40%" y1="0" x2="60%" y2="100%" stroke="#94a3b8" strokeWidth="6" />
                  <line x1="0" y1="75%" x2="100%" y2="65%" stroke="#38bdf8" strokeWidth="8" />
                </svg>
              </div>

              {/* District Label */}
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs border border-slate-700 text-rose-200 px-2.5 py-1 rounded text-[10px] font-mono pointer-events-none">
                District V • LGU Sta. Lucia Vector Grid
              </div>

              {/* Pin indicator for active selection */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 pointer-events-none flex flex-col items-center"
                style={{
                  left: `${Math.min(
                    90,
                    Math.max(10, ((longitude - 121.0500) / 0.015) * 100)
                  )}%`,
                  top: `${Math.min(
                    90,
                    Math.max(10, (1 - (latitude - 14.7000) / 0.012) * 100)
                  )}%`,
                }}
              >
                <div className="bg-[#580011] text-[#E5A623] border border-[#E5A623] px-2 py-0.5 rounded text-[10px] font-bold shadow-lg whitespace-nowrap mb-1">
                  {selectedProperty?.name || "Selected Location"}
                </div>
                <div className="h-7 w-7 rounded-full bg-rose-600/30 flex items-center justify-center animate-ping absolute"></div>
                <MapPin className="h-6 w-6 text-[#E5A623] fill-[#580011] drop-shadow-md" />
              </div>

              {/* Other Location Pins */}
              {locations.map((loc) => {
                if (loc.propertyId === selectedPropId) return null;
                const leftPos = Math.min(90, Math.max(10, ((loc.longitude - 121.0500) / 0.015) * 100));
                const topPos = Math.min(90, Math.max(10, (1 - (loc.latitude - 14.7000) / 0.012) * 100));

                return (
                  <div
                    key={loc.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPropId(loc.propertyId);
                    }}
                    className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group pointer-events-auto"
                    style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                    title={loc.propertyName}
                  >
                    <MapPin className="h-5 w-5 text-rose-400 hover:text-[#E5A623] transition-colors" />
                  </div>
                );
              })}

              <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-md text-[10px] font-mono text-slate-300">
                Lat: {latitude} | Lng: {longitude}
              </div>
            </div>

            <div className="p-3 bg-slate-950 text-slate-400 text-[11px] flex items-center justify-between border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-[#E5A623]" /> Click map canvas to auto-populate GPS coordinates.
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">● Map Engine Active</span>
            </div>
          </div>

          {/* Locations Directory Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Geotagged Locations Directory ({locations.length})
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">Form E2 Log</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Property Name</th>
                    <th className="py-3 px-4">Coordinates (Lat, Lng)</th>
                    <th className="py-3 px-4">Exact Address</th>
                    <th className="py-3 px-4">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {locations.map((loc) => (
                    <tr
                      key={loc.id}
                      onClick={() => setSelectedPropId(loc.propertyId)}
                      className={`cursor-pointer transition-colors ${
                        loc.propertyId === selectedPropId
                          ? "bg-rose-50/60 font-semibold"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {loc.propertyName}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 text-[11px] whitespace-nowrap">
                        {loc.latitude}, {loc.longitude}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-slate-600">
                        {loc.exactLocation}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                            loc.geotagSource === "geotagged_photo"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : loc.geotagSource === "map_picker"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {loc.geotagSource.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
