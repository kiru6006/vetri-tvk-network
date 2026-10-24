import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  UserCheck,
  UserX,
  History,
  Lock,
  FileText,
  AlertTriangle,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { MOCK_MEMBERS } from '../mock/data';

export const AdminPage: React.FC = () => {
  const { language, currentRole } = useApp();
  const [activeTab, setActiveTab] = useState<'VERIFICATION' | 'AUDIT' | 'RBAC'>('VERIFICATION');

  const pendingMembers = MOCK_MEMBERS.filter((m) => m.verificationStatus === 'PENDING');

  const auditLogs = [
    {
      id: 'aud-1',
      actor: 'District Admin (Salem)',
      action: 'VIEW_LEGAL_DISCLOSURE',
      target: 'Adv. S. Meenakshi Sundaram (TVK-TN-2026-00102)',
      timestamp: '2026-10-23 14:12:05',
      ip: '10.14.88.21',
      reason: 'Assembly Candidate Vetting',
    },
    {
      id: 'aud-2',
      actor: 'State Admin HQ',
      action: 'APPROVE_MEMBER',
      target: 'Dr. R. Aravindhan (TVK-TN-2026-00101)',
      timestamp: '2026-10-22 09:30:11',
      ip: '10.14.02.15',
      reason: 'Medical Wing Coordinator Appointment',
    },
    {
      id: 'aud-3',
      actor: 'Constituency Admin (AC-089)',
      action: 'ACCESS_FULL_ADDRESS',
      target: 'K. Muthuvel (TVK-TN-2026-00104)',
      timestamp: '2026-10-21 16:45:30',
      ip: '10.14.89.04',
      reason: 'Drip Irrigation Camp Invitation',
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Central Administration & Governance Desk' : 'மத்திய நிர்வாகம் & தணிக்கை தளம்'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'en'
              ? 'Candidate verification, immutable audit logs, and party RBAC enforcement.'
              : 'உறுப்பினர் சரிபார்ப்பு, தணிக்கை பதிவேடு மற்றும் பாதுகாப்பு நெறிமுறைகள்.'}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs bg-slate-900 text-white px-3 py-1.5 rounded-xl self-start sm:self-auto shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Active: {currentRole}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-2xl border-2 border-white shadow-xs flex space-x-2 overflow-x-auto text-xs font-semibold scrollbar-none">
        {[
          { id: 'VERIFICATION', label: language === 'en' ? 'Pending Cadre Verification' : 'நிலுவை சரிபார்ப்புகள்' },
          { id: 'AUDIT', label: language === 'en' ? 'Immutable Audit Logs' : 'தணிக்கை பதிவேடு' },
          { id: 'RBAC', label: language === 'en' ? 'Constitutional RBAC Matrix' : 'அதிகாரப் பகிர்வு மேட்ரிக்ஸ்' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-red-700 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Verification Queue Tab */}
      {activeTab === 'VERIFICATION' && (
        <div className="bg-white rounded-2xl border-2 border-white p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              {language === 'en' ? 'Cadre Identity & Booth Verification Queue' : 'உறுப்பினர் அடையாள சரிபார்ப்பு பட்டியல்'}
            </h2>
            <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-bold border border-amber-200">
              {pendingMembers.length} Pending Actions
            </span>
          </div>

          <div className="space-y-3.5">
            {pendingMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-red-600/20 shadow-xs shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{member.name}</h3>
                    <p className="text-xs text-amber-800 font-bold font-mono">{member.memberNumber}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {member.profession} • {member.assemblyConstituency} • {member.booth}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 flex items-center space-x-1.5 transition-colors cursor-pointer">
                    <UserX className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log Tab with Responsive Table Scroll */}
      {activeTab === 'AUDIT' && (
        <div className="bg-white rounded-2xl border-2 border-white p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Immutable Tamper-Proof Audit Trail (Clause 14.2)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every sensitive data inspection is cryptographically logged with role attribution.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
              Integrity Verified
            </span>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Cadre Actor</th>
                  <th className="py-3 px-3">Action Type</th>
                  <th className="py-3 px-3">Subject / Target</th>
                  <th className="py-3 px-3">Official Purpose</th>
                  <th className="py-3 px-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{log.actor}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-800 border border-red-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">{log.target}</td>
                    <td className="py-3 px-3 text-slate-600 italic">{log.reason}</td>
                    <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RBAC Matrix Tab with Responsive Table Scroll */}
      {activeTab === 'RBAC' && (
        <div className="bg-white rounded-2xl border-2 border-white p-4 sm:p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              Constitutional RBAC Visibility & Authorization Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Strictly enforced in backend API routes and respected by AI tools per specification 06-RBAC-MATRIX.md.
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-left text-xs border border-slate-200 min-w-[700px]">
              <thead className="bg-slate-900 text-white font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Function / Field</th>
                  <th className="py-2.5 px-3">Member</th>
                  <th className="py-2.5 px-3">Booth</th>
                  <th className="py-2.5 px-3">Constituency</th>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Wing</th>
                  <th className="py-2.5 px-3">State</th>
                  <th className="py-2.5 px-3">Super Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold">View Public Profile</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold">View Phone</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Consent</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold">View Full Address</td>
                  <td className="py-2.5 px-3 text-rose-600 font-bold">No</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Limited</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold">View Legal Disclosure</td>
                  <td className="py-2.5 px-3 text-rose-600 font-bold">No</td>
                  <td className="py-2.5 px-3 text-rose-600 font-bold">No</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Restricted</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Restricted</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Restricted</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">Authorised</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold">Verify Member</td>
                  <td className="py-2.5 px-3 text-rose-600 font-bold">No</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Wing only</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold">Export Members</td>
                  <td className="py-2.5 px-3 text-rose-600 font-bold">No</td>
                  <td className="py-2.5 px-3 text-rose-600 font-bold">No</td>
                  <td className="py-2.5 px-3 text-rose-600 font-bold">No</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Restricted</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Restricted</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold">Restricted</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
