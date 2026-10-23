import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_MEMBERS } from '../mock/data';
import {
  Search,
  Filter,
  UserCheck,
  MapPin,
  Briefcase,
  Phone,
  Shield,
  Download,
  Eye,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MembersPage: React.FC = () => {
  const { language, canViewPhone, canExportData } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [professionFilter, setProfessionFilter] = useState('ALL');
  const [verificationFilter, setVerificationFilter] = useState('ALL');

  const filteredMembers = MOCK_MEMBERS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.memberNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchDistrict = districtFilter === 'ALL' || m.district === districtFilter;
    const matchProfession = professionFilter === 'ALL' || m.professionCategory === professionFilter;
    const matchVerification = verificationFilter === 'ALL' || m.verificationStatus === verificationFilter;

    return matchSearch && matchDistrict && matchProfession && matchVerification;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {language === 'en' ? 'Verified Member Directory' : 'சரிபார்க்கப்பட்ட உறுப்பினர் பட்டியல்'}
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs">
              TVK CADRE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'en'
              ? 'Multi-tiered cadre search with field-level role-based masking.'
              : 'பதவிக்குரிய பாதுகாப்பு விதிகளுடன் கூடிய கள உறுப்பினர் தகவல் தொகுப்பு.'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {canExportData() && (
            <button className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 font-bold text-xs rounded-xl flex items-center space-x-2 transition-all shadow-xs cursor-pointer border border-red-500/40">
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Export Cadre (Super Admin)' : 'ஏற்றுமதி செய்'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar with TVK Red/Yellow Styling */}
      <div className="bg-white p-4 rounded-xl border border-red-100 shadow-2xs space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
          {/* Search Box */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Search by name, ID, skill...'
                  : 'பெயர், உறுப்பினர் எண், திறன் தேடவும்...'
              }
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 font-medium"
            />
          </div>

          {/* District Filter */}
          <div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600/30 font-medium"
            >
              <option value="ALL">{language === 'en' ? 'All Districts' : 'அனைத்து மாவட்டங்கள்'}</option>
              <option value="Salem">Salem (சேலம்)</option>
              <option value="Chennai">Chennai (சென்னை)</option>
              <option value="Coimbatore">Coimbatore (கோயம்புத்தூர்)</option>
            </select>
          </div>

          {/* Profession Category */}
          <div>
            <select
              value={professionFilter}
              onChange={(e) => setProfessionFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600/30 font-medium"
            >
              <option value="ALL">{language === 'en' ? 'All Professions' : 'அனைத்து தொழில்கள்'}</option>
              <option value="Medical">Medical / Healthcare</option>
              <option value="Legal">Legal / Advocates</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Agriculture">Agriculture & Farming</option>
              <option value="Engineering">Engineering & Construction</option>
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600/30 font-medium"
            >
              <option value="ALL">{language === 'en' ? 'All Verification' : 'அனைத்து சரிபார்ப்பு நிலை'}</option>
              <option value="VERIFIED">Verified with ID (சரிபார்க்கப்பட்டது)</option>
              <option value="PENDING">Pending Verification (நிலுவையில்)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Member Cards Grid with TVK Theme Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border-2 border-red-100/80 shadow-2xs hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between overflow-hidden relative group"
          >
            {/* Top Red & Yellow Gradient Accent Bar */}
            <div className="h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 w-full shrink-0"></div>

            <div className="p-5">
              {/* Member Card Top: Photo & Verified Badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="relative">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-13 h-13 rounded-xl object-cover ring-2 ring-red-600/30 shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-yellow-400 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {language === 'en' ? member.name : member.tamilName}
                    </h3>
                    <p className="text-[11px] text-red-700 font-bold mt-0.5 tracking-tight">
                      {member.memberNumber}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    member.verificationStatus === 'VERIFIED'
                      ? 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {member.verificationStatus}
                </span>
              </div>

              {/* Cadre Post & Unit Hierarchy */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-slate-800 font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="truncate">{member.profession}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                  <span className="truncate">
                    {member.district} • {member.assemblyConstituency} • {member.booth}
                  </span>
                </div>

                {/* Masked / Consented Phone Number Display */}
                <div className="flex items-center space-x-2 text-slate-500 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {canViewPhone(member) ? (
                      <span className="text-slate-900 font-bold">{member.phone}</span>
                    ) : (
                      <span className="text-slate-400 italic font-mono">
                        +91 ••••• ••{member.phone.slice(-3)} (Protected)
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Skills Tags with TVK subtle yellow-red accent */}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {member.skills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-yellow-50 text-yellow-900 border border-yellow-200/60 px-2 py-0.5 rounded-md font-bold"
                  >
                    {skill}
                  </span>
                ))}
                {member.skills.length > 3 && (
                  <span className="text-[10px] text-slate-400 font-bold">
                    +{member.skills.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* View Full Profile CTA Card Footer */}
            <div className="px-5 py-3 bg-gradient-to-r from-red-50/70 to-yellow-50/40 border-t border-red-100/60 flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-red-700">
                {member.organisationRole}
              </span>
              <button
                onClick={() => navigate(`/members/${member.id}`)}
                className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'View Dossier' : 'விவரம்'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
