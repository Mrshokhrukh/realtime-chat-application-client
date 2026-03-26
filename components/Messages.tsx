'use client'

import React from 'react'
import { Chat } from './ChatList'

interface MessagesProps {
  selectedChat: Chat
}

const Messages = ({ selectedChat }: MessagesProps) => {
  return (
    <div className='flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar'>
      <div className='flex justify-start'>
        <div className='max-w-[70%] bg-[#16161c] text-slate-300 p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm shadow-xl'>
          {selectedChat.lastMsg}
          <div className='text-[9px] text-slate-600 mt-2 text-right font-medium'>
            10:42 AM
          </div>
        </div>
      </div>
      {selectedChat.isTyping && (
        <div className='flex gap-1 items-center px-2'>
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className='w-1.5 h-1.5 bg-[#ac7dfa] rounded-full animate-bounce'
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Messages