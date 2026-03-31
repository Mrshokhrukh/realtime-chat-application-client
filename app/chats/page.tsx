"use client";

import React, { useEffect, useState } from 'react'
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

  const [showNewChannel , setShowNewChannel] = useState(false)
  const [channelName , setChannelName ] = useState('')
  const [ channelImage , setChannelImage] = useState<string>(
    'https://images.rawpixel.com'
  )

  // User & Auth States
  const [user, setUser] = useState({ fullName: "", username: "" })
  const [loading, setLoading] = useState(true)

  // Session Storage Logic
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedUser = sessionStorage.getItem("aether_user")
    if (!storedUser) {
      router.replace("/")
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser)
      const loadedUser = {
        fullName: parsedUser.fullName || "User Name",
        username: parsedUser.username || "@username",
      }
      setUser(loadedUser)
      setLoading(false)
    } catch (err) {
      console.error("Session parse error", err)
      router.replace("/")
    }
  }, [router])

  if (loading) {
    return (
      <div className='h-screen w-full flex items-center justify-center bg-[var(--app-bg)] text-[var(--text-main)]'>
        Loading...
      </div>
    )
  }

  // Helper: Create Group
  const handleCreateGroup = () => {
    if (!groupName.trim()) return alert('Enter the name of group')

      const now = new Date()
      const ok = now.toLocaleTimeString()
      const newGroup: Chat = {
        id: Date.now(),
        name: groupName,
        username: `@${groupName.toLowerCase().replace(/\s/g, '_')}`,
        avatar: groupName.substring(0, 2).toUpperCase(),
        isOnline: true,
        isTyping: false,
        lastSeen: null,
        lastMsg: "Guruh yaratildi",
        time: ok,
        bio: "Yangi guruh tavsifi",
        folder: "Groups",
      };



      setChats([newGroup, ...chats]);
      setShowNewGroup(false);
      setGroupName("");
    }

    
      const handleCreateChannel = () =>{

    if (!channelName.trim()) return alert('Enter the name of channel')
        const now = new Date()
      const ok = now.toLocaleTimeString()
      const newChannel: Chat = {
      id: Date.now(),
      name: channelName,
      username: `@${channelName.toLowerCase().replace(/\s/g, '_')}`,
      avatar: channelName.substring(0, 2).toUpperCase(),
      isOnline: false,
      isTyping: false,
      lastSeen: null,
      lastMsg: "Channel Created",
      time: ok,
      bio: "New Channel bio",
      folder: "Channels",
    };



    setChats([newChannel , ...chats])
    setShowNewChannel(false)
    setChannelName('')
      }





  // Dynamic Status Helper
  const getStatusDisplay = (chat: Chat) => {
    if (chat.isTyping) return { text: 'typing...', color: 'text-[var(--accent)] animate-pulse' }
    if (chat.isOnline) return { text: 'online', color: 'text-emerald-500' }
    if (chat.lastSeen) return { text: `last seen ${chat.lastSeen}`, color: 'text-[var(--text-muted)]' }
    return { text: 'offline', color: 'text-[var(--text-muted)]' }
  }

  // Search Logic
  const filteredChats = chats.filter((chat) => {
    const matchesFolder = activeFolder === "All" || chat.folder === activeFolder;
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });


  return (
    <div className='flex h-screen w-full text-[var(--text-main)] dark:text-[var(--text-main)] overflow-hidden relative font-sans select-none transition-all'>
      
      {/* SIDE DRAWER (MENU) */}
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        user={user}
        setShowNewGroup={setShowNewGroup}
        setShowNewChannel = {setShowNewChannel}
      />

      {/* NEW GROUP MODAL */}
      {showNewGroup && (
        <div className="group absolute inset-0 z-[70] flex items-center justify-center bg-[var(--overlay)]">
          <div className="w-80 flex flex-col gap-6 p-6 border bg-[var(--surface-bg)] dark:bg-[var(--surface-bg)] border-[var(--border)] rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-[var(--text-main)] font-bold text-center text-xl">New Group</h2>
            
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
                placeholder="Name of group..."
                className='w-full h-11 px-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-main)] outline-none focus:border-[var(--accent)] transition-all'
              />
            </div>

            <div className='flex gap-3'>
              <button 
                onClick={() => setShowNewGroup(false)}
                className="flex-1 py-3 bg-[var(--surface-muted)] text-[var(--text-main)] rounded-xl font-semibold hover:bg-[var(--surface-muted)]/80 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateGroup}
                className='flex-1 py-3 bg-[var(--accent)] text-[var(--button-text)] rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all'
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {'Channel Modal'} */}
      {showNewChannel && (
        <div className="group absolute inset-0 z-[70] flex items-center justify-center bg-[var(--overlay)] ">
          <div className="w-80 flex flex-col gap-6 p-6 border bg-[var(--surface-bg)] dark:bg-[var(--surface-bg)] border-[var(--border)] rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-[var(--text-main)] font-bold text-center text-xl">New Channel</h2>
            
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className='w-24 h-24 relative rounded-full overflow-hidden border-2 border-[#ac7dfa]/20'>
                  <Image
                    src={channelImage}
                    alt="Channel image"
                    fill
                    className="text-center object-cover"
                    unoptimized
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="channel-img-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setChannelImage(URL.createObjectURL(file));
                    }
                  }}
                />
                
                <label
                  htmlFor="channel-img-upload"
                  className="absolute bottom-0 right-0 bg-[#ac7dfa] p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-black/50"
                >
                  <CameraIcon size={18} className="text-black" />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className='text-[#ac7dfa] text-xs font-semibold uppercase tracking-wider ml-1'>Channel Name</label>
              <input 
                type='text' 
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Name of channel..."
                className='w-full h-11 px-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-main)] outline-none focus:border-[var(--accent)] transition-all'
              />
            </div>

            <div className='flex gap-3'>
              <button 
                onClick={() => setShowNewChannel(false)}
                className="flex-1 py-3 bg-[var(--surface-muted)] text-[var(--text-main)] rounded-xl font-semibold hover:bg-[var(--surface-muted)]/80 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateChannel}
                className='flex-1 py-3 bg-[var(--accent)] text-[var(--button-text)] rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all'
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
