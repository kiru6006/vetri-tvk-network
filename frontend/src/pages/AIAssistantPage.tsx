import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_MEMBERS } from '../mock/data';

interface SearchResult {
  query: string;
  answer: string;
  structuredFilters: Record<string, string>;
  membersMatched: typeof MOCK_MEMBERS;
  sources: string[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

export const AIAssistantPage: React.FC = () => {
  const { language, currentRole } = useApp();
  const navigate = useNavigate();

  const [inputQuery, setInputQuery] = useState('');
  const [activeResult, setActiveResult] = useState<SearchResult | null>({
    query: 'Find verified lawyers in Salem North who handle motor accident claims',
    answer:
      'Found 1 verified advocate in Salem North (AC-089) specializing in Motor Accident Claims (MACT) and Civil Rights litigation with active standing.',
    structuredFilters: {
      AssemblyConstituency: 'Salem North (AC-089)',
      Profession: 'Senior Advocate',
      Specialisation: 'Motor Accident Claims (MACT)',
      VerificationStatus: 'VERIFIED',
    },
    membersMatched: [MOCK_MEMBERS[1]],
    sources: ['Party Registry DB', 'Advocates Wing Ledger', 'District Verification Desk'],
    confidence: 'HIGH',
  });

  const sampleQueries = [
    'Find verified cardiologists in Salem North',
    'Who is responsible for Polling Booth 143?',
    'Show IT professionals in Chennai Central',
    'Find organic farming consultants in Salem',
  ];

  const handleExecuteQuery = (queryText: string) => {
    setInputQuery(queryText);
    if (queryText.includes('cardiologist') || queryText.includes('Salem')) {
      setActiveResult({
        query: queryText,
        answer: 'Found 1 verified cardiologist in Salem District assigned to District Medical Wing Secretary role.',
        structuredFilters: {
          District: 'Salem',
          Specialisation: 'Interventional Cardiology',
          VerificationStatus: 'VERIFIED',
        },
        membersMatched: [MOCK_MEMBERS[0]],
        sources: ['Medical Wing Registry', 'Cadre Medical ID'],
        confidence: 'HIGH',
      });
    } else {
      setActiveResult({
        query: queryText,
        answer: `Processed natural query: "${queryText}". Found relevant verified party cadre and assigned coordinators according to active RBAC rules for ${currentRole}.`,
        structuredFilters: {
          QueryIntent: 'Semantic Cadre Retrieval',
          Scope: 'Salem & Chennai Regional Units',
          RBAC: 'Strict Masking Enabled',
        },
        membersMatched: [MOCK_MEMBERS[0], MOCK_MEMBERS[1]],
        sources: ['Central Party Registry', 'AC Cadre Ledger'],
        confidence: 'HIGH',
      });
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-5xl mx-auto pb-12">
      {/* AI Header Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-red-950 text-white border-2 border-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex items-center space-x-3 sm:space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center shadow-lg border border-yellow-300/40 shrink-0">
            <Bot className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight">
              {language === 'en' ? 'TVK Intelligent Cadre Assistant' : 'தவெக அறிவார்ந்த AI உதவியாளர்'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'en'
                ? 'Authorized natural-language search strictly bounded by RBAC & backend tool calls.'
                : 'கள உறுப்பினர்கள் மற்றும் கட்சி ஆவணங்களை இயற்கை மொழியில் தேடும் வழிகாட்டி.'}
            </p>
          </div>
        </div>
      </div>

      {/* Natural Language Prompt Input */}
      <div className="bg-white rounded-2xl border-2 border-white p-4 sm:p-5 shadow-xs space-y-3">
        <div className="relative">
          <textarea
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Ask anything (e.g., "Find verified lawyers in Salem North", "Who is responsible for Booth 143?")...'
                : 'இயல்புமொழியில் கேட்கவும் (எ.கா. "சேலம் வடக்கு வழக்கறிஞர்களைக் கண்டறியவும்")...'
            }
            rows={2}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 sm:p-3.5 pr-24 sm:pr-32 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 resize-none font-sans"
          />
          <button
            onClick={() => handleExecuteQuery(inputQuery || sampleQueries[0])}
            className="absolute right-2.5 bottom-3 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs border border-red-500/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Search' : 'தேடுக'}</span>
          </button>
        </div>

        {/* Sample Prompts */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-bold flex items-center space-x-1 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Sample Prompts:</span>
          </span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleExecuteQuery(q)}
              className="text-[11px] bg-slate-100 hover:bg-yellow-50 hover:text-red-700 text-slate-700 font-medium px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-slate-200/60"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* AI Grounded Response Dossier with White Card Border */}
      {activeResult && (
        <div className="bg-white rounded-2xl border-2 border-white p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5 animate-fade-in">
          {/* Grounding & Evidence Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                Confidence: {activeResult.confidence}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium flex items-center space-x-1">
                <Database className="w-3 h-3 text-slate-400" />
                <span>Sources: {activeResult.sources.join(', ')}</span>
              </span>
            </div>
            <div className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-bold border border-amber-200">
              RBAC Verified for {currentRole}
            </div>
          </div>

          {/* AI Explanation Text */}
          <div className="text-xs text-slate-800 leading-relaxed font-medium bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-100">
            {activeResult.answer}
          </div>

          {/* Structured Filters Synthesized from Natural Language */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interpreted Intent & Applied Backend Filters
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(activeResult.structuredFilters).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center space-x-1 text-slate-700 text-[11px]"
                >
                  <span className="font-semibold text-slate-500">{k}:</span>
                  <span className="font-bold text-slate-900">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Matched Cadre Profiles */}
          {activeResult.membersMatched.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Matched Cadre Profiles ({activeResult.membersMatched.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {activeResult.membersMatched.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-red-300 transition-all space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{member.name}</h4>
                        <p className="text-[11px] text-amber-800 font-bold font-mono">
                          {member.memberNumber}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs space-y-1 text-slate-600">
                      <p className="font-semibold text-slate-800">{member.profession}</p>
                      <p className="text-[11px] text-slate-500">
                        {member.district} • {member.assemblyConstituency}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-red-700">
                        {member.organisationRole}
                      </span>
                      <button
                        onClick={() => navigate(`/members/${member.id}`)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-yellow-50 hover:text-red-700 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
