import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Clock, Users, Plus } from 'lucide-react';
import { MOCK_EVENTS } from '../mock/data';

export const EventsPage: React.FC = () => {
  const { language, currentRole } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Field Events & Service Camps' : 'கள நிகழ்வுகள் & முகாம்கள்'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'en'
              ? 'Multi-specialty medical camps, legal aid drives, and constituency cadres meetings.'
              : 'இலவச மருத்துவ முகாம்கள், சட்ட ஆலோசனை மற்றும் வாக்குச்சாவடி முகவர் கூட்டங்கள்.'}
          </p>
        </div>

        {['CONSTITUENCY_ADMIN', 'DISTRICT_ADMIN', 'WING_COORDINATOR', 'STATE_ADMIN', 'SUPER_ADMIN'].includes(currentRole) && (
          <button className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Organize Camp / Event' : 'புதிய முகாம் அறிவிக்க'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_EVENTS.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                  {ev.type.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {ev.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
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
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{ev.location}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{ev.registeredCount} Cadres Enrolled</span>
              </span>
              <button className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs rounded transition-colors cursor-pointer">
                {language === 'en' ? 'Register Attendance' : 'பங்கேற்க'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
