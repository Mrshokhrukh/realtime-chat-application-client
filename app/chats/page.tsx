"use client";

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Menu from '@/components/Menu'
import ChatList, { Chat } from '@/components/ChatList'
import ChatWindow from '@/components/ChatWindow'
import InfoPanel from '@/components/InfoPanel'
import { CameraIcon } from 'lucide-react';
import Image from 'next/image';

// --- MOCK DATA ---
const INITIAL_CHATS: Chat[] = [
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
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS)
  const [selectedChat, setSelectedChat] = useState<Chat>(INITIAL_CHATS[0])
  const [activeFolder, setActiveFolder] = useState('All')
  const [showInfo, setShowInfo] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewGroup, setShowNewGroup] = useState(false)
  
  // Group Create States
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState<string>(
    "https://images.rawpixel.com"
  );

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

  // Helper: Create Group
  const handleCreateGroup = () => {
    if (!groupName.trim()) return alert("Guruh nomini kiriting!");
    
    const newGroup: Chat = {
      id: Date.now(),
      name: groupName,
      username: `@${groupName.toLowerCase().replace(/\s/g, '_')}`,
      avatar: groupName.substring(0, 2).toUpperCase(),
      isOnline: true,
      isTyping: false,
      lastSeen: null,
      lastMsg: "Guruh yaratildi",
      time: 'n',
      bio: "Yangi guruh tavsifi",
      folder: "Groups",
    };

    setChats([newGroup, ...chats]);
    setShowNewGroup(false);
    setGroupName("");
  };

  // Dynamic Status Helper
  const getStatusDisplay = (chat: Chat) => {
    if (chat.isTyping) return { text: 'typing...', color: 'text-[#ac7dfa] animate-pulse' }
    if (chat.isOnline) return { text: 'online', color: 'text-cyan-500' }
    if (chat.lastSeen) return { text: `last seen ${chat.lastSeen}`, color: 'text-slate-500' }
    return { text: 'offline', color: 'text-slate-600' }
  }

  // Search Logic
  const filteredChats = useMemo(() => {
    return chats.filter((chat) => {
      const matchesFolder = activeFolder === "All" || chat.folder === activeFolder;
      const matchesSearch =
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.username.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [activeFolder, searchQuery, chats]);

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

      {/* NEW GROUP MODAL */}
      {showNewGroup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="w-80 flex flex-col gap-6 p-6 border bg-[#0b0b0f] border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-white font-bold text-center text-xl">New Group</h2>
            
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className='w-24 h-24 relative rounded-full overflow-hidden border-2 border-[#ac7dfa]/20'>
                  <Image
                    src={groupImage}
                    alt="Group image"
                    fill
                    className="text-center object-cover"
                    unoptimized
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="group-img-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setGroupImage(URL.createObjectURL(file));
                    }
                  }}
                />
                
                <label
                  htmlFor="group-img-upload"
                  className="absolute bottom-0 right-0 bg-[#ac7dfa] p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-black/50"
                >
                  <CameraIcon size={18} className="text-black" />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className='text-[#ac7dfa] text-xs font-semibold uppercase tracking-wider ml-1'>Group Name</label>
              <input 
                type='text' 
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Name your group..."
                className='w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#ac7dfa] transition-all'
              />
            </div>

            <div className='flex gap-3'>
              <button 
                onClick={() => setShowNewGroup(false)}
                className="flex-1 py-3 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateGroup}
                className='flex-1 py-3 bg-[#ac7dfa] text-black rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all'
              >
                Create
              </button>
            </div>
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
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 20px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
