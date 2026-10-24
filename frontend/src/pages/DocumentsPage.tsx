import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { language } = useApp();

  const documents = [
    {
      id: 'doc-1',
      title: 'TVK Party Constitution & Cadre Code of Conduct (2026 Edition)',
      titleTamil: 'தவெக கட்சி அரசியல் சாசனம் மற்றும் தோழர்கள் நடத்தை விதிகள்',
      category: 'Constitution',
      version: 'v2.4',
      size: '2.4 MB',
      date: '2026-01-15',
      accessLevel: 'PUBLIC_CADRE',
    },
    {
      id: 'doc-2',
      title: 'State Election Operations Manual: Booth Management & Form 17C Protocol',
      titleTamil: 'வாக்குச்சாவடி முகவர்கள் மற்றும் படிவம் 17C மேலாண்மை வழிகாட்டி',
      category: 'Election Manual',
      version: 'v1.1',
      size: '4.8 MB',
      date: '2026-09-01',
      accessLevel: 'BOOTH_COORDINATOR_PLUS',
    },
    {
      id: 'doc-3',
      title: 'Professional Wings Directive: Standard Operating Procedures for Free Camps',
      titleTamil: 'தொழில்முறை அணிகளுக்கான இலவச முகாம் நடத்தும் நெறிமுறைகள்',
      category: 'Guidelines',
      version: 'v1.8',
      size: '1.2 MB',
      date: '2026-10-05',
      accessLevel: 'WING_COORDINATOR_PLUS',
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Official Party Knowledge & Documents' : 'கட்சி ஆவணங்கள் & கொள்கை வழிகாட்டிகள்'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'en'
              ? 'Authorized resolutions, circulars, and cadre training doctrine with cryptographic integrity.'
              : 'கட்சி அரசியல் சாசனம், தீர்மானங்கள் மற்றும் அதிகாரப்பூர்வ வழிகாட்டுதல்கள்.'}
          </p>
        </div>
      </div>

      <div className="space-y-3.5 sm:space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border-2 border-white p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start space-x-3.5 sm:space-x-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0 border border-red-100">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                    {doc.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{doc.version}</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  {language === 'en' ? doc.title : doc.titleTamil}
                </h3>
                <p className="text-xs text-slate-400">
                  Updated: {doc.date} • Size: {doc.size}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 self-start md:self-auto">
              <button className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-2 transition-colors cursor-pointer shadow-xs">
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Download PDF' : 'பதிவிறக்கம்'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
