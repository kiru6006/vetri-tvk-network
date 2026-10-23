import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, Search, Users, Shield, Paperclip, CheckCheck } from 'lucide-react';
import { MOCK_MEMBERS } from '../mock/data';

export const MessagesPage: React.FC = () => {
  const { language, currentUser } = useApp();
  const [selectedChannel, setSelectedChannel] = useState('channel-slm-north');
  const [messageText, setMessageText] = useState('');

  const channels = [
    {
      id: 'channel-slm-north',
      name: 'Salem North (AC-089) Functionaries',
      type: 'CONSTITUENCY',
      unread: 2,
      lastMessage: 'Health camp logistics finalized at Alagapuram school.',
      time: '14:20',
    },
    {
      id: 'channel-med-wing',
      name: 'District Medical Wing Council',
      type: 'WING',
      unread: 0,
      lastMessage: 'Blood donation kits dispatched to emergency unit.',
      time: 'Yesterday',
    },
    {
      id: 'channel-booth-143',
      name: 'Booth 143 Cadre Action Group',
      type: 'BOOTH',
      unread: 0,
      lastMessage: 'Voter verification drive completed for 142 households.',
      time: 'Oct 21',
    },
  ];

  const chatMessages = [
    {
      id: 'm1',
      sender: 'Adv. S. Meenakshi Sundaram',
      role: 'Advocates Wing Lead',
      text: 'Vanakkam comrades. Legal clearance obtained from local revenue authority for the community health camp.',
      time: '11:15 AM',
      isMe: false,
    },
    {
      id: 'm2',
      sender: 'Dr. R. Aravindhan',
      role: 'District Medical Secretary',
      text: 'Excellent. 6 specialist doctors and 12 paramedical volunteers are scheduled to report at 8:00 AM sharp.',
      time: '11:32 AM',
      isMe: true,
    },
    {
      id: 'm3',
      sender: 'K. Senthilkumar',
      role: 'District Secretary',
      text: 'Ensure all booth coordinators receive circular 2026/08 regarding the verification drive simultaneously.',
      time: '14:20 PM',
      isMe: false,
    },
  ];

  return (
    <div className="h-[calc(100vh-7rem)] flex rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
      {/* Channels Sidebar */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50 shrink-0">
        <div className="p-3 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search conversations...' : 'உரையாடல்களை தேடவும்...'}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {channels.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedChannel(c.id)}
              className={`p-3.5 transition-colors cursor-pointer ${
                selectedChannel === c.id
                  ? 'bg-red-50/70 border-l-4 border-red-700'
                  : 'hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 truncate">{c.name}</span>
                <span className="text-[10px] text-slate-400 shrink-0">{c.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-1">{c.lastMessage}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-slate-200 text-slate-700">
                  {c.type}
                </span>
                {c.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Conversation Pane */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Pane Header */}
        <div className="h-14 border-b border-slate-200 px-6 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-xs font-bold text-slate-900">
              Salem North (AC-089) Functionaries Group
            </h2>
            <p className="text-[10px] text-slate-400 flex items-center space-x-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>Official Channel • Encrypted by State Central Node</span>
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            24 Cadres Connected
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-2 text-[10px] text-slate-400 mb-1 px-1">
                <span className="font-bold text-slate-700">{msg.sender}</span>
                <span>•</span>
                <span className="text-amber-800 font-semibold">{msg.role}</span>
                <span>•</span>
                <span>{msg.time}</span>
              </div>
              <div
                className={`max-w-md p-3.5 rounded-xl text-xs leading-relaxed ${
                  msg.isMe
                    ? 'bg-red-700 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center space-x-3 shrink-0">
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Type official broadcast message...'
                : 'அதிகாரப்பூர்வ செய்தியை உள்ளிடவும்...'
            }
            className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30"
          />
          <button className="p-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors cursor-pointer shadow-xs">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
