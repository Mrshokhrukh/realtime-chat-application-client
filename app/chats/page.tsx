"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Users,
  Radio,
  Search,
  Video,
  Phone,
  Send,
  Paperclip,
  Smile,
  ShieldCheck,
  MoreHorizontal,
  User,
  Settings,
  PanelRightClose,
  PanelRightOpen,
  Menu,
  Wallet,
  Megaphone,
  Bookmark,
  Moon,
  ChevronDown,
  LogOut,
  X,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_CHATS = [
  {
    id: 1,
    name: "Elena Thorne",
    username: "@elena_ai",
    avatar: "ET",
    isOnline: true,
    isTyping: true,
    lastSeen: null,
    lastMsg: "The neural relays are finally synchronized...",
    time: "2m ago",
    bio: "Expert in decentralized neural networks.",
    folder: "All",
  },
  {
    id: 2,
    name: "Marcus Chen",
    username: "@mchen_arch",
    avatar: "MC",
    isOnline: false,
    isTyping: false,
    lastSeen: "2 hours ago",
    lastMsg: "Sent a file: architecture_v4.xd",
    time: "1h ago",
    bio: "Lead Architect at Aether Labs.",
    folder: "Personal",
  },
  {
    id: 3,
    name: "Aether Labs Alpha",
    username: "@aether_official",
    avatar: "AL",
    isOnline: true,
    isTyping: false,
    lastSeen: null,
    lastMsg: "New system update rolling out...",
    time: "5h ago",
    bio: "Official channel for updates.",
    folder: "Groups",
  },
];

export default function ChatsPage() {
  const router = useRouter();

  // UI States
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0]);
  const [activeFolder, setActiveFolder] = useState("All");
  const [showInfo, setShowInfo] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewGroup, setShowNewGroup] = useState(false);

  // User & Auth States
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ fullName: "", username: "" });

  // Session Storage Logic
  useEffect(() => {
    const storedUser = sessionStorage.getItem("aether_user");
    if (!storedUser) {
      router.replace("/");
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          fullName: parsedUser.fullName || "User Name",
          username: parsedUser.username || "@username",
        });
      } catch (e) {
        console.error("Session parse error", e);
      }
      setLoading(false);
    }
  }, [router]);

  // Dynamic Status Helper
  const getStatusDisplay = (chat: (typeof MOCK_CHATS)[0]) => {
    if (chat.isTyping)
      return { text: "typing...", color: "text-[#ac7dfa] animate-pulse" };
    if (chat.isOnline) return { text: "online", color: "text-cyan-500" };
    if (chat.lastSeen)
      return { text: `last seen ${chat.lastSeen}`, color: "text-slate-500" };
    return { text: "offline", color: "text-slate-600" };
  };

  // Search Logic
  const filteredChats = useMemo(() => {
    return MOCK_CHATS.filter((chat) => {
      const matchesFolder =
        activeFolder === "All" || chat.folder === activeFolder;
      const matchesSearch =
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.username.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [activeFolder, searchQuery]);

  if (loading) return <div className="h-screen bg-[#070709]" />;

  return (
    <div className="flex h-screen w-full bg-[#070709] text-slate-300 overflow-hidden relative font-sans select-none transition-all">
      {/* --- SIDE DRAWER (MENU) --- */}
      <div
        className={`absolute inset-0 bg-black/60 z-50 backdrop-blur-[2px] transition-opacity duration-300 ${showMenu ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setShowMenu(false)}
      />

      <div
        className={`absolute left-0 top-0 h-full w-[300px] bg-[#0b0b0f] z-[60] transform transition-transform duration-300 ease-in-out border-r border-white/5 flex flex-col ${showMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 bg-[#0e0e13] border-b border-white/5">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-[#ac7dfa] mb-4 shadow-xl">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex justify-between items-center">
            <div className="min-w-0">
              <h3 className="font-bold text-white text-base truncate">
                {user.fullName}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium truncate">
                {user.username}
              </p>
            </div>
            <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
              <ChevronDown size={16} className="text-slate-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-0.5 custom-scrollbar">
          {[
            { icon: User, label: "My Profile" },
            { icon: Users, label: "New Group" },
            { icon: Megaphone, label: "New Channel" },
            { icon: Bookmark, label: "Saved Messages" },
            { icon: Settings, label: "Settings" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-white group"
              onClick={() => {
                if (item.label === "New Group") {
                  setShowNewGroup(true);
                } else if (item.label === "My Profile") {
                  alert("Profil sahifasi!");
                } else if (item.label === "Settings") {
                  alert("Sozlamalar ochildi!");
                } else {
                  console.log(`${item.label} bosildi!`);
                }
              }}
            >
              <item.icon
                size={19}
                strokeWidth={1.5}
                className="group-hover:text-[#ac7dfa]"
              />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
          <div className="h-px bg-white/5 my-3 mx-4" />
          <div className="flex items-center justify-between px-4 py-3 text-slate-400">
            <div className="flex items-center gap-4 font-semibold text-sm">
              <Moon size={19} strokeWidth={1.5} />
              <span>Night Mode</span>
            </div>
            <div className="w-8 h-4 bg-[#ac7dfa]/20 rounded-full relative cursor-pointer border border-[#ac7dfa]/30">
              <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-[#ac7dfa] rounded-full" />
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sessionStorage.clear();
            router.push("/");
          }}
          className="m-3 p-4 flex items-center gap-4 rounded-xl text-red-400/80 hover:bg-red-500/5 transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={16} /> Logout Session
        </button>
      </div>

      {/* --- MINIMAL SIDEBAR --- */}
      <aside className="w-[76px] h-full border-r border-white/5 flex flex-col items-center py-5 bg-[#08080a] flex-shrink-0 z-40">
        <button
          onClick={() => setShowMenu(true)}
          className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-[#ac7dfa] transition-all bg-white/5 rounded-2xl mb-8 border border-white/5"
        >
          <Menu size={22} />
        </button>
        <nav className="flex flex-col gap-3 flex-1 w-full px-2">
          {[
            { id: "All", icon: MessageSquare, label: "All" },
            { id: "Personal", icon: User, label: "Private" },
            { id: "Groups", icon: Users, label: "Groups" },
            { id: "Channels", icon: Radio, label: "IT" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFolder(f.id)}
              className={`relative flex flex-col items-center justify-center py-3 rounded-2xl transition-all ${activeFolder === f.id ? "bg-[#ac7dfa]/10 text-[#ac7dfa]" : "text-slate-600 hover:text-slate-400"}`}
            >
              <f.icon size={22} strokeWidth={activeFolder === f.id ? 2.5 : 2} />
              <span className="text-[8px] font-black mt-1 uppercase tracking-tighter">
                {f.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* --- CHAT LIST SECTION --- */}
      <section className="w-[350px] h-full border-r border-white/5 flex flex-col bg-[#0b0b0f] flex-shrink-0">
        <div className="p-6 flex-shrink-0">
          <h2 className="text-xl font-black text-white mb-4 tracking-tight">
            Messages
          </h2>
          <div className="relative group">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? "text-[#ac7dfa]" : "text-slate-700"}`}
              size={16}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 pl-11 pr-10 text-sm outline-none focus:border-[#ac7dfa]/40 transition-all placeholder:text-slate-800 text-white"
              placeholder="Search..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-0.5 custom-scrollbar">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 rounded-2xl cursor-pointer transition-all flex gap-4 items-center ${selectedChat.id === chat.id ? "bg-[#16161c] border border-white/5" : "hover:bg-white/5 border border-transparent"}`}
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-slate-200 text-sm">
                    {chat.avatar}
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-[#0b0b0f] rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-bold text-slate-200 truncate text-sm">
                      {chat.name}
                    </h4>
                    <span className="text-[10px] text-slate-600">
                      {chat.time}
                    </span>
                  </div>
                  <p
                    className={`text-xs truncate leading-none ${chat.isTyping ? "text-[#ac7dfa] font-medium" : "text-slate-500"}`}
                  >
                    {chat.isTyping ? "typing..." : chat.lastMsg}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 opacity-20">
              <Search size={32} className="mb-2" />
              <p className="text-[10px] font-black uppercase tracking-widest">
                No results
              </p>
            </div>
          )}
        </div>
      </section>
      {showNewGroup && (
        <div
          className={` absolute  z-[70]   w-100 h-120 mt-30 border rounded-4xl bg-black/60 ml-120 `}
        >
          <h2>Yangi guruh yaratish</h2>
          <button onClick={() => setShowNewGroup(false)}>Yopish</button>
        </div>
      )}
      {/* --- MAIN CHAT WINDOW --- */}
      <main className="flex-1 h-full flex flex-col bg-[#070709] overflow-hidden">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0b0b0f]/50 backdrop-blur-xl flex-shrink-0">
          <div className="flex flex-col">
            <h3 className="font-bold text-white text-sm leading-tight">
              {selectedChat.name}
            </h3>
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.15em] ${getStatusDisplay(selectedChat).color}`}
            >
              {getStatusDisplay(selectedChat).text}
            </p>
          </div>
          <div className="flex items-center gap-6 text-slate-500">
            <Search size={18} className="cursor-pointer hover:text-white" />
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`transition-colors ${showInfo ? "text-[#ac7dfa]" : "hover:text-white"}`}
            >
              {showInfo ? (
                <PanelRightClose size={20} />
              ) : (
                <PanelRightOpen size={20} />
              )}
            </button>
            <MoreHorizontal
              size={20}
              className="cursor-pointer hover:text-white"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          <div className="flex justify-start">
            <div className="max-w-[70%] bg-[#16161c] text-slate-300 p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm shadow-xl">
              {selectedChat.lastMsg}
              <div className="text-[9px] text-slate-600 mt-2 text-right font-medium">
                10:42 AM
              </div>
            </div>
          </div>
          {selectedChat.isTyping && (
            <div className="flex gap-1 items-center px-2">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 bg-[#ac7dfa] rounded-full animate-bounce"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6 flex-shrink-0">
          <div className="max-w-4xl mx-auto flex items-center bg-[rgb(17,17,22)] border border-white/5 rounded-2xl p-2 shadow-2xl focus-within:border-[#ac7dfa]/30 transition-all">
            <button className="p-2 text-slate-600 hover:text-white">
              <Paperclip size={20} />
      
            </button>
            <input
              className="flex-1 bg-transparent border-none outline-none text-sm px-3 text-white placeholder:text-slate-800"
              placeholder="Type your message..."
            />
            <button className="p-2 text-slate-600 hover:text-white">
              <Smile size={20} />
            </button>
            <button className="bg-[#ac7dfa] p-2.5 rounded-xl text-black hover:shadow-[0_0_15px_rgba(172,125,250,0.4)] transition-all ml-1">
              <Send size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </main>

      {/* --- INFO PANEL --- */}
      {showInfo && (
        <aside className="w-[320px] h-full border-l border-white/5 bg-[#0b0b0f] flex flex-col flex-shrink-0 animate-in slide-in-from-right duration-500">
          <header className="h-16 border-b border-white/5 flex items-center px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Details
          </header>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8 flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-white mb-6">
                {selectedChat.avatar}
              </div>
              <h3 className="text-lg font-bold text-white text-center">
                {selectedChat.name}
              </h3>
              <p
                className={`text-xs mt-1 font-bold uppercase ${getStatusDisplay(selectedChat).color}`}
              >
                {getStatusDisplay(selectedChat).text}
              </p>
              <div className="flex gap-3 mt-8">
                <button className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white">
                  <Phone size={18} />
                </button>
                <button className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white">
                  <Video size={18} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6 border-t border-white/5">
              <div>
                <h4 className="text-[10px] text-slate-600 uppercase font-black mb-2">
                  Bio
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {selectedChat.bio}
                </p>
              </div>
              <div className="p-4 bg-[#ac7dfa]/5 border border-[#ac7dfa]/10 rounded-2xl flex gap-3 items-center">
                <ShieldCheck size={18} className="text-[#ac7dfa]" />
                <span className="text-[10px] text-slate-500 font-bold">
                  Verified Session
                </span>
              </div>
            </div>
          </div>
        </aside>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
