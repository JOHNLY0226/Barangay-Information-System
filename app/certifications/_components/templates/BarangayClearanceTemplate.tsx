import React from "react";
import { CertificateData } from "./types";

interface TemplateProps {
  data: CertificateData;
}

export function BarangayClearanceTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-slate-900 p-8 sm:p-12 border-4 border-double border-[#580011] rounded-lg max-w-2xl mx-auto shadow-md font-sans text-xs sm:text-sm print:border-none print:shadow-none print:p-0">
      {/* Official Header */}
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
          OFFICE OF THE PUNONG BARANGAY • TEL. (02) 8931-XXXX
        </p>
      </div>

      {/* Certificate Title */}
      <div className="text-center my-6">
        <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#580011] border-b border-t border-slate-300 py-1.5 inline-block px-8">
          Barangay Clearance
        </h1>
        <p className="text-[11px] font-mono text-slate-500 mt-1">
          CONTROL NO:{" "}
          <span className="font-bold text-slate-800">{data.controlNumber}</span>
        </p>
      </div>

      {/* Body Content */}
      <div className="space-y-4 leading-relaxed text-slate-800">
        <p className="font-semibold uppercase text-[11px] tracking-wider text-slate-500">
          To Whom It May Concern:
        </p>
        <p className="text-justify indent-8">
          This is to certify that{" "}
          <span className="font-bold text-[#580011] uppercase underline">
            {data.residentName}
          </span>
          , of legal age, Filipino, and a bona fide resident of{" "}
          <span className="font-semibold text-slate-900">{data.address}</span>,
          Barangay Sta. Lucia, Quezon City, is a person of good moral character,
          law-abiding citizen, and has <strong>NO DEROGATORY RECORD</strong> on
          file with this office or the Katarungang Pambarangay.
        </p>
        <p className="text-justify indent-8">
          This certification is issued upon the request of the interested party
          for the purpose of:
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center font-bold text-slate-900 uppercase">
          {data.purpose}
        </div>
        <p className="text-justify indent-8">
          Issued this{" "}
          <span className="font-semibold">
            {new Date(data.dateIssued).toLocaleDateString("en-PH", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>{" "}
          at Barangay Sta. Lucia, Quezon City, Philippines.
        </p>
      </div>

      {/* Signatures & Official Receipt Footer */}
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
            <span className="font-semibold">Issuing Officer:</span>{" "}
            {data.issuingOfficer}
          </p>
          <p className="text-[9px] text-slate-400 mt-1 italic">
            Note: Valid for 6 months from issue date.
          </p>
        </div>

        <div className="text-center">
          <div className="border-b border-slate-800 mx-auto w-48 mb-1"></div>
          <p className="font-bold text-slate-900 uppercase text-xs">
            Hon. Punong Barangay
          </p>
          <p className="text-[10px] text-slate-500">
            Punong Barangay / Authorized Signatory
          </p>
        </div>
      </div>
    </div>
  );
}
