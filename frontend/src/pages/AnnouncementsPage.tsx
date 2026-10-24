import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Plus } from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '../mock/data';

export const AnnouncementsPage: React.FC = () => {
  const { language, currentRole } = useApp();

  return (
    <div className="space-y-5 sm:space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Party Directives & Circulars' : 'கட்சி சுற்றறிக்கைகள் மற்றும் அறிவிப்புகள்'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'en'
              ? 'Official constitutional announcements broadcasted from State HQ to cadres.'
              : 'தலைமையகத்திலிருந்து தோழர்களுக்கு அனுப்பப்படும் அதிகாரப்பூர்வ அறிவிப்புகள்.'}
          </p>
        </div>

        {['STATE_ADMIN', 'SUPER_ADMIN'].includes(currentRole) && (
          <button className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs border border-red-500/40 self-start sm:self-auto">
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Publish Directive' : 'அறிவிப்பு வெளியிட'}</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {MOCK_ANNOUNCEMENTS.map((ann) => (
          <div
            key={ann.id}
            className="bg-white rounded-2xl border-2 border-white p-4 sm:p-6 shadow-xs space-y-3 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                {ann.priority} PRIORITY
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{ann.publishedAt}</span>
              </span>
            </div>

            <h2 className="text-base font-black text-slate-900">
              {language === 'en' ? ann.title : ann.titleTamil}
            </h2>

            <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-100">
              {ann.content}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500">
              <span>Target: <strong className="text-slate-800">{ann.targetScope}</strong></span>
              <span>Issued by: <strong className="text-red-800">{ann.author}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
