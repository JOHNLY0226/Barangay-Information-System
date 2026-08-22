"use client";

import React from "react";
import { ShieldCheck, Lock } from "lucide-react";

interface ConsentClauseProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: "standard" | "vawc";
  required?: boolean;
}

export function ConsentClause({
  checked,
  onChange,
  variant = "standard",
  required = true,
}: ConsentClauseProps) {
  if (variant === "vawc") {
    return (
      <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
        <div className="flex items-start gap-3">
          <input
            id="vawc-consent"
            type="checkbox"
            required={required}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 mt-1 rounded accent-[#580011] shrink-0 cursor-pointer"
          />
          <label
            htmlFor="vawc-consent"
            className="text-xs text-slate-800 leading-relaxed cursor-pointer select-none"
          >
            <span className="font-bold text-[#580011] flex items-center gap-1.5 mb-1">
              <Lock className="h-3.5 w-3.5 text-[#e5a623]" />
              Statutory Certification & LGUSS-BIMS Data Consent (Sec. 394(d)(6) / RA 9262):
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
    );
  }

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
      <div className="flex items-start gap-3">
        <input
          id="standard-attestation"
          type="checkbox"
          required={required}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 mt-1 rounded accent-[#580011] shrink-0 cursor-pointer"
        />
        <label
          htmlFor="standard-attestation"
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
  );
}
