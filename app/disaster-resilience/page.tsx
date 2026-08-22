"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  ShieldCheck,
  ArrowLeft,
  Plus,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Map,
  Building2,
  Users,
  Package,
  AlertTriangle,
  Search,
  Filter,
  X,
  Edit2,
  Trash,
  Save,
  Menu,
  ChevronRight,
  Calendar,
  FileText,
  BarChart3,
  Target,
  ListChecks,
  Eye,
  MapPin,
  Radio,
  Phone,
  Droplets,
  Wind,
  Thermometer,
  Waves,
  Mountain,
  Home,
  Hospital,
  Truck,
  Ambulance,
  Tent,
  Water,
  Zap,
  Shield,
  Heart,
  Brain,
  Activity,
  Bell,
  BellRing,
  Layers
} from "lucide-react";

// ============================================
// TYPES
// ============================================

interface Hazard {
  id: number;
  type: 'typhoon' | 'flood' | 'earthquake' | 'tsunami' | 'volcanic-eruption' | 'landslide' | 'fire' | 'storm-surge' | 'drought' | 'other';
  name: string;
  location: string;
  date: string;
  time: string;
  affectedPopulation: number;
  affectedHouseholds: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'monitored' | 'resolved';
  description: string;
  reportedBy: string;
  contact: string;
  actions: string[];
  casualties: {
    dead: number;
    injured: number;
    missing: number;
  };
  damage: {
    houses: number;
    infrastructure: number;
    agriculture: number;
    estimatedCost: number;
  };
}

interface EvacuationCenter {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
  status: 'operational' | 'full' | 'closed' | 'under-maintenance';
  facilities: string[];
  contactPerson: string;
  contactNumber: string;
  coordinates: string;
  barangay: string;
}

interface Evacuation {
  id: number;
  hazardId: number;
  centerId: number;
  date: string;
  evacuees: {
    families: number;
    individuals: number;
    children: number;
    elderly: number;
    pwd: number;
    pregnant: number;
  };
  status: 'active' | 'closed';
  notes: string;
}

interface DRRMResource {
  id: number;
  category: 'facility' | 'equipment' | 'system';
  name: string;
  type: string;
  quantity: number;
  status: 'available' | 'in-use' | 'maintenance' | 'depleted';
  location: string;
  description: string;
  dateAcquired: string;
  lastMaintenance: string;
  contact: string;
}

interface HazardProneArea {
  id: number;
  hazard: string;
  location: string;
  barangay: string;
  riskLevel: 'high' | 'medium' | 'low';
  populationAtRisk: number;
  householdsAtRisk: number;
  mitigationMeasures: string[];
  earlyWarningSystem: string;
}

interface DRRMPlan {
  id: number;
  hazard: string;
  planType: 'contingency' | 'evacuation' | 'response' | 'recovery';
  title: string;
  description: string;
  status: 'draft' | 'approved' | 'implemented' | 'reviewed';
  dateCreated: string;
  dateApproved?: string;
  stakeholders: string[];
  resources: string[];
  actions: string[];
}

// ============================================
// INITIAL DATA
// ============================================

const initialHazards: Hazard[] = [
  {
    id: 1,
    type: 'typhoon',
    name: 'Typhoon Karding',
    location: 'Zone 3, Brgy. Sta. Lucia',
    date: '2025-08-15',
    time: '14:30',
    affectedPopulation: 250,
    affectedHouseholds: 62,
    severity: 'high',
    status: 'active',
    description: 'Category 3 typhoon with sustained winds of 185 km/h. Heavy rainfall expected.',
    reportedBy: 'Kapitan Juan Dela Cruz',
    contact: '09123456789',
    actions: ['Evacuation in progress', 'Prepositioning of relief goods'],
    casualties: { dead: 0, injured: 2, missing: 0 },
    damage: { houses: 15, infrastructure: 3, agriculture: 5, estimatedCost: 1500000 }
  },
  {
    id: 2,
    type: 'flood',
    name: 'Flash Flood - Zone 7',
    location: 'Zone 7, Brgy. Sta. Lucia',
    date: '2025-08-12',
    time: '09:00',
    affectedPopulation: 120,
    affectedHouseholds: 30,
    severity: 'critical',
    status: 'active',
    description: 'Heavy rainfall caused rapid flooding in low-lying areas. Water level reaching 1.5m.',
    reportedBy: 'Barangay Tanod Ramon',
    contact: '09123456788',
    actions: ['Rescue operations ongoing', 'Evacuation center opened'],
    casualties: { dead: 0, injured: 3, missing: 1 },
    damage: { houses: 20, infrastructure: 5, agriculture: 8, estimatedCost: 2500000 }
  },
  {
    id: 3,
    type: 'earthquake',
    name: '5.6 Magnitude Earthquake',
    location: 'Brgy. Sta. Lucia',
    date: '2025-08-10',
    time: '03:15',
    affectedPopulation: 50,
    affectedHouseholds: 12,
    severity: 'medium',
    status: 'monitored',
    description: '5.6 magnitude earthquake with epicenter 10km northeast of barangay.',
    reportedBy: 'Mr. Jose Santos',
    contact: '09123456787',
    actions: ['Damage assessment ongoing', 'Building inspections'],
    casualties: { dead: 0, injured: 1, missing: 0 },
    damage: { houses: 8, infrastructure: 2, agriculture: 0, estimatedCost: 500000 }
  },
  {
    id: 4,
    type: 'fire',
    name: 'Residential Fire - Zone 5',
    location: 'Zone 5, Brgy. Sta. Lucia',
    date: '2025-08-08',
    time: '22:00',
    affectedPopulation: 30,
    affectedHouseholds: 8,
    severity: 'medium',
    status: 'resolved',
    description: 'Fire broke out in a residential area. 8 houses affected.',
    reportedBy: 'Barangay Fire Marshal',
    contact: '09123456786',
    actions: ['Fire suppression', 'Relief distribution'],
    casualties: { dead: 0, injured: 2, missing: 0 },
    damage: { houses: 8, infrastructure: 1, agriculture: 0, estimatedCost: 800000 }
  }
];

const initialEvacuationCenters: EvacuationCenter[] = [
  {
    id: 1,
    name: 'Sta. Lucia Elementary School',
    location: 'Zone 1, Brgy. Sta. Lucia',
    capacity: 200,
    currentOccupancy: 150,
    status: 'operational',
    facilities: ['Classrooms', 'Kitchen', 'Toilets', 'Water Supply', 'Generator'],
    contactPerson: 'School Principal Maria Santos',
    contactNumber: '09123456780',
    coordinates: '14.6205° N, 121.0430° E',
    barangay: 'Sta. Lucia'
  },
  {
    id: 2,
    name: 'Barangay Multi-Purpose Hall',
    location: 'Zone 2, Brgy. Sta. Lucia',
    capacity: 100,
    currentOccupancy: 85,
    status: 'operational',
    facilities: ['Hall', 'Kitchen', 'Toilets', 'Water Supply'],
    contactPerson: 'Barangay Secretary Ana Reyes',
    contactNumber: '09123456781',
    coordinates: '14.6208° N, 121.0435° E',
    barangay: 'Sta. Lucia'
  },
  {
    id: 3,
    name: 'Sta. Lucia Covered Court',
    location: 'Zone 4, Brgy. Sta. Lucia',
    capacity: 300,
    currentOccupancy: 0,
    status: 'operational',
    facilities: ['Open Area', 'Toilets', 'Water Supply'],
    contactPerson: 'Barangay Captain Juan Dela Cruz',
    contactNumber: '09123456782',
    coordinates: '14.6210° N, 121.0440° E',
    barangay: 'Sta. Lucia'
  }
];

const initialDRRMResources: DRRMResource[] = [
  // Facilities
  {
    id: 1,
    category: 'facility',
    name: 'Barangay Operation Center',
    type: 'Operation Center',
    quantity: 1,
    status: 'available',
    location: 'Barangay Hall',
    description: 'Emergency operations center for disaster coordination',
    dateAcquired: '2023-01-01',
    lastMaintenance: '2025-06-15',
    contact: 'Barangay Secretary'
  },
  {
    id: 2,
    category: 'facility',
    name: 'Evacuation Center - Elementary School',
    type: 'Evacuation Center',
    quantity: 1,
    status: 'in-use',
    location: 'Zone 1',
    description: 'Main evacuation center for the barangay',
    dateAcquired: '2010-01-01',
    lastMaintenance: '2025-07-01',
    contact: 'School Principal'
  },
  // Equipment
  {
    id: 3,
    category: 'equipment',
    name: 'Emergency Communication Radio',
    type: 'Communication',
    quantity: 5,
    status: 'available',
    location: 'Barangay Operation Center',
    description: 'Handheld radios for emergency communication',
    dateAcquired: '2024-01-15',
    lastMaintenance: '2025-08-01',
    contact: 'Barangay Secretary'
  },
  {
    id: 4,
    category: 'equipment',
    name: 'Portable Generator',
    type: 'Power',
    quantity: 2,
    status: 'maintenance',
    location: 'Barangay Hall',
    description: '10kW portable generators for emergency power',
    dateAcquired: '2023-06-01',
    lastMaintenance: '2025-07-20',
    contact: 'Barangay Engineer'
  },
  {
    id: 5,
    category: 'equipment',
    name: 'Search Lights',
    type: 'Search & Rescue',
    quantity: 10,
    status: 'available',
    location: 'Barangay Operation Center',
    description: 'High-powered search lights for night operations',
    dateAcquired: '2024-03-15',
    lastMaintenance: '2025-08-01',
    contact: 'Barangay Secretary'
  },
  {
    id: 6,
    category: 'equipment',
    name: 'First Aid Kits',
    type: 'Medical',
    quantity: 15,
    status: 'available',
    location: 'Barangay Health Center',
    description: 'Complete first aid kits for emergency response',
    dateAcquired: '2024-01-01',
    lastMaintenance: '2025-07-15',
    contact: 'Barangay Health Worker'
  },
  // Systems
  {
    id: 7,
    category: 'system',
    name: 'Early Warning System',
    type: 'Warning System',
    quantity: 1,
    status: 'available',
    location: 'Barangay',
    description: 'Community-based early warning system for floods and typhoons',
    dateAcquired: '2024-01-01',
    lastMaintenance: '2025-07-01',
    contact: 'BDRRMC Coordinator'
  },
  {
    id: 8,
    category: 'system',
    name: 'Community Risk Assessment Data',
    type: 'Risk Assessment',
    quantity: 1,
    status: 'available',
    location: 'Barangay Planning Office',
    description: 'Updated community risk assessment and hazard mapping',
    dateAcquired: '2024-01-01',
    lastMaintenance: '2025-06-15',
    contact: 'Barangay Planner'
  },
  {
    id: 9,
    category: 'system',
    name: 'Incident Command System',
    type: 'Command System',
    quantity: 1,
    status: 'available',
    location: 'Barangay Operation Center',
    description: 'ICS structure and protocols for disaster response',
    dateAcquired: '2024-01-01',
    lastMaintenance: '2025-06-01',
    contact: 'BDRRMC Coordinator'
  }
];

const initialHazardProneAreas: HazardProneArea[] = [
  {
    id: 1,
    hazard: 'Flood',
    location: 'Zone 3, 5, 7',
    barangay: 'Sta. Lucia',
    riskLevel: 'high',
    populationAtRisk: 2500,
    householdsAtRisk: 625,
    mitigationMeasures: ['Drainage system improvement', 'Flood control structures', 'Relocation of at-risk families'],
    earlyWarningSystem: 'Rainfall monitoring, river level monitoring'
  },
  {
    id: 2,
    hazard: 'Typhoon',
    location: 'Entire Barangay',
    barangay: 'Sta. Lucia',
    riskLevel: 'high',
    populationAtRisk: 48250,
    householdsAtRisk: 12410,
    mitigationMeasures: ['Community evacuation plan', 'Strengthening of structures', 'Tree planting'],
    earlyWarningSystem: 'Weather monitoring, community alerts'
  },
  {
    id: 3,
    hazard: 'Earthquake',
    location: 'All Zones',
    barangay: 'Sta. Lucia',
    riskLevel: 'medium',
    populationAtRisk: 48250,
    householdsAtRisk: 12410,
    mitigationMeasures: ['Building inspection', 'Earthquake drills', 'Retrofitting of structures'],
    earlyWarningSystem: 'Seismic monitoring, community education'
  },
  {
    id: 4,
    hazard: 'Landslide',
    location: 'Zone 8, Zone 9',
    barangay: 'Sta. Lucia',
    riskLevel: 'medium',
    populationAtRisk: 800,
    householdsAtRisk: 200,
    mitigationMeasures: ['Slope protection', 'Drainage improvement', 'Relocation'],
    earlyWarningSystem: 'Rainfall monitoring, visual inspection'
  }
];

const initialDRRMPlans: DRRMPlan[] = [
  {
    id: 1,
    hazard: 'Typhoon',
    planType: 'contingency',
    title: 'Typhoon Contingency Plan 2025',
    description: 'Comprehensive contingency plan for typhoon response and recovery',
    status: 'approved',
    dateCreated: '2025-01-15',
    dateApproved: '2025-02-01',
    stakeholders: ['Barangay LGU', 'BDRRMC', 'Red Cross', 'DPWH'],
    resources: ['Evacuation centers', 'Relief goods', 'Rescue equipment'],
    actions: ['Pre-emptive evacuation', 'Relief distribution', 'Damage assessment']
  },
  {
    id: 2,
    hazard: 'Flood',
    planType: 'evacuation',
    title: 'Flood Evacuation Plan',
    description: 'Evacuation procedures for flood-prone areas',
    status: 'approved',
    dateCreated: '2025-01-15',
    dateApproved: '2025-02-01',
    stakeholders: ['Barangay LGU', 'BDRRMC', 'City DRRMO'],
    resources: ['Evacuation centers', 'Boats', 'Rescue equipment'],
    actions: ['Early warning', 'Evacuation', 'Rescue operations']
  },
  {
    id: 3,
    hazard: 'Earthquake',
    planType: 'response',
    title: 'Earthquake Response Plan',
    description: 'Immediate response procedures for earthquake incidents',
    status: 'draft',
    dateCreated: '2025-03-01',
    stakeholders: ['Barangay LGU', 'BDRRMC', 'City DRRMO', 'Hospitals'],
    resources: ['Search & rescue equipment', 'Medical supplies', 'Communication systems'],
    actions: ['Search & rescue', 'Medical response', 'Damage assessment']
  }
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function BDRISPage() {
  // State Management
  const [activeTab, setActiveTab] = useState<'overview' | 'hazards' | 'evacuation' | 'resources' | 'risk-assessment' | 'plans'>('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Data States
  const [hazards, setHazards] = useState<Hazard[]>(initialHazards);
  const [evacuationCenters, setEvacuationCenters] = useState<EvacuationCenter[]>(initialEvacuationCenters);
  const [resources, setResources] = useState<DRRMResource[]>(initialDRRMResources);
  const [hazardProneAreas, setHazardProneAreas] = useState<HazardProneArea[]>(initialHazardProneAreas);
  const [plans, setPlans] = useState<DRRMPlan[]>(initialDRRMPlans);
  const [evacuations, setEvacuations] = useState<Evacuation[]>([]);

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterHazardType, setFilterHazardType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  
  // Modal States
  const [isHazardModalOpen, setIsHazardModalOpen] = useState(false);
  const [editingHazard, setEditingHazard] = useState<Hazard | null>(null);
  const [hazardFormData, setHazardFormData] = useState<Partial<Hazard>>({});
  
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<EvacuationCenter | null>(null);
  const [centerFormData, setCenterFormData] = useState<Partial<EvacuationCenter>>({});
  
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<DRRMResource | null>(null);
  const [resourceFormData, setResourceFormData] = useState<Partial<DRRMResource>>({});
  
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<DRRMPlan | null>(null);
  const [planFormData, setPlanFormData] = useState<Partial<DRRMPlan>>({});
  
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingType, setDeletingType] = useState<'hazard' | 'center' | 'resource' | 'plan' | 'area'>('hazard');

  // Computed values
  const activeHazards = hazards.filter(h => h.status === 'active' || h.status === 'monitored').length;
  const criticalHazards = hazards.filter(h => h.severity === 'critical' && h.status === 'active').length;
  const totalEvacuees = evacuationCenters.reduce((sum, c) => sum + c.currentOccupancy, 0);
  const totalEvacueeCapacity = evacuationCenters.reduce((sum, c) => sum + c.capacity, 0);
  const availableResources = resources.filter(r => r.status === 'available').length;

  const filteredHazards = useMemo(() => {
    return hazards.filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           h.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterHazardType === "all" || h.type === filterHazardType;
      const matchesStatus = filterStatus === "all" || h.status === filterStatus;
      const matchesSeverity = filterSeverity === "all" || h.severity === filterSeverity;
      return matchesSearch && matchesType && matchesStatus && matchesSeverity;
    });
  }, [hazards, searchTerm, filterHazardType, filterStatus, filterSeverity]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'critical': 'bg-rose-100 text-rose-800',
      'high': 'bg-orange-100 text-orange-800',
      'medium': 'bg-amber-100 text-amber-800',
      'low': 'bg-blue-100 text-blue-800'
    };
    return colors[severity] || 'bg-slate-100 text-slate-600';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-rose-100 text-rose-800',
      'monitored': 'bg-amber-100 text-amber-800',
      'resolved': 'bg-emerald-100 text-emerald-800'
    };
    return colors[status] || 'bg-slate-100 text-slate-600';
  };

  const getResourceStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'available': 'bg-emerald-100 text-emerald-800',
      'in-use': 'bg-amber-100 text-amber-800',
      'maintenance': 'bg-orange-100 text-orange-800',
      'depleted': 'bg-rose-100 text-rose-800'
    };
    return colors[status] || 'bg-slate-100 text-slate-600';
  };

  const getCenterStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'operational': 'bg-emerald-100 text-emerald-800',
      'full': 'bg-rose-100 text-rose-800',
      'closed': 'bg-slate-100 text-slate-600',
      'under-maintenance': 'bg-amber-100 text-amber-800'
    };
    return colors[status] || 'bg-slate-100 text-slate-600';
  };

  const getHazardIcon = (type: string) => {
    const icons: Record<string, any> = {
      'typhoon': Wind,
      'flood': Droplets,
      'earthquake': Mountain,
      'tsunami': Waves,
      'volcanic-eruption': Thermometer,
      'landslide': Mountain,
      'fire': AlertCircle,
      'storm-surge': Waves,
      'drought': Thermometer,
      'other': AlertTriangle
    };
    return icons[type] || AlertTriangle;
  };

  // ============================================
  // HAZARD CRUD FUNCTIONS
  // ============================================

  const handleAddHazard = () => {
    setEditingHazard(null);
    setHazardFormData({
      type: 'typhoon',
      name: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      affectedPopulation: 0,
      affectedHouseholds: 0,
      severity: 'medium',
      status: 'active',
      description: '',
      reportedBy: '',
      contact: '',
      actions: [],
      casualties: { dead: 0, injured: 0, missing: 0 },
      damage: { houses: 0, infrastructure: 0, agriculture: 0, estimatedCost: 0 }
    });
    setIsHazardModalOpen(true);
  };

  const handleEditHazard = (hazard: Hazard) => {
    setEditingHazard(hazard);
    setHazardFormData(hazard);
    setIsHazardModalOpen(true);
  };

  const handleSaveHazard = () => {
    if (!hazardFormData.name || !hazardFormData.location) {
      alert('Please fill in name and location');
      return;
    }

    if (editingHazard) {
      setHazards(hazards.map(h => 
        h.id === editingHazard.id 
          ? { ...h, ...hazardFormData as Hazard }
          : h
      ));
    } else {
      const newHazard: Hazard = {
        id: Math.max(...hazards.map(h => h.id), 0) + 1,
        type: hazardFormData.type as Hazard['type'] || 'other',
        name: hazardFormData.name || '',
        location: hazardFormData.location || '',
        date: hazardFormData.date || new Date().toISOString().split('T')[0],
        time: hazardFormData.time || new Date().toTimeString().slice(0, 5),
        affectedPopulation: hazardFormData.affectedPopulation || 0,
        affectedHouseholds: hazardFormData.affectedHouseholds || 0,
        severity: hazardFormData.severity as Hazard['severity'] || 'medium',
        status: hazardFormData.status as Hazard['status'] || 'active',
        description: hazardFormData.description || '',
        reportedBy: hazardFormData.reportedBy || '',
        contact: hazardFormData.contact || '',
        actions: hazardFormData.actions || [],
        casualties: hazardFormData.casualties || { dead: 0, injured: 0, missing: 0 },
        damage: hazardFormData.damage || { houses: 0, infrastructure: 0, agriculture: 0, estimatedCost: 0 }
      };
      setHazards([...hazards, newHazard]);
    }
    setIsHazardModalOpen(false);
    setEditingHazard(null);
  };

  const handleDeleteHazard = (id: number) => {
    setHazards(hazards.filter(h => h.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  const handleUpdateHazardStatus = (id: number, status: 'active' | 'monitored' | 'resolved') => {
    setHazards(hazards.map(h => 
      h.id === id ? { ...h, status } : h
    ));
  };

  // ============================================
  // EVACUATION CENTER CRUD FUNCTIONS
  // ============================================

  const handleAddCenter = () => {
    setEditingCenter(null);
    setCenterFormData({
      name: '',
      location: '',
      capacity: 0,
      currentOccupancy: 0,
      status: 'operational',
      facilities: [],
      contactPerson: '',
      contactNumber: '',
      coordinates: '',
      barangay: 'Sta. Lucia'
    });
    setIsCenterModalOpen(true);
  };

  const handleEditCenter = (center: EvacuationCenter) => {
    setEditingCenter(center);
    setCenterFormData(center);
    setIsCenterModalOpen(true);
  };

  const handleSaveCenter = () => {
    if (!centerFormData.name || !centerFormData.location) {
      alert('Please fill in name and location');
      return;
    }

    if (editingCenter) {
      setEvacuationCenters(evacuationCenters.map(c => 
        c.id === editingCenter.id 
          ? { ...c, ...centerFormData as EvacuationCenter }
          : c
      ));
    } else {
      const newCenter: EvacuationCenter = {
        id: Math.max(...evacuationCenters.map(c => c.id), 0) + 1,
        name: centerFormData.name || '',
        location: centerFormData.location || '',
        capacity: centerFormData.capacity || 0,
        currentOccupancy: centerFormData.currentOccupancy || 0,
        status: centerFormData.status as EvacuationCenter['status'] || 'operational',
        facilities: centerFormData.facilities || [],
        contactPerson: centerFormData.contactPerson || '',
        contactNumber: centerFormData.contactNumber || '',
        coordinates: centerFormData.coordinates || '',
        barangay: centerFormData.barangay || 'Sta. Lucia'
      };
      setEvacuationCenters([...evacuationCenters, newCenter]);
    }
    setIsCenterModalOpen(false);
    setEditingCenter(null);
  };

  const handleDeleteCenter = (id: number) => {
    setEvacuationCenters(evacuationCenters.filter(c => c.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  const handleUpdateCenterOccupancy = (id: number, occupancy: number) => {
    setEvacuationCenters(evacuationCenters.map(c => 
      c.id === id 
        ? { ...c, currentOccupancy: Math.min(c.capacity, Math.max(0, occupancy)) }
        : c
    ));
  };

  // ============================================
  // RESOURCE CRUD FUNCTIONS
  // ============================================

  const handleAddResource = () => {
    setEditingResource(null);
    setResourceFormData({
      category: 'equipment',
      name: '',
      type: '',
      quantity: 1,
      status: 'available',
      location: '',
      description: '',
      dateAcquired: new Date().toISOString().split('T')[0],
      lastMaintenance: new Date().toISOString().split('T')[0],
      contact: ''
    });
    setIsResourceModalOpen(true);
  };

  const handleEditResource = (resource: DRRMResource) => {
    setEditingResource(resource);
    setResourceFormData(resource);
    setIsResourceModalOpen(true);
  };

  const handleSaveResource = () => {
    if (!resourceFormData.name || !resourceFormData.type) {
      alert('Please fill in name and type');
      return;
    }

    if (editingResource) {
      setResources(resources.map(r => 
        r.id === editingResource.id 
          ? { ...r, ...resourceFormData as DRRMResource }
          : r
      ));
    } else {
      const newResource: DRRMResource = {
        id: Math.max(...resources.map(r => r.id), 0) + 1,
        category: resourceFormData.category as DRRMResource['category'] || 'equipment',
        name: resourceFormData.name || '',
        type: resourceFormData.type || '',
        quantity: resourceFormData.quantity || 1,
        status: resourceFormData.status as DRRMResource['status'] || 'available',
        location: resourceFormData.location || '',
        description: resourceFormData.description || '',
        dateAcquired: resourceFormData.dateAcquired || new Date().toISOString().split('T')[0],
        lastMaintenance: resourceFormData.lastMaintenance || new Date().toISOString().split('T')[0],
        contact: resourceFormData.contact || ''
      };
      setResources([...resources, newResource]);
    }
    setIsResourceModalOpen(false);
    setEditingResource(null);
  };

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter(r => r.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  const handleUpdateResourceStatus = (id: number, status: DRRMResource['status']) => {
    setResources(resources.map(r => 
      r.id === id ? { ...r, status } : r
    ));
  };

  // ============================================
  // PLAN CRUD FUNCTIONS
  // ============================================

  const handleAddPlan = () => {
    setEditingPlan(null);
    setPlanFormData({
      hazard: '',
      planType: 'contingency',
      title: '',
      description: '',
      status: 'draft',
      dateCreated: new Date().toISOString().split('T')[0],
      stakeholders: [],
      resources: [],
      actions: []
    });
    setIsPlanModalOpen(true);
  };

  const handleEditPlan = (plan: DRRMPlan) => {
    setEditingPlan(plan);
    setPlanFormData(plan);
    setIsPlanModalOpen(true);
  };

  const handleSavePlan = () => {
    if (!planFormData.title || !planFormData.hazard) {
      alert('Please fill in title and hazard');
      return;
    }

    if (editingPlan) {
      setPlans(plans.map(p => 
        p.id === editingPlan.id 
          ? { ...p, ...planFormData as DRRMPlan }
          : p
      ));
    } else {
      const newPlan: DRRMPlan = {
        id: Math.max(...plans.map(p => p.id), 0) + 1,
        hazard: planFormData.hazard || '',
        planType: planFormData.planType as DRRMPlan['planType'] || 'contingency',
        title: planFormData.title || '',
        description: planFormData.description || '',
        status: planFormData.status as DRRMPlan['status'] || 'draft',
        dateCreated: planFormData.dateCreated || new Date().toISOString().split('T')[0],
        dateApproved: planFormData.dateApproved,
        stakeholders: planFormData.stakeholders || [],
        resources: planFormData.resources || [],
        actions: planFormData.actions || []
      };
      setPlans([...plans, newPlan]);
    }
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(p => p.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  // ============================================
  // TABS CONFIGURATION
  // ============================================

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'hazards', label: 'Hazards', icon: AlertTriangle },
    { id: 'evacuation', label: 'Evacuation', icon: Home },
    { id: 'resources', label: 'Resources', icon: Package },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: Map },
    { id: 'plans', label: 'DRRM Plans', icon: FileText }
  ];

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewTab 
          hazards={hazards}
          evacuationCenters={evacuationCenters}
          resources={resources}
          hazardProneAreas={hazardProneAreas}
          plans={plans}
          activeHazards={activeHazards}
          criticalHazards={criticalHazards}
          totalEvacuees={totalEvacuees}
          totalEvacueeCapacity={totalEvacueeCapacity}
          availableResources={availableResources}
          formatCurrency={formatCurrency}
        />;
      case 'hazards':
        return <HazardsTab 
          hazards={filteredHazards}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterHazardType={filterHazardType}
          setFilterHazardType={setFilterHazardType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterSeverity={filterSeverity}
          setFilterSeverity={setFilterSeverity}
          onAdd={handleAddHazard}
          onEdit={handleEditHazard}
          onDelete={(id) => { setDeletingId(id); setDeletingType('hazard'); setIsDeleteConfirmOpen(true); }}
          onUpdateStatus={handleUpdateHazardStatus}
          getSeverityColor={getSeverityColor}
          getStatusColor={getStatusColor}
          getHazardIcon={getHazardIcon}
          formatCurrency={formatCurrency}
        />;
      case 'evacuation':
        return <EvacuationTab 
          centers={evacuationCenters}
          onAdd={handleAddCenter}
          onEdit={handleEditCenter}
          onDelete={(id) => { setDeletingId(id); setDeletingType('center'); setIsDeleteConfirmOpen(true); }}
          onUpdateOccupancy={handleUpdateCenterOccupancy}
          getCenterStatusColor={getCenterStatusColor}
        />;
      case 'resources':
        return <ResourcesTab 
          resources={resources}
          onAdd={handleAddResource}
          onEdit={handleEditResource}
          onDelete={(id) => { setDeletingId(id); setDeletingType('resource'); setIsDeleteConfirmOpen(true); }}
          onUpdateStatus={handleUpdateResourceStatus}
          getResourceStatusColor={getResourceStatusColor}
        />;
      case 'risk-assessment':
        return <RiskAssessmentTab 
          hazardProneAreas={hazardProneAreas}
        />;
      case 'plans':
        return <PlansTab 
          plans={plans}
          onAdd={handleAddPlan}
          onEdit={handleEditPlan}
          onDelete={(id) => { setDeletingId(id); setDeletingType('plan'); setIsDeleteConfirmOpen(true); }}
        />;
      default:
        return <div>Select a tab</div>;
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
              onClick={() => setShowMobileMenu(!showMobileMenu)}
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
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900">Disaster Resilience</h1>
                <p className="text-[10px] text-slate-500">BDRIS v2.5 • Barangay Sta. Lucia</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeHazards > 0 && (
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                <Bell className="h-3 w-3" />
                {activeHazards} Active
              </span>
            )}
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              ● System Operational
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-2">
          <div className="grid grid-cols-3 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); setShowMobileMenu(false); }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mx-auto mb-1" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full">
        {/* Desktop Tab Navigation */}
        <div className="hidden lg:flex gap-1 bg-white border-b border-slate-200 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                  isActive
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4 inline mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 lg:p-6">
          {renderContent()}
        </div>
      </div>

      {/* ============================================
          MODALS
          ============================================ */}

      {/* Hazard Modal */}
      {isHazardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingHazard ? 'Edit Hazard' : 'Report New Hazard'}
              </h3>
              <button onClick={() => setIsHazardModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hazard Type</label>
                  <select
                    value={hazardFormData.type || 'typhoon'}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="typhoon">Typhoon</option>
                    <option value="flood">Flood</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="tsunami">Tsunami</option>
                    <option value="volcanic-eruption">Volcanic Eruption</option>
                    <option value="landslide">Landslide</option>
                    <option value="fire">Fire</option>
                    <option value="storm-surge">Storm Surge</option>
                    <option value="drought">Drought</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
                  <select
                    value={hazardFormData.severity || 'medium'}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, severity: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hazard Name</label>
                <input
                  type="text"
                  value={hazardFormData.name || ''}
                  onChange={(e) => setHazardFormData({ ...hazardFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Typhoon Karding"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={hazardFormData.location || ''}
                  onChange={(e) => setHazardFormData({ ...hazardFormData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Affected area"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={hazardFormData.date || ''}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={hazardFormData.time || ''}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={hazardFormData.description || ''}
                  onChange={(e) => setHazardFormData({ ...hazardFormData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Describe the hazard and its impact"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reported By</label>
                  <input
                    type="text"
                    value={hazardFormData.reportedBy || ''}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, reportedBy: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact</label>
                  <input
                    type="text"
                    value={hazardFormData.contact || ''}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, contact: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Affected Pop.</label>
                  <input
                    type="number"
                    value={hazardFormData.affectedPopulation || 0}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, affectedPopulation: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Households</label>
                  <input
                    type="number"
                    value={hazardFormData.affectedHouseholds || 0}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, affectedHouseholds: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={hazardFormData.status || 'active'}
                    onChange={(e) => setHazardFormData({ ...hazardFormData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="active">Active</option>
                    <option value="monitored">Monitored</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsHazardModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSaveHazard} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingHazard ? 'Update' : 'Report'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evacuation Center Modal */}
      {isCenterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingCenter ? 'Edit Center' : 'Add Evacuation Center'}
              </h3>
              <button onClick={() => setIsCenterModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Center Name</label>
                <input
                  type="text"
                  value={centerFormData.name || ''}
                  onChange={(e) => setCenterFormData({ ...centerFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={centerFormData.location || ''}
                  onChange={(e) => setCenterFormData({ ...centerFormData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={centerFormData.capacity || 0}
                    onChange={(e) => setCenterFormData({ ...centerFormData, capacity: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Occupancy</label>
                  <input
                    type="number"
                    value={centerFormData.currentOccupancy || 0}
                    onChange={(e) => setCenterFormData({ ...centerFormData, currentOccupancy: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={centerFormData.status || 'operational'}
                  onChange={(e) => setCenterFormData({ ...centerFormData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="operational">Operational</option>
                  <option value="full">Full</option>
                  <option value="closed">Closed</option>
                  <option value="under-maintenance">Under Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={centerFormData.contactPerson || ''}
                  onChange={(e) => setCenterFormData({ ...centerFormData, contactPerson: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  value={centerFormData.contactNumber || ''}
                  onChange={(e) => setCenterFormData({ ...centerFormData, contactNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsCenterModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSaveCenter} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingCenter ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingResource ? 'Edit Resource' : 'Add Resource'}
              </h3>
              <button onClick={() => setIsResourceModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={resourceFormData.category || 'equipment'}
                    onChange={(e) => setResourceFormData({ ...resourceFormData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="facility">Facility</option>
                    <option value="equipment">Equipment</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={resourceFormData.status || 'available'}
                    onChange={(e) => setResourceFormData({ ...resourceFormData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="available">Available</option>
                    <option value="in-use">In Use</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="depleted">Depleted</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={resourceFormData.name || ''}
                  onChange={(e) => setResourceFormData({ ...resourceFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <input
                  type="text"
                  value={resourceFormData.type || ''}
                  onChange={(e) => setResourceFormData({ ...resourceFormData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={resourceFormData.quantity || 1}
                  onChange={(e) => setResourceFormData({ ...resourceFormData, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={resourceFormData.location || ''}
                  onChange={(e) => setResourceFormData({ ...resourceFormData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={resourceFormData.description || ''}
                  onChange={(e) => setResourceFormData({ ...resourceFormData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsResourceModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSaveResource} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingResource ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan Modal */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingPlan ? 'Edit Plan' : 'Add DRRM Plan'}
              </h3>
              <button onClick={() => setIsPlanModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hazard</label>
                <input
                  type="text"
                  value={planFormData.hazard || ''}
                  onChange={(e) => setPlanFormData({ ...planFormData, hazard: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Typhoon, Flood"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan Title</label>
                <input
                  type="text"
                  value={planFormData.title || ''}
                  onChange={(e) => setPlanFormData({ ...planFormData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan Type</label>
                <select
                  value={planFormData.planType || 'contingency'}
                  onChange={(e) => setPlanFormData({ ...planFormData, planType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="contingency">Contingency</option>
                  <option value="evacuation">Evacuation</option>
                  <option value="response">Response</option>
                  <option value="recovery">Recovery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={planFormData.status || 'draft'}
                  onChange={(e) => setPlanFormData({ ...planFormData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="draft">Draft</option>
                  <option value="approved">Approved</option>
                  <option value="implemented">Implemented</option>
                  <option value="reviewed">Reviewed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={planFormData.description || ''}
                  onChange={(e) => setPlanFormData({ ...planFormData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsPlanModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSavePlan} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingPlan ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
              Are you sure you want to delete this {deletingType}? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button 
                onClick={() => {
                  if (deletingType === 'hazard') handleDeleteHazard(deletingId!);
                  else if (deletingType === 'center') handleDeleteCenter(deletingId!);
                  else if (deletingType === 'resource') handleDeleteResource(deletingId!);
                  else if (deletingType === 'plan') handleDeletePlan(deletingId!);
                }}
                className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// TAB COMPONENTS
// ============================================

function OverviewTab({ 
  hazards, evacuationCenters, resources, hazardProneAreas, plans,
  activeHazards, criticalHazards, totalEvacuees, totalEvacueeCapacity, availableResources,
  formatCurrency 
}: any) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Active Hazards</p>
            <AlertTriangle className="h-5 w-5 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{activeHazards}</p>
          <p className="text-xs text-rose-600">{criticalHazards} critical</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Evacuees</p>
            <Users className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalEvacuees}</p>
          <p className="text-xs text-slate-500">Capacity: {totalEvacueeCapacity}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Resources</p>
            <Package className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{resources.length}</p>
          <p className="text-xs text-emerald-600">{availableResources} available</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">DRRM Plans</p>
            <FileText className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{plans.length}</p>
          <p className="text-xs text-slate-500">{plans.filter((p: any) => p.status === 'approved').length} approved</p>
        </div>
      </div>

      {/* Recent Hazards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Recent Hazards</h3>
          <span className="text-xs text-slate-500">{hazards.length} total</span>
        </div>
        <div className="divide-y divide-slate-100">
          {hazards.slice(0, 3).map((hazard: Hazard) => {
            const Icon = getHazardIconStatic(hazard.type);
            return (
              <div key={hazard.id} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${getSeverityColorStatic(hazard.severity).split(' ')[0].replace('bg-', '')}/10`}>
                    <Icon className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{hazard.name}</p>
                    <p className="text-xs text-slate-500">{hazard.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColorStatic(hazard.status)}`}>
                    {hazard.status}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColorStatic(hazard.severity)}`}>
                    {hazard.severity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evacuation Centers Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {evacuationCenters.map((center: EvacuationCenter) => {
          const occupancyPercentage = Math.round((center.currentOccupancy / center.capacity) * 100);
          return (
            <div key={center.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-slate-900">{center.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getCenterStatusColorStatic(center.status)}`}>
                  {center.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{center.location}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Occupancy</span>
                  <span className="font-medium">{center.currentOccupancy}/{center.capacity}</span>
                </div>
                <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      occupancyPercentage > 80 ? 'bg-rose-500' :
                      occupancyPercentage > 50 ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${occupancyPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HazardsTab({ 
  hazards, searchTerm, setSearchTerm, filterHazardType, setFilterHazardType,
  filterStatus, setFilterStatus, filterSeverity, setFilterSeverity,
  onAdd, onEdit, onDelete, onUpdateStatus,
  getSeverityColor, getStatusColor, getHazardIcon, formatCurrency
}: any) {
  const hazardTypes = ['All', 'typhoon', 'flood', 'earthquake', 'tsunami', 'volcanic-eruption', 'landslide', 'fire', 'storm-surge', 'drought', 'other'];
  const statuses = ['All', 'active', 'monitored', 'resolved'];
  const severities = ['All', 'critical', 'high', 'medium', 'low'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Hazard Monitoring</h2>
          <p className="text-sm text-slate-500">Track and manage all reported hazards</p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Report Hazard
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search hazards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={filterHazardType}
          onChange={(e) => setFilterHazardType(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {hazardTypes.map(t => <option key={t} value={t.toLowerCase() === 'all' ? 'all' : t}>{t}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {statuses.map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
        </select>
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {severities.map(s => <option key={s} value={s.toLowerCase() === 'all' ? 'all' : s}>{s}</option>)}
        </select>
      </div>

      {/* Hazards List */}
      <div className="space-y-4">
        {hazards.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
            No hazards reported. Click "Report Hazard" to add one.
          </div>
        ) : (
          hazards.map((hazard: Hazard) => {
            const Icon = getHazardIcon(hazard.type);
            return (
              <div key={hazard.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Icon className="h-5 w-5 text-slate-500" />
                      <h3 className="font-semibold text-slate-900">{hazard.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(hazard.status)}`}>
                        {hazard.status}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(hazard.severity)}`}>
                        {hazard.severity}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{hazard.location}</p>
                    <p className="text-sm text-slate-600 mt-1">{hazard.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {hazard.date} {hazard.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {hazard.affectedPopulation} affected
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        ₱{hazard.damage.estimatedCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <select
                      value={hazard.status}
                      onChange={(e) => onUpdateStatus(hazard.id, e.target.value)}
                      className="text-xs px-2 py-1 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="active">Active</option>
                      <option value="monitored">Monitored</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(hazard)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(hazard.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function EvacuationTab({ centers, onAdd, onEdit, onDelete, onUpdateOccupancy, getCenterStatusColor }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Evacuation Centers</h2>
          <p className="text-sm text-slate-500">Manage evacuation centers and occupancy</p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Center
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {centers.map((center: any) => {
          const occupancyPercentage = Math.round((center.currentOccupancy / center.capacity) * 100);
          return (
            <div key={center.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{center.name}</h3>
                  <p className="text-sm text-slate-500">{center.location}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getCenterStatusColor(center.status)}`}>
                  {center.status}
                </span>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Occupancy</span>
                  <span className="font-medium">{center.currentOccupancy}/{center.capacity}</span>
                </div>
                <div className="mt-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      occupancyPercentage > 80 ? 'bg-rose-500' :
                      occupancyPercentage > 50 ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${occupancyPercentage}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max={center.capacity}
                    value={center.currentOccupancy}
                    onChange={(e) => onUpdateOccupancy(center.id, parseInt(e.target.value))}
                    className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <span className="text-xs font-medium min-w-[40px]">{center.currentOccupancy}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">Contact: {center.contactPerson} ({center.contactNumber})</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {center.facilities.map((facility: string, i: number) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(center)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(center.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ResourcesTab({ resources, onAdd, onEdit, onDelete, onUpdateStatus, getResourceStatusColor }: any) {
  const categories = resources.reduce((acc: any, r: any) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">DRRM Resources</h2>
          <p className="text-sm text-slate-500">Manage facilities, equipment, and systems</p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Resource
        </button>
      </div>

      {Object.entries(categories).map(([category, items]: [string, any]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 capitalize">{category}s</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((resource: any) => (
              <div key={resource.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">{resource.name}</h4>
                    <p className="text-sm text-slate-500">{resource.type}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getResourceStatusColor(resource.status)}`}>
                    {resource.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  <p>Quantity: {resource.quantity}</p>
                  <p>Location: {resource.location}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1">{resource.description}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <select
                      value={resource.status}
                      onChange={(e) => onUpdateStatus(resource.id, e.target.value)}
                      className="text-xs px-2 py-1 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="available">Available</option>
                      <option value="in-use">In Use</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="depleted">Depleted</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(resource)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(resource.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RiskAssessmentTab({ hazardProneAreas }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Risk Assessment</h2>
        <p className="text-sm text-slate-500">Hazard-prone areas and risk levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hazardProneAreas.map((area: any) => (
          <div key={area.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">{area.hazard}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                area.riskLevel === 'high' ? 'bg-rose-100 text-rose-800' :
                area.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {area.riskLevel} risk
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{area.location}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-slate-500">Population at Risk</p>
                <p className="font-semibold">{area.populationAtRisk.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-500">Households</p>
                <p className="font-semibold">{area.householdsAtRisk.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-700">Mitigation Measures:</p>
              <ul className="text-xs text-slate-600 list-disc list-inside">
                {area.mitigationMeasures.map((measure: string, i: number) => (
                  <li key={i}>{measure}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <p className="text-xs font-medium text-slate-700">Early Warning System:</p>
              <p className="text-xs text-slate-600">{area.earlyWarningSystem}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlansTab({ plans, onAdd, onEdit, onDelete }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">DRRM Plans</h2>
          <p className="text-sm text-slate-500">Contingency, evacuation, response, and recovery plans</p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan: any) => (
          <div key={plan.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{plan.title}</h3>
                <p className="text-sm text-slate-500">{plan.hazard} • {plan.planType}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                plan.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                plan.status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                plan.status === 'reviewed' ? 'bg-amber-100 text-amber-800' :
                'bg-slate-100 text-slate-600'
              }`}>
                {plan.status}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-2">{plan.description}</p>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-700">Stakeholders:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {plan.stakeholders.map((s: string, i: number) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Created: {plan.dateCreated}</span>
              {plan.dateApproved && (
                <span className="text-xs text-slate-500">Approved: {plan.dateApproved}</span>
              )}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(plan)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(plan.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// HELPER FUNCTIONS (for static use in components)
// ============================================

function getHazardIconStatic(type: string) {
  const icons: Record<string, any> = {
    'typhoon': Wind,
    'flood': Droplets,
    'earthquake': Mountain,
    'tsunami': Waves,
    'volcanic-eruption': Thermometer,
    'landslide': Mountain,
    'fire': AlertCircle,
    'storm-surge': Waves,
    'drought': Thermometer,
    'other': AlertTriangle
  };
  return icons[type] || AlertTriangle;
}

function getSeverityColorStatic(severity: string) {
  const colors: Record<string, string> = {
    'critical': 'bg-rose-100 text-rose-800',
    'high': 'bg-orange-100 text-orange-800',
    'medium': 'bg-amber-100 text-amber-800',
    'low': 'bg-blue-100 text-blue-800'
  };
  return colors[severity] || 'bg-slate-100 text-slate-600';
}

function getStatusColorStatic(status: string) {
  const colors: Record<string, string> = {
    'active': 'bg-rose-100 text-rose-800',
    'monitored': 'bg-amber-100 text-amber-800',
    'resolved': 'bg-emerald-100 text-emerald-800'
  };
  return colors[status] || 'bg-slate-100 text-slate-600';
}

function getCenterStatusColorStatic(status: string) {
  const colors: Record<string, string> = {
    'operational': 'bg-emerald-100 text-emerald-800',
    'full': 'bg-rose-100 text-rose-800',
    'closed': 'bg-slate-100 text-slate-600',
    'under-maintenance': 'bg-amber-100 text-amber-800'
  };
  return colors[status] || 'bg-slate-100 text-slate-600';
}