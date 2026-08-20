import Link from "next/link";
import { FileText, ArrowLeft, Plus, Sparkles } from "lucide-react";

export default function CertificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#0284C7] flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">Certificates & Clearances</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-50 text-[#0284C7]">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  Certificates & Clearances (BCIS)
                </h1>
                <span className="text-[10px] font-mono font-bold bg-sky-100 text-[#0284C7] px-2 py-0.5 rounded">
                  BCIS v2.5
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Automated issuance of Barangay Clearance, Certificate of Indigency, and Business Permits.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-lg bg-[#0284C7] text-white text-xs font-semibold shadow-xs hover:bg-sky-700 transition-colors flex items-center gap-1.5">
            <Plus className="h-4 w-4" /> Issue Certificate
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="h-16 w-16 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">BCIS Sub-System Module Shell</h2>
        <p className="text-xs text-slate-500 max-w-md mt-1 mb-6">
          This empty modular shell container is reserved for BCIS document templates, digital signatures, OR generation, and clearance print queues.
        </p>
        <div className="border border-dashed border-slate-300 rounded-lg p-6 bg-slate-50 max-w-lg w-full text-xs font-mono text-slate-400">
          // Component Mount Target: &lt;ClearanceQueueTable /&gt; &amp; &lt;CertificateGenerator /&gt;
        </div>
      </div>
    </div>
  );
}
