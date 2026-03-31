'use client'

import React from 'react'
import { Search, PanelRightClose, PanelRightOpen, MoreHorizontal } from 'lucide-react'
import { Chat } from './ChatList'

interface HeaderProps {
  selectedChat: Chat
  showInfo: boolean
  setShowInfo: (show: boolean) => void
  getStatusDisplay: (chat: Chat) => { text: string; color: string }
}

const Header = ({
  selectedChat,
  showInfo,
  setShowInfo,
  getStatusDisplay,
}: HeaderProps) => {
  return (
    <header className='h-16 border-b border-[var(--border)] flex items-center justify-between px-6 bg-[var(--surface-bg)]/95 dark:bg-[var(--surface-bg)]/50 backdrop-blur-xl shrink-0'>
      <div className='flex flex-col'>
        <h3 className='font-bold text-[var(--text-main)] text-sm leading-tight'>
          {selectedChat.name}
        </h3>
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
            getStatusDisplay(selectedChat).color
          }`}
        >
          {getStatusDisplay(selectedChat).text}
        </p>
      </div>
      <div className='flex items-center gap-6 text-[var(--text-muted)]'>
        <Search size={18} className='cursor-pointer hover:text-[var(--text-main)]' />
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`transition-colors ${
            showInfo ? 'text-[var(--accent)]' : 'hover:text-[var(--text-main)]'
          }`}
        >
          {showInfo ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
        </button>
        <MoreHorizontal size={20} className='cursor-pointer hover:text-[var(--text-main)]' />
      </div>
    </header>
  )
}

export default Header
