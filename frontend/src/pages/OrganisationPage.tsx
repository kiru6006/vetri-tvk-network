import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ORGANISATION_UNITS } from '../mock/data';
import { OrganisationUnit } from '../types';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Plus
} from 'lucide-react';

export const OrganisationPage: React.FC = () => {
  const { language, currentRole } = useApp();
  const [selectedUnit, setSelectedUnit] = useState<OrganisationUnit>(MOCK_ORGANISATION_UNITS[0]);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'org-state-1': true,
    'org-dist-salem': true,
    'org-ac-salem-north': true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Party Organisation Hierarchy' : 'கட்சி அமைப்பு கட்டமைப்பு'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'en'
              ? 'Multi-level constitutional tree: State HQ → District → AC → Ward → Polling Booth.'
              : 'மாநில தலைமையகம் முதல் வாக்குச்சாவடி வரையிலான ஜனநாயகக் கட்டமைப்பு.'}
          </p>
        </div>

        {['STATE_ADMIN', 'SUPER_ADMIN'].includes(currentRole) && (
          <button className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 transition-colors cursor-pointer shadow-xs self-start sm:self-auto">
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Add Organisation Unit' : 'புதிய பிரிவு சேர்க்க'}</span>
          </button>
        )}
      </div>

      {/* Two Column Layout: Hierarchy Tree & Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Tree Explorer */}
        <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-white p-4 sm:p-5 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'en' ? 'Administrative Tree' : 'அமைப்பு கிளைகள்'}
          </h2>

          <div className="space-y-2 text-xs select-none">
            {/* Level 1: State HQ */}
            {MOCK_ORGANISATION_UNITS.filter((u) => u.level === 1).map((stateUnit) => (
              <div key={stateUnit.id} className="space-y-2">
                <div
                  onClick={() => {
                    toggleNode(stateUnit.id);
                    setSelectedUnit(stateUnit);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedUnit.id === stateUnit.id
                      ? 'bg-red-50/80 border-red-300 text-red-950 font-bold'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {expandedNodes[stateUnit.id] ? (
                      <ChevronDown className="w-4 h-4 text-red-600 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="font-bold">{stateUnit.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-semibold">
                    {stateUnit.code}
                  </span>
                </div>

                {/* Level 2: Districts */}
                {expandedNodes[stateUnit.id] && (
                  <div className="pl-4 sm:pl-6 space-y-2 border-l-2 border-slate-200 ml-3">
                    {MOCK_ORGANISATION_UNITS.filter((u) => u.level === 2).map((distUnit) => (
                      <div key={distUnit.id} className="space-y-2">
                        <div
                          onClick={() => {
                            toggleNode(distUnit.id);
                            setSelectedUnit(distUnit);
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                            selectedUnit.id === distUnit.id
                              ? 'bg-red-50/80 border-red-300 text-red-950 font-bold'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            {expandedNodes[distUnit.id] ? (
                              <ChevronDown className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            )}
                            <span className="font-medium">{distUnit.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {distUnit.cadreCount.toLocaleString()} Cadres
                          </span>
                        </div>

                        {/* Level 4: Assembly Constituencies */}
                        {expandedNodes[distUnit.id] && (
                          <div className="pl-4 sm:pl-5 space-y-1.5 border-l-2 border-slate-200 ml-3">
                            {MOCK_ORGANISATION_UNITS.filter(
                              (u) => u.parentId === distUnit.id
                            ).map((acUnit) => (
                              <div key={acUnit.id} className="space-y-1.5">
                                <div
                                  onClick={() => {
                                    toggleNode(acUnit.id);
                                    setSelectedUnit(acUnit);
                                  }}
                                  className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                                    selectedUnit.id === acUnit.id
                                      ? 'bg-red-50/80 border-red-300 text-red-950 font-bold'
                                      : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    {expandedNodes[acUnit.id] ? (
                                      <ChevronDown className="w-3 h-3 text-red-600 shrink-0" />
                                    ) : (
                                      <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                                    )}
                                    <span>{acUnit.name}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400">
                                    {acUnit.cadreCount.toLocaleString()}
                                  </span>
                                </div>

                                {/* Level 6: Polling Booths */}
                                {expandedNodes[acUnit.id] && (
                                  <div className="pl-4 space-y-1 border-l border-slate-200 ml-2">
                                    {MOCK_ORGANISATION_UNITS.filter(
                                      (u) => u.parentId === acUnit.id
                                    ).map((boothUnit) => (
                                      <div
                                        key={boothUnit.id}
                                        onClick={() => setSelectedUnit(boothUnit)}
                                        className={`flex items-center justify-between p-1.5 rounded-md text-[11px] transition-all cursor-pointer ${
                                          selectedUnit.id === boothUnit.id
                                            ? 'bg-yellow-100 text-slate-900 font-bold'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                      >
                                        <span>{boothUnit.name}</span>
                                        <span className="text-[10px] font-bold text-red-700 font-mono">
                                          {boothUnit.code}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Node Inspector */}
        <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-white p-5 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                Unit Type: {selectedUnit.type}
              </span>
              <h2 className="text-base font-black text-slate-900 mt-2">
                {language === 'en' ? selectedUnit.name : selectedUnit.nameTamil}
              </h2>
              <p className="text-xs text-amber-800 font-semibold mt-0.5">Code: {selectedUnit.code}</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {selectedUnit.status}
            </span>
          </div>

          {/* Unit Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-medium">Designated Functionary</span>
              <p className="font-bold text-slate-900 text-sm truncate">{selectedUnit.leaderName || 'To Be Assigned'}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-medium">Verified Cadre Strength</span>
              <p className="font-bold text-slate-900 text-sm">
                {selectedUnit.cadreCount.toLocaleString()} Members
              </p>
            </div>
          </div>

          {/* Active Unit Responsibilities & Directives */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'en' ? 'Key Field Responsibilities' : 'முக்கிய களப்பணிகள்'}
            </h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Maintain 100% booth agent verification and voter list cross-referencing.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Coordinate weekly door-to-door welfare grievance intake with Professional Wings.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Prompt execution of State Central Committee circulars within 48 hours.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
