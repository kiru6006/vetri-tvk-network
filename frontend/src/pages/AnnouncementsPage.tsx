import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, AlertCircle, Clock, Plus, Tag } from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '../mock/data';

export const AnnouncementsPage: React.FC = () => {
  const { language, currentRole } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Party Directives & Circulars' : 'கட்சி சுற்றறிக்கைகள் மற்றும் அறிவிப்புகள்'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'en'
              ? 'Official constitutional announcements broadcasted from State HQ to cadres.'
              : 'தலைமையகத்திலிருந்து தோழர்களுக்கு அனுப்பப்படும் அதிகாரப்பூர்வ அறிவிப்புகள்.'}
          </p>
        </div>

        {['STATE_ADMIN', 'SUPER_ADMIN'].includes(currentRole) && (
          <button className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Publish Directive' : 'அறிவிப்பு வெளியிட'}</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {MOCK_ANNOUNCEMENTS.map((ann) => (
          <div
            key={ann.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800">
                {ann.priority} PRIORITY
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{ann.publishedAt}</span>
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900">
              {language === 'en' ? ann.title : ann.titleTamil}
            </h2>

            <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-lg border border-slate-100">
              {ann.content}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Target: <strong className="text-slate-800">{ann.targetScope}</strong></span>
              <span>Issued by: <strong className="text-red-800">{ann.author}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
