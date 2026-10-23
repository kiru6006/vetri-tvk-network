import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, CheckCircle2, Clock, AlertTriangle, Filter, Plus } from 'lucide-react';
import { MOCK_SERVICE_REQUESTS } from '../mock/data';

export const ServiceRequestsPage: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Citizen Service & Grievance Desk' : 'மக்கள் சேவை மற்றும் கோரிக்கைகள் மேசை'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'en'
              ? 'Routing grassroots citizen requests directly to specialized party professional wings.'
              : 'பொதுமக்களின் அவசரத் தேவைகளை உரிய தொழில்முறை அணிகளிடம் ஒப்படைத்தல்.'}
          </p>
        </div>

        <button className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Log Grievance / Request' : 'புதிய கோரிக்கை பதிவு'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_SERVICE_REQUESTS.map((sr) => (
          <div
            key={sr.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs font-mono">{sr.requestId}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 uppercase">
                  {sr.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">{sr.citizenName}</h3>
                <p className="text-[11px] text-slate-500">{sr.location}</p>
              </div>

              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                {sr.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-red-800">
                Assigned: {sr.assignedWing}
              </span>
              <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition-colors cursor-pointer">
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
