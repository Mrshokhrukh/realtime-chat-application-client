'use client'

import React from 'react'
import { Paperclip, Smile, Send } from 'lucide-react'
import { Chat } from './ChatList'
import Header from './Header'
import Messages from './Messages'

interface ChatWindowProps {
  selectedChat: Chat
  showInfo: boolean
  setShowInfo: (show: boolean) => void
  getStatusDisplay: (chat: Chat) => { text: string; color: string }
}

const ChatWindow = ({
  selectedChat,
  showInfo,
  setShowInfo,
  getStatusDisplay,
}: ChatWindowProps) => {
  return (
    <main className='flex-1 h-full flex flex-col bg-[var(--app-bg)] dark:bg-[var(--app-bg)] overflow-hidden'>
      <Header
        selectedChat={selectedChat}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        getStatusDisplay={getStatusDisplay}
      />

      <Messages selectedChat={selectedChat} />

      <div className='p-6 shrink-0'>
        <div className='max-w-4xl mx-auto flex items-center bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-2 shadow-2xl focus-within:border-[var(--accent)]/30 transition-all'>
          <button className='p-2 text-[var(--text-muted)] hover:text-[var(--text-main)]'>
            <Paperclip size={20} />
          </button>
          <input
            className='flex-1 bg-transparent border-none outline-none text-sm px-3 text-[var(--text-main)] placeholder:text-[var(--text-muted)]'
            placeholder='Type your message...'
          />
          <button className='p-2 text-[var(--text-muted)] hover:text-[var(--text-main)]'>
            <Smile size={20} />
          </button>
          <button className='bg-[var(--accent)] p-2.5 rounded-xl text-[var(--button-text)] hover:shadow-[0_0_15px_rgba(172,125,250,0.4)] transition-all ml-1'>
            <Send size={18} fill='currentColor' />
          </button>
        </div>
      </div>
    </main>
  )
}

export default ChatWindow
