import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_WINGS } from '../mock/data';
import {
  Layers,
  Cpu,
  Stethoscope,
  Scale,
  Wheat,
  Store,
  Flame,
  ShieldAlert,
  Search,
  ArrowRight,
  Scissors,
  HeartHandshake,
  GraduationCap,
  Megaphone,
  Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WingsPage: React.FC = () => {
  const { language } = useApp();
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWings = MOCK_WINGS.filter((w) => {
    const matchCategory = categoryFilter === 'ALL' || w.category === categoryFilter;
    const matchSearch =
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.nameTamil.includes(searchTerm) ||
      w.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-red-600" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-red-600" />;
      case 'Scale': return <Scale className="w-5 h-5 text-yellow-600" />;
      case 'Wheat': return <Wheat className="w-5 h-5 text-yellow-600" />;
      case 'Store': return <Store className="w-5 h-5 text-red-600" />;
      case 'Flame': return <Flame className="w-5 h-5 text-red-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-yellow-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-red-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-yellow-600" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-red-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-yellow-600" />;
      default: return <Layers className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {language === 'en' ? 'Professional & Occupational Wings Hub' : 'தொழில்முறை & கள அணிகள் தளம்'}
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs">
              32 WINGS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'en'
              ? 'Categorized network: Professional, Occupational, Social, and Functional Wings.'
              : 'கட்சியின் 4 பிரதான வகை அணிகள் மற்றும் அவற்றின் கள செயல்பாடுகள்.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs with TVK Red/Yellow Styling */}
      <div className="bg-white p-4 rounded-xl border border-red-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>
        <div className="flex items-center space-x-2 overflow-x-auto text-xs font-bold pt-1">
          {[
            { id: 'ALL', label: language === 'en' ? 'All Wings (32)' : 'அனைத்து அணிகள்' },
            { id: 'PROFESSIONAL', label: language === 'en' ? 'Professional (IT, Med, Law)' : 'தொழில்முறை' },
            { id: 'OCCUPATIONAL', label: language === 'en' ? 'Occupational (Farmers, Weavers, MSME)' : 'தொழிலாளர்கள்' },
            { id: 'SOCIAL', label: language === 'en' ? 'Social (Youth, Women, Students)' : 'சமூகம்' },
            { id: 'FUNCTIONAL', label: language === 'en' ? 'Functional (Media, Disaster)' : 'செயல்பாட்டு' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                categoryFilter === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-yellow-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-yellow-50 hover:text-red-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-64 pt-1">
          <Search className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'en' ? 'Search wings...' : 'அணிகளை தேடவும்...'}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 font-medium"
          />
        </div>
      </div>

      {/* Wings Grid with TVK Red/Yellow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWings.map((wing) => (
          <div
            key={wing.id}
            className="bg-white rounded-2xl border-2 border-red-100/80 shadow-2xs hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between overflow-hidden relative group"
          >
            {/* Top Red & Yellow Gradient Accent Bar */}
            <div className="h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 w-full shrink-0"></div>

            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-50 to-yellow-50 border border-red-200/80 flex items-center justify-center shadow-xs">
                    {getIcon(wing.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {language === 'en' ? wing.name : wing.nameTamil}
                    </h3>
                    <span className="text-[10px] font-black text-red-700 bg-yellow-100 px-2.5 py-0.5 rounded-full border border-yellow-300 uppercase tracking-tight">
                      {wing.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3.5 line-clamp-2 leading-relaxed font-medium">
                {wing.description}
              </p>

              <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500 font-medium">
                  <span>State Coordinator:</span>
                  <span className="font-bold text-slate-800">{wing.coordinatorName}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 font-medium">
                  <span>Enrolled Cadre:</span>
                  <span className="font-black text-slate-900">
                    {wing.memberCount.toLocaleString()} Members
                  </span>
                </div>
              </div>
            </div>

            {/* Wing Card Footer */}
            <div className="px-5 py-3 bg-gradient-to-r from-red-50/70 to-yellow-50/40 border-t border-red-100/60">
              <button
                onClick={() => navigate('/members')}
                className="w-full py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>{language === 'en' ? 'Explore Wing Cadre' : 'அணி உறுப்பினர்கள்'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
