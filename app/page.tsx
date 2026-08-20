import Link from "next/link";
import {
  Users,
  FileText,
  ShieldAlert,
  Package,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  UserPlus,
  FilePlus,
  ClipboardList,
  ShieldCheck,
  Scale,
  Scroll,
  Globe,
  Map,
  Landmark,
  Wallet,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const modularSubsystems = [
    {
      code: "BIPS",
      title: "Inhabitants Profiling (BIPS)",
      route: "/profiling",
      icon: Users,
      description: "Demographic registration, household profiling, senior citizen & PWD tracking.",
      accent: "border-l-4 border-l-[#580011]",
    },
    {
      code: "BCIS",
      title: "Certificates & Clearances (BCIS)",
      route: "/certifications",
      icon: FileText,
      description: "Automated issuance of Barangay Clearance, Indigency, & Business Permits.",
      accent: "border-l-4 border-l-[#E5A623]",
    },
    {
      code: "KPISBH",
      title: "Helpdesk & Complaints (KPISBH)",
      route: "/helpdesk-blotter",
      icon: ShieldAlert,
      description: "Katarungang Pambarangay incident logging, blotter scheduling, & mediation.",
      accent: "border-l-4 border-l-[#580011]",
    },
    {
      code: "BAMS",
      title: "Asset Management (BAMS)",
      route: "/assets",
      icon: Package,
      description: "Barangay inventory, vehicle dispatch tracking, & facility reservation logs.",
      accent: "border-l-4 border-l-purple-600",
    },
    {
      code: "BDRIS",
      title: "Disaster Resilience (BDRIS)",
      route: "/disaster-resilience",
      icon: ShieldCheck,
      description: "Evacuation center mapping, emergency supply audit, & flood warning alerts.",
      accent: "border-l-4 border-l-[#E5A623]",
    },
    {
      code: "BGADPBMS",
      title: "Gender & Development (BGADPBMS)",
      route: "/gad-monitoring",
      icon: Scale,
      description: "GAD budget allocation tracking, VAWC report monitoring, & community advocacy.",
      accent: "border-l-4 border-l-rose-500",
    },
    {
      code: "BORIS",
      title: "Ordinances & Resolutions (BORIS)",
      route: "/ordinances",
      icon: Scroll,
      description: "Digital repository of sangguniang barangay legislative measures & policies.",
      accent: "border-l-4 border-l-indigo-600",
    },
    {
      code: "CMS",
      title: "Web & Mobile Portal CMS",
      route: "/public-portal",
      icon: Globe,
      description: "Public announcements, official news feed, & mobile app content manager.",
      accent: "border-l-4 border-l-teal-600",
    },
    {
      code: "BDP",
      title: "Barangay Development Plan (BDP)",
      route: "/development-plan",
      icon: Map,
      description: "Multi-year infrastructure projects, target milestones, & strategic roadmap.",
      accent: "border-l-4 border-l-emerald-600",
    },
    {
      code: "BBI",
      title: "Barangay-Based Institutions (BBI)",
      route: "/institutions",
      icon: Landmark,
      description: "BPOC, BADAC, BCPC council rosters, meeting minutes, & compliance status.",
      accent: "border-l-4 border-l-cyan-600",
    },
    {
      code: "BFMS",
      title: "Financial Management (BFMS)",
      route: "/financials",
      icon: Wallet,
      description: "Budget appropriations, disbursement vouchers, & barangay revenue audit.",
      accent: "border-l-4 border-l-amber-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* 1. Welcome Banner Card - Dark Maroon Gradient (#580011 / #6B0014) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#580011] via-[#6B0014] to-[#3D000C] text-white rounded-xl p-6 shadow-md border border-[#7A0018]">
        {/* Decorative background grid effect */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E5A623]">
                LGU Sta. Lucia Central Command
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                System Operational • v2.5 Online
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Magandang Araw, Admin!
            </h1>
            <p className="text-xs sm:text-sm text-rose-100/90 max-w-xl">
              Welcome to the Barangay Information System (BIS v2.5) management console. Real-time operations overview for District V, Lungsod Quezon.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* Dynamic Date Pill */}
            <div className="bg-[#3D000C]/70 backdrop-blur-xs border border-[#7A0018]/60 rounded-lg px-3.5 py-2 text-left">
              <span className="text-[10px] text-rose-300 font-medium uppercase tracking-wider block">
                Today&apos;s Date
              </span>
              <span className="text-xs font-bold text-white">
                {currentDate}
              </span>
            </div>

            {/* Dandelion Yellow Emergency / Alert Status Pill */}
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/30 border border-[#E5A623]/40 rounded-lg px-3.5 py-2 text-left">
              <span className="text-[10px] text-[#E5A623] font-semibold uppercase tracking-wider block">
                Weather & Incident Alert
              </span>
              <span className="text-xs font-bold text-amber-200 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#E5A623]" />
                Normal Alert Level • Fair Weather
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Metrics Summary Grid (4 Clean White Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: BIPS Profiling */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-[#E5A623] transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              BIPS Profiling
            </span>
            <div className="h-10 w-10 rounded-lg bg-rose-50 text-[#580011] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              48,250
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <span className="inline-flex items-center font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                +3.2%
              </span>
              <span className="text-slate-500">Total Registered Residents</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
            <span>Households: 12,410</span>
            <span className="text-[#580011] font-medium">Updated Today</span>
          </div>
        </div>

        {/* Card 2: BCIS Clearances */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-[#E5A623] transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              BCIS Clearances
            </span>
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-[#E5A623] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                42
              </span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                18 Pending Today
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <Clock className="h-3 w-3 text-slate-400" />
              <span className="text-slate-500">Clearances & Business Permits</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
            <span>Weekly Issued: 284</span>
            <span className="text-emerald-600 font-medium">Avg Processing: 15m</span>
          </div>
        </div>

        {/* Card 3: KPISBH Helpdesk */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-[#E5A623] transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              KPISBH Helpdesk
            </span>
            <div className="h-10 w-10 rounded-lg bg-rose-50 text-[#580011] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                18
              </span>
              <span className="text-xs font-bold bg-[#580011] text-white px-2 py-0.5 rounded-full shadow-2xs">
                3 Urgent Flags
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <AlertTriangle className="h-3 w-3 text-[#580011]" />
              <span className="text-slate-500">Active Incident Tickets</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
            <span>Resolutions: 94%</span>
            <span className="text-[#580011] font-medium">Avg Time: 1.4 Days</span>
          </div>
        </div>

        {/* Card 4: BAMS Assets */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-[#E5A623] transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              BAMS Assets
            </span>
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-[#E5A623] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                156
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                98.4% Ready
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span className="text-slate-500">Barangay Fleet & Assets</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
            <span>Active Patrols: 6</span>
            <span className="text-[#E5A623] font-bold">Maintenance: 2</span>
          </div>
        </div>

      </div>

      {/* 3. Administrative Quick Actions Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Administrative Quick Actions
            </h2>
            <p className="text-xs text-slate-500">
              Instant shortcuts for frequent barangay desk operations & service requests.
            </p>
          </div>
          <span className="text-xs font-bold text-[#E5A623] hover:underline cursor-pointer flex items-center gap-1">
            View All Triggers <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Action 1: Issue Certificate */}
          <Link
            href="/certifications"
            className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 text-[#E5A623] ring-1 ring-amber-200/80 flex items-center justify-center group-hover:bg-[#E5A623] group-hover:text-slate-950 transition-colors">
                  <FilePlus className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  BCIS Module
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#E5A623] transition-colors">
                Issue Certificate
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Generate Barangay Clearance, Certificate of Indigency, or Residency.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E5A623]">
              <span>+ New Request</span>
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          {/* Action 2: Register Resident */}
          <Link
            href="/profiling"
            className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:border-rose-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-rose-50 text-[#580011] ring-1 ring-rose-200/80 flex items-center justify-center group-hover:bg-[#580011] group-hover:text-white transition-colors">
                  <UserPlus className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#580011] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  BIPS Module
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#580011] transition-colors">
                Register Resident
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Add new inhabitant record, household entry, or update resident profile.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#580011]">
              <span>+ Add Resident</span>
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          {/* Action 3: File Incident */}
          <Link
            href="/helpdesk-blotter"
            className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 text-[#E5A623] ring-1 ring-amber-200/80 flex items-center justify-center group-hover:bg-[#E5A623] group-hover:text-slate-950 transition-colors">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#580011] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  KPISBH Blotter
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#E5A623] transition-colors">
                File Incident Report
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Log blotter report, peace & order concern, or emergency complaint ticket.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E5A623]">
              <span>+ Log Ticket</span>
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          {/* Action 4: Asset Audit */}
          <Link
            href="/assets"
            className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:border-purple-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-700 ring-1 ring-purple-200/80 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
                  <Package className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                  BAMS Module
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Asset & Fleet Audit
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Inspect inventory status, equipment dispatch, and barangay vehicle logs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-purple-700">
              <span>View Inventory</span>
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

        </div>
      </div>

      {/* 4. Modular Shell Container Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#580011]" />
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Modular Sub-System Integration Shells
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Clean layout shell containers reserved for all 11 core sub-systems, initialized with standard design system tokens.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg shrink-0 w-fit">
            11 Sub-Systems Connected
          </span>
        </div>

        {/* Sub-Systems Layout Shell Containers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modularSubsystems.map((subsystem) => {
            const SubIcon = subsystem.icon;
            return (
              <div
                key={subsystem.code}
                className={`bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all ${subsystem.accent}`}
              >
                <div>
                  {/* Subsystem Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                        <SubIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Module {subsystem.code}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">
                          {subsystem.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      {subsystem.route}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {subsystem.description}
                  </p>

                  {/* Clean Empty Layout Shell Canvas */}
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 bg-slate-50/70 flex flex-col items-center justify-center text-center space-y-1.5">
                    <Sparkles className="h-5 w-5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-700">
                      Component Integration Canvas
                    </span>
                    <p className="text-[11px] text-slate-400 max-w-xs">
                      Mount modular sub-system components here for {subsystem.code}
                    </p>
                  </div>
                </div>

                {/* Subsystem Footer Trigger */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Ready for Integration
                  </span>
                  <Link
                    href={subsystem.route}
                    className="text-xs font-bold text-[#E5A623] hover:text-amber-600 flex items-center gap-1 group/link"
                  >
                    Open Shell <ChevronRight className="h-3.5 w-3.5 transform group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
