import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  Mail,
  Trash2,
  CheckCheck,
  Search,
  Clock,
  Send,
  Lock,
  Download,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import type { ContactMessage } from '../services/contactDatabase';
import {
  getStoredMessages,
  markMessageAsRead,
  markAllMessagesAsRead,
  deleteMessage,
  clearStoredMessages,
} from '../services/contactDatabase';

const PASSCODE_HASH = 'deab4b1a1376a899b5275e56156c819acbb34b3f51ee67b3b3eadbb0d7dd8399';

async function hashInput(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const AdminMessages: React.FC = () => {
  const passcodeInputId = useId();
  const searchInputId = useId();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    const unlocked = sessionStorage.getItem('admin_messages_unlocked');
    if (unlocked === 'true') {
      setIsAuthenticated(true);
    }
    loadMessages();
  }, []);

  const loadMessages = () => {
    setMessages(getStoredMessages());
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const envPasscode = import.meta.env.VITE_ADMIN_PASSCODE;
    const inputTrimmed = passcode.trim();

    if (envPasscode) {
      if (inputTrimmed === envPasscode) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_messages_unlocked', 'true');
        setPassError(false);
        return;
      }
    } else {
      const enteredHash = await hashInput(inputTrimmed);
      if (enteredHash === PASSCODE_HASH) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_messages_unlocked', 'true');
        setPassError(false);
        return;
      }
    }

    setPassError(true);
  };

  const handleMarkRead = (id: string) => {
    const updated = markMessageAsRead(id);
    setMessages(updated);
  };

  const handleMarkAllRead = () => {
    const updated = markAllMessagesAsRead();
    setMessages(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteMessage(id);
    setMessages(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all messages from the database?')) {
      clearStoredMessages();
      setMessages([]);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio_messages_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'unread' ? msg.status === 'unread' : msg.status === 'read';

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  if (!isAuthenticated) {
    return (
      <section className="pt-6 pb-20 relative z-10 flex items-center justify-center min-h-[75vh] bg-[#F9F9F8]">
        <div className="max-w-md w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FAF9F7] border border-stone-300/80 rounded-[2rem] shadow-sm overflow-hidden"
          >
            <div className="px-6 py-3.5 border-b border-stone-200 flex items-center justify-between text-[10px] font-mono font-bold tracking-widest uppercase text-stone-500">
              <span>ADMIN VAULT</span>
              <span className="text-[#FF4400]">RESTRICTED</span>
            </div>

            <div className="p-8 bg-white text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-[#FAF9F7] text-stone-900 border border-stone-200 rounded-2xl flex items-center justify-center mb-5">
                <Lock size={24} />
              </div>

              <h1 className="font-editorial text-3xl text-stone-950 mb-2 font-normal">Inbox Access</h1>
              <p className="text-stone-500 text-sm mb-6">
                Enter your passcode to decrypt stored contact inquiries.
              </p>

              <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4 text-left">
                <div>
                  <label htmlFor={passcodeInputId} className="block text-[11px] font-mono font-bold tracking-wider uppercase text-stone-600 mb-1.5">
                    Passcode
                  </label>
                  <input
                    id={passcodeInputId}
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setPassError(false);
                    }}
                    placeholder="Enter admin passcode"
                    aria-invalid={passError ? 'true' : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 bg-[#FAF9F7] border rounded-xl outline-none text-center font-mono font-bold text-stone-900 transition-all ${
                      passError ? 'border-red-500' : 'border-stone-300 focus:border-black'
                    }`}
                  />
                  {passError && (
                    <p role="alert" className="text-xs text-red-600 font-semibold mt-2 text-center">
                      Incorrect passcode. Please try again.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3 bg-black hover:bg-[#FF4400] text-white text-xs font-mono font-bold tracking-widest uppercase rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck size={16} />
                  <span>Unlock Vault</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-stone-900 font-sans pb-16 pt-1 sm:pt-2 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] shadow-sm overflow-hidden"
        >
          {/* Kicker Strip */}
          <div className="px-6 sm:px-10 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500">
            <div className="flex items-center gap-2.5">
              <Inbox size={14} className="text-[#FF4400]" />
              <span className="font-bold text-stone-950">MESSAGES VAULT</span>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF4400] text-white text-[10px] font-bold">
                  {unreadCount} NEW
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadMessages}
                className="px-3.5 py-1.5 bg-white border border-stone-300 hover:border-black text-stone-800 rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RefreshCw size={12} />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleExportJSON}
                disabled={messages.length === 0}
                className="px-4 py-1.5 bg-black hover:bg-[#FF4400] text-white rounded-full text-[11px] font-bold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer transition-colors"
              >
                <Download size={12} />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {/* Title & Search Bar */}
          <div className="px-6 sm:px-10 py-8 border-b border-stone-200 bg-white flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-stone-950 tracking-tight mb-2">
                Inbox Ledger.
              </h1>
              <p className="text-stone-600 text-sm sm:text-base">
                Stored inquiry submissions managed inside the portfolio database.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <search className="relative w-full sm:w-64">
                <label htmlFor={searchInputId} className="visually-hidden">
                  Search messages
                </label>
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <input
                  id={searchInputId}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search inbox..."
                  className="w-full min-h-[42px] pl-10 pr-4 py-2 bg-[#FAF9F7] border border-stone-300 rounded-full outline-none focus:border-black text-sm text-stone-800"
                />
              </search>

              <div className="flex bg-[#FAF9F7] border border-stone-200 p-1 rounded-full">
                {(['all', 'unread', 'read'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilter(tab)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      filter === tab ? 'bg-black text-white' : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="px-4 py-2 bg-stone-900 hover:bg-[#FF4400] text-white rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Mark All Read
                </button>
              )}

              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="p-2.5 text-stone-500 hover:text-red-600 border border-stone-200 hover:border-red-300 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear all messages"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Messages List */}
          <div className="p-6 sm:p-10 bg-[#FAF9F7]">
            {filteredMessages.length === 0 ? (
              <div className="bg-white p-12 rounded-[1.75rem] text-center border border-stone-200 flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-[#FAF9F7] border border-stone-200 text-stone-400 rounded-full flex items-center justify-center mb-4">
                  <Inbox size={26} />
                </div>
                <h2 className="text-xl font-bold text-stone-900 mb-1 font-sans">No Messages Found</h2>
                <p className="text-stone-500 text-sm max-w-sm">
                  {messages.length === 0
                    ? 'Submissions from your contact studio form will appear here.'
                    : 'No messages match your current filter or search query.'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {filteredMessages.map((msg) => (
                    <motion.article
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className={`bg-white p-6 rounded-2xl border transition-all ${
                        msg.status === 'unread' ? 'border-[#FF4400]/50 shadow-sm' : 'border-stone-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-stone-100">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-stone-950 text-white font-mono font-bold flex items-center justify-center text-base">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-stone-950 font-sans">{msg.name}</h3>
                              {msg.status === 'unread' && (
                                <span className="px-2 py-0.5 bg-[#FF4400]/10 text-[#FF4400] text-[10px] font-mono font-bold rounded-full uppercase">
                                  NEW
                                </span>
                              )}
                            </div>
                            <a href={`mailto:${msg.email}`} className="text-xs font-mono text-stone-600 hover:text-[#FF4400] flex items-center gap-1.5 mt-0.5">
                              <Mail size={13} />
                              <span>{msg.email}</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1 bg-[#FAF9F7] px-3 py-1.5 rounded-full border border-stone-200">
                            <Clock size={12} />
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>

                          {msg.status === 'unread' ? (
                            <button
                              type="button"
                              onClick={() => handleMarkRead(msg.id)}
                              className="p-2 bg-[#FAF9F7] border border-stone-200 hover:border-black text-stone-700 hover:text-black rounded-full transition-colors cursor-pointer"
                              aria-label="Mark as read"
                            >
                              <CheckCheck size={16} />
                            </button>
                          ) : (
                            <span className="p-2 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full" aria-label="Read">
                              <CheckCheck size={16} />
                            </span>
                          )}

                          <a
                            href={`mailto:${msg.email}?subject=Re: Portfolio Contact Inquiry&body=Hi ${encodeURIComponent(msg.name)},%0A%0AThank you for reaching out!%0A%0ABest regards,%0ABhushan Kolte`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#FAF9F7] border border-stone-200 hover:bg-black hover:text-white hover:border-black text-stone-700 rounded-full transition-colors"
                            aria-label="Reply via email"
                          >
                            <Send size={16} />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(msg.id)}
                            className="p-2 text-stone-400 hover:text-red-600 border border-stone-200 hover:border-red-300 rounded-full transition-colors cursor-pointer"
                            aria-label="Delete message"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#FAF9F7] p-4 rounded-xl border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
