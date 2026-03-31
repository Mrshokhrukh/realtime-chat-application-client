'use client'

import React from 'react'
import { MessageSquare, User, Users, Radio, Menu as MenuIcon } from 'lucide-react'

interface SidebarProps {
  activeFolder: string
  setActiveFolder: (folder: string) => void
  setShowMenu: (show: boolean) => void
}

const Sidebar = ({ activeFolder, setActiveFolder, setShowMenu }: SidebarProps) => {
  const folders = [
    { id: 'All', icon: MessageSquare, label: 'All' },
    { id: 'Personal', icon: User, label: 'Private' },
    { id: 'Groups', icon: Users, label: 'Groups' },
    { id: 'Channels', icon: Radio, label: 'IT' },
  ]

  return (
    <aside className='w-[76px] h-full border-r border-[var(--border)] flex flex-col items-center py-5 bg-[var(--surface-bg)] dark:bg-[var(--surface-bg)] shrink-0 z-40'>
      <button
        onClick={() => setShowMenu(true)}
        className='w-12 h-12 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] transition-all bg-[var(--surface-muted)] rounded-2xl mb-8 border border-[var(--border)]'
      >
        <MenuIcon size={22} />
      </button>
      <nav className='flex flex-col gap-3 flex-1 w-full px-2'>
        {folders.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFolder(f.id)}
            className={` relative flex flex-col items-center justify-center py-3 rounded-2xl transition-all ${
              activeFolder === f.id
                ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <f.icon size={22} strokeWidth={activeFolder === f.id ? 2.5 : 2} />
            <span className='text-[8px] font-black mt-1 uppercase tracking-tighter'>
              {f.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar