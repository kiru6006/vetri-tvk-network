import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Network,
  Layers,
  Calendar,
  Bell,
  HeartHandshake,
  FileText,
  Bot,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    language,
    currentRole,
    isSidebarCollapsed,
    toggleSidebar,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useApp();

  const navItems = [
    {
      group: language === 'en' ? 'Core Platform' : 'முக்கிய தளம்',
      items: [
        {
          name: language === 'en' ? 'Executive Dashboard' : 'செயற்குழு பலகை',
          path: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          name: language === 'en' ? 'Member Directory' : 'உறுப்பினர் பட்டியல்',
          path: '/members',
          icon: Users,
        },
        {
          name: language === 'en' ? 'Organisation Units' : 'அமைப்பு பிரிவுகள்',
          path: '/organisation',
          icon: Network,
        },
        {
          name: language === 'en' ? 'Wings Directory' : 'அணிகள் பட்டியல்',
          path: '/wings',
          icon: Layers,
        },
      ],
    },
    {
      group: language === 'en' ? 'Field & Cadre' : 'களப்பணி மற்றும் தோழர்கள்',
      items: [
        {
          name: language === 'en' ? 'Events & Camps' : 'நிகழ்வுகள் மற்றும் முகாம்கள்',
          path: '/events',
          icon: Calendar,
        },
        {
          name: language === 'en' ? 'Announcements' : 'அறிவிப்புகள்',
          path: '/announcements',
          icon: Bell,
        },
        {
          name: language === 'en' ? 'Service Requests' : 'மக்கள் சேவை கோரிக்கைகள்',
          path: '/service-requests',
          icon: HeartHandshake,
        },
        {
          name: language === 'en' ? 'Official Messages' : 'அதிகாரப்பூர்வ செய்திகள்',
          path: '/messages',
          icon: MessageSquare,
        },
      ],
    },
    {
      group: language === 'en' ? 'Intelligence & Governance' : 'நுண்ணறிவு & மேலாண்மை',
      items: [
        {
          name: language === 'en' ? 'TVK AI Assistant' : 'தவெக AI உதவியாளர்',
          path: '/ai-assistant',
          icon: Bot,
          badge: 'AI',
        },
        {
          name: language === 'en' ? 'Party Documents' : 'கட்சி ஆவணங்கள்',
          path: '/documents',
          icon: FileText,
        },
        {
          name: language === 'en' ? 'Administration & RBAC' : 'நிர்வாகம் & தணிக்கை',
          path: '/admin',
          icon: ShieldCheck,
          adminOnly: true,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800/90 shrink-0 select-none shadow-2xl transition-all duration-300 ease-in-out ${
          /* Mobile slide in / out */
          isMobileSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${
          /* Desktop & iPad expanded vs collapsed state */
          isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        }`}
      >
        {/* Brand Header with TVK Official Flag Accent (Red - Yellow - Red) */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 w-full shrink-0"></div>

        {/* Top Header & Toggle */}
        <div className="p-3.5 border-b border-slate-800/90 flex items-center justify-between bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex flex-col items-center justify-center font-black text-yellow-300 shadow-md text-base tracking-tighter border border-yellow-400/40 shrink-0 ring-1 ring-yellow-400/30">
              <span>TVK</span>
            </div>
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <div className="overflow-hidden transition-all duration-200">
                <div className="flex items-center space-x-1.5">
                  <h1 className="font-black text-white text-sm tracking-wider">TVK NETWORK</h1>
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-yellow-400 font-semibold tracking-tight truncate">
                  {language === 'en' ? 'Cadre Operating System' : 'உறுப்பினர் வலையமைப்பு'}
                </p>
              </div>
            )}
          </div>

          {/* Close button on mobile / Expand-Collapse on desktop & iPad */}
          <div className="flex items-center">
            {/* Mobile close */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop / iPad collapse button */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-850 transition-colors cursor-pointer border border-slate-800"
              title={isSidebarCollapsed ? 'Expand Menu' : 'Collapse Menu'}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-yellow-400" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-5">
          {navItems.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {(!isSidebarCollapsed || isMobileSidebarOpen) ? (
                <h3 className="px-2.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
                  <span className="w-1.5 h-3 bg-red-600 rounded-full inline-block"></span>
                  <span className="truncate">{section.group}</span>
                </h3>
              ) : (
                <div className="my-2 border-t border-slate-850 mx-1"></div>
              )}

              {section.items.map((item) => {
                if (item.adminOnly && !['STATE_ADMIN', 'SUPER_ADMIN', 'AUDITOR'].includes(currentRole)) {
                  return null;
                }
                const Icon = item.icon;
                const isCollapsed = isSidebarCollapsed && !isMobileSidebarOpen;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      // auto close mobile drawer upon navigation
                      if (window.innerWidth < 1024) {
                        setIsMobileSidebarOpen(false);
                      }
                    }}
                    title={isCollapsed ? item.name : undefined}
                    className={({ isActive }) =>
                      `flex items-center ${
                        isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'
                      } text-xs font-semibold rounded-xl transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-red-900/90 to-slate-900 text-yellow-300 border-l-4 border-yellow-400 shadow-sm'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white hover:translate-x-0.5'
                      }`
                    }
                  >
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                      <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-yellow-400 transition-colors" />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span className="flex items-center space-x-1 px-1.5 py-0.5 text-[9px] font-extrabold bg-yellow-400/20 text-yellow-300 rounded border border-yellow-400/40 shrink-0">
                        <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Jurisdiction Footer with TVK Flag Theme */}
        <div className="p-3 border-t border-slate-800/90 bg-slate-950 text-xs">
          {(!isSidebarCollapsed || isMobileSidebarOpen) ? (
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                {language === 'en' ? 'Active Unit Node' : 'செயலில் உள்ள பிரிவு'}:
              </div>
              <div className="text-white font-bold text-xs truncate mt-0.5 flex items-center justify-between">
                <span className="truncate">Salem North (AC-089)</span>
                <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded border border-yellow-400/20 shrink-0 ml-1">
                  TN-SLM
                </span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center space-x-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping shrink-0"></span>
                <span className="truncate">Encrypted Central Session</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[9px] font-black text-yellow-400 bg-yellow-400/10 px-1 py-0.5 rounded border border-yellow-400/30">
                SLM
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
