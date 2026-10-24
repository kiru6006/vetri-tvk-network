import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Clock, Users, Plus } from 'lucide-react';
import { MOCK_EVENTS } from '../mock/data';

export const EventsPage: React.FC = () => {
  const { language, currentRole } = useApp();

  return (
    <div className="space-y-5 sm:space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Field Events & Service Camps' : 'கள நிகழ்வுகள் & முகாம்கள்'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'en'
              ? 'Multi-specialty medical camps, legal aid drives, and constituency cadres meetings.'
              : 'இலவச மருத்துவ முகாம்கள், சட்ட ஆலோசனை மற்றும் வாக்குச்சாவடி முகவர் கூட்டங்கள்.'}
          </p>
        </div>

        {['CONSTITUENCY_ADMIN', 'DISTRICT_ADMIN', 'WING_COORDINATOR', 'STATE_ADMIN', 'SUPER_ADMIN'].includes(currentRole) && (
          <button className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs border border-red-500/40 self-start sm:self-auto">
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Organize Camp / Event' : 'புதிய முகாம் அறிவிக்க'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {MOCK_EVENTS.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl border-2 border-white p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wide">
                  {ev.type.replace('_', ' ')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {ev.status}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                {language === 'en' ? ev.title : ev.titleTamil}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <p className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{ev.date}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{ev.time}</span>
                </p>
                <p className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-yellow-600 shrink-0 mt-0.5" />
                  <span>{ev.location}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{ev.registeredCount} Cadres</span>
              </span>
              <button className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl transition-colors cursor-pointer border border-red-200/60">
                {language === 'en' ? 'Register' : 'பங்கேற்க'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
