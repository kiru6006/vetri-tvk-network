import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_MEMBERS } from '../mock/data';
import {
  ArrowLeft,
  UserCheck,
  Shield,
  MapPin,
  Briefcase,
  Layers,
  Building,
  Scale,
  Lock,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  FileCheck2,
  Clock
} from 'lucide-react';

export const MemberDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, canViewPhone, canViewAddress, canViewLegal, currentRole } = useApp();

  const [activeTab, setActiveTab] = useState<
    'IDENTITY' | 'ORGANISATION' | 'PROFESSIONAL' | 'WINGS' | 'LEGAL'
  >('IDENTITY');

  const member = MOCK_MEMBERS.find((m) => m.id === id) || MOCK_MEMBERS[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('/members')}
        className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'en' ? 'Back to Member Directory' : 'உறுப்பினர் பட்டியலுக்கு திரும்பு'}</span>
      </button>

      {/* Profile Header Dossier Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-100 shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {language === 'en' ? member.name : member.tamilName}
                </h1>
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <UserCheck className="w-3 h-3" />
                  <span>{member.verificationStatus}</span>
                </span>
              </div>
              <p className="text-xs text-amber-800 font-bold mt-0.5">{member.memberNumber}</p>
              <p className="text-xs text-slate-500 mt-1 flex items-center space-x-2">
                <span className="font-semibold text-red-800">{member.organisationRole}</span>
                <span>•</span>
                <span>Enrolled: {member.joinedAt}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors cursor-pointer">
              {language === 'en' ? 'Direct Official Message' : 'செய்தி அனுப்ப'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'IDENTITY', label: language === 'en' ? 'Identity & Contact' : 'அடையாளம் & தொடர்பு' },
            { id: 'ORGANISATION', label: language === 'en' ? 'Organisational Scope' : 'அமைப்பு எல்லை' },
            { id: 'PROFESSIONAL', label: language === 'en' ? 'Profession & Skills' : 'தொழில் & திறன்கள்' },
            { id: 'WINGS', label: language === 'en' ? 'Assigned Wings' : 'அணிகள்' },
            { id: 'LEGAL', label: language === 'en' ? 'Legal Disclosures (Vetting)' : 'சட்ட விவகாரங்கள்' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'IDENTITY' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            {language === 'en' ? 'Identity & Contact Verification' : 'அடையாளம் மற்றும் தொடர்பு விவரங்கள்'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-medium">Full Name (English / Tamil)</span>
              <p className="font-semibold text-slate-900">{member.name} / {member.tamilName}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-medium">Gender & Date of Birth</span>
              <p className="font-semibold text-slate-900">{member.gender} • {member.dateOfBirth}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-medium">Phone Number</span>
              <p className="font-semibold text-slate-900">
                {canViewPhone(member) ? (
                  member.phone
                ) : (
                  <span className="text-amber-800 italic">
                    Restricted (No Public Consent Granted)
                  </span>
                )}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-medium">Residential Address (RBAC Tiered)</span>
              <p className="font-semibold text-slate-900">
                {canViewAddress(member) === 'FULL' ? (
                  member.fullAddress
                ) : canViewAddress(member) === 'LIMITED' ? (
                  `${member.ward}, ${member.assemblyConstituency}, ${member.district}`
                ) : (
                  <span className="text-slate-400 italic">Address details masked for general cadre.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ORGANISATION' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            {language === 'en' ? 'Assigned Political Hierarchy' : 'அமைப்பு அதிகார எல்லை'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400">State / Region</span>
              <p className="font-bold text-slate-900 mt-1">Tamil Nadu State Central Committee</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400">Revenue District</span>
              <p className="font-bold text-slate-900 mt-1">{member.district} District Unit</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400">Parliamentary Constituency</span>
              <p className="font-bold text-slate-900 mt-1">{member.parliamentaryConstituency}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400">Assembly Constituency</span>
              <p className="font-bold text-slate-900 mt-1">{member.assemblyConstituency}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400">Ward / Local Body</span>
              <p className="font-bold text-slate-900 mt-1">{member.ward}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400">Assigned Polling Booth</span>
              <p className="font-bold text-slate-900 mt-1">{member.booth}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'PROFESSIONAL' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            {language === 'en' ? 'Professional Profile & Cadre Capabilities' : 'தொழில்முறை மற்றும் கல்வி தகுதிகள்'}
          </h2>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-medium">Designation & Institution</span>
              <p className="font-bold text-slate-900 text-sm">{member.designation}</p>
              <p className="text-slate-600">{member.organisation}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-slate-400 font-medium">Academic & Professional Qualifications</span>
              <ul className="list-disc list-inside space-y-1 font-semibold text-slate-800">
                {member.qualifications.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-slate-400 font-medium">Specialized Skills & Party Readiness</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {member.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded-md font-semibold text-slate-700 shadow-2xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'WINGS' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            {language === 'en' ? 'Active Wing Assignments' : 'அணி பொறுப்புகள்'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {member.wings.map((w, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2 flex items-start justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 text-sm">{w.wingName}</div>
                  <div className="text-red-700 font-semibold mt-1">Role: {w.role}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'LEGAL' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {language === 'en' ? 'Candidate Legal Disclosure & Vetting' : 'சட்ட விவகாரங்கள் தணிக்கை'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Constitutional presumption of innocence. Political protest cases explicitly categorized.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              <Lock className="w-3.5 h-3.5" />
              <span>Strict RBAC Audit</span>
            </div>
          </div>

          {!canViewLegal(member) ? (
            <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 text-slate-500 text-xs space-y-2">
              <Lock className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold text-slate-800">Access Restricted</p>
              <p>
                Legal disclosures are only accessible to Constituency, District, and State Vetting Administrators.
              </p>
            </div>
          ) : member.legalDisclosures.length === 0 ? (
            <div className="p-6 text-center bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-800 text-xs space-y-1">
              <FileCheck2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <p className="font-bold">No Disclosures or Proceedings Recorded</p>
              <p className="text-emerald-700">Clear record verified by District Legal Vetting Committee.</p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              {member.legalDisclosures.map((ld) => (
                <div
                  key={ld.id}
                  className="p-4 rounded-lg border border-amber-200 bg-amber-50/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{ld.caseNumber}</span>
                      <span className="ml-2 text-slate-500">({ld.court} - Year {ld.year})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 uppercase">
                      {ld.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-slate-800 font-semibold">{ld.caseType}</div>
                  <div className="text-slate-600 text-[11px] leading-relaxed">
                    <strong>Sections:</strong> {ld.legalSections}
                  </div>
                  {ld.memberStatement && (
                    <div className="p-3 rounded bg-white border border-amber-100 text-slate-700 italic text-[11px]">
                      "{ld.memberStatement}"
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 pt-2 border-t border-amber-100 flex items-center justify-between">
                    <span>Verified by State Legal Scrutiny Team</span>
                    <span>Last Verified: {ld.lastVerifiedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
