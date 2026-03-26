'use client'

import React from 'react'
import { Search, X } from 'lucide-react'

export interface Chat {
  id: number
  name: string
  username: string
  avatar: string
  isOnline: boolean
  isTyping: boolean
  lastSeen: string | null
  lastMsg: string
  time: string
  bio: string
  folder: string
}

interface ChatListProps {
  filteredChats: Chat[]
  selectedChat: Chat
  setSelectedChat: (chat: Chat) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const ChatList = ({
  filteredChats,
  selectedChat,
  setSelectedChat,
  searchQuery,
  setSearchQuery,
}: ChatListProps) => {
  return (
    <section className='w-[350px] h-full border-r border-white/5 flex flex-col bg-[#0b0b0f] shrink-0'>
      <div className='p-6 shrink-0'>
        <h2 className='text-xl font-black text-white mb-4 tracking-tight'>Messages</h2>
        <div className='relative group'>
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              searchQuery ? 'text-[#ac7dfa]' : 'text-slate-700'
            }`}
            size={16}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full bg-black/40 border border-white/5 rounded-xl py-2.5 pl-11 pr-10 text-sm outline-none focus:border-[#ac7dfa]/40 transition-all placeholder:text-slate-800 text-white'
            placeholder='Search...'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white'
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className='flex-1 overflow-y-auto px-2 space-y-0.5 custom-scrollbar'>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 rounded-2xl cursor-pointer transition-all flex gap-4 items-center ${
                selectedChat.id === chat.id
                  ? 'bg-[#16161c] border border-white/5'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className='relative shrink-0'>
                <div className='w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-slate-200 text-sm'>
                  {chat.avatar}
                </div>
                {chat.isOnline && (
                  <div className='absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-[#0b0b0f] rounded-full' />
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-center mb-0.5'>
                  <h4 className='font-bold text-slate-200 truncate text-sm'>
                    {chat.name}
                  </h4>
                  <span className='text-[10px] text-slate-600'>{chat.time}</span>
                </div>
                <p
                  className={`text-xs truncate leading-none ${
                    chat.isTyping ? 'text-[#ac7dfa] font-medium' : 'text-slate-500'
                  }`}
                >
                  {chat.isTyping ? 'typing...' : chat.lastMsg}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center h-40 opacity-20'>
            <Search size={32} className='mb-2' />
            <p className='text-[10px] font-black uppercase tracking-widest'>
              No results
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ChatList
