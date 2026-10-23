export type UserRole =
  | 'MEMBER'
  | 'BOOTH_COORDINATOR'
  | 'WARD_COORDINATOR'
  | 'CONSTITUENCY_ADMIN'
  | 'DISTRICT_ADMIN'
  | 'WING_COORDINATOR'
  | 'STATE_ADMIN'
  | 'SUPER_ADMIN'
  | 'AUDITOR';

export type Language = 'en' | 'ta';

export interface OrganisationUnit {
  id: string;
  parentId: string | null;
  type: 'STATE' | 'REGION' | 'DISTRICT' | 'PARLIAMENTARY_CONSTITUENCY' | 'ASSEMBLY_CONSTITUENCY' | 'LOCAL_BODY' | 'WARD' | 'BOOTH';
  name: string;
  nameTamil: string;
  code: string;
  level: number;
  leaderName?: string;
  cadreCount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Wing {
  id: string;
  name: string;
  nameTamil: string;
  category: 'PROFESSIONAL' | 'OCCUPATIONAL' | 'SOCIAL' | 'FUNCTIONAL';
  description: string;
  coordinatorName: string;
  memberCount: number;
  iconName: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface LegalDisclosure {
  id: string;
  caseNumber: string;
  court: string;
  year: number;
  caseType: string;
  memberRole: 'ACCUSED' | 'COMPLAINANT' | 'PETITIONER' | 'RESPONDENT';
  legalSections: string;
  status:
    | 'FIR_REGISTERED'
    | 'CHARGE_SHEET_FILED'
    | 'TRIAL_PENDING'
    | 'DISCHARGED'
    | 'ACQUITTED'
    | 'CONVICTED'
    | 'APPEAL_PENDING'
    | 'CLOSED';
  stage: string;
  memberStatement?: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'SELF_DECLARED';
  lastVerifiedAt: string;
}

export interface Member {
  id: string;
  memberNumber: string;
  name: string;
  tamilName: string;
  photoUrl: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string;
  phone: string; // Restricted visibility based on RBAC & Consent
  phoneConsent: boolean;
  email: string;
  joinedAt: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  
  // Organization assignment
  district: string;
  parliamentaryConstituency: string;
  assemblyConstituency: string;
  ward: string;
  booth: string;
  organisationRole: string;
  
  // Professional & Skills
  profession: string;
  professionCategory: string;
  designation: string;
  organisation: string;
  skills: string[];
  qualifications: string[];
  
  // Wings
  wings: {
    wingId: string;
    wingName: string;
    role: string;
  }[];
  
  // Business info
  businessName?: string;
  businessCategory?: string;
  
  // Legal disclosure (Restricted to Authorized Admins only)
  legalDisclosures: LegalDisclosure[];
  
  // Address (Restricted)
  fullAddress: string;
}

export interface EventItem {
  id: string;
  title: string;
  titleTamil: string;
  type: 'PARTY_MEETING' | 'BOOTH_MEETING' | 'WING_MEETING' | 'MEDICAL_CAMP' | 'LEGAL_CAMP' | 'DISASTER_RELIEF';
  location: string;
  date: string;
  time: string;
  organizer: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  registeredCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  titleTamil: string;
  content: string;
  priority: 'NORMAL' | 'IMPORTANT' | 'URGENT';
  targetScope: string;
  publishedAt: string;
  author: string;
}

export interface ServiceRequest {
  id: string;
  requestId: string;
  citizenName: string;
  category: 'MEDICAL' | 'LEGAL' | 'EDUCATION' | 'EMPLOYMENT' | 'GOVT_SCHEME' | 'EMERGENCY';
  location: string;
  description: string;
  assignedWing: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'SUBMITTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}
