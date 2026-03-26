'use client'

import React from 'react'
import { Phone, Video, ShieldCheck } from 'lucide-react'
import { Chat } from './ChatList'

interface InfoPanelProps {
  selectedChat: Chat
  getStatusDisplay: (chat: Chat) => { text: string; color: string }
}

const InfoPanel = ({ selectedChat, getStatusDisplay }: InfoPanelProps) => {
  return (
    <aside className='w-[320px] h-full border-l border-white/5 bg-[#0b0b0f] flex flex-col shrink-0 animate-in slide-in-from-right duration-500'>
      <header className='h-16 border-b border-white/5 flex items-center px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest'>
        Details
      </header>
      <div className='flex-1 overflow-y-auto custom-scrollbar'>
        <div className='p-8 flex flex-col items-center'>
          <div className='w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-white mb-6'>
            {selectedChat.avatar}
          </div>
          <h3 className='text-lg font-bold text-white text-center'>
            {selectedChat.name}
          </h3>
          <p
            className={`text-xs mt-1 font-bold uppercase ${
              getStatusDisplay(selectedChat).color
            }`}
          >
            {getStatusDisplay(selectedChat).text}
          </p>
          <div className='flex gap-3 mt-8'>
            <button className='w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white'>
              <Phone size={18} />
            </button>
            <button className='w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white'>
              <Video size={18} />
            </button>
          </div>
        </div>
        <div className='p-6 space-y-6 border-t border-white/5'>
          <div>
            <h4 className='text-[10px] text-slate-600 uppercase font-black mb-2'>
              Bio
            </h4>
            <p className='text-sm text-slate-400 leading-relaxed'>
              {selectedChat.bio}
            </p>
          </div>
          <div className='p-4 bg-[#ac7dfa]/5 border border-[#ac7dfa]/10 rounded-2xl flex gap-3 items-center'>
            <ShieldCheck size={18} className='text-[#ac7dfa]' />
            <span className='text-[10px] text-slate-500 font-bold'>
              Verified Session
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default InfoPanel
