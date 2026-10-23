import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Search,
  Globe,
  Shield,
  Bell,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { currentRole, setCurrentRole, language, setLanguage, currentUser } = useApp();
  const navigate = useNavigate();

  const roles: UserRole[] = [
    'MEMBER',
    'BOOTH_COORDINATOR',
    'WARD_COORDINATOR',
    'CONSTITUENCY_ADMIN',
    'DISTRICT_ADMIN',
    'WING_COORDINATOR',
    'STATE_ADMIN',
    'SUPER_ADMIN',
    'AUDITOR',
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs z-10 relative">
      {/* Subtle TVK Top Flag Accent Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>

      {/* Global Quick Search */}
      <div className="flex items-center space-x-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              language === 'en'
                ? 'Search members, wings, booths (Cmd+K)...'
                : 'உறுப்பினர்கள், அணிகள், வாக்குச்சாவடிகளை தேடவும்...'
            }
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 text-slate-800 placeholder-slate-400 transition-all font-medium"
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate('/members');
            }}
          />
        </div>
        <button
          onClick={() => navigate('/ai-assistant')}
          title="Launch AI Assistant"
          className="flex items-center space-x-1.5 px-3 py-2 text-xs font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer border border-red-500/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>{language === 'en' ? 'AI Search' : 'AI தேடல்'}</span>
        </button>
      </div>

      {/* Center/Right Controls: RBAC Simulator + Language Switcher + User Badge */}
      <div className="flex items-center space-x-4">
        {/* Live RBAC Simulator with TVK Gold/Yellow Accent */}
        <div className="flex items-center space-x-2 bg-yellow-50/80 border border-yellow-300/80 px-3 py-1.5 rounded-lg shadow-2xs">
          <Shield className="w-4 h-4 text-red-700" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-extrabold text-red-800 tracking-wider">
              {language === 'en' ? 'Active Simulated Role' : 'செயலில் உள்ள பதவி'}:
            </span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="text-xs font-bold text-slate-900 bg-transparent border-none focus:outline-none cursor-pointer pr-1"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bilingual Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-red-600" />
          <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>

        {/* Notification Bell with Red Badge */}
        <button className="relative p-2 text-slate-500 hover:text-red-700 hover:bg-red-50/60 rounded-lg transition-colors cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white"></span>
        </button>

        {/* User Profile Summary */}
        <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
          <div className="relative">
            <img
              src={currentUser.photoUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-red-600/40"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 border-2 border-white rounded-full"></span>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <div className="text-xs font-bold text-slate-900 flex items-center space-x-1">
              <span>{language === 'en' ? currentUser.name : currentUser.tamilName}</span>
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="text-[10px] text-red-700 font-semibold">{currentUser.memberNumber}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
