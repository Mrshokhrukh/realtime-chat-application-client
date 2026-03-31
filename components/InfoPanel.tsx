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
    <aside className='w-[320px] h-full border-l border-[var(--border)] bg-[var(--surface-bg)] dark:bg-[var(--surface-bg)] flex flex-col shrink-0 animate-in slide-in-from-right duration-500'>
      <header className='h-16 border-b border-[var(--border)] flex items-center px-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest'>
        Details
      </header>
      <div className='flex-1 overflow-y-auto custom-scrollbar'>
        <div className='p-8 flex flex-col items-center'>
          <div className='w-24 h-24 rounded-3xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center text-3xl font-black text-[var(--text-main)] mb-6'>
            {selectedChat.avatar}
          </div>
          <h3 className='text-lg font-bold text-[var(--text-main)] text-center'>
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
            <button className='w-11 h-11 bg-[var(--surface-muted)] rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)]'>
              <Phone size={18} />
            </button>
            <button className='w-11 h-11 bg-[var(--surface-muted)] rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)]'>
              <Video size={18} />
            </button>
          </div>
        </div>
          <div className='p-6 space-y-6 border-t border-[var(--border)]'>
          <div>
            <h4 className='text-[10px] text-[var(--text-muted)] uppercase font-black mb-2'>
              Bio
            </h4>
            <p className='text-sm text-[var(--text-main)]/80 leading-relaxed'>
              {selectedChat.bio}
            </p>
          </div>
          <div className='p-4 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-2xl flex gap-3 items-center'>
            <ShieldCheck size={18} className='text-[#ac7dfa]' />
            <span className='text-[10px] text-[var(--text-muted)] font-bold'>
              Verified Session
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default InfoPanel
