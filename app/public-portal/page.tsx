"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Plus,
  X,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Send,
  Trash2,
  Briefcase,
  HeartHandshake,
  Stethoscope,
  AlertTriangle,
  CalendarDays,
  Users,
  Home,
  Vote,
  GraduationCap,
  Megaphone,
  Smartphone,
  Globe,
  Bell,
  Check,
  Rss,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = "job" | "outreach" | "health" | "advisory" | "event";
type Channel = "Website" | "Mobile App" | "Push";
type Status = "Published" | "Scheduled" | "Draft";

interface Announcement {
  id: string;
  category: Category;
  title: string;
  body: string;
  author: string;
  date: string;
  status: Status;
  channels: Channel[];
}

interface CategoryMeta {
  label: string;
  icon: typeof Briefcase;
  badge: string;
}

/* ------------------------------------------------------------------ */
/*  Static config                                                      */
/* ------------------------------------------------------------------ */

const CATEGORY_META: Record<Category, CategoryMeta> = {
  job: {
    label: "Job Hunt / Livelihood",
    icon: Briefcase,
    badge: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
  },
  outreach: {
    label: "Outreach Program",
    icon: HeartHandshake,
    badge: "bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20",
  },
  health: {
    label: "Health & Wellness",
    icon: Stethoscope,
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  },
  advisory: {
    label: "Public Advisory",
    icon: AlertTriangle,
    badge: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
  },
  event: {
    label: "Community Event",
    icon: CalendarDays,
    badge: "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
  },
};

const STATUS_STYLES: Record<Status, string> = {
  Published: "bg-teal-600 text-white",
  Scheduled: "bg-amber-400 text-red-950",
  Draft: "bg-slate-200 text-slate-600",
};

const CHANNEL_ICON: Record<Channel, typeof Globe> = {
  Website: Globe,
  "Mobile App": Smartphone,
  Push: Bell,
};

const BARANGAY_ADDRESS = "Sta. Lucia Ave., Sta. Lucia, Novaliches, Quezon City";
const MAP_SHARE_URL = "https://maps.app.goo.gl/U9SHw2Cev27Rr1ZA6";
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.0941931128446!2d121.04881128885498!3d14.707265000000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b137cd0b8d95%3A0x90053559862b2ddf!2sBarangay%20Hall%20Sta.%20Lucia!5e0!3m2!1sen!2sph!4v1787324322519!5m2!1sen!2sph";

const COUNCILORS = [
  "Maria Teresa D. Bawag",
  "Nelson B. De Vega",
  "John Josef S. Galarpe",
  "Marissa S. Atienza",
  "Noeme D. Salonga",
  "Jenny N. Dela Torre",
  "Conrado T. Arias, Jr.",
];

const SCHOOLS = [
  { name: "San Gabriel Elementary School", address: "A. Bonifacio St., Brgy. Sta. Lucia, Q.C." },
  { name: "Sta. Lucia High School", address: "J. P. Rizal St., Brgy. Sta. Lucia, Novaliches, Q.C." },
  { name: "Sta. Lucia Senior High School", address: "II A. Mabini St., Brgy. Sta. Lucia, Novaliches, Q.C." },
];

/* Starter/sample posts so the feed isn't empty — edit or delete freely. */
const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    category: "job",
    title: "Barangay Job Fair 2026 – PESO Partnership",
    body: "Sama-sama tayo sa Barangay Job Fair sa Agosto 28, 2026 (Biyernes), 8:00 AM – 4:00 PM sa Barangay Sta. Lucia Covered Court. Kasama ang PESO Quezon City at mga kumpanyang naghahanap ng manggagawa mula sa BPO, retail, at manufacturing. Magdala ng resume, valid ID, at pananamit pang-interview.",
    author: "SB Committee on Livelihood",
    date: "Aug 21, 2026",
    status: "Published",
    channels: ["Website", "Mobile App", "Push"],
  },
  {
    id: "a2",
    category: "outreach",
    title: "Kalinga sa Kapwa: Outreach para sa Senior Citizens at PWD",
    body: "Libreng gupit, feeding program, at pamamahagi ng relief goods para sa mga senior citizen at PWD residente. Setyembre 5, 2026, 9:00 AM sa Barangay Multi-Purpose Hall. Magparehistro sa inyong purok leader bago mag-Setyembre 1.",
    author: "Committee on Social Services",
    date: "Aug 18, 2026",
    status: "Published",
    channels: ["Website", "Mobile App"],
  },
  {
    id: "a3",
    category: "health",
    title: "Libreng Bakuna at Check-up (Flu & COVID Booster)",
    body: "Kasama ang Quezon City Health Department, magkakaroon ng libreng flu vaccine, COVID-19 booster, at basic health check-up sa Barangay Health Center. Setyembre 12, 2026, 8:00 AM – 3:00 PM. Bukas para sa lahat, priority ang mga senior citizen.",
    author: "Barangay Health Emergency Response Team",
    date: "Aug 15, 2026",
    status: "Scheduled",
    channels: ["Website", "Push"],
  },
  {
    id: "a4",
    category: "advisory",
    title: "Weather Advisory: Posibleng Pag-ulan sa Susunod na 48 Oras",
    body: "Ayon sa PAGASA, posibleng magkaroon ng malakas na pag-ulan dulot ng bagyo. Iwasan ang mga lugar na madalas bahain. Bukas ang barangay evacuation center sa Sta. Lucia High School kung kakailanganin.",
    author: "Barangay Disaster Risk Reduction Office",
    date: "Aug 20, 2026",
    status: "Published",
    channels: ["Website", "Mobile App", "Push"],
  },
  {
    id: "a5",
    category: "event",
    title: "Fiesta Planning Meeting — Draft",
    body: "Unang pagpupulong ng fiesta committee para sa taunang selebrasyon. Detalye ng petsa at lugar ay ifi-finalize pa.",
    author: "Barangay Sta. Lucia",
    date: "Aug 21, 2026",
    status: "Draft",
    channels: ["Website"],
  },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, icon: Icon }: { title: string; icon: typeof MapPin }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5">
      <Icon className="h-4 w-4 text-red-900" />
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar: barangay map + profile                                    */
/* ------------------------------------------------------------------ */

function MapCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader title="Barangay Map" icon={MapPin} />
      <div className="aspect-[4/3] w-full bg-slate-100">
        <iframe
          title="Barangay Sta. Lucia location"
          src={MAP_EMBED_SRC}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-3">
        <p className="text-xs text-slate-500">{BARANGAY_ADDRESS}</p>
        <a
          href={MAP_SHARE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-teal-700 hover:text-teal-800"
        >
          Open in Maps <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </Card>
  );
}

function ProfileCard() {
  const rows: { icon: typeof Phone; label: string; value: ReactNode }[] = [
    { icon: Phone, label: "Contact", value: "8-2919-943 · 0919-075-5101" },
    {
      icon: Mail,
      label: "Email",
      value: (
        <a className="hover:text-teal-700" href="mailto:barangaysta.luciadist5qc@gmail.com">
          sta.luciaqc@gmail.com
        </a>
      ),
    },
    {
      icon: ExternalLink,
      label: "Facebook",
      value: (
        <a
          className="hover:text-teal-700"
          href="https://www.facebook.com/responsablengmamamayanSL"
          target="_blank"
          rel="noreferrer"
        >
          Brgy. Sta. Lucia (FB)
        </a>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader title="Barangay Profile" icon={Home} />
      <div className="space-y-3 px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Punong Barangay
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800">Ruel S. Marpa</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            SK Chairperson
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800">Xyrone Joshua D. Pelayo</p>
        </div>
        <div className="space-y-2 border-t border-slate-100 pt-3">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start gap-2.5 text-sm text-slate-600">
              <r.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function OfficialsCard() {
  return (
    <Card>
      <CardHeader title="Barangay Councilors" icon={Users} />
      <ul className="divide-y divide-slate-100 px-5 py-2">
        {COUNCILORS.map((name) => (
          <li key={name} className="py-2 text-sm text-slate-700">
            {name}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function StatsCard() {
  const stats: { icon: typeof Users; label: string; value: string }[] = [
    { icon: Users, label: "Population (RBI)", value: "29,202" },
    { icon: Home, label: "Households (RBI)", value: "3,568" },
    { icon: GraduationCap, label: "Avg. Household Size", value: "4.2" },
    { icon: Vote, label: "Registered Voters", value: "19,509" },
  ];
  return (
    <Card>
      <CardHeader title="Community Snapshot" icon={Users} />
      <div className="grid grid-cols-2 gap-3 px-5 py-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-slate-50 p-3">
            <s.icon className="h-4 w-4 text-red-900" />
            <p className="mt-1.5 text-base font-bold text-slate-800">{s.value}</p>
            <p className="text-[11px] leading-tight text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SchoolsCard() {
  return (
    <Card>
      <CardHeader title="Schools in the Area" icon={GraduationCap} />
      <ul className="divide-y divide-slate-100 px-5 py-2">
        {SCHOOLS.map((s) => (
          <li key={s.name} className="py-2.5">
            <p className="text-sm font-medium text-slate-800">{s.name}</p>
            <p className="text-xs text-slate-500">{s.address}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Announcement composer ("PublicNewsEditor" + "MobilePushDispatcher") */
/* ------------------------------------------------------------------ */

interface ComposerForm {
  title: string;
  category: Category;
  body: string;
  website: boolean;
  mobile: boolean;
  push: boolean;
}

const EMPTY_FORM: ComposerForm = {
  title: "",
  category: "outreach",
  body: "",
  website: true,
  mobile: true,
  push: false,
};

function AnnouncementComposer({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (draft: Omit<Announcement, "id" | "date" | "author">) => void;
}) {
  const [form, setForm] = useState<ComposerForm>(EMPTY_FORM);

  function channels(): Channel[] {
    const list: Channel[] = [];
    if (form.website) list.push("Website");
    if (form.mobile) list.push("Mobile App");
    if (form.push) list.push("Push");
    return list;
  }

  function submit(e: FormEvent, status: Status) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    onSubmit({
      title: form.title.trim(),
      category: form.category,
      body: form.body.trim(),
      status,
      channels: channels().length ? channels() : ["Website"],
    });
    setForm(EMPTY_FORM);
  }

  return (
    <Card className="border-teal-200">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-teal-700" />
          <h3 className="text-sm font-semibold text-slate-800">New Announcement</h3>
        </div>
        <button
          onClick={onCancel}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close composer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form className="space-y-4 px-5 py-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-slate-500">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Libreng Trabaho: Job Fair sa Barangay"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Program type</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              {(Object.keys(CATEGORY_META) as Category[]).map((key) => (
                <option key={key} value={key}>
                  {CATEGORY_META[key].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500">Details</label>
          <textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={4}
            placeholder="Schedule, venue, partner agencies, requirements..."
            className="mt-1 w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500">Publish to</label>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 has-[:checked]:border-teal-300 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-700">
              <input
                type="checkbox"
                checked={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.checked })}
                className="accent-teal-600"
              />
              <Globe className="h-3.5 w-3.5" /> Website
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 has-[:checked]:border-teal-300 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-700">
              <input
                type="checkbox"
                checked={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.checked })}
                className="accent-teal-600"
              />
              <Smartphone className="h-3.5 w-3.5" /> Mobile App
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 has-[:checked]:border-teal-300 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-700">
              <input
                type="checkbox"
                checked={form.push}
                onChange={(e) => setForm({ ...form, push: e.target.checked })}
                className="accent-teal-600"
              />
              <Bell className="h-3.5 w-3.5" /> Push Notification
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
          <button
            onClick={(e) => submit(e, "Draft")}
            className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Save as Draft
          </button>
          <button
            onClick={(e) => submit(e, "Published")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <Send className="h-3.5 w-3.5" /> Publish Now
          </button>
        </div>
      </form>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Announcement feed                                                  */
/* ------------------------------------------------------------------ */

function AnnouncementCard({
  item,
  onDelete,
  onPublish,
}: {
  item: Announcement;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
}) {
  const meta = CATEGORY_META[item.category];
  const Icon = meta.icon;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.badge}`}>
              <Icon className="h-3 w-3" /> {meta.label}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[item.status]}`}>
              {item.status}
            </span>
          </div>
          <h4 className="mt-2 text-sm font-semibold text-slate-800">{item.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.body}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <span>{item.author}</span>
            <span>{item.date}</span>
            <span className="flex items-center gap-2">
              {item.channels.map((c) => {
                const CIcon = CHANNEL_ICON[c];
                return (
                  <span key={c} className="inline-flex items-center gap-1">
                    <CIcon className="h-3 w-3" /> {c}
                  </span>
                );
              })}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {item.status !== "Published" && (
            <button
              onClick={() => onPublish(item.id)}
              title="Publish now"
              className="rounded-md p-1.5 text-teal-600 hover:bg-teal-50"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(item.id)}
            title="Delete"
            className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

type FilterKey = "all" | Category;

export default function PortalCMSPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(SEED_ANNOUNCEMENTS);
  const [composerOpen, setComposerOpen] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(
    () => (filter === "all" ? announcements : announcements.filter((a) => a.category === filter)),
    [announcements, filter]
  );

  const counts = useMemo(() => {
    const base: Record<Status, number> = { Published: 0, Scheduled: 0, Draft: 0 };
    announcements.forEach((a) => (base[a.status] += 1));
    return base;
  }, [announcements]);

  function addAnnouncement(draft: Omit<Announcement, "id" | "date" | "author">) {
    const entry: Announcement = {
      ...draft,
      id: `a${Date.now()}`,
      author: "System Admin",
      date: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" }),
    };
    setAnnouncements((prev) => [entry, ...prev]);
    setComposerOpen(false);
  }

  function deleteAnnouncement(id: string) {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }

  function publishAnnouncement(id: string) {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Published" } : a)));
  }

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    ...(Object.keys(CATEGORY_META) as Category[]).map((k) => ({ key: k, label: CATEGORY_META[k].label })),
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <p className="text-sm text-slate-400">
          Dashboard <span className="mx-1">/</span>
          <span className="text-slate-600">Web &amp; Mobile Portal CMS</span>
        </p>

        {/* Header */}
        <div className="mt-3 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-red-50 p-2.5 text-red-900">
              <Rss className="h-6 w-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">Web &amp; Mobile Portal CMS</h1>
                <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 ring-1 ring-inset ring-teal-600/20">
                  CMS v2.5
                </span>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">
                Public announcements, official news feed &amp; mobile app content manager for Barangay Sta. Lucia.
              </p>
            </div>
          </div>
          <button
            onClick={() => setComposerOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" /> Announcement
          </button>
        </div>

        {/* Status summary */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
            {counts.Published} Published
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
            {counts.Scheduled} Scheduled
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
            {counts.Draft} Draft
          </span>
        </div>

        {/* Main layout */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Announcements column */}
          <section className="space-y-4 lg:col-span-2">
            {composerOpen && (
              <AnnouncementComposer onCancel={() => setComposerOpen(false)} onSubmit={addAnnouncement} />
            )}

            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === f.key
                      ? "bg-red-900 text-white"
                      : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <Card className="px-5 py-10 text-center text-sm text-slate-400">
                No announcements in this category yet.
              </Card>
            ) : (
              filtered.map((item) => (
                <AnnouncementCard
                  key={item.id}
                  item={item}
                  onDelete={deleteAnnouncement}
                  onPublish={publishAnnouncement}
                />
              ))
            )}

            <p className="pt-1 text-center text-xs text-slate-400">
              Sample starter posts shown above — edit or delete before publishing to residents.
            </p>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <MapCard />
            <ProfileCard />
            <StatsCard />
            <OfficialsCard />
            <SchoolsCard />
          </aside>
        </div>
      </div>
    </div>
  );
}