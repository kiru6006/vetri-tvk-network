import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Sparkles,
  Send,
  UserCheck,
  Shield,
  MapPin,
  Briefcase,
  CheckCircle,
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
    'Show IT professionals in Chennai Central who know Python and Cloud',
    'Find organic farming consultants in Salem district',
  ];

  const handleExecuteQuery = (queryText: string) => {
    setInputQuery(queryText);
    if (queryText.includes('cardiologist') || queryText.includes('Salem')) {
      setActiveResult({
        query: queryText,
        answer: 'Found 1 verified cardiologist in Salem District assigned to District Medical Wing Secretary role.',
        structuredFilters: {
          District: 'Salem',
          Profession: 'Interventional Cardiologist',
          VerificationStatus: 'VERIFIED',
        },
        membersMatched: [MOCK_MEMBERS[0]],
        sources: ['Party Central Registry', 'Medical Wing Roster'],
        confidence: 'HIGH',
      });
    } else if (queryText.includes('Booth 143')) {
      setActiveResult({
        query: queryText,
        answer:
          'Polling Booth 143 is located at Govt Girls Higher Sec School, Ward 24, Salem North. Designated Booth Coordinator is A. Dinesh.',
        structuredFilters: {
          UnitType: 'POLLING_BOOTH',
          BoothCode: 'TN-SLM-B143',
          Location: 'Ward 24, Salem North',
        },
        membersMatched: [],
        sources: ['Organisation Units Hierarchy Master'],
        confidence: 'HIGH',
      });
    } else {
      setActiveResult({
        query: queryText,
        answer: 'Found 1 verified cloud and AI architect in Chennai Central enrolled in State Digital Committee.',
        structuredFilters: {
          District: 'Chennai',
          Profession: 'Principal Cloud & AI Architect',
          Skills: 'Python, Cloud Infrastructure, AI Workflows',
        },
        membersMatched: [MOCK_MEMBERS[2]],
        sources: ['IT Wing Database', 'Skills Graph'],
        confidence: 'HIGH',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 text-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
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
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
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
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 resize-none font-sans"
          />
          <button
            onClick={() => handleExecuteQuery(inputQuery || sampleQueries[0])}
            className="absolute right-3 bottom-3 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-md flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Search Assistant' : 'தேடுக'}</span>
          </button>
        </div>

        {/* Sample Prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-semibold flex items-center space-x-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Sample Prompts:</span>
          </span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleExecuteQuery(q)}
              className="text-[11px] bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* AI Grounded Response Dossier */}
      {activeResult && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5 animate-fade-in">
          {/* Grounding & Evidence Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                Confidence: {activeResult.confidence}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium flex items-center space-x-1">
                <Database className="w-3 h-3 text-slate-400" />
                <span>Sources: {activeResult.sources.join(', ')}</span>
              </span>
            </div>
            <div className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded font-semibold border border-amber-200">
              RBAC Verified for {currentRole}
            </div>
          </div>

          {/* AI Explanation Text */}
          <div className="text-xs text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-lg border border-slate-100">
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
                  className="bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 flex items-center space-x-1 text-slate-700 text-[11px]"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeResult.membersMatched.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 rounded-lg border border-slate-200 bg-white hover:border-red-300 transition-all space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{member.name}</h4>
                        <p className="text-[11px] text-amber-800 font-semibold">
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
                        className="px-2.5 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center space-x-1"
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
