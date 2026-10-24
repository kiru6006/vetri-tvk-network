import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Search, Shield, Paperclip, ChevronLeft } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { language } = useApp();
  const [selectedChannel, setSelectedChannel] = useState('channel-slm-north');
  const [messageText, setMessageText] = useState('');
  const [showChannelListMobile, setShowChannelListMobile] = useState(false);

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
    <div className="h-[calc(100vh-6.5rem)] sm:h-[calc(100vh-7rem)] flex rounded-2xl border-2 border-white bg-white overflow-hidden shadow-xs relative">
      {/* Channels Sidebar - responsive mobile drawer or desktop column */}
      <div
        className={`${
          showChannelListMobile ? 'flex' : 'hidden md:flex'
        } absolute md:static inset-0 md:inset-auto z-20 w-full md:w-80 border-r border-slate-200 flex-col bg-slate-50 shrink-0`}
      >
        <div className="p-3 border-b border-slate-200 bg-white flex items-center space-x-2">
          {showChannelListMobile && (
            <button
              onClick={() => setShowChannelListMobile(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search conversations...' : 'உரையாடல்களை தேடவும்...'}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {channels.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedChannel(c.id);
                setShowChannelListMobile(false);
              }}
              className={`p-3.5 transition-colors cursor-pointer ${
                selectedChannel === c.id
                  ? 'bg-red-50/80 border-l-4 border-red-700'
                  : 'hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900 truncate">{c.name}</span>
                <span className="text-[10px] text-slate-400 shrink-0">{c.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-1">{c.lastMessage}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider bg-slate-200 text-slate-700">
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
      <div className="flex-1 flex flex-col bg-white min-w-0">
        {/* Pane Header */}
        <div className="h-14 border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center space-x-2 truncate">
            <button
              onClick={() => setShowChannelListMobile(true)}
              className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900"
              title="Channels List"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="truncate">
              <h2 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                Salem North (AC-089) Functionaries Group
              </h2>
              <p className="text-[10px] text-slate-400 flex items-center space-x-1 truncate">
                <Shield className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">Official Channel • Encrypted by State Central Node</span>
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-500 shrink-0 hidden sm:block">
            24 Cadres Connected
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
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
                className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.isMe
                    ? 'bg-red-700 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border-2 border-white rounded-tl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center space-x-2 sm:space-x-3 shrink-0">
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
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
            className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30"
          />
          <button className="p-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-300 rounded-xl transition-colors cursor-pointer shadow-xs border border-red-500/40">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
