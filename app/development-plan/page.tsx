"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { 
  Map, ArrowLeft, Plus, Sparkles, TrendingUp, Clock, CheckCircle2, 
  AlertCircle, Building2, Stethoscope, Briefcase, GraduationCap, 
  Shield, Trash2, Users, ChevronRight, FileText, Calendar, DollarSign, 
  BarChart3, Target, ListChecks, Search, Filter, X, Edit2, Trash, 
  Save, AlertTriangle, ClipboardList, BookOpen, UsersRound, PieChart, 
  PencilLine, FileCheck, Eye, Menu, Loader2, ChevronDown
} from "lucide-react";

// ============================================
// TYPES
// ============================================

interface PPA {
  id: number;
  title: string;
  description: string;
  sector: string;
  category: 'program' | 'project' | 'activity';
  targetBeneficiaries: string;
  implementingOffice: string;
  partners: string[];
  timeline: { year: string; quarter: string; activities: string[]; milestones: string[] }[];
  budget: { year: string; amount: number; source: string; status: 'allocated' | 'released' | 'utilized' }[];
  status: 'planning' | 'ongoing' | 'completed' | 'suspended' | 'cancelled';
  progress: number;
  outputs: string[];
  outcomes: string[];
  indicators: string[];
  risk: string;
  sustainability: string;
}

interface BDP {
  id: number;
  barangay: string;
  period: string;
  vision: string;
  mission: string;
  goals: string[];
  status: 'draft' | 'for-adoption' | 'adopted' | 'for-review' | 'completed';
  stage: string;
}

interface AIP {
  id: number;
  bdpId: number;
  year: string;
  totalBudget: number;
  allocations: { sector: string; program: string; amount: number; priority: number }[];
  status: 'draft' | 'approved' | 'implemented';
}

interface M_E_Indicator {
  id: number;
  name: string;
  baseline: number;
  target: number;
  actual: number;
  frequency: string;
  sourceOfData: string;
  personResponsible: string;
}

interface M_E_Report {
  id: number;
  date: string;
  period: string;
  findings: string;
  status: string;
  nextSteps: string[];
}

interface BDC {
  id: number;
  bdpId: number;
  members: { id: number; name: string; position: string; organization: string; sector: string; contact: string }[];
  meetings: { id: number; date: string; attendees: string[]; agenda: string[]; minutes: string; resolutions: string[] }[];
  approvalDate?: string;
  resolutionNumber?: string;
}

interface PublicConsultation {
  id: number;
  bdpId: number;
  date: string;
  venue: string;
  participants: number;
  attendees: string[];
  agenda: string[];
  feedback: string[];
  decisions: string[];
  resolution: string;
}

type BDPStage = 
  | 'situational-analysis'
  | 'vision-mission'
  | 'program-formulation'
  | 'budget-allocations'
  | 'implementation'
  | 'monitoring-evaluation'
  | 'adoption';

// ============================================
// INITIAL DATA
// ============================================

const initialBDP: BDP = {
  id: 1,
  barangay: 'Sta. Lucia',
  period: '2023-2028',
  vision: 'A progressive, resilient, and inclusive barangay where every resident enjoys sustainable livelihood, quality education, accessible healthcare, and a peaceful community.',
  mission: 'To provide efficient and equitable public services, promote participatory governance, and foster sustainable development through collaboration with all stakeholders.',
  goals: [
    'Achieve 100% literacy rate among school-age children',
    'Reduce poverty incidence to 10%',
    'Increase agricultural productivity by 30%',
    'Establish disaster-resilient infrastructure',
    'Achieve zero crime rate in the barangay'
  ],
  status: 'adopted',
  stage: 'implementation'
};

const initialPPAs: PPA[] = [
  {
    id: 1,
    title: 'Road Rehabilitation Program',
    description: 'Rehabilitate and improve barangay roads to ensure accessibility and mobility.',
    sector: 'Infrastructure',
    category: 'project',
    targetBeneficiaries: 'All residents of affected zones',
    implementingOffice: 'Barangay Engineering Office',
    partners: ['DPWH', 'City Engineering Office'],
    timeline: [
      { year: '2024', quarter: 'Q1-Q2', activities: ['Assessment', 'Design'], milestones: ['Detailed Plan'] },
      { year: '2024', quarter: 'Q3-Q4', activities: ['Construction Phase 1'], milestones: ['50% Completion'] }
    ],
    budget: [
      { year: '2024', amount: 2500000, source: '20% Development Fund', status: 'allocated' },
      { year: '2025', amount: 2500000, source: '20% Development Fund', status: 'allocated' }
    ],
    status: 'ongoing',
    progress: 75,
    outputs: ['3.5km road completed'],
    outcomes: ['Reduced travel time by 40%'],
    indicators: ['Kilometers rehabilitated', 'Travel time reduction'],
    risk: 'Weather delays',
    sustainability: 'Regular maintenance by Barangay'
  },
  {
    id: 2,
    title: 'Barangay Health Center Upgrade',
    description: 'Upgrade health facilities and equipment to provide better healthcare services.',
    sector: 'Health',
    category: 'project',
    targetBeneficiaries: 'All residents, especially women and children',
    implementingOffice: 'Barangay Health Office',
    partners: ['DOH', 'City Health Office'],
    timeline: [
      { year: '2025', quarter: 'Q1-Q2', activities: ['Procurement', 'Renovation'], milestones: ['Facility Upgrade'] }
    ],
    budget: [
      { year: '2025', amount: 1500000, source: 'Health Fund', status: 'allocated' }
    ],
    status: 'ongoing',
    progress: 40,
    outputs: ['Equipment procured', 'Renovation ongoing'],
    outcomes: ['Improved health services access'],
    indicators: ['Patient satisfaction rate', 'Consultations per day'],
    risk: 'Funding constraints',
    sustainability: 'User fees and LGU support'
  },
  {
    id: 3,
    title: 'Skills Training and Livelihood Program',
    description: 'Provide skills training and livelihood opportunities to unemployed residents.',
    sector: 'Livelihood',
    category: 'program',
    targetBeneficiaries: 'Unemployed residents, youth, and women',
    implementingOffice: 'Barangay Social Welfare Office',
    partners: ['TESDA', 'DOLE'],
    timeline: [
      { year: '2024', quarter: 'Q1-Q4', activities: ['Training', 'Mentoring', 'Enterprise Support'], milestones: ['200 trained'] }
    ],
    budget: [
      { year: '2024', amount: 500000, source: 'Livelihood Fund', status: 'utilized' }
    ],
    status: 'completed',
    progress: 100,
    outputs: ['150 trained', '50 new businesses'],
    outcomes: ['20% increase in household income'],
    indicators: ['Number trained', 'Businesses established'],
    risk: 'Market competition',
    sustainability: 'Cooperative formation'
  },
  {
    id: 4,
    title: 'Flood Control and Drainage System',
    description: 'Construct flood control structures and improve drainage systems.',
    sector: 'Environment',
    category: 'project',
    targetBeneficiaries: 'Residents in flood-prone areas',
    implementingOffice: 'Barangay Engineering Office',
    partners: ['DPWH', 'DENR'],
    timeline: [
      { year: '2025', quarter: 'Q1-Q4', activities: ['Construction', 'Installation'], milestones: ['Completed System'] }
    ],
    budget: [
      { year: '2025', amount: 3000000, source: 'DRRM Fund', status: 'allocated' }
    ],
    status: 'ongoing',
    progress: 30,
    outputs: ['Drainage installed'],
    outcomes: ['Reduced flooding'],
    indicators: ['Areas protected', 'Flood incidents reduced'],
    risk: 'Geological challenges',
    sustainability: 'Regular maintenance'
  }
];

const initialAIP: AIP = {
  id: 1,
  bdpId: 1,
  year: '2025',
  totalBudget: 8500000,
  allocations: [
    { sector: 'Infrastructure', program: 'Road Rehabilitation', amount: 2500000, priority: 1 },
    { sector: 'Health', program: 'Health Center Upgrade', amount: 1500000, priority: 2 },
    { sector: 'Environment', program: 'Flood Control', amount: 3000000, priority: 1 },
    { sector: 'Livelihood', program: 'Skills Training', amount: 500000, priority: 3 },
    { sector: 'Education', program: 'Scholarship Program', amount: 500000, priority: 2 },
    { sector: 'Peace & Order', program: 'Barangay Patrol', amount: 500000, priority: 3 }
  ],
  status: 'approved'
};

const initialIndicators: M_E_Indicator[] = [
  { id: 1, name: 'Infrastructure Projects Completed', baseline: 0, target: 3, actual: 1, frequency: 'quarterly', sourceOfData: 'Barangay Engineering', personResponsible: 'Engr. Santos' },
  { id: 2, name: 'Livelihood Beneficiaries', baseline: 0, target: 200, actual: 150, frequency: 'quarterly', sourceOfData: 'Barangay Social Welfare', personResponsible: 'Ms. Reyes' },
  { id: 3, name: 'Healthcare Access Rate', baseline: 60, target: 90, actual: 75, frequency: 'semi-annual', sourceOfData: 'Health Center Records', personResponsible: 'Dr. Cruz' }
];

const initialReports: M_E_Report[] = [
  { id: 1, date: '2025-01-15', period: 'Q4 2024', findings: 'Road rehabilitation at 75% completion', status: 'On Track', nextSteps: ['Complete Phase 1', 'Start Phase 2'] }
];

const initialBDC: BDC = {
  id: 1,
  bdpId: 1,
  members: [
    { id: 1, name: 'Kapitan Juan Dela Cruz', position: 'Chairperson', organization: 'Barangay LGU', sector: 'government', contact: '09123456789' },
    { id: 2, name: 'Hon. Maria Santos', position: 'Vice Chairperson', organization: 'Sangguniang Barangay', sector: 'government', contact: '09123456780' },
    { id: 3, name: 'Mr. Jose Rizal', position: 'Member', organization: 'Civil Society Organization', sector: 'civil-society', contact: '09123456781' },
    { id: 4, name: 'Ms. Corazon Aquino', position: 'Member', organization: 'Women\'s Group', sector: 'civil-society', contact: '09123456782' },
    { id: 5, name: 'Mr. Andres Bonifacio', position: 'Member', organization: 'Sectoral Representative - Youth', sector: 'academe', contact: '09123456783' }
  ],
  meetings: [
    { 
      id: 1, 
      date: '2025-01-15', 
      attendees: ['Kapitan Juan Dela Cruz', 'Hon. Maria Santos', 'Mr. Jose Rizal'], 
      agenda: ['BDP Progress Review', 'AIP 2025 Approval'], 
      minutes: 'Discussed BDP implementation progress and approved AIP 2025',
      resolutions: ['Resolution No. 1: Approving AIP 2025']
    }
  ],
  approvalDate: '2025-01-15',
  resolutionNumber: 'SB Res. No. 001-2025'
};

const initialConsultations: PublicConsultation[] = [
  {
    id: 1,
    bdpId: 1,
    date: '2024-11-15',
    venue: 'Barangay Hall',
    participants: 150,
    attendees: ['Kapitan Juan Dela Cruz', 'Barangay Officials', 'CSO Representatives', 'Residents'],
    agenda: ['BDP 2023-2028 Presentation', 'Community Feedback', 'Priority Setting'],
    feedback: ['Need more focus on youth programs', 'Health center services improvement requested'],
    decisions: ['Prioritized Infrastructure projects', 'Increased allocation for health services'],
    resolution: 'Resolution No. 01-2024-03'
  }
];

const BDP_STAGES = [
  { id: 'situational-analysis', label: 'Situational Analysis', icon: ClipboardList, description: 'Barangay profile, needs assessment, and data gathering' },
  { id: 'vision-mission', label: 'Vision & Mission', icon: Eye, description: 'Define the barangay\'s vision, mission, and goals' },
  { id: 'program-formulation', label: 'Program Formulation', icon: ListChecks, description: 'Formulate programs, projects, and activities (PPAs)' },
  { id: 'budget-allocations', label: 'Budget & AIP', icon: DollarSign, description: 'Annual Investment Plan and budget allocation' },
  { id: 'implementation', label: 'Implementation', icon: TrendingUp, description: 'Execute the BDP programs and projects' },
  { id: 'monitoring-evaluation', label: 'Monitoring & Evaluation', icon: BarChart3, description: 'Track progress, measure outcomes, and evaluate impact' },
  { id: 'adoption', label: 'Adoption', icon: FileCheck, description: 'Approval by Sangguniang Barangay and formal adoption' }
];

const SECTORS = ['All', 'Infrastructure', 'Health', 'Livelihood', 'Education', 'Peace & Order', 'Environment', 'Social Welfare'];
const STATUSES = ['All', 'planning', 'ongoing', 'completed', 'suspended', 'cancelled'];

// ============================================
// MAIN COMPONENT
// ============================================

export default function BDPPage() {
  // State Management
  const [activeStage, setActiveStage] = useState<BDPStage>('situational-analysis');
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Data States
  const [bdp, setBdp] = useState<BDP>(initialBDP);
  const [ppas, setPpas] = useState<PPA[]>(initialPPAs);
  const [aip, setAip] = useState<AIP>(initialAIP);
  const [indicators, setIndicators] = useState<M_E_Indicator[]>(initialIndicators);
  const [reports, setReports] = useState<M_E_Report[]>(initialReports);
  const [bdc, setBdc] = useState<BDC>(initialBDC);
  const [consultations, setConsultations] = useState<PublicConsultation[]>(initialConsultations);

  // UI States for Program Formulation
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isPPAModalOpen, setIsPPAModalOpen] = useState(false);
  const [editingPPA, setEditingPPA] = useState<PPA | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingPPAId, setDeletingPPAId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<PPA>>({});

  // UI States for M&E
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false);
  const [editingIndicator, setEditingIndicator] = useState<M_E_Indicator | null>(null);
  const [indicatorFormData, setIndicatorFormData] = useState<Partial<M_E_Indicator>>({});

  // UI States for AIP
  const [isAIPModalOpen, setIsAIPModalOpen] = useState(false);
  const [aipFormData, setAipFormData] = useState<Partial<AIP>>({});

  // UI States for BDC
  const [isBDCMemberModalOpen, setIsBDCMemberModalOpen] = useState(false);
  const [editingBDCMember, setEditingBDCMember] = useState<typeof bdc.members[0] | null>(null);
  const [bdcMemberFormData, setBdcMemberFormData] = useState<Partial<typeof bdc.members[0]>>({});

  // Computed values
  const filteredPPAs = useMemo(() => {
    return ppas.filter(ppa => {
      const matchesSearch = ppa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ppa.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = filterSector === "all" || ppa.sector === filterSector;
      const matchesStatus = filterStatus === "all" || ppa.status === filterStatus;
      return matchesSearch && matchesSector && matchesStatus;
    });
  }, [ppas, searchTerm, filterSector, filterStatus]);

  const totalBudget = ppas.reduce((sum, ppa) => 
    sum + ppa.budget.reduce((s, b) => s + b.amount, 0), 0
  );
  const utilizedBudget = ppas.reduce((sum, ppa) => 
    sum + ppa.budget.filter(b => b.status === 'utilized').reduce((s, b) => s + b.amount, 0), 0
  );
  const overallProgress = ppas.length > 0 
    ? Math.round(ppas.reduce((sum, p) => sum + p.progress, 0) / ppas.length)
    : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'planning': 'bg-blue-100 text-blue-800',
      'ongoing': 'bg-amber-100 text-amber-800',
      'completed': 'bg-emerald-100 text-emerald-800',
      'suspended': 'bg-rose-100 text-rose-800',
      'cancelled': 'bg-slate-100 text-slate-600'
    };
    return colors[status] || 'bg-slate-100 text-slate-600';
  };

  // ============================================
  // PPA CRUD FUNCTIONS
  // ============================================

  const handleAddPPA = () => {
    setEditingPPA(null);
    setFormData({
      title: '',
      description: '',
      sector: 'Infrastructure',
      category: 'project',
      targetBeneficiaries: '',
      implementingOffice: '',
      partners: [],
      status: 'planning',
      progress: 0,
      risk: '',
      sustainability: ''
    });
    setIsPPAModalOpen(true);
  };

  const handleEditPPA = (ppa: PPA) => {
    setEditingPPA(ppa);
    setFormData(ppa);
    setIsPPAModalOpen(true);
  };

  const handleSavePPA = () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in title and description');
      return;
    }

    if (editingPPA) {
      setPpas(ppas.map(p => 
        p.id === editingPPA.id 
          ? { ...p, ...formData as PPA }
          : p
      ));
    } else {
      const newPPA: PPA = {
        id: Math.max(...ppas.map(p => p.id), 0) + 1,
        title: formData.title || '',
        description: formData.description || '',
        sector: formData.sector || 'Infrastructure',
        category: formData.category as 'program' | 'project' | 'activity' || 'project',
        targetBeneficiaries: formData.targetBeneficiaries || '',
        implementingOffice: formData.implementingOffice || '',
        partners: formData.partners || [],
        timeline: formData.timeline || [],
        budget: formData.budget || [],
        status: formData.status as 'planning' | 'ongoing' | 'completed' | 'suspended' | 'cancelled' || 'planning',
        progress: formData.progress || 0,
        outputs: formData.outputs || [],
        outcomes: formData.outcomes || [],
        indicators: formData.indicators || [],
        risk: formData.risk || '',
        sustainability: formData.sustainability || ''
      };
      setPpas([...ppas, newPPA]);
    }
    setIsPPAModalOpen(false);
    setEditingPPA(null);
  };

  const handleDeletePPA = (id: number) => {
    setPpas(ppas.filter(p => p.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeletingPPAId(null);
  };

  const handleUpdateProgress = (id: number, progress: number) => {
    setPpas(ppas.map(p => 
      p.id === id 
        ? { ...p, progress: Math.min(100, Math.max(0, progress)) }
        : p
    ));
  };

  // ============================================
  // INDICATOR FUNCTIONS
  // ============================================

  const handleAddIndicator = () => {
    setEditingIndicator(null);
    setIndicatorFormData({ name: '', baseline: 0, target: 0, actual: 0, frequency: 'quarterly', sourceOfData: '', personResponsible: '' });
    setIsIndicatorModalOpen(true);
  };

  const handleEditIndicator = (indicator: M_E_Indicator) => {
    setEditingIndicator(indicator);
    setIndicatorFormData(indicator);
    setIsIndicatorModalOpen(true);
  };

  const handleSaveIndicator = () => {
    if (!indicatorFormData.name) {
      alert('Please enter indicator name');
      return;
    }

    if (editingIndicator) {
      setIndicators(indicators.map(i => 
        i.id === editingIndicator.id 
          ? { ...i, ...indicatorFormData as M_E_Indicator }
          : i
      ));
    } else {
      const newIndicator: M_E_Indicator = {
        id: Math.max(...indicators.map(i => i.id), 0) + 1,
        name: indicatorFormData.name || '',
        baseline: indicatorFormData.baseline || 0,
        target: indicatorFormData.target || 0,
        actual: indicatorFormData.actual || 0,
        frequency: indicatorFormData.frequency as 'monthly' | 'quarterly' | 'semi-annual' | 'annual' || 'quarterly',
        sourceOfData: indicatorFormData.sourceOfData || '',
        personResponsible: indicatorFormData.personResponsible || ''
      };
      setIndicators([...indicators, newIndicator]);
    }
    setIsIndicatorModalOpen(false);
    setEditingIndicator(null);
  };

  const handleDeleteIndicator = (id: number) => {
    setIndicators(indicators.filter(i => i.id !== id));
  };

  const handleUpdateIndicatorActual = (id: number, actual: number) => {
    setIndicators(indicators.map(i => 
      i.id === id ? { ...i, actual } : i
    ));
  };

  // ============================================
  // AIP FUNCTIONS
  // ============================================

  const handleUpdateAIP = () => {
    setIsAIPModalOpen(true);
    setAipFormData(aip);
  };

  const handleSaveAIP = () => {
    if (aipFormData.totalBudget && aipFormData.allocations) {
      setAip({ ...aip, ...aipFormData as AIP });
    }
    setIsAIPModalOpen(false);
  };

  // ============================================
  // BDC FUNCTIONS
  // ============================================

  const handleAddBDCMember = () => {
    setEditingBDCMember(null);
    setBdcMemberFormData({ name: '', position: '', organization: '', sector: 'government', contact: '' });
    setIsBDCMemberModalOpen(true);
  };

  const handleEditBDCMember = (member: typeof bdc.members[0]) => {
    setEditingBDCMember(member);
    setBdcMemberFormData(member);
    setIsBDCMemberModalOpen(true);
  };

  const handleSaveBDCMember = () => {
    if (!bdcMemberFormData.name) {
      alert('Please enter member name');
      return;
    }

    if (editingBDCMember) {
      setBdc({
        ...bdc,
        members: bdc.members.map(m => 
          m.id === editingBDCMember.id 
            ? { ...m, ...bdcMemberFormData as typeof bdc.members[0] }
            : m
        )
      });
    } else {
      const newMember = {
        id: Math.max(...bdc.members.map(m => m.id), 0) + 1,
        name: bdcMemberFormData.name || '',
        position: bdcMemberFormData.position || '',
        organization: bdcMemberFormData.organization || '',
        sector: bdcMemberFormData.sector as 'government' | 'civil-society' | 'private' | 'academe' || 'government',
        contact: bdcMemberFormData.contact || ''
      };
      setBdc({
        ...bdc,
        members: [...bdc.members, newMember]
      });
    }
    setIsBDCMemberModalOpen(false);
    setEditingBDCMember(null);
  };

  const handleDeleteBDCMember = (id: number) => {
    setBdc({
      ...bdc,
      members: bdc.members.filter(m => m.id !== id)
    });
  };

  // ============================================
  // BDP FUNCTIONS
  // ============================================

  const handleUpdateBDP = (field: keyof BDP, value: any) => {
    setBdp({ ...bdp, [field]: value });
  };

  // ============================================
  // CONSULTATION FUNCTIONS
  // ============================================

  const handleAddConsultation = () => {
    // Simple add for demo
    const newConsultation: PublicConsultation = {
      id: Math.max(...consultations.map(c => c.id), 0) + 1,
      bdpId: 1,
      date: new Date().toISOString().split('T')[0],
      venue: 'Barangay Hall',
      participants: 0,
      attendees: [],
      agenda: [],
      feedback: [],
      decisions: [],
      resolution: ''
    };
    setConsultations([...consultations, newConsultation]);
  };

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  const renderStageContent = () => {
    switch(activeStage) {
      case 'situational-analysis':
        return <SituationalAnalysis bdp={bdp} onUpdateBDP={handleUpdateBDP} />;
      case 'vision-mission':
        return <VisionMission bdp={bdp} onUpdateBDP={handleUpdateBDP} />;
      case 'program-formulation':
        return <ProgramFormulation 
          ppas={filteredPPAs}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterSector={filterSector}
          setFilterSector={setFilterSector}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onAddPPA={handleAddPPA}
          onEditPPA={handleEditPPA}
          onDeletePPA={(id: number) => { setDeletingPPAId(id); setIsDeleteConfirmOpen(true); }}
          onUpdateProgress={handleUpdateProgress}
          formatCurrency={formatCurrency}
          getStatusColor={getStatusColor}
        />;
      case 'budget-allocations':
        return <BudgetAllocations 
          aip={aip} 
          ppas={ppas} 
          formatCurrency={formatCurrency}
          onEditAIP={handleUpdateAIP}
        />;
      case 'implementation':
        return <Implementation 
          ppas={ppas} 
          bdc={bdc} 
          formatCurrency={formatCurrency}
          onUpdateProgress={handleUpdateProgress}
        />;
      case 'monitoring-evaluation':
        return <MonitoringEvaluation 
          indicators={indicators}
          reports={reports}
          onAddIndicator={handleAddIndicator}
          onEditIndicator={handleEditIndicator}
          onDeleteIndicator={handleDeleteIndicator}
          onUpdateIndicatorActual={handleUpdateIndicatorActual}
          formatCurrency={formatCurrency}
        />;
      case 'adoption':
        return <Adoption 
          bdc={bdc} 
          consultations={consultations} 
          bdp={bdp}
          onAddConsultation={handleAddConsultation}
          onAddBDCMember={handleAddBDCMember}
          onEditBDCMember={handleEditBDCMember}
          onDeleteBDCMember={handleDeleteBDCMember}
        />;
      default:
        return <div>Select a stage</div>;
    }
  };

  // ============================================
  // MAIN RETURN
  // ============================================

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Map className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900">BDP {bdp.period}</h1>
                <p className="text-[10px] text-slate-500">Barangay {bdp.barangay}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              bdp.status === 'adopted' ? 'bg-emerald-100 text-emerald-800' :
              bdp.status === 'for-adoption' ? 'bg-amber-100 text-amber-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {bdp.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar Navigation */}
        <aside className={`${
          showSidebar ? 'fixed inset-0 z-40 lg:relative lg:inset-auto' : 'hidden lg:block'
        } lg:w-64 flex-shrink-0`}>
          <div className={`${
            showSidebar ? 'absolute inset-0 bg-slate-900/50 lg:hidden' : 'hidden'
          }`} onClick={() => setShowSidebar(false)} />
          
          <nav className={`${
            showSidebar ? 'absolute top-0 left-0 h-full w-64 bg-white shadow-xl lg:shadow-none lg:relative' : ''
          } lg:bg-white lg:rounded-xl lg:border lg:border-slate-200 lg:p-4`}>
            <div className="p-4 lg:p-0">
              <div className="flex items-center justify-between mb-4 lg:mb-3">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Planning Cycle
                </h3>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1">
                {BDP_STAGES.map((stage) => {
                  const Icon = stage.icon;
                  const isActive = activeStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => {
                        setActiveStage(stage.id);
                        setShowSidebar(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                      <span className="flex-1 text-left">{stage.label}</span>
                      {isActive && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {renderStageContent()}
        </main>
      </div>

      {/* ============================================
          PPA MODAL
          ============================================ */}
      {isPPAModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingPPA ? 'Edit PPA' : 'New Program/Project/Activity'}
              </h3>
              <button onClick={() => setIsPPAModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter PPA title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Describe the program/project/activity"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sector</label>
                  <select
                    value={formData.sector || 'Infrastructure'}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {['Infrastructure', 'Health', 'Livelihood', 'Education', 'Peace & Order', 'Environment', 'Social Welfare'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category || 'project'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="program">Program</option>
                    <option value="project">Project</option>
                    <option value="activity">Activity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Beneficiaries</label>
                <input
                  type="text"
                  value={formData.targetBeneficiaries || ''}
                  onChange={(e) => setFormData({ ...formData, targetBeneficiaries: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Who will benefit from this PPA?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Implementing Office</label>
                <input
                  type="text"
                  value={formData.implementingOffice || ''}
                  onChange={(e) => setFormData({ ...formData, implementingOffice: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Office responsible for implementation"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status || 'planning'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="planning">Planning</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="suspended">Suspended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress || 0}
                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Risk and Challenges</label>
                <input
                  type="text"
                  value={formData.risk || ''}
                  onChange={(e) => setFormData({ ...formData, risk: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Potential risks and mitigation measures"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sustainability</label>
                <input
                  type="text"
                  value={formData.sustainability || ''}
                  onChange={(e) => setFormData({ ...formData, sustainability: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="How will this PPA be sustained?"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsPPAModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePPA}
                className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {editingPPA ? 'Update PPA' : 'Add PPA'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          DELETE CONFIRMATION MODAL
          ============================================ */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-rose-50 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Confirm Delete</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete this PPA? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePPA(deletingPPAId!)}
                className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                Delete PPA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          INDICATOR MODAL
          ============================================ */}
      {isIndicatorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingIndicator ? 'Edit Indicator' : 'New Indicator'}
              </h3>
              <button onClick={() => setIsIndicatorModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Indicator Name *</label>
                <input
                  type="text"
                  value={indicatorFormData.name || ''}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Baseline</label>
                  <input
                    type="number"
                    value={indicatorFormData.baseline || 0}
                    onChange={(e) => setIndicatorFormData({ ...indicatorFormData, baseline: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target</label>
                  <input
                    type="number"
                    value={indicatorFormData.target || 0}
                    onChange={(e) => setIndicatorFormData({ ...indicatorFormData, target: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Actual</label>
                  <input
                    type="number"
                    value={indicatorFormData.actual || 0}
                    onChange={(e) => setIndicatorFormData({ ...indicatorFormData, actual: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Frequency</label>
                <select
                  value={indicatorFormData.frequency || 'quarterly'}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, frequency: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annual">Semi-Annual</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Source of Data</label>
                <input
                  type="text"
                  value={indicatorFormData.sourceOfData || ''}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, sourceOfData: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Person Responsible</label>
                <input
                  type="text"
                  value={indicatorFormData.personResponsible || ''}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, personResponsible: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsIndicatorModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSaveIndicator} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingIndicator ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          AIP MODAL
          ============================================ */}
      {isAIPModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Edit Annual Investment Plan</h3>
              <button onClick={() => setIsAIPModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={aipFormData.year || ''}
                    onChange={(e) => setAipFormData({ ...aipFormData, year: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Total Budget</label>
                  <input
                    type="number"
                    value={aipFormData.totalBudget || 0}
                    onChange={(e) => setAipFormData({ ...aipFormData, totalBudget: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={aipFormData.status || 'draft'}
                  onChange={(e) => setAipFormData({ ...aipFormData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="draft">Draft</option>
                  <option value="approved">Approved</option>
                  <option value="implemented">Implemented</option>
                </select>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsAIPModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSaveAIP} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2">
                <Save className="h-4 w-4" /> Save AIP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          BDC MEMBER MODAL
          ============================================ */}
      {isBDCMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingBDCMember ? 'Edit BDC Member' : 'Add BDC Member'}
              </h3>
              <button onClick={() => setIsBDCMemberModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={bdcMemberFormData.name || ''}
                  onChange={(e) => setBdcMemberFormData({ ...bdcMemberFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                <input
                  type="text"
                  value={bdcMemberFormData.position || ''}
                  onChange={(e) => setBdcMemberFormData({ ...bdcMemberFormData, position: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                <input
                  type="text"
                  value={bdcMemberFormData.organization || ''}
                  onChange={(e) => setBdcMemberFormData({ ...bdcMemberFormData, organization: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sector</label>
                <select
                  value={bdcMemberFormData.sector || 'government'}
                  onChange={(e) => setBdcMemberFormData({ ...bdcMemberFormData, sector: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="government">Government</option>
                  <option value="civil-society">Civil Society</option>
                  <option value="private">Private</option>
                  <option value="academe">Academe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact</label>
                <input
                  type="text"
                  value={bdcMemberFormData.contact || ''}
                  onChange={(e) => setBdcMemberFormData({ ...bdcMemberFormData, contact: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsBDCMemberModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSaveBDCMember} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingBDCMember ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// STAGE COMPONENTS (with proper props and functions)
// ============================================

function SituationalAnalysis({ bdp, onUpdateBDP }: { bdp: BDP; onUpdateBDP: (field: keyof BDP, value: any) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [vision, setVision] = useState(bdp.vision);
  const [mission, setMission] = useState(bdp.mission);

  const handleSave = () => {
    onUpdateBDP('vision', vision);
    onUpdateBDP('mission', mission);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Situational Analysis</h2>
          <p className="text-sm text-slate-500">Barangay profile, needs assessment, and baseline data</p>
        </div>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
            isEditing 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isEditing ? (
            <><Save className="h-3.5 w-3.5" /> Save Changes</>
          ) : (
            <><Edit2 className="h-3.5 w-3.5" /> Edit</>
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-emerald-600" /> Vision
            </h3>
            {isEditing ? (
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed italic">{bdp.vision}</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-600" /> Mission
            </h3>
            {isEditing ? (
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed italic">{bdp.mission}</p>
            )}
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-emerald-600" /> Strategic Goals
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bdp.goals.map((goal, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-sm text-slate-700">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisionMission({ bdp, onUpdateBDP }: { bdp: BDP; onUpdateBDP: (field: keyof BDP, value: any) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [goals, setGoals] = useState(bdp.goals);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdateBDP('goals', goals);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Vision, Mission & Goals</h2>
          <p className="text-sm text-slate-500">Organizational philosophy and strategic direction</p>
        </div>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
            isEditing 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isEditing ? (
            <><Save className="h-3.5 w-3.5" /> Save Goals</>
          ) : (
            <><Edit2 className="h-3.5 w-3.5" /> Edit Goals</>
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {index + 1}
              </div>
              {isEditing ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => {
                      const newGoals = [...goals];
                      newGoals[index] = e.target.value;
                      setGoals(newGoals);
                    }}
                    className="flex-1 px-3 py-1 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleRemoveGoal(index)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-slate-700">{goal}</p>
              )}
            </div>
          ))}

          {isEditing && (
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add new goal..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
              />
              <button
                onClick={handleAddGoal}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProgramFormulation({ 
  ppas, searchTerm, setSearchTerm, filterSector, setFilterSector,
  filterStatus, setFilterStatus, onAddPPA, onEditPPA, onDeletePPA,
  onUpdateProgress, formatCurrency, getStatusColor
}: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Program Formulation</h2>
          <p className="text-sm text-slate-500">Programs, Projects, and Activities (PPAs)</p>
        </div>
        <button
          onClick={onAddPPA}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New PPA
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search PPAs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={filterSector}
          onChange={(e) => setFilterSector(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {['All', 'Infrastructure', 'Health', 'Livelihood', 'Education', 'Peace & Order', 'Environment', 'Social Welfare'].map(s => (
            <option key={s} value={s.toLowerCase() === 'all' ? 'all' : s}>{s}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {['All', 'planning', 'ongoing', 'completed', 'suspended', 'cancelled'].map(s => (
            <option key={s} value={s.toLowerCase()}>{s}</option>
          ))}
        </select>
      </div>

      {/* PPA Cards */}
      <div className="space-y-4">
        {ppas.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
            No PPAs found. Click "New PPA" to add one.
          </div>
        ) : (
          ppas.map((ppa: PPA) => (
            <div key={ppa.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">{ppa.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(ppa.status)}`}>
                      {ppa.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{ppa.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" />
                      {ppa.sector}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {formatCurrency(ppa.budget.reduce((s: number, b: any) => s + b.amount, 0))}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {ppa.targetBeneficiaries}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ppa.progress}
                      onChange={(e) => onUpdateProgress(ppa.id, parseInt(e.target.value))}
                      className="w-20 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <span className="text-sm font-medium text-slate-900 min-w-[36px]">
                      {ppa.progress}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditPPA(ppa)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeletePPA(ppa.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function BudgetAllocations({ aip, ppas, formatCurrency, onEditAIP }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Budget & AIP</h2>
          <p className="text-sm text-slate-500">Annual Investment Plan and budget allocation</p>
        </div>
        <button 
          onClick={onEditAIP}
          className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
        >
          <Edit2 className="h-3.5 w-3.5" /> Edit AIP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Budget ({aip.year})</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(aip.totalBudget)}</p>
          <p className="text-xs text-slate-500">Status: {aip.status.toUpperCase()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">PPAs Funded</p>
          <p className="text-2xl font-bold text-slate-900">{ppas.length}</p>
          <p className="text-xs text-slate-500">{ppas.filter((p: PPA) => p.status === 'ongoing').length} ongoing</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Budget Utilization</p>
          <p className="text-2xl font-bold text-slate-900">
            {Math.round(ppas.reduce((sum: number, p: PPA) => sum + p.budget.filter((b: any) => b.status === 'utilized').reduce((s: number, b: any) => s + b.amount, 0), 0) / aip.totalBudget * 100)}%
          </p>
          <p className="text-xs text-slate-500">of total budget utilized</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Sectoral Allocation</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {aip.allocations.map((alloc: any, i: number) => {
            const percentage = (alloc.amount / aip.totalBudget * 100);
            return (
              <div key={i} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">{alloc.sector}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      alloc.priority === 1 ? 'bg-rose-100 text-rose-800' :
                      alloc.priority === 2 ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      Priority {alloc.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{alloc.program}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <div className="bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-900 min-w-[80px]">
                    {formatCurrency(alloc.amount)}
                  </span>
                  <span className="text-xs text-slate-500 min-w-[40px]">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Implementation({ ppas, bdc, formatCurrency, onUpdateProgress }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Implementation</h2>
          <p className="text-sm text-slate-500">Execute the BDP programs and projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Overall Progress</p>
          <p className="text-2xl font-bold text-slate-900">
            {Math.round(ppas.reduce((sum: number, p: PPA) => sum + p.progress, 0) / ppas.length)}%
          </p>
          <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 rounded-full transition-all"
              style={{ width: `${Math.round(ppas.reduce((sum: number, p: PPA) => sum + p.progress, 0) / ppas.length)}%` }}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Active Projects</p>
          <p className="text-2xl font-bold text-slate-900">{ppas.filter((p: PPA) => p.status === 'ongoing').length}</p>
          <p className="text-xs text-slate-500">Completed: {ppas.filter((p: PPA) => p.status === 'completed').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Implementation Partners</p>
          <p className="text-2xl font-bold text-slate-900">{bdc.members.length}</p>
          <p className="text-xs text-slate-500">BDC members overseeing implementation</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">Active Projects</h3>
        {ppas.filter((p: PPA) => p.status === 'ongoing' || p.status === 'planning').map((ppa: PPA) => (
          <div key={ppa.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-slate-900">{ppa.title}</p>
                <p className="text-xs text-slate-500">{ppa.implementingOffice}</p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ppa.progress}
                  onChange={(e) => onUpdateProgress(ppa.id, parseInt(e.target.value))}
                  className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <span className="text-sm font-medium text-slate-900">{ppa.progress}%</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  ppa.status === 'ongoing' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {ppa.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonitoringEvaluation({ indicators, reports, onAddIndicator, onEditIndicator, onDeleteIndicator, onUpdateIndicatorActual, formatCurrency }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Monitoring & Evaluation</h2>
          <p className="text-sm text-slate-500">Track progress, measure outcomes, and evaluate impact</p>
        </div>
        <button 
          onClick={onAddIndicator}
          className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
        >
          <Plus className="h-3.5 w-3.5" /> Add Indicator
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Key Performance Indicators</h3>
          <div className="space-y-3">
            {indicators.map((ind: M_E_Indicator) => (
              <div key={ind.id}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">{ind.name}</span>
                      <span className="text-xs text-slate-500">{ind.frequency}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-600">Baseline: {ind.baseline}</span>
                      <span className="text-slate-600">Target: {ind.target}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600">Actual:</span>
                        <input
                          type="number"
                          value={ind.actual}
                          onChange={(e) => onUpdateIndicatorActual(ind.id, parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-0.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditIndicator(ind)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteIndicator(ind.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      ind.actual >= ind.target ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min((ind.actual / ind.target) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {ind.sourceOfData} • Responsible: {ind.personResponsible}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Progress Reports</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {reports.map((report: M_E_Report) => (
            <div key={report.id} className="px-4 py-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-slate-900">{report.period}</p>
                  <p className="text-xs text-slate-500">{report.date}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  report.status === 'On Track' ? 'bg-emerald-100 text-emerald-800' :
                  report.status === 'Delayed' ? 'bg-rose-100 text-rose-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {report.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{report.findings}</p>
              {report.nextSteps.length > 0 && (
                <p className="text-xs text-slate-500 mt-1">
                  Next steps: {report.nextSteps.join('; ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Adoption({ bdc, consultations, bdp, onAddConsultation, onAddBDCMember, onEditBDCMember, onDeleteBDCMember }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Adoption</h2>
          <p className="text-sm text-slate-500">Approval and formal adoption of the BDP</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
            bdp.status === 'adopted' ? 'bg-emerald-100 text-emerald-800' :
            'bg-amber-100 text-amber-800'
          }`}>
            {bdp.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UsersRound className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-slate-900">Barangay Development Council</h3>
            </div>
            <button
              onClick={onAddBDCMember}
              className="px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
            >
              <Plus className="h-3 w-3" /> Add Member
            </button>
          </div>
          <div className="space-y-3">
            {bdc.members.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between text-sm group">
                <div>
                  <p className="font-medium text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.position} • {member.organization}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    member.sector === 'government' ? 'bg-blue-100 text-blue-800' :
                    member.sector === 'civil-society' ? 'bg-emerald-100 text-emerald-800' :
                    member.sector === 'private' ? 'bg-amber-100 text-amber-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {member.sector}
                  </span>
                  <button
                    onClick={() => onEditBDCMember(member)}
                    className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteBDCMember(member.id)}
                    className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600"
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {bdc.approvalDate && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Approved:</span> {bdc.approvalDate}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Resolution:</span> {bdc.resolutionNumber}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-slate-900">Public Consultations</h3>
              </div>
              <button
                onClick={onAddConsultation}
                className="px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            {consultations.map((consultation: any) => (
              <div key={consultation.id} className="mb-3 last:mb-0 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">{consultation.date}</p>
                  <span className="text-xs text-slate-500">{consultation.participants} participants</span>
                </div>
                <p className="text-xs text-slate-500">{consultation.venue}</p>
                <div className="mt-1">
                  <p className="text-xs font-medium text-slate-700">Key Decisions:</p>
                  <ul className="text-xs text-slate-600 list-disc list-inside">
                    {consultation.decisions.map((decision: string, i: number) => (
                      <li key={i}>{decision}</li>
                    ))}
                  </ul>
                </div>
                {consultation.resolution && (
                  <p className="text-xs text-slate-500 mt-1">Resolution: {consultation.resolution}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}