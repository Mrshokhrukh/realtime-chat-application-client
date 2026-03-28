"use client";

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Menu from '@/components/Menu'
import ChatList, { Chat } from '@/components/ChatList'
import ChatWindow from '@/components/ChatWindow'
import InfoPanel from '@/components/InfoPanel'
import { CameraIcon, Edit } from 'lucide-react';
import Image from 'next/image';

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
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [image, setImage] = useState<string>(
        "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png",
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
        <div className="absolute  inset-x-0 top-0 z-70 flex items-center justify-center h-full bg-black/50">
           <div className="w-80 flex flex-col gap-5 p-6 border bg-[#0b0b0f] border-white/10 rounded-2xl shadow-2xl">
              {/* <h2 className="text-white font-bold mb-4 text-center">Yangi guruh yaratish</h2> */}
              <div className="flex flex-col items-center ">
                <div className="relative">
                    <div className='w-20 h-20'>
                      <Image
                src={image}
                alt="Group image" 
                width={100}
                height={100}
                className="rounded-full w-full h-20"
                    />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        id="upload"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                setImage(url);
                                setIsEditingImage(false);
                            }
                        }}
                    />
                    {isEditingImage ? (
                        <label
                            htmlFor="upload"
                            className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer"
                        >
                            <CameraIcon fontSize="small" />
                        </label>
                    ) : (
                        <div
                            onClick={() => setIsEditingImage(true)}
                            className="absolute bottom-0 right-0  bg-purple-500 p-1 rounded-full cursor-pointer"
                        >
                            <Edit />
                        </div>
                    )}
                </div>
                </div>
               <div>
                 <label id='grname' className='text-[#ac7dfa]' >Group name</label>
              <input type='text' name='grname' className='w-full h-8 rounded-sm bg-[#ac7dfa] border-none text-black  '/>
               </div>
              <div className='flex  gap-3'>
                <button 
                onClick={() => setShowNewGroup(false)}
                className=" flex-1 py-2 bg-[#ac7dfa] text-black rounded-xl font-bold hover:bg-[#ac7dfa]/90 transition-colors"
              >
                Cancel
              </button>
              <button 
              className=' flex-1 py-2 bg-[#ac7dfa] text-black rounded-xl font-bold hover:bg-[#ac7dfa]/90 transition-colors'
              >Create</button>
              </div>
            </div>
        </div>)}
      

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
