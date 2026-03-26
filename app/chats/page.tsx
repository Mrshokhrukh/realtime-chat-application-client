"use client";

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Menu from '@/components/Menu'
import ChatList, { Chat } from '@/components/ChatList'
import ChatWindow from '@/components/ChatWindow'
import InfoPanel from '@/components/InfoPanel'

// --- MOCK DATA ---
const MOCK_CHATS: Chat[] = [
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
  const [selectedChat, setSelectedChat] = useState<Chat>(MOCK_CHATS[0])
  const [activeFolder, setActiveFolder] = useState('All')
  const [showInfo, setShowInfo] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewGroup, setShowNewGroup] = useState(false)

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
  const getStatusDisplay = (chat: Chat) => {
    if (chat.isTyping) return { text: 'typing...', color: 'text-[#ac7dfa] animate-pulse' }
    if (chat.isOnline) return { text: 'online', color: 'text-cyan-500' }
    if (chat.lastSeen) return { text: `last seen ${chat.lastSeen}`, color: 'text-slate-500' }
    return { text: 'offline', color: 'text-slate-600' }
  }

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
    <div className='flex h-screen w-full bg-[#070709] text-slate-300 overflow-hidden relative font-sans select-none transition-all'>
      {/* SIDE DRAWER (MENU) */}
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        user={user}
        setShowNewGroup={setShowNewGroup}
      />

      {showNewGroup && (
        <div className="absolute inset-x-0 top-0 z-70 flex items-center justify-center h-full bg-black/50">
           <div className="w-80 p-6 border bg-[#0b0b0f] border-white/10 rounded-2xl shadow-2xl">
              <h2 className="text-white font-bold mb-4">Yangi guruh yaratish</h2>
              <button 
                onClick={() => setShowNewGroup(false)}
                className="w-full py-2 bg-[#ac7dfa] text-black rounded-xl font-bold hover:bg-[#ac7dfa]/90 transition-colors"
              >
                Yopish
              </button>
            </div>
        </div>
      )}

      {/* MINIMAL SIDEBAR */}
      <Sidebar
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
        setShowMenu={setShowMenu}
      />

      {/* CHAT LIST SECTION */}
      <ChatList
        filteredChats={filteredChats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* MAIN CHAT WINDOW */}
      <ChatWindow
        selectedChat={selectedChat}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        getStatusDisplay={getStatusDisplay}
      />

      {/* INFO PANEL */}
      {showInfo && (
        <InfoPanel
          selectedChat={selectedChat}
          getStatusDisplay={getStatusDisplay}
        />
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
