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
  Users,
  Package,
  AlertTriangle,
  Search,
  X,
  Edit2,
  Trash,
  Save,
  Menu,
  Calendar,
  FileText,
  BarChart3,
  Home,
  BookOpen,
  Bell,
  User,
  MapPin
} from "lucide-react";

// ============================================
// BIMS FORM 1: Incident/Complaint Report (Page 32)
// ============================================
interface IncidentReport {
  id: number;
  incidentNumber: string;
  incidentDate: string;
  incidentTime: string;
  reportDate: string;
  reportTime: string;
  narrative: string;
  complainant: { name: string; address: string };
  respondent: { name: string; address: string };
  natureOfComplaint: string;
  actionTaken: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'dismissed';
  dateAccomplished?: string;
  receivingDate: string;
}

// ============================================
// BIMS FORM 1.B: Nature of Complaint (Page 20)
// ============================================
const NATURE_OF_COMPLAINT_OPTIONS = [
  { code: '1', label: 'UNLAWFUL USE OF MEANS OF PUBLICATION AND UNLAWFUL UTTERANCES (ART. 154)' },
  { code: '2', label: 'ALARMS AND SCANDALS (ART. 155)' },
  { code: '3', label: 'USING FALSE CERTIFICATES (ART. 175)' },
  { code: '4', label: 'USING FICTITIOUS NAMES AND CONCEALING TRUE NAMES (ART. 178)' },
  { code: '5', label: 'ILLEGAL USE OF UNIFORMS AND INSIGNIAS (ART. 179)' },
  { code: '6', label: 'PHYSICAL INJURIES INFLICTED IN A TUMULTUOUS AFFRAY (ART. 252)' },
  { code: '7', label: 'GIVING ASSISTANCE TO CONSUMMATED SUICIDE (ART. 253)' },
  { code: '8', label: 'RESPONSIBILITY OF PARTICIPANTS IN A DUEL (ART. 260)' },
  { code: '9', label: 'LESS SERIOUS PHYSICAL INJURIES (ART. 265)' },
  { code: '10', label: 'SLIGHT PHYSICAL INJURIES AND MALTREATMENT (ART. 266)' },
  { code: '11', label: 'UNLAWFUL ARREST (ART. 269)' },
  { code: '12', label: 'INDUCING A MINOR TO ABANDON HIS/HER HOME (ART. 271)' },
  { code: '13', label: 'ABANDONMENT OF A PERSON IN DANGER (ART. 275)' },
  { code: '14', label: 'ABANDONING A MINOR (ART. 276)' },
  { code: '15', label: 'ABANDONMENT OF A MINOR (ART. 277)' },
  { code: '16', label: 'QUALIFIED TRESPASS TO DWELLING (ART. 280)' },
  { code: '17', label: 'OTHER FORMS OF TRESPASS (ART. 281)' },
  { code: '18', label: 'LIGHT THREATS (ART. 283)' },
  { code: '19', label: 'OTHER LIGHT THREATS (ART. 285)' },
  { code: '20', label: 'GRAVE COERCION (ART. 286)' },
  { code: '21', label: 'LIGHT COERCION (ART. 287)' },
  { code: '22', label: 'OTHER SIMILAR COERCIONS (ART. 288)' },
  { code: '23', label: 'FORMATION OF COMBINATIONS THROUGH VIOLENCE (ART. 289)' },
  { code: '24', label: 'DISCOVERING SECRETS (ART. 290)' },
  { code: '25', label: 'REVEALING SECRETS WITH ABUSE OF AUTHORITY (ART. 291)' },
  { code: '26', label: 'THEFT (ART. 309)' },
  { code: '27', label: 'QUALIFIED THEFT (ART. 310)' },
  { code: '28', label: 'OCCUPATION OF REAL PROPERTY (ART. 312)' },
  { code: '29', label: 'ALTERING BOUNDARIES (ART. 313)' },
  { code: '30', label: 'SWINDLING (ART. 315)' },
  { code: '31', label: 'OTHER FORMS OF SWINDLING (ART. 316)' },
  { code: '32', label: 'SWINDLING A MINOR (ART. 317)' },
  { code: '33', label: 'OTHER DECEITS (ART. 318)' },
  { code: '34', label: 'REMOVAL OF MORTGAGED PROPERTY (ART. 319)' },
  { code: '35', label: 'MALICIOUS MISCHIEF (ART. 328)' },
  { code: '36', label: 'OTHER MISCHIEFS (ART. 329)' },
  { code: '37', label: 'SIMPLE SEDUCTION (ART. 338)' },
  { code: '38', label: 'ACTS OF LASCIVIOUSNESS (ART. 339)' },
  { code: '39', label: 'THREATENING TO PUBLISH (ART. 356)' },
  { code: '40', label: 'PROHIBITING PUBLICATION (ART. 357)' },
  { code: '41', label: 'INCRIMINATING INNOCENT PERSONS (ART. 363)' },
  { code: '42', label: 'INTRIGUING AGAINST HONOR (ART. 364)' },
  { code: '43', label: 'ISSUING CHECKS WITHOUT SUFFICIENT FUNDS (BP 22)' },
  { code: '44', label: 'FENCING OF STOLEN PROPERTY (PD 1612)' },
  { code: '45', label: 'OTHERS' }
];

// ============================================
// BIMS FORM 1.C: Actions (Page 20-21)
// ============================================
const ACTION_OPTIONS = [
  { code: '9', label: 'NOTICE OF HEARING (RE: FAILURE TO APPEAR) (COMPLAINANT)' },
  { code: '10', label: 'NOTICE OF HEARING (RE: FAILURE TO APPEAR) (RESPONDENT)' },
  { code: '11', label: 'AMICABLE SETTLEMENT' },
  { code: '12', label: 'AGREEMENT OF ARBITRATION' },
  { code: '13', label: 'ARBITRATION AWARD' },
  { code: '14', label: 'REPUDIATION' },
  { code: '15', label: 'CERTIFICATION TO FILE ACTION' },
  { code: '16', label: 'DISMISSAL OF COMPLAINT' },
  { code: '17', label: 'CERTIFICATION TO BAR ACTION' },
  { code: '18', label: 'CERTIFICATION TO BAR COUNTERCLAIM' },
  { code: '19', label: 'MOTION OF EXECUTION' },
  { code: '20', label: 'NOTICE OF HEARING (RE: MOTION OF EXECUTION)' },
  { code: '21', label: 'NOTICE OF EXECUTION' }
];

// ============================================
// BIMS FORM 1.D: Training Titles (Page 21-22)
// ============================================
const TRAINING_TITLES = [
  'Training on the Formulation of Barangay Development Plan',
  'Training on the Use of Participatory Tools in Problem Analysis',
  'Training on Community-Based Disaster Risk Reduction and Management (CBDRRM)',
  'Training on Mainstreaming Thematic and Sectoral Concerns in the BDP',
  'Orientation on RA 10121 (Philippine Disaster Risk Reduction and Management Act)',
  'Training on Barangay Disaster Risk Reduction and Management Planning',
  'Training on Basic Monitoring and Evaluation Strategies',
  'Orientation on the Enhanced Barangay Disaster Risk Reduction and Management Plan Template (with mainstreamed indic',
  'Training on First Aid and Basic Life Support',
  'Training on Contingency Planning',
  'Barangay Tanod Skills Enhancement Training: As First Responders and in Crime Scene Preservation',
  'Orientation on the Conduct of BDRRMC Functionality Audit',
  'Orientation on the Katarungang Pambarangay Law',
  'All trainings needed by BHERTS',
  'Protocols in Handling Cases of Trafficking in Persons and Violence Against Women (VAW)',
  'Priority Training on Public Service Continuity Planning',
  'Training on the Formulation of BADAC Plan of Action',
  'Training on the Implementation of Various Laws concerning the barangays',
  'Training on the Formulation of Solid Waste Management Programs',
  'Basic Self-Defense Training',
  'Training on the Implementation of Barangay Drug Clearing Program',
  'Training on Search, Rescue and Retrieval Operations',
  'GAD Planning and Budgeting',
  'Barangay Budget Cycle/Process Training',
  'Training on the Conduct of Community Drills for Priority Hazards',
  'Training on Code of Ethics of Public Officials and Employees',
  'Orientation on Pre-Disaster Risk Assessment',
  'Crafting/formulation of administrative documents (Ordinance, Resolution, etc) and project proposal',
  'Training on Provision of First Aid and Basic Life Support',
  'Orientation on Minimum Health Protocols',
  'Training on Various Alternative Dispute Resolutions for Mediation, Conciliation and Arbitration',
  'Orientation on Safe Spaces Act and Protocols in Handling Cases of Gender-Based Sexual Harassment (GBSH) in Streets',
  'Training on the Implementation of Community Drug Rehabilitation Program',
  'Capacity-Building for Barangays in Handling of Children at Risk (CAR) and Children in Conflict with the Law (CICL)',
  'Training on Basic Report Writing',
  'Orientation on Incident Command System',
  'Training on Maternal and Child Health Care',
  'Capacity-Building for Barangays in Addressing Trafficking in Persons (TIP) and Gender-Based Violence (GBV)',
  'Training on the Formulation of BPOPS Plan',
  'Training on Gender Sensitivity',
  'Psycho-social Trainings / Health and Wellness Seminars/Trainings',
  'Orientation on Contact Tracing and Reporting',
  'Protocols in Handling of Children at Risk (CAR) and Children in Conflict with the Law (CICL)',
  'Training on the OPLAN Sagip - Referral System on Voluntary Drug Surrenderers',
  'Training on Basic Intelligence Gathering',
  'Training on Reproductive Health and Responsible Parenthood',
  'Protocols in Handling of Online Sexual Abuse Exploitation on Children (OSAEC)',
  'Basic ICT Literacy Training',
  'Orientation on Psychological First Aid',
  'Training on Local Service Delivery of Health Services',
  'Orientation on Rapid Damage Assessment and Needs Analysis (RDANA)',
  'Orientation on Camp Management',
  'Mainstreaming Child Rights in the Rationalized Planning System',
  'Orientation on RA 9003',
  'Training on Mental Health and Psychosocial Support (MHPS)',
  'Basic Training on Conflict Management',
  'Orientation on Basic Disease Surveillance and Reporting',
  'Formulation of Comprehensive Local Juvenile Intervention',
  'Trainings needs are to identified by NYC pursuant to RA 10742',
  'Orientation on Mental Health and Psycho-social Support',
  'Orientation on the Protocol for Management of the Dead and Missing'
];

interface TrainingRecord {
  id: number;
  trainingTitle: string;
  dateAttended: string;
  conductedBy: string;
  certificateIssued: boolean;
  remarks: string;
}

// ============================================
// BDRIS Evacuation Form (Pages 43-44)
// ============================================
interface EvacuationRecord {
  id: number;
  category: string;
  subcategory: string;
  evacuationCause: string;
  description: string;
  date: string;
  affectedFamilies: number;
  affectedIndividuals: number;
  evacuatedTo: string;
  status: 'active' | 'closed';
}

// ============================================
// BDRIS Resource Inventory (Pages 58-59)
// ============================================
interface DRRMResource {
  id: number;
  type: 'facility' | 'equipment' | 'system';
  name: string;
  location: string;
  remarks: string;
  status: 'available' | 'in-use' | 'maintenance' | 'depleted';
  quantity: number;
}

// ============================================
// INITIAL DATA
// ============================================

const initialIncidents: IncidentReport[] = [
  {
    id: 1,
    incidentNumber: '2026-001',
    incidentDate: '2026-08-15',
    incidentTime: '14:30',
    reportDate: '2026-08-15',
    reportTime: '15:00',
    narrative: 'Flooding in Zone 3 affecting 50 families. Water level rising rapidly.',
    complainant: { name: 'Juan Dela Cruz', address: 'Zone 3, Brgy. Sta. Lucia' },
    respondent: { name: 'N/A', address: 'N/A' },
    natureOfComplaint: '2',
    actionTaken: '11',
    status: 'in-progress',
    dateAccomplished: undefined,
    receivingDate: '2026-08-15'
  }
];

const initialTrainings: TrainingRecord[] = [
  {
    id: 1,
    trainingTitle: 'Training on Community-Based Disaster Risk Reduction and Management (CBDRRM)',
    dateAttended: '2026-01-15',
    conductedBy: 'City DRRMO',
    certificateIssued: true,
    remarks: 'Completed'
  }
];

const initialEvacuations: EvacuationRecord[] = [
  {
    id: 1,
    category: 'Natural Hazards',
    subcategory: 'Typhoon/Tropical Cyclone',
    evacuationCause: 'Typhoon Karding',
    description: 'Preemptive evacuation due to Signal No. 3',
    date: '2026-08-15',
    affectedFamilies: 45,
    affectedIndividuals: 180,
    evacuatedTo: 'Sta. Lucia Elementary School',
    status: 'active'
  }
];

const initialResources: DRRMResource[] = [
  { id: 1, type: 'facility', name: 'Barangay Operation Center', location: 'Barangay Hall', remarks: 'Fully operational', status: 'available', quantity: 1 },
  { id: 2, type: 'facility', name: 'Evacuation Center', location: 'Sta. Lucia Elementary School', remarks: 'Current capacity: 150/200', status: 'in-use', quantity: 1 },
  { id: 3, type: 'equipment', name: 'Emergency Communication Radio', location: 'Barangay Operation Center', remarks: '5 units available', status: 'available', quantity: 5 },
  { id: 4, type: 'equipment', name: 'Portable Generator', location: 'Barangay Hall', remarks: 'Under maintenance', status: 'maintenance', quantity: 2 },
  { id: 5, type: 'system', name: 'Early Warning System', location: 'Barangay', remarks: 'Operational', status: 'available', quantity: 1 }
];

// ============================================
// MAIN BDRIS PAGE
// ============================================

export default function BDRISPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'incidents' | 'trainings' | 'evacuation' | 'resources'>('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const [incidents, setIncidents] = useState<IncidentReport[]>(initialIncidents);
  const [trainings, setTrainings] = useState<TrainingRecord[]>(initialTrainings);
  const [evacuations, setEvacuations] = useState<EvacuationRecord[]>(initialEvacuations);
  const [resources, setResources] = useState<DRRMResource[]>(initialResources);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Modal States
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState<IncidentReport | null>(null);
  const [incidentFormData, setIncidentFormData] = useState<Partial<IncidentReport>>({});
  
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<TrainingRecord | null>(null);
  const [trainingFormData, setTrainingFormData] = useState<Partial<TrainingRecord>>({});
  
  const [isEvacuationModalOpen, setIsEvacuationModalOpen] = useState(false);
  const [editingEvacuation, setEditingEvacuation] = useState<EvacuationRecord | null>(null);
  const [evacuationFormData, setEvacuationFormData] = useState<Partial<EvacuationRecord>>({});
  
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<DRRMResource | null>(null);
  const [resourceFormData, setResourceFormData] = useState<Partial<DRRMResource>>({});
  
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingType, setDeletingType] = useState<'incident' | 'training' | 'evacuation' | 'resource'>('incident');

  // Stats
  const activeIncidents = incidents.filter(i => i.status === 'pending' || i.status === 'in-progress').length;
  const totalTrainings = trainings.length;
  const totalEvacuees = evacuations.reduce((sum, e) => sum + e.affectedIndividuals, 0);
  const availableResources = resources.filter(r => r.status === 'available').length;

  // Filtered Incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter(i => {
      const matchesSearch = i.narrative.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           i.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || i.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [incidents, searchTerm, filterStatus]);

  // ============================================
  // INCIDENT CRUD FUNCTIONS
  // ============================================

  const handleAddIncident = () => {
    setEditingIncident(null);
    const nextId = incidents.length + 1;
    setIncidentFormData({
      incidentNumber: `${new Date().getFullYear()}-${String(nextId).padStart(3, '0')}`,
      incidentDate: new Date().toISOString().split('T')[0],
      incidentTime: new Date().toTimeString().slice(0, 5),
      reportDate: new Date().toISOString().split('T')[0],
      reportTime: new Date().toTimeString().slice(0, 5),
      narrative: '',
      complainant: { name: '', address: '' },
      respondent: { name: '', address: '' },
      natureOfComplaint: '',
      actionTaken: '',
      status: 'pending',
      receivingDate: new Date().toISOString().split('T')[0]
    });
    setIsIncidentModalOpen(true);
  };

  const handleEditIncident = (incident: IncidentReport) => {
    setEditingIncident(incident);
    setIncidentFormData(incident);
    setIsIncidentModalOpen(true);
  };

  const handleSaveIncident = () => {
    if (!incidentFormData.narrative) {
      alert('Please fill in the narrative');
      return;
    }

    if (editingIncident) {
      setIncidents(incidents.map(i => 
        i.id === editingIncident.id 
          ? { ...i, ...incidentFormData as IncidentReport }
          : i
      ));
    } else {
      const newIncident: IncidentReport = {
        id: Math.max(...incidents.map(i => i.id), 0) + 1,
        incidentNumber: incidentFormData.incidentNumber || `${new Date().getFullYear()}-${String(incidents.length + 1).padStart(3, '0')}`,
        incidentDate: incidentFormData.incidentDate || new Date().toISOString().split('T')[0],
        incidentTime: incidentFormData.incidentTime || new Date().toTimeString().slice(0, 5),
        reportDate: incidentFormData.reportDate || new Date().toISOString().split('T')[0],
        reportTime: incidentFormData.reportTime || new Date().toTimeString().slice(0, 5),
        narrative: incidentFormData.narrative || '',
        complainant: incidentFormData.complainant || { name: '', address: '' },
        respondent: incidentFormData.respondent || { name: '', address: '' },
        natureOfComplaint: incidentFormData.natureOfComplaint || '',
        actionTaken: incidentFormData.actionTaken || '',
        status: incidentFormData.status as IncidentReport['status'] || 'pending',
        receivingDate: incidentFormData.receivingDate || new Date().toISOString().split('T')[0]
      };
      setIncidents([...incidents, newIncident]);
    }
    setIsIncidentModalOpen(false);
    setEditingIncident(null);
  };

  const handleDeleteIncident = (id: number) => {
    setIncidents(incidents.filter(i => i.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  const handleUpdateIncidentStatus = (id: number, status: IncidentReport['status']) => {
    setIncidents(incidents.map(i => 
      i.id === id 
        ? { ...i, status, dateAccomplished: status === 'resolved' ? new Date().toISOString().split('T')[0] : i.dateAccomplished }
        : i
    ));
  };

  // ============================================
  // TRAINING CRUD FUNCTIONS
  // ============================================

  const handleAddTraining = () => {
    setEditingTraining(null);
    setTrainingFormData({
      trainingTitle: '',
      dateAttended: new Date().toISOString().split('T')[0],
      conductedBy: '',
      certificateIssued: false,
      remarks: ''
    });
    setIsTrainingModalOpen(true);
  };

  const handleEditTraining = (training: TrainingRecord) => {
    setEditingTraining(training);
    setTrainingFormData(training);
    setIsTrainingModalOpen(true);
  };

  const handleSaveTraining = () => {
    if (!trainingFormData.trainingTitle) {
      alert('Please select a training title');
      return;
    }

    if (editingTraining) {
      setTrainings(trainings.map(t => 
        t.id === editingTraining.id 
          ? { ...t, ...trainingFormData as TrainingRecord }
          : t
      ));
    } else {
      const newTraining: TrainingRecord = {
        id: Math.max(...trainings.map(t => t.id), 0) + 1,
        trainingTitle: trainingFormData.trainingTitle || '',
        dateAttended: trainingFormData.dateAttended || new Date().toISOString().split('T')[0],
        conductedBy: trainingFormData.conductedBy || '',
        certificateIssued: trainingFormData.certificateIssued || false,
        remarks: trainingFormData.remarks || ''
      };
      setTrainings([...trainings, newTraining]);
    }
    setIsTrainingModalOpen(false);
    setEditingTraining(null);
  };

  const handleDeleteTraining = (id: number) => {
    setTrainings(trainings.filter(t => t.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  // ============================================
  // EVACUATION CRUD FUNCTIONS
  // ============================================

  const handleAddEvacuation = () => {
    setEditingEvacuation(null);
    setEvacuationFormData({
      category: 'Natural Hazards',
      subcategory: 'Typhoon/Tropical Cyclone',
      evacuationCause: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      affectedFamilies: 0,
      affectedIndividuals: 0,
      evacuatedTo: '',
      status: 'active'
    });
    setIsEvacuationModalOpen(true);
  };

  const handleEditEvacuation = (evacuation: EvacuationRecord) => {
    setEditingEvacuation(evacuation);
    setEvacuationFormData(evacuation);
    setIsEvacuationModalOpen(true);
  };

  const handleSaveEvacuation = () => {
    if (!evacuationFormData.evacuationCause || !evacuationFormData.description) {
      alert('Please fill in evacuation cause and description');
      return;
    }

    if (editingEvacuation) {
      setEvacuations(evacuations.map(e => 
        e.id === editingEvacuation.id 
          ? { ...e, ...evacuationFormData as EvacuationRecord }
          : e
      ));
    } else {
      const newEvacuation: EvacuationRecord = {
        id: Math.max(...evacuations.map(e => e.id), 0) + 1,
        category: evacuationFormData.category || 'Natural Hazards',
        subcategory: evacuationFormData.subcategory || '',
        evacuationCause: evacuationFormData.evacuationCause || '',
        description: evacuationFormData.description || '',
        date: evacuationFormData.date || new Date().toISOString().split('T')[0],
        affectedFamilies: evacuationFormData.affectedFamilies || 0,
        affectedIndividuals: evacuationFormData.affectedIndividuals || 0,
        evacuatedTo: evacuationFormData.evacuatedTo || '',
        status: evacuationFormData.status as EvacuationRecord['status'] || 'active'
      };
      setEvacuations([...evacuations, newEvacuation]);
    }
    setIsEvacuationModalOpen(false);
    setEditingEvacuation(null);
  };

  const handleDeleteEvacuation = (id: number) => {
    setEvacuations(evacuations.filter(e => e.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  // ============================================
  // RESOURCE CRUD FUNCTIONS
  // ============================================

  const handleAddResource = () => {
    setEditingResource(null);
    setResourceFormData({
      type: 'equipment',
      name: '',
      location: '',
      remarks: '',
      status: 'available',
      quantity: 1
    });
    setIsResourceModalOpen(true);
  };

  const handleEditResource = (resource: DRRMResource) => {
    setEditingResource(resource);
    setResourceFormData(resource);
    setIsResourceModalOpen(true);
  };

  const handleSaveResource = () => {
    if (!resourceFormData.name) {
      alert('Please enter resource name');
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
        type: resourceFormData.type as DRRMResource['type'] || 'equipment',
        name: resourceFormData.name || '',
        location: resourceFormData.location || '',
        remarks: resourceFormData.remarks || '',
        status: resourceFormData.status as DRRMResource['status'] || 'available',
        quantity: resourceFormData.quantity || 1
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

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardTab 
          incidents={incidents}
          trainings={trainings}
          evacuations={evacuations}
          resources={resources}
          activeIncidents={activeIncidents}
          totalTrainings={totalTrainings}
          totalEvacuees={totalEvacuees}
          availableResources={availableResources}
        />;
      case 'incidents':
        return <IncidentsTab 
          incidents={filteredIncidents}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onAdd={handleAddIncident}
          onEdit={handleEditIncident}
          onDelete={(id) => { setDeletingId(id); setDeletingType('incident'); setIsDeleteConfirmOpen(true); }}
          onUpdateStatus={handleUpdateIncidentStatus}
          natureOptions={NATURE_OF_COMPLAINT_OPTIONS}
          actionOptions={ACTION_OPTIONS}
        />;
      case 'trainings':
        return <TrainingsTab 
          trainings={trainings}
          onAdd={handleAddTraining}
          onEdit={handleEditTraining}
          onDelete={(id) => { setDeletingId(id); setDeletingType('training'); setIsDeleteConfirmOpen(true); }}
          trainingTitles={TRAINING_TITLES}
        />;
      case 'evacuation':
        return <EvacuationTab 
          evacuations={evacuations}
          onAdd={handleAddEvacuation}
          onEdit={handleEditEvacuation}
          onDelete={(id) => { setDeletingId(id); setDeletingType('evacuation'); setIsDeleteConfirmOpen(true); }}
        />;
      case 'resources':
        return <ResourcesTab 
          resources={resources}
          onAdd={handleAddResource}
          onEdit={handleEditResource}
          onDelete={(id) => { setDeletingId(id); setDeletingType('resource'); setIsDeleteConfirmOpen(true); }}
        />;
      default:
        return <div>Select a tab</div>;
    }
  };

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
                <h1 className="text-sm font-bold text-slate-900">BDRIS</h1>
                <p className="text-[10px] text-slate-500">Barangay Disaster Resilience</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeIncidents > 0 && (
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                <Bell className="h-3 w-3" />
                {activeIncidents} Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="flex gap-1 px-4 max-w-7xl mx-auto overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'incidents', label: 'BIMS Form 1', icon: AlertCircle },
            { id: 'trainings', label: 'BIMS Form 1.D', icon: BookOpen },
            { id: 'evacuation', label: 'Evacuation', icon: Home },
            { id: 'resources', label: 'Resources', icon: Package }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
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
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6">
        {renderContent()}
      </div>

      {/* ============================================
          INCIDENT MODAL - BIMS Form 1
          ============================================ */}
      {isIncidentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingIncident ? 'Edit Incident Report' : 'New Incident Report'} 
                <span className="text-sm font-normal text-slate-500 ml-2">(BIMS Form 1)</span>
              </h3>
              <button onClick={() => setIsIncidentModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Incident Number</label>
                  <input type="text" value={incidentFormData.incidentNumber || ''} readOnly className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={incidentFormData.status || 'pending'} onChange={(e) => setIncidentFormData({ ...incidentFormData, status: e.target.value as any })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Incident Date</label>
                  <input type="date" value={incidentFormData.incidentDate || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, incidentDate: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Incident Time</label>
                  <input type="time" value={incidentFormData.incidentTime || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, incidentTime: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Report Date</label>
                  <input type="date" value={incidentFormData.reportDate || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, reportDate: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Report Time</label>
                  <input type="time" value={incidentFormData.reportTime || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, reportTime: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Narrative</label>
                <textarea value={incidentFormData.narrative || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, narrative: e.target.value })} rows={4} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Provide detailed description of the incident..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nature of Complaint <span className="text-xs text-slate-400">(BIMS Form 1.B)</span></label>
                <select value={incidentFormData.natureOfComplaint || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, natureOfComplaint: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select Nature of Complaint...</option>
                  {NATURE_OF_COMPLAINT_OPTIONS.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.code}. {opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Action Taken <span className="text-xs text-slate-400">(BIMS Form 1.C)</span></label>
                <select value={incidentFormData.actionTaken || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, actionTaken: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select Action Taken...</option>
                  {ACTION_OPTIONS.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.code}. {opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Complainant</h4>
                  <div className="space-y-2">
                    <input type="text" placeholder="Name" value={incidentFormData.complainant?.name || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, complainant: { ...incidentFormData.complainant, name: e.target.value } })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <input type="text" placeholder="Address" value={incidentFormData.complainant?.address || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, complainant: { ...incidentFormData.complainant, address: e.target.value } })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Respondent</h4>
                  <div className="space-y-2">
                    <input type="text" placeholder="Name" value={incidentFormData.respondent?.name || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, respondent: { ...incidentFormData.respondent, name: e.target.value } })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <input type="text" placeholder="Address" value={incidentFormData.respondent?.address || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, respondent: { ...incidentFormData.respondent, address: e.target.value } })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Receiving Date</label>
                <input type="date" value={incidentFormData.receivingDate || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, receivingDate: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              {incidentFormData.status === 'resolved' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date Accomplished</label>
                  <input type="date" value={incidentFormData.dateAccomplished || ''} onChange={(e) => setIncidentFormData({ ...incidentFormData, dateAccomplished: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsIncidentModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSaveIncident} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingIncident ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          TRAINING MODAL - BIMS Form 1.D
          ============================================ */}
      {isTrainingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingTraining ? 'Edit Training Record' : 'New Training Record'}
                <span className="text-sm font-normal text-slate-500 ml-2">(BIMS Form 1.D)</span>
              </h3>
              <button onClick={() => setIsTrainingModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Training Title *</label>
                <select value={trainingFormData.trainingTitle || ''} onChange={(e) => setTrainingFormData({ ...trainingFormData, trainingTitle: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select Training...</option>
                  {TRAINING_TITLES.map(title => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date Attended</label>
                <input type="date" value={trainingFormData.dateAttended || ''} onChange={(e) => setTrainingFormData({ ...trainingFormData, dateAttended: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Conducted By</label>
                <input type="text" value={trainingFormData.conductedBy || ''} onChange={(e) => setTrainingFormData({ ...trainingFormData, conductedBy: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Organization/Institution" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={trainingFormData.certificateIssued || false} onChange={(e) => setTrainingFormData({ ...trainingFormData, certificateIssued: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <label className="text-sm text-slate-700">Certificate Issued</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Remarks</label>
                <textarea value={trainingFormData.remarks || ''} onChange={(e) => setTrainingFormData({ ...trainingFormData, remarks: e.target.value })} rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Additional notes" />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsTrainingModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSaveTraining} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingTraining ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          EVACUATION MODAL (Pages 43-44)
          ============================================ */}
      {isEvacuationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingEvacuation ? 'Edit Evacuation Record' : 'New Evacuation Record'}
              </h3>
              <button onClick={() => setIsEvacuationModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select value={evacuationFormData.category || 'Natural Hazards'} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, category: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="Natural Hazards">Natural Hazards</option>
                  <option value="Industrial Accidents">Industrial Accidents</option>
                  <option value="Transport">Transport</option>
                  <option value="Fires">Fires</option>
                  <option value="Military Attacks">Military Attacks</option>
                  <option value="Structural Failure">Structural Failure</option>
                  <option value="Viral Outbreak">Viral Outbreak</option>
                  <option value="Robbery">Robbery</option>
                  <option value="Plane Crash">Plane Crash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subcategory</label>
                <select value={evacuationFormData.subcategory || ''} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, subcategory: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select Subcategory...</option>
                  <option value="Typhoon/Tropical Cyclone">Typhoon/Tropical Cyclone</option>
                  <option value="Earthquakes">Earthquakes</option>
                  <option value="Volcanic Eruption">Volcanic Eruption</option>
                  <option value="Landslides">Landslides</option>
                  <option value="Tsunami/Storm Surge">Tsunami/Storm Surge</option>
                  <option value="Flood/Flashflood/Flooding">Flood/Flashflood/Flooding</option>
                  <option value="Heat Waves">Heat Waves</option>
                  <option value="Sinkholes">Sinkholes</option>
                  <option value="Chemical Spill">Chemical Spill</option>
                  <option value="Road Accident">Road Accident</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Evacuation Cause</label>
                <input type="text" value={evacuationFormData.evacuationCause || ''} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, evacuationCause: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Typhoon Karding" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea value={evacuationFormData.description || ''} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, description: e.target.value })} rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Describe the evacuation situation" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input type="date" value={evacuationFormData.date || ''} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, date: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Evacuated To</label>
                  <input type="text" value={evacuationFormData.evacuatedTo || ''} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, evacuatedTo: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Evacuation center name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Affected Families</label>
                  <input type="number" value={evacuationFormData.affectedFamilies || 0} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, affectedFamilies: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Affected Individuals</label>
                  <input type="number" value={evacuationFormData.affectedIndividuals || 0} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, affectedIndividuals: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={evacuationFormData.status || 'active'} onChange={(e) => setEvacuationFormData({ ...evacuationFormData, status: e.target.value as any })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-2">
              <button onClick={() => setIsEvacuationModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSaveEvacuation} className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingEvacuation ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          RESOURCE MODAL (Pages 58-59)
          ============================================ */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select value={resourceFormData.type || 'equipment'} onChange={(e) => setResourceFormData({ ...resourceFormData, type: e.target.value as any })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="facility">Facility</option>
                    <option value="equipment">Equipment</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={resourceFormData.status || 'available'} onChange={(e) => setResourceFormData({ ...resourceFormData, status: e.target.value as any })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="available">Available</option>
                    <option value="in-use">In Use</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="depleted">Depleted</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" value={resourceFormData.name || ''} onChange={(e) => setResourceFormData({ ...resourceFormData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" value={resourceFormData.location || ''} onChange={(e) => setResourceFormData({ ...resourceFormData, location: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Remarks</label>
                <textarea value={resourceFormData.remarks || ''} onChange={(e) => setResourceFormData({ ...resourceFormData, remarks: e.target.value })} rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                <input type="number" value={resourceFormData.quantity || 1} onChange={(e) => setResourceFormData({ ...resourceFormData, quantity: parseInt(e.target.value) || 1 })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
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

      {/* Delete Confirmation */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-rose-50 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Confirm Delete</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Are you sure you want to delete this {deletingType}? This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={() => {
                if (deletingType === 'incident') handleDeleteIncident(deletingId!);
                else if (deletingType === 'training') handleDeleteTraining(deletingId!);
                else if (deletingType === 'evacuation') handleDeleteEvacuation(deletingId!);
                else if (deletingType === 'resource') handleDeleteResource(deletingId!);
              }} className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 flex items-center gap-2">
                <Trash className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// DASHBOARD TAB
// ============================================
function DashboardTab({ incidents, trainings, evacuations, resources, activeIncidents, totalTrainings, totalEvacuees, availableResources }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Active Incidents</p>
            <AlertCircle className="h-5 w-5 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{activeIncidents}</p>
          <p className="text-xs text-rose-600">BIMS Form 1</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Trainings</p>
            <BookOpen className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalTrainings}</p>
          <p className="text-xs text-emerald-600">BIMS Form 1.D</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Evacuees</p>
            <Users className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalEvacuees}</p>
          <p className="text-xs text-amber-600">Evacuation Records</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Resources</p>
            <Package className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{availableResources}</p>
          <p className="text-xs text-blue-600">Resource Inventory</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Recent Incidents</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {incidents.slice(0, 3).map((incident: any) => (
              <div key={incident.id} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900">{incident.incidentNumber}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    incident.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    incident.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    incident.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {incident.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 truncate">{incident.narrative}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Training Records</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {trainings.slice(0, 3).map((training: any) => (
              <div key={training.id} className="px-4 py-3">
                <p className="text-sm font-medium text-slate-900">{training.trainingTitle}</p>
                <p className="text-xs text-slate-500">Completed: {training.dateAttended}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// INCIDENTS TAB - BIMS Form 1
// ============================================
function IncidentsTab({ incidents, searchTerm, setSearchTerm, filterStatus, setFilterStatus, onAdd, onEdit, onDelete, onUpdateStatus, natureOptions, actionOptions }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Incident Reports</h2>
          <p className="text-sm text-slate-500">BIMS Form 1 - Incident/Complaint Reports</p>
        </div>
        <button onClick={onAdd} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Incident
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search incidents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      <div className="space-y-4">
        {incidents.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">No incidents reported.</div>
        ) : (
          incidents.map((incident: IncidentReport) => (
            <div key={incident.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900">{incident.incidentNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      incident.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      incident.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      incident.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{incident.narrative}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                    <span>Date: {incident.incidentDate}</span>
                    <span>Time: {incident.incidentTime}</span>
                    <span>Receiving: {incident.receivingDate}</span>
                  </div>
                  {incident.natureOfComplaint && (
                    <p className="text-xs text-slate-500 mt-1">Nature: {natureOptions.find((o: any) => o.code === incident.natureOfComplaint)?.label}</p>
                  )}
                  {incident.actionTaken && (
                    <p className="text-xs text-slate-500">Action: {actionOptions.find((o: any) => o.code === incident.actionTaken)?.label}</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <select value={incident.status} onChange={(e) => onUpdateStatus(incident.id, e.target.value)} className="text-xs px-2 py-1 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(incident)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(incident.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600">
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

// ============================================
// TRAININGS TAB - BIMS Form 1.D
// ============================================
function TrainingsTab({ trainings, onAdd, onEdit, onDelete }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Training Records</h2>
          <p className="text-sm text-slate-500">BIMS Form 1.D - Required Trainings</p>
        </div>
        <button onClick={onAdd} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> Record Training
        </button>
      </div>

      <div className="space-y-4">
        {trainings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">No training records.</div>
        ) : (
          trainings.map((training: TrainingRecord) => (
            <div key={training.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{training.trainingTitle}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                    <span>Date: {training.dateAttended}</span>
                    <span>Conducted by: {training.conductedBy || 'N/A'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${training.certificateIssued ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                      {training.certificateIssued ? 'Certificate Issued' : 'No Certificate'}
                    </span>
                  </div>
                  {training.remarks && <p className="text-sm text-slate-500 mt-1">{training.remarks}</p>}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(training)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(training.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================
// EVACUATION TAB (Pages 43-44)
// ============================================
function EvacuationTab({ evacuations, onAdd, onEdit, onDelete }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Evacuation Records</h2>
          <p className="text-sm text-slate-500">Pages 43-44 - Evacuation Form</p>
        </div>
        <button onClick={onAdd} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Evacuation
        </button>
      </div>

      <div className="space-y-4">
        {evacuations.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">No evacuation records.</div>
        ) : (
          evacuations.map((evacuation: EvacuationRecord) => (
            <div key={evacuation.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">{evacuation.evacuationCause}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${evacuation.status === 'active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {evacuation.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{evacuation.category} → {evacuation.subcategory}</p>
                  <p className="text-sm text-slate-600 mt-1">{evacuation.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                    <span>Date: {evacuation.date}</span>
                    <span>Families: {evacuation.affectedFamilies}</span>
                    <span>Individuals: {evacuation.affectedIndividuals}</span>
                    <span>Evacuated to: {evacuation.evacuatedTo}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(evacuation)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(evacuation.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================
// RESOURCES TAB (Pages 58-59)
// ============================================
function ResourcesTab({ resources, onAdd, onEdit, onDelete }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">DRRM Resources Inventory</h2>
          <p className="text-sm text-slate-500">Pages 58-59 - Resource Inventory</p>
        </div>
        <button onClick={onAdd} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Resource
        </button>
      </div>

      {['facility', 'equipment', 'system'].map(category => {
        const items = resources.filter((r: any) => r.type === category);
        if (items.length === 0) return null;
        return (
          <div key={category} className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 capitalize">{category}s</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((resource: DRRMResource) => (
                <div key={resource.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900">{resource.name}</h4>
                      <p className="text-sm text-slate-500">Location: {resource.location}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      resource.status === 'available' ? 'bg-emerald-100 text-emerald-800' :
                      resource.status === 'in-use' ? 'bg-amber-100 text-amber-800' :
                      resource.status === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {resource.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">Quantity: {resource.quantity}</p>
                  {resource.remarks && <p className="text-sm text-slate-500">{resource.remarks}</p>}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(resource)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(resource.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-600">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}