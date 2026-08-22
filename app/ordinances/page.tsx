"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Scroll, ArrowLeft, Plus, FileText, Search, Check, ChevronLeft,
  ChevronRight, X, Upload, Download, Trash2, Eye, Pencil, Printer, Bold,
  Italic, Underline, List, ListOrdered, Heading2, AlignLeft, AlignCenter,
  AlignRight, Paperclip, File as FileIcon, AlertCircle, CheckCircle2,
  Loader2, LucideIcon,
} from "lucide-react";

/* =========================================================================
   TYPES
   ========================================================================= */
type IssuanceTypeValue = "Ordinance" | "Resolution" | "Executive Order" | "";
type IssuanceStatus = "draft" | "published";
type ToastType = "default" | "success" | "error";

interface NarrativeReportData {
  content: string;
  fileName: string | null;
}

interface Attachment {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  status?: "uploading" | "done";
  uploaded_at?: string;
}

interface Issuance {
  id: string;
  type: IssuanceTypeValue;
  governanceAreas: string[];
  issuanceNumber: string;
  series: string;
  title: string;
  content: string;
  narrativeReport: NarrativeReportData;
  attachments: Attachment[];
  status: IssuanceStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface IssuanceFormData {
  type: IssuanceTypeValue;
  governanceAreas: string[];
  issuanceNumber: string;
  series: string;
  title: string;
  content: string;
  narrativeReport: NarrativeReportData;
  attachments: Attachment[];
  certified: boolean;
}

interface GetIssuancesParams {
  search?: string;
  type?: string;
  governanceArea?: string;
  series?: string;
}

interface ToastsApi {
  push: (message: string, type?: ToastType) => void;
}

/* =========================================================================
   MOCK SERVICE LAYER
   Swap the bodies of these functions for real API calls when a backend
   exists. Nothing in the UI layer below talks to `_db` directly.
   ========================================================================= */
const GOVERNANCE_AREAS = [
  "Peace and Order",
  "Housing and Urban Development",
  "Social Welfare and Development",
  "Cultural and Sports Development",
  "Infrastructure and Public Works",
  "Livelihood and Economic Development",
  "Environment and Natural Resources",
  "Education and Literacy",
  "Health and Sanitation",
];

const ISSUANCE_TYPES: { value: IssuanceTypeValue; desc: string }[] = [
  { value: "Ordinance", desc: "A local law enacted by the Sangguniang Barangay" },
  { value: "Resolution", desc: "An expression of position on a specific matter" },
  { value: "Executive Order", desc: "A directive issued by the Punong Barangay" },
];

let _seq = 4;
const _db: Issuance[] = [
  {
    id: "1",
    type: "Ordinance",
    governanceAreas: ["Peace and Order", "Health and Sanitation"],
    issuanceNumber: "Ordinance No. 003",
    series: "2025",
    title: "An Ordinance Regulating Curfew Hours for Minors Within the Barangay",
    content: "<p>Section 1. This ordinance sets curfew hours for minors...</p>",
    narrativeReport: { content: "Adopted after two public consultations.", fileName: null },
    attachments: [],
    status: "published",
    createdBy: "Barangay Secretary",
    createdAt: "2025-03-11T09:00:00Z",
    updatedAt: "2025-03-14T10:00:00Z",
  },
  {
    id: "2",
    type: "Resolution",
    governanceAreas: ["Livelihood and Economic Development"],
    issuanceNumber: "Resolution No. 011",
    series: "2025",
    title: "A Resolution Supporting the Barangay Livelihood Training Program",
    content: "<p>Section 1. The Sangguniang Barangay resolves to support...</p>",
    narrativeReport: { content: "", fileName: null },
    attachments: [],
    status: "published",
    createdBy: "Barangay Staff",
    createdAt: "2025-06-02T09:00:00Z",
    updatedAt: "2025-06-02T09:00:00Z",
  },
  {
    id: "3",
    type: "Executive Order",
    governanceAreas: ["Environment and Natural Resources", "Infrastructure and Public Works"],
    issuanceNumber: "Executive Order No. 002",
    series: "2026",
    title: "An Executive Order Directing Weekly Clean-Up Drives Along Barangay Waterways",
    content: "<p>Section 1. All zone leaders shall organize weekly clean-up drives...</p>",
    narrativeReport: { content: "", fileName: null },
    attachments: [],
    status: "draft",
    createdBy: "Punong Barangay",
    createdAt: "2026-01-20T09:00:00Z",
    updatedAt: "2026-01-20T09:00:00Z",
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const IssuanceService = {
  async getIssuances({ search = "", type = "", governanceArea = "", series = "" }: GetIssuancesParams = {}): Promise<Issuance[]> {
    await delay(380);
    return _db
      .filter((i) => {
        if (search && !`${i.issuanceNumber} ${i.title}`.toLowerCase().includes(search.toLowerCase())) return false;
        if (type && i.type !== type) return false;
        if (governanceArea && !i.governanceAreas.includes(governanceArea)) return false;
        if (series && i.series !== series) return false;
        return true;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },
  async getIssuance(id: string): Promise<Issuance> {
    await delay(280);
    const found = _db.find((i) => i.id === id);
    if (!found) throw new Error("Issuance not found");
    return found;
  },
  async createIssuance(data: IssuanceFormData & { status: IssuanceStatus }): Promise<Issuance> {
    await delay(650);
    const now = new Date().toISOString();
    const record: Issuance = { ...data, id: String(_seq++), createdBy: "Current User", createdAt: now, updatedAt: now };
    _db.unshift(record);
    return record;
  },
  async updateIssuance(id: string, data: IssuanceFormData & { status: IssuanceStatus }): Promise<Issuance> {
    await delay(600);
    const idx = _db.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error("Issuance not found");
    _db[idx] = { ..._db[idx], ...data, updatedAt: new Date().toISOString() };
    return _db[idx];
  },
  async deleteIssuance(id: string): Promise<boolean> {
    await delay(400);
    const idx = _db.findIndex((i) => i.id === id);
    if (idx > -1) _db.splice(idx, 1);
    return true;
  },
  async uploadAttachment(file: File): Promise<Attachment> {
    await delay(700 + Math.random() * 500);
    return {
      id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      file_name: file.name,
      file_type: file.type || file.name.split(".").pop() || "",
      file_size: file.size,
      uploaded_at: new Date().toISOString(),
    };
  },
};

/* =========================================================================
   HELPERS
   ========================================================================= */
const fmtBytes = (bytes: number) => {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};
const fmtDate = (iso: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
};
const stripHtml = (html: string) => (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const ALLOWED_EXT = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
const BLOCKED_EXT = ["exe", "bat", "cmd", "sh", "msi", "com", "scr"];
const MAX_FILE_MB = 15;

/* =========================================================================
   TOASTS
   ========================================================================= */
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((message: string, type: ToastType = "default") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);
  return { toasts, push };
}
function ToastHost({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed top-5 right-5 z-[80] flex flex-col gap-2 w-full max-w-xs">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium shadow-lg text-white ${
            t.type === "success" ? "bg-emerald-600" : t.type === "error" ? "bg-rose-600" : "bg-indigo-800"
          }`}
        >
          {t.type === "success" && <CheckCircle2 className="h-4 w-4 shrink-0" />}
          {t.type === "error" && <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   CONFIRM DIALOG
   ========================================================================= */
function ConfirmDialog({
  open, title, body, confirmLabel = "Delete", onCancel, onConfirm,
}: { open: boolean; title: string; body: string; confirmLabel?: string; onCancel: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/40 p-5" onClick={onCancel}>
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-bold text-slate-900 mb-1.5">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-5">{body}</p>
        <div className="flex justify-end gap-2">
          <button className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50" onClick={onCancel}>
            Cancel
          </button>
          <button className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   BADGES
   ========================================================================= */
function TypeBadge({ type }: { type: IssuanceTypeValue }) {
  const cls =
    type === "Ordinance"
      ? "bg-indigo-100 text-indigo-800"
      : type === "Resolution"
      ? "bg-amber-100 text-amber-800"
      : "bg-slate-100 text-slate-600 border border-slate-200";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${cls}`}>{type}</span>;
}
function StatusBadge({ status }: { status: IssuanceStatus }) {
  const published = status === "published";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${
        published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500 border border-slate-200"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

/* =========================================================================
   FIELD PRIMITIVES
   ========================================================================= */
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-rose-600 ml-0.5">*</span>}
    </label>
  );
}
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1.5">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {message}
    </div>
  );
}
const inputCls = (error?: boolean) =>
  `w-full rounded-lg border px-3 py-2 text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    error ? "border-rose-400 focus:ring-rose-100" : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
  }`;

/* =========================================================================
   ISSUANCE TYPE SELECTOR
   ========================================================================= */
function IssuanceTypeSelector({ value, onChange, error }: { value: IssuanceTypeValue; onChange: (v: IssuanceTypeValue) => void; error?: string }) {
  return (
    <div className="mb-4">
      <FieldLabel required>Type</FieldLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Issuance type">
        {ISSUANCE_TYPES.map((t) => {
          const selected = value === t.value;
          return (
            <button
              type="button"
              key={t.value}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(t.value)}
              className={`text-left rounded-xl border-[1.5px] p-3.5 transition-colors ${
                selected ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <b className="text-sm font-semibold text-slate-900">{t.value}</b>
                <span
                  className={`h-4 w-4 rounded-full border-[1.5px] shrink-0 ${
                    selected ? "border-indigo-600 bg-indigo-600 ring-2 ring-white ring-inset" : "border-slate-300"
                  }`}
                />
              </div>
              <span className="text-xs text-slate-500">{t.desc}</span>
            </button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

/* =========================================================================
   GOVERNANCE AREA SELECTOR
   ========================================================================= */
function GovernanceAreaSelector({ value, onChange, error }: { value: string[]; onChange: (v: string[]) => void; error?: string }) {
  const toggle = (area: string) => {
    if (value.includes(area)) onChange(value.filter((a) => a !== area));
    else onChange([...value, area]);
  };
  return (
    <div>
      <FieldLabel required>Governance area</FieldLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {GOVERNANCE_AREAS.map((area) => {
          const checked = value.includes(area);
          return (
            <div
              key={area}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
              onClick={() => toggle(area)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(area); } }}
              className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 cursor-pointer text-sm ${
                checked ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <span className={`mt-0.5 h-4 w-4 rounded shrink-0 flex items-center justify-center border-[1.5px] ${
                checked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"
              }`}>
                {checked && <Check className="h-2.5 w-2.5" />}
              </span>
              <span className="text-[12.8px] leading-snug text-slate-700">{area}</span>
            </div>
          );
        })}
      </div>
      <p className="text-[11.5px] text-slate-400 mt-2">Select every area this issuance covers. More than one may apply.</p>
      <FieldError message={error} />
    </div>
  );
}

/* =========================================================================
   RICH TEXT CONTENT EDITOR
   ========================================================================= */
interface ToolbarButton {
  icon: LucideIcon;
  cmd: string;
  label: string;
  arg?: string;
}

function ContentEditor({
  value, onChange, error, placeholder,
}: { value: string; onChange: (v: string) => void; error?: string; placeholder: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (ref.current && !initialized.current) {
      ref.current.innerHTML = value || "";
      initialized.current = true;
    }
  }, [value]);

  const exec = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    if (ref.current) onChange(ref.current.innerHTML);
  };

  const toolbarBtns: ({ sep: true } | ToolbarButton)[] = [
    { icon: Bold, cmd: "bold", label: "Bold" },
    { icon: Italic, cmd: "italic", label: "Italic" },
    { icon: Underline, cmd: "underline", label: "Underline" },
    { sep: true },
    { icon: Heading2, cmd: "formatBlock", arg: "H3", label: "Heading" },
    { icon: List, cmd: "insertUnorderedList", label: "Bullet list" },
    { icon: ListOrdered, cmd: "insertOrderedList", label: "Numbered list" },
    { sep: true },
    { icon: AlignLeft, cmd: "justifyLeft", label: "Align left" },
    { icon: AlignCenter, cmd: "justifyCenter", label: "Align center" },
    { icon: AlignRight, cmd: "justifyRight", label: "Align right" },
  ];

  return (
    <div>
      <div className={`rounded-lg border overflow-hidden ${error ? "border-rose-400" : "border-slate-300"}`}>
        <div className="flex items-center gap-0.5 px-2 py-1.5 bg-slate-50 border-b border-slate-200 flex-wrap">
          {toolbarBtns.map((b, i) =>
            "sep" in b ? (
              <span key={i} className="w-px h-4.5 bg-slate-300 mx-1.5" />
            ) : (
              <button
                type="button"
                key={i}
                title={b.label}
                onMouseDown={(e) => { e.preventDefault(); exec(b.cmd, b.arg); }}
                className="h-7 w-7 flex items-center justify-center rounded text-slate-500 hover:bg-white hover:text-slate-900"
              >
                <b.icon className="h-[15px] w-[15px]" />
              </button>
            )
          )}
        </div>
        <div
          ref={ref}
          className="min-h-[240px] px-4 py-3.5 text-[13.8px] leading-relaxed outline-none bg-white empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400"
          contentEditable
          data-placeholder={placeholder}
          onInput={(e) => onChange((e.currentTarget as HTMLDivElement).innerHTML)}
          suppressContentEditableWarning
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}

/* =========================================================================
   NARRATIVE REPORT
   ========================================================================= */
function NarrativeReport({
  value, onChange, toasts,
}: { value: NarrativeReportData; onChange: (v: NarrativeReportData) => void; toasts: ToastsApi }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    onChange({ ...value, fileName: f.name });
    toasts.push(`Attached narrative report: ${f.name}`, "success");
    e.target.value = "";
  };
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>Narrative report</FieldLabel>
        <textarea
          className={inputCls()}
          rows={5}
          placeholder="Describe the background, consultations, and outcomes related to this issuance..."
          value={value.content}
          onChange={(e) => onChange({ ...value, content: e.target.value })}
        />
        <p className="text-[11.5px] text-slate-400 mt-1.5">
          Optional. You can write the narrative here, attach a document below, or both.
        </p>
      </div>
      <div>
        {value.fileName ? (
          <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
            <span className="h-8 w-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{value.fileName}</div>
              <div className="text-[11.5px] text-slate-400">Narrative report document</div>
            </div>
            <button type="button" className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50" onClick={() => onChange({ ...value, fileName: null })}>
              <X className="h-[15px] w-[15px]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => fileRef.current?.click()}
          >
            <Paperclip className="h-3.5 w-3.5" /> Attach narrative report document
          </button>
        )}
        <input ref={fileRef} type="file" hidden accept=".pdf,.doc,.docx" onChange={onPickFile} />
      </div>
    </div>
  );
}

/* =========================================================================
   DOCUMENT UPLOADER
   ========================================================================= */
function DocumentUploader({
  files, onChange, toasts,
}: { files: Attachment[]; onChange: (fn: (prev: Attachment[]) => Attachment[]) => void; toasts: ToastsApi }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = async (fileList: FileList) => {
    const incoming = Array.from(fileList);
    for (const f of incoming) {
      const ext = (f.name.split(".").pop() || "").toLowerCase();
      if (BLOCKED_EXT.includes(ext)) {
        toasts.push(`"${f.name}" is not an allowed file type.`, "error");
        continue;
      }
      if (!ALLOWED_EXT.includes(ext)) {
        toasts.push(`"${f.name}": unsupported format. Use PDF, DOC, DOCX, JPG, JPEG, or PNG.`, "error");
        continue;
      }
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        toasts.push(`"${f.name}" exceeds the ${MAX_FILE_MB} MB limit.`, "error");
        continue;
      }
      const localId = `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      onChange((prev) => [...prev, { id: localId, file_name: f.name, file_type: ext.toUpperCase(), file_size: f.size, status: "uploading" }]);
      try {
        const uploaded = await IssuanceService.uploadAttachment(f);
        onChange((prev) => prev.map((x) => (x.id === localId ? { ...uploaded, file_type: ext.toUpperCase(), status: "done" } : x)));
      } catch {
        onChange((prev) => prev.filter((x) => x.id !== localId));
        toasts.push(`Upload failed for "${f.name}".`, "error");
      }
    }
  };

  const removeFile = (id: string) => onChange((prev) => prev.filter((f) => f.id !== id));

  return (
    <div>
      <FieldLabel>Supporting documents</FieldLabel>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        className={`rounded-xl border-[1.5px] border-dashed px-6 py-7 text-center cursor-pointer transition-colors ${
          dragOver ? "border-indigo-500 bg-indigo-50" : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50"
        }`}
      >
        <Upload className="h-5.5 w-5.5 mx-auto text-amber-600" />
        <p className="text-sm font-semibold text-indigo-800 mt-2">Click to upload <span className="font-normal text-slate-500">or drag files here</span></p>
        <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX, JPG, JPEG, PNG — up to {MAX_FILE_MB} MB each</p>
      </div>
      <input ref={inputRef} type="file" hidden multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }} />
      <div className="space-y-2 mt-2">
        {files.map((f) => (
          <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5" key={f.id}>
            <span className="h-8 w-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <FileIcon className="h-4 w-4" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{f.file_name}</div>
              <div className="text-[11.5px] text-slate-400">{f.file_type} · {fmtBytes(f.file_size)}</div>
            </div>
            <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 shrink-0 ${f.status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              {f.status === "done" ? "Uploaded" : "Uploading…"}
            </span>
            <button type="button" className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50" onClick={() => removeFile(f.id)} aria-label="Remove file">
              <X className="h-[15px] w-[15px]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   ISSUANCE FORM (create / edit)
   ========================================================================= */
const emptyForm = (): IssuanceFormData => ({
  type: "", governanceAreas: [], issuanceNumber: "", series: String(new Date().getFullYear()),
  title: "", content: "", narrativeReport: { content: "", fileName: null },
  attachments: [], certified: false,
});

function Card({ num, title, subtitle, children }: { num?: number; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-4">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-200">
        {num !== undefined && (
          <span className="h-5.5 w-5.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
        )}
        <div>
          <h3 className="text-[12.5px] font-bold uppercase tracking-wide text-slate-700">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function IssuanceForm({
  mode, initial, onCancel, onSaved, toasts,
}: { mode: "create" | "edit"; initial?: Issuance; onCancel: () => void; onSaved: (rec: Issuance) => void; toasts: ToastsApi }) {
  const [form, setForm] = useState<IssuanceFormData>(initial ? { ...emptyForm(), ...initial } : emptyForm());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const set = (patch: Partial<IssuanceFormData>) => setForm((f) => ({ ...f, ...patch }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.type) e.type = "Please select an issuance type.";
    if (form.governanceAreas.length === 0) e.governanceAreas = "Please select at least one governance area.";
    if (!form.issuanceNumber.trim()) e.issuanceNumber = "Issuance number is required.";
    if (!form.series.trim()) e.series = "Series is required.";
    if (!form.title.trim()) e.title = "Title is required.";
    else if (form.title.length > 220) e.title = "Title must be 220 characters or fewer.";
    if (!stripHtml(form.content)) e.content = "Content is required.";
    if (!form.certified) e.certified = "You must confirm the certification before submitting.";
    return e;
  };

  const handleSubmit = async (asDraft: boolean) => {
    if (!asDraft) {
      const e = validate();
      setErrors(e);
      if (Object.keys(e).length > 0) { setShowBanner(true); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    } else if (!form.title.trim()) {
      setErrors({ title: "Give the draft a title before saving." });
      return;
    }
    setShowBanner(false);
    if (asDraft) setSavingDraft(true);
    else setSaving(true);
    try {
      const payload = { ...form, status: (asDraft ? "draft" : "published") as IssuanceStatus };
      const saved = mode === "edit" && initial ? await IssuanceService.updateIssuance(initial.id, payload) : await IssuanceService.createIssuance(payload);
      toasts.push(asDraft ? "Draft saved." : "Issuance saved.", "success");
      onSaved(saved);
    } catch {
      toasts.push("Something went wrong while saving. Please try again.", "error");
    } finally {
      setSaving(false);
      setSavingDraft(false);
    }
  };

  const busy = saving || savingDraft;

  return (
    <div>
      {showBanner && (
        <div className="flex gap-2.5 items-start bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-3 rounded-lg text-sm mb-4">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>Some required fields need attention before this issuance can be saved. Check the highlighted fields below.</div>
        </div>
      )}

      <Card num={1} title="Issuance information" subtitle="Basic classification and identifying details.">
        <IssuanceTypeSelector value={form.type} onChange={(v) => set({ type: v })} error={errors.type} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <FieldLabel required>Issuance number</FieldLabel>
            <input className={inputCls(!!errors.issuanceNumber)} placeholder="e.g., Ordinance No. 001" value={form.issuanceNumber} onChange={(e) => set({ issuanceNumber: e.target.value })} />
            <FieldError message={errors.issuanceNumber} />
          </div>
          <div>
            <FieldLabel required>Series</FieldLabel>
            <input className={inputCls(!!errors.series)} placeholder="e.g., 2026" inputMode="numeric" value={form.series} onChange={(e) => set({ series: e.target.value.replace(/[^0-9]/g, "").slice(0, 4) })} />
            <FieldError message={errors.series} />
          </div>
        </div>
        <div className="mt-4">
          <FieldLabel required>Title of issuance</FieldLabel>
          <input className={inputCls(!!errors.title)} placeholder="An Ordinance Establishing Rules and Regulations for..." maxLength={220} value={form.title} onChange={(e) => set({ title: e.target.value })} />
          <div className="text-[11px] text-slate-400 text-right mt-1">{form.title.length}/220</div>
          <FieldError message={errors.title} />
        </div>
      </Card>

      <Card num={2} title="Governance areas" subtitle="Which sectors of barangay governance this issuance addresses.">
        <GovernanceAreaSelector value={form.governanceAreas} onChange={(v) => set({ governanceAreas: v })} error={errors.governanceAreas} />
      </Card>

      <Card num={3} title="Issuance content" subtitle="The complete text of the ordinance, resolution, or executive order.">
        <ContentEditor value={form.content} onChange={(v) => set({ content: v })} error={errors.content} placeholder="Section 1. Be it ordained by the Sangguniang Barangay that..." />
      </Card>

      <Card num={4} title="Narrative report" subtitle="Background, consultations, or context behind this issuance.">
        <NarrativeReport value={form.narrativeReport} onChange={(v) => set({ narrativeReport: v })} toasts={toasts} />
      </Card>

      <Card num={5} title="Supporting documents" subtitle="Attachments related to this issuance, such as minutes or photos.">
        <DocumentUploader files={form.attachments} onChange={(fn) => set({ attachments: fn(form.attachments) })} toasts={toasts} />
      </Card>

      <Card num={6} title="Certification">
        <div className="flex items-start gap-2.5 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer" onClick={() => set({ certified: !form.certified })}>
          <span className={`mt-0.5 h-[18px] w-[18px] rounded shrink-0 flex items-center justify-center border-[1.5px] ${form.certified ? "bg-indigo-700 border-indigo-700 text-white" : "border-slate-300 bg-white"}`}>
            {form.certified && <Check className="h-3 w-3" />}
          </span>
          <p className="text-sm leading-relaxed">I certify that the information provided in this issuance record is true and correct to the best of my knowledge.</p>
        </div>
        <FieldError message={errors.certified} />
      </Card>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex justify-end gap-2.5 flex-wrap">
        <button type="button" className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50" onClick={() => handleSubmit(true)} disabled={busy}>
          {savingDraft && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save as draft
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-700 text-white hover:bg-indigo-800 disabled:opacity-50" onClick={() => handleSubmit(false)} disabled={busy}>
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} {mode === "edit" ? "Save changes" : "Save issuance"}
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   ISSUANCE LIST
   ========================================================================= */
function IssuanceList({
  onCreate, onView, onEdit, toasts, refreshKey,
}: { onCreate: () => void; onView: (id: string) => void; onEdit: (id: string) => void; toasts: ToastsApi; refreshKey: number }) {
  const [items, setItems] = useState<Issuance[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [govFilter, setGovFilter] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const pageSize = 8;

  // Reset to page 1 whenever a filter changes. Computed during render
  // (React's documented pattern for "adjusting state when a prop/state
  // changes") rather than in an effect, so it doesn't cause an extra
  // render pass.
  const [filterSnapshot, setFilterSnapshot] = useState({ search, typeFilter, govFilter, seriesFilter });
  if (
    filterSnapshot.search !== search ||
    filterSnapshot.typeFilter !== typeFilter ||
    filterSnapshot.govFilter !== govFilter ||
    filterSnapshot.seriesFilter !== seriesFilter
  ) {
    setFilterSnapshot({ search, typeFilter, govFilter, seriesFilter });
    setPage(1);
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await IssuanceService.getIssuances({ search, type: typeFilter, governanceArea: govFilter, series: seriesFilter });
      setItems(data);
    } catch {
      toasts.push("Could not load issuances.", "error");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, typeFilter, govFilter, seriesFilter]);

  useEffect(() => {
    // Genuine data-fetching effect: synchronizes local state with the
    // (mock) IssuanceService whenever filters or refreshKey change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load, refreshKey]);

  // refreshKey isn't read directly, but _db is mutated outside of React
  // state, so this must recompute whenever a save/delete bumps refreshKey.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const seriesOptions = useMemo(() => Array.from(new Set(_db.map((i) => i.series))).sort().reverse(), [refreshKey]);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const pageItems = items.slice((page - 1) * pageSize, page * pageSize);

  const doDelete = async () => {
    const id = confirmDelete;
    setConfirmDelete(null);
    if (!id) return;
    try {
      await IssuanceService.deleteIssuance(id);
      toasts.push("Issuance deleted.", "success");
      load();
    } catch {
      toasts.push("Could not delete this issuance.", "error");
    }
  };

  const selectCls = "rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-700 min-w-[140px]";

  return (
    <div>
      <div className="flex items-center gap-2.5 flex-wrap mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="w-full rounded-lg border border-slate-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            placeholder="Search ordinances, resolutions, executive orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className={selectCls} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All types</option>
          {ISSUANCE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.value}</option>)}
        </select>
        <select className={selectCls} value={govFilter} onChange={(e) => setGovFilter(e.target.value)}>
          <option value="">All governance areas</option>
          {GOVERNANCE_AREAS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <select className={selectCls} value={seriesFilter} onChange={(e) => setSeriesFilter(e.target.value)}>
          <option value="">All series</option>
          {seriesOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-700 text-white text-xs font-semibold shadow-xs hover:bg-indigo-800 transition-colors" onClick={onCreate}>
          <Plus className="h-4 w-4" /> New issuance
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="mt-2.5 text-sm">Loading issuances…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-5">
            <Scroll className="h-8 w-8 text-slate-300" />
            <h3 className="text-base font-bold text-slate-900 mt-2.5">No issuances found</h3>
            <p className="text-sm text-slate-500 mb-4 max-w-sm">
              {search || typeFilter || govFilter || seriesFilter ? "Try adjusting your search or filters." : "Create your first ordinance, resolution, or executive order."}
            </p>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-700 text-white text-xs font-semibold hover:bg-indigo-800" onClick={onCreate}>
              <Plus className="h-4 w-4" /> New issuance
            </button>
          </div>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  {["Issuance no.", "Type", "Title", "Governance area", "Series", "Created", "Status", ""].map((h) => (
                    <th key={h} className="text-left text-[11px] uppercase tracking-wide text-slate-400 font-semibold px-3.5 py-2.5 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageItems.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50 border-b border-slate-100 last:border-b-0">
                    <td className="px-3.5 py-3 align-top">
                      <span className="font-mono text-[11px] font-semibold text-indigo-800 bg-indigo-50 border border-indigo-100 rounded px-2 py-0.5 whitespace-nowrap">{it.issuanceNumber}</span>
                    </td>
                    <td className="px-3.5 py-3 align-top"><TypeBadge type={it.type} /></td>
                    <td className="px-3.5 py-3 align-top font-medium text-slate-800 max-w-[280px] cursor-pointer hover:text-indigo-700" onClick={() => onView(it.id)}>{it.title}</td>
                    <td className="px-3.5 py-3 align-top">
                      <div className="flex gap-1 flex-wrap max-w-[200px]">
                        {it.governanceAreas.slice(0, 2).map((g) => <span key={g} className="text-[10.5px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-500">{g}</span>)}
                        {it.governanceAreas.length > 2 && <span className="text-[10.5px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-500">+{it.governanceAreas.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-3.5 py-3 align-top text-sm text-slate-600">{it.series}</td>
                    <td className="px-3.5 py-3 align-top text-sm text-slate-600">{fmtDate(it.createdAt)}</td>
                    <td className="px-3.5 py-3 align-top"><StatusBadge status={it.status} /></td>
                    <td className="px-3.5 py-3 align-top">
                      <div className="flex gap-1.5">
                        <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="View" onClick={() => onView(it.id)}><Eye className="h-3.5 w-3.5" /></button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Edit" onClick={() => onEdit(it.id)}><Pencil className="h-3.5 w-3.5" /></button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Delete" onClick={() => setConfirmDelete(it.id)}><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-500">
              <span>{items.length} issuance{items.length !== 1 ? "s" : ""} · page {page} of {totalPages}</span>
              <div className="flex gap-1.5">
                <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 disabled:opacity-40 hover:bg-slate-100" disabled={page === 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft className="h-3.5 w-3.5" /></button>
                <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 disabled:opacity-40 hover:bg-slate-100" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}><ChevronRight className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete this issuance?"
        body="This will permanently remove the issuance record, its narrative report, and attached documents. This cannot be undone."
        confirmLabel="Delete issuance"
        onCancel={() => setConfirmDelete(null)}
        onConfirm={doDelete}
      />
    </div>
  );
}

/* =========================================================================
   ISSUANCE DETAILS
   ========================================================================= */
function IssuanceDetails({ id, onBack, onEdit, toasts }: { id: string; onBack: () => void; onEdit: (id: string) => void; toasts: ToastsApi }) {
  const [item, setItem] = useState<Issuance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Genuine data-fetching effect: synchronizes local state with the
    // (mock) IssuanceService whenever `id` changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    IssuanceService.getIssuance(id)
      .then(setItem)
      .catch(() => toasts.push("Could not load this issuance.", "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>;
  if (!item) return (
    <div className="text-center py-16">
      <h3 className="text-base font-bold text-slate-900 mb-3">Issuance not found</h3>
      <button className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50" onClick={onBack}>Back to issuances</button>
    </div>
  );

  const metaGrid = "grid grid-cols-2 sm:grid-cols-4 gap-4";
  const metaItem = (label: string, value: React.ReactNode) => (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-0.5">{label}</div>
      <div className="text-sm font-medium text-slate-800">{value}</div>
    </div>
  );

  return (
    <div>
      <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-700 mb-3.5" onClick={onBack}>
        <ArrowLeft className="h-3.5 w-3.5" /> Back to issuances
      </button>

      <div className="flex items-start justify-between gap-5 flex-wrap mb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <TypeBadge type={item.type} />
            <StatusBadge status={item.status} />
            <span className="font-mono text-[11px] font-semibold text-indigo-800 bg-indigo-50 border border-indigo-100 rounded px-2 py-0.5">{item.issuanceNumber} · s. {item.series}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-snug">{item.title}</h1>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Print</button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50"><Download className="h-3.5 w-3.5" /> Download</button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-700 text-white text-xs font-semibold hover:bg-indigo-800" onClick={() => onEdit(item.id)}><Pencil className="h-3.5 w-3.5" /> Edit</button>
        </div>
      </div>

      <Card title="Basic information">
        <div className={metaGrid}>
          {metaItem("Type", item.type)}
          {metaItem("Issuance number", item.issuanceNumber)}
          {metaItem("Series", item.series)}
          {metaItem("Status", item.status === "published" ? "Published" : "Draft")}
        </div>
        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1.5">Governance areas</div>
          <div className="flex gap-1.5 flex-wrap">
            {item.governanceAreas.map((g) => <span key={g} className="text-[10.5px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-500">{g}</span>)}
          </div>
        </div>
      </Card>

      <Card title="Content">
        <div className="prose prose-sm max-w-none text-slate-800" dangerouslySetInnerHTML={{ __html: item.content }} />
      </Card>

      <Card title="Narrative report">
        {item.narrativeReport?.content ? (
          <p className="text-sm leading-relaxed text-slate-700">{item.narrativeReport.content}</p>
        ) : (
          <p className="text-sm text-slate-400">No narrative report text provided.</p>
        )}
        {item.narrativeReport?.fileName && (
          <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 mt-2.5">
            <span className="h-8 w-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0"><FileText className="h-4 w-4" /></span>
            <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{item.narrativeReport.fileName}</div></div>
            <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50"><Download className="h-3.5 w-3.5" /></button>
          </div>
        )}
      </Card>

      <Card title="Supporting documents">
        {item.attachments?.length ? (
          <div className="space-y-2">
            {item.attachments.map((f) => (
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5" key={f.id}>
                <span className="h-8 w-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0"><FileIcon className="h-4 w-4" /></span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{f.file_name}</div>
                  <div className="text-[11.5px] text-slate-400">{f.file_type} · {fmtBytes(f.file_size)}</div>
                </div>
                <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50"><Download className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No documents attached.</p>
        )}
      </Card>

      <Card title="Metadata">
        <div className={metaGrid}>
          {metaItem("Created by", item.createdBy)}
          {metaItem("Date created", fmtDate(item.createdAt))}
          {metaItem("Last updated", fmtDate(item.updatedAt))}
          {metaItem("Record ID", <span className="font-mono">#{item.id}</span>)}
        </div>
      </Card>
    </div>
  );
}

/* =========================================================================
   PAGE — header from the dashboard shell, BORIS views underneath
   ========================================================================= */
type ViewState = "list" | "create" | "edit" | "details";

export default function OrdinancesPage() {
  const [view, setView] = useState<ViewState>("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editRecord, setEditRecord] = useState<Issuance | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toasts, push } = useToasts();
  const toastsApi: ToastsApi = { push };

  const goCreate = () => { setView("create"); setEditRecord(null); };
  const goList = () => { setView("list"); setRefreshKey((k) => k + 1); };
  const goView = (id: string) => { setActiveId(id); setView("details"); };
  const goEdit = async (id: string) => {
    try {
      const rec = await IssuanceService.getIssuance(id);
      setEditRecord(rec);
      setActiveId(id);
      setView("edit");
    } catch {
      push("Could not load this issuance for editing.", "error");
    }
  };

  const crumbLabel =
    view === "create" ? "New issuance" : view === "edit" ? "Edit issuance" : view === "details" ? "Issuance details" : "Ordinances & Resolutions";

  return (
    <div className="space-y-6">
      <ToastHost toasts={toasts} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {view === "list" ? (
              <Link href="/" className="hover:text-[#0284C7] flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
              </Link>
            ) : (
              <button onClick={goList} className="hover:text-[#0284C7] flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" /> Ordinances &amp; Resolutions
              </button>
            )}
            <span>/</span>
            <span className="font-semibold text-slate-700">{crumbLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Scroll className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {view === "list" && "Ordinances & Resolutions (BORIS)"}
                  {view === "create" && "Create new issuance"}
                  {view === "edit" && "Edit issuance"}
                  {view === "details" && "Issuance details"}
                </h1>
                {view === "list" && (
                  <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                    BORIS v2.5
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {view === "list" && "Digital repository of sangguniang barangay legislative measures, policies, & executive orders."}
                {view === "create" && "Record a new ordinance, resolution, or executive order."}
                {view === "edit" && "Update the details of this record."}
                {view === "details" && "Complete record for this issuance."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {view === "list" && (
            <button
              className="px-3.5 py-2 rounded-lg bg-indigo-700 text-white text-xs font-semibold shadow-xs hover:bg-indigo-800 transition-colors flex items-center gap-1.5"
              onClick={goCreate}
            >
              <Plus className="h-4 w-4" /> Upload Ordinance
            </button>
          )}
          {(view === "create" || view === "edit") && (
            <button
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              onClick={goList}
            >
              <X className="h-4 w-4" /> Close
            </button>
          )}
        </div>
      </div>

      {view === "list" && <IssuanceList onCreate={goCreate} onView={goView} onEdit={goEdit} toasts={toastsApi} refreshKey={refreshKey} />}
      {view === "create" && <IssuanceForm mode="create" onCancel={goList} onSaved={() => goList()} toasts={toastsApi} />}
      {view === "edit" && editRecord && <IssuanceForm mode="edit" initial={editRecord} onCancel={goList} onSaved={(rec) => goView(rec.id)} toasts={toastsApi} />}
      {view === "details" && activeId && <IssuanceDetails id={activeId} onBack={goList} onEdit={goEdit} toasts={toastsApi} />}
    </div>
  );
}
