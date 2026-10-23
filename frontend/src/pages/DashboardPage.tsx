import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ANNOUNCEMENTS, MOCK_EVENTS, MOCK_SERVICE_REQUESTS } from '../mock/data';

export const DashboardPage: React.FC = () => {
  const { language, currentUser } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Organizational Context Banner with TVK Flag Theme */}
      <div className="bg-gradient-to-r from-red-800 via-red-900 to-slate-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-red-700/50">
        {/* Subtle decorative yellow glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-extrabold uppercase tracking-wider text-yellow-300 bg-black/30 px-3 py-1 rounded-full border border-yellow-400/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              <span>
                {language === 'en'
                  ? 'Tamil Nadu Central Cadre Portal'
                  : 'தமிழ்நாடு மத்திய தோழர்கள் தளம்'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              {language === 'en'
                ? `Vanakkam, ${currentUser.name}`
                : `வணக்கம், ${currentUser.tamilName}`}
            </h1>
            <p className="text-xs text-slate-200 mt-1 flex flex-wrap items-center gap-2 font-medium">
              <span className="text-yellow-300 font-bold">{currentUser.organisationRole}</span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>
                  {currentUser.district} → {currentUser.assemblyConstituency} → {currentUser.booth}
                </span>
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => navigate('/ai-assistant')}
              className="px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer border border-yellow-300/40"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{language === 'en' ? 'Natural Language Search' : 'இயல்புமொழி தேடல்'}</span>
            </button>
            <button
              onClick={() => navigate('/members')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/25 transition-all flex items-center space-x-2 cursor-pointer backdrop-blur-xs"
            >
              <span>{language === 'en' ? 'Browse Cadre' : 'உறுப்பினர்கள்'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-yellow-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Governance Metrics with Harmonized TVK Visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Cadre */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-red-200 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-yellow-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {language === 'en' ? 'Total Enrolled Cadre' : 'மொத்த உறுப்பினர்கள்'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">148,500</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center space-x-1">
              <span>+12.4%</span>
              <span className="text-slate-400 font-normal">
                {language === 'en' ? 'across 38 districts' : '38 மாவட்டங்களில்'}
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2: Verification Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-emerald-200 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {language === 'en' ? 'Verification Rate' : 'சரிபார்க்கப்பட்ட விகிதம்'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">88.6%</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              {language === 'en' ? '131,570 Verified with ID' : '131,570 கள சரிபார்ப்பு பெற்றது'}
            </div>
          </div>
        </div>

        {/* Metric 3: Active Booth Units */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-yellow-300 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {language === 'en' ? 'Active Booth Units' : 'செயலில் உள்ள வாக்குச்சாவடிகள்'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-yellow-50 text-yellow-700 flex items-center justify-center border border-yellow-200">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">62,810</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              {language === 'en' ? 'Booth Agents Assigned' : 'முகவர்கள் நியமிக்கப்பட்டவை'}
            </div>
          </div>
        </div>

        {/* Metric 4: Professional Wings */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-red-200 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {language === 'en' ? 'Professional Wings' : 'தொழில்முறை அணிகள்'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-700 flex items-center justify-center border border-red-100">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">32</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              {language === 'en' ? 'IT, Medical, Legal, MSME...' : 'மருத்துவம், சட்டம், IT, விவசாயிகள்...'}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Urgent Circulars & Field Service Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Official Directives & Events */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent Directives */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {language === 'en' ? 'Official Party Directives' : 'கட்சியின் அதிகாரப்பூர்வ சுற்றறிக்கைகள்'}
                </h3>
              </div>
              <button
                onClick={() => navigate('/announcements')}
                className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
              >
                {language === 'en' ? 'View All' : 'அனைத்தும் பார்க்க'}
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_ANNOUNCEMENTS.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                      {ann.priority}
                    </span>
                    <span className="flex items-center space-x-1 text-slate-400 text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{ann.publishedAt}</span>
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {language === 'en' ? ann.title : ann.titleTamil}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Field Camps & Meetings */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-yellow-50 text-yellow-700 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {language === 'en' ? 'Scheduled Field Camps & Meetings' : 'திட்டமிடப்பட்ட கள நிகழ்வுகள்'}
                </h3>
              </div>
              <button
                onClick={() => navigate('/events')}
                className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
              >
                {language === 'en' ? 'Full Calendar' : 'முழு நாட்காட்டி'}
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_EVENTS.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-start justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all bg-white"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200/80 uppercase">
                      {ev.type.replace('_', ' ')}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">
                      {language === 'en' ? ev.title : ev.titleTamil}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center space-x-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ev.location}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-900 block">{ev.date}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Public Service Grievance Intake */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {language === 'en' ? 'Citizen Service Desk' : 'மக்கள் சேவை களக் கோரிக்கைகள்'}
                </h3>
              </div>
              <button
                onClick={() => navigate('/service-requests')}
                className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
              >
                {language === 'en' ? 'Manage' : 'நிர்வகிக்க'}
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3 font-medium">
              {language === 'en'
                ? 'Grassroots grievances channeled directly to professional wings.'
                : 'பொதுமக்களின் கோரிக்கைகள் உரிய தொழில்முறை அணிகளுக்கு ஒதுக்கப்படுகின்றன.'}
            </p>
            <div className="space-y-3">
              {MOCK_SERVICE_REQUESTS.map((sr) => (
                <div
                  key={sr.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-mono">{sr.requestId}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-yellow-100 text-yellow-900 border border-yellow-200">
                      {sr.status}
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">{sr.citizenName}</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                    {sr.description}
                  </p>
                  <div className="text-[10px] font-bold text-red-700 pt-1.5 border-t border-slate-200/60">
                    {language === 'en' ? 'Assigned to' : 'ஒதுக்கப்பட்டது'}: {sr.assignedWing}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TVK Official Identity Badge */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 text-white text-xs space-y-2 border border-slate-800 shadow-md">
            <div className="flex items-center space-x-2 font-bold text-yellow-300">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>TVK Party Constitution Verified</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Official red & yellow colors configured for dignified governance aesthetics. RBAC boundaries and data sovereignty policies active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
