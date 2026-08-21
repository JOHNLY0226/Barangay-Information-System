import React from "react";
import { CertificateData } from "./types";

interface TemplateProps {
  data: CertificateData;
}

export function BusinessPermitTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-slate-900 p-8 sm:p-12 border-4 border-double border-[#580011] rounded-lg max-w-2xl mx-auto shadow-md font-sans text-xs sm:text-sm print:border-none print:shadow-none print:p-0">
      <div className="text-center border-b-2 border-[#580011] pb-4 mb-6">
        <p className="text-[11px] uppercase tracking-widest text-slate-600 font-semibold">
          Republic of the Philippines
        </p>
        <p className="text-xs uppercase tracking-wider text-slate-700">
          City of Quezon • District V
        </p>
        <h2 className="text-base sm:text-lg font-bold text-[#580011] tracking-tight uppercase mt-0.5">
          Barangay Sta. Lucia
        </h2>
        <p className="text-[10px] text-slate-500 font-medium tracking-wide mt-1">
          BARANGAY BUSINESS PERMITS & LICENSING UNIT
        </p>
      </div>

      <div className="text-center my-6">
        <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#580011] border-b border-t border-slate-300 py-1.5 inline-block px-8">
          Barangay Business Clearance
        </h1>
        <p className="text-[11px] font-mono text-slate-500 mt-1">
          PERMIT NO:{" "}
          <span className="font-bold text-slate-800">{data.controlNumber}</span>
        </p>
      </div>

      <div className="space-y-4 leading-relaxed text-slate-800">
        <p className="font-semibold uppercase text-[11px] tracking-wider text-slate-500">
          To Whom It May Concern:
        </p>
        <p className="text-justify indent-8">
          Clearance is hereby granted to{" "}
          <span className="font-bold text-[#580011] uppercase underline">
            {data.businessName || "Registered Enterprise"}
          </span>
          , under the business proprietorship of{" "}
          <span className="font-bold text-slate-900 uppercase">
            {data.residentName}
          </span>
          , located at{" "}
          <span className="font-semibold text-slate-900">{data.address}</span>,
          Barangay Sta. Lucia, Quezon City.
        </p>
        <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
          <div>
            <span className="font-semibold text-slate-600">
              Line of Business:
            </span>{" "}
            {data.businessType || data.purpose}
          </div>
          <div>
            <span className="font-semibold text-slate-600">Status:</span> New /
            Renewal
          </div>
        </div>
        <p className="text-justify indent-8">
          This clearance is issued in accordance with the provisions of Section
          152 (c) of R.A. 7160 (Local Government Code of 1991), subject to
          continuous compliance with local ordinances, sanitation rules, and
          fire safety standards.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 gap-6 items-end">
        <div className="text-[11px] space-y-1 text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
          <p>
            <span className="font-semibold">O.R. Number:</span> {data.orNumber}
          </p>
          <p>
            <span className="font-semibold">Amount Paid:</span> ₱
            {Number(data.amountPaid).toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Date Granted:</span>{" "}
            {data.dateIssued}
          </p>
        </div>
        <div className="text-center">
          <div className="border-b border-slate-800 mx-auto w-48 mb-1"></div>
          <p className="font-bold text-slate-900 uppercase text-xs">
            Hon. Punong Barangay
          </p>
          <p className="text-[10px] text-slate-500">Punong Barangay</p>
        </div>
      </div>
    </div>
  );
}
