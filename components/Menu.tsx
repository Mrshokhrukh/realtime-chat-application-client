'use client'

import React, { useEffect, useState } from 'react'
import {
  User,
  Users,
  Megaphone,
  Bookmark,
  Settings,
  Moon,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MenuProps {
  showMenu: boolean
  setShowMenu: (show: boolean) => void
  user: { fullName: string; username: string }
  setShowNewGroup: (show: boolean) => void
  setShowNewChannel: (show: boolean) => void
}

const Menu = ({ showMenu, setShowMenu, user, setShowNewGroup , setShowNewChannel }: MenuProps) => {
  const router = useRouter()
  const [nightMode, setNightMode] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = sessionStorage.getItem('nightMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', nightMode)
      sessionStorage.setItem('nightMode', String(nightMode))
    }
  }, [nightMode])

  return (
    <>
      <div
        className={`absolute inset-0 bg-[var(--overlay)] z-50 backdrop-blur-[2px] transition-opacity duration-300 ${
          showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowMenu(false)}
      />

      <div
        className={`absolute left-0 top-0 h-full w-[300px] bg-[var(--surface-bg)] text-[var(--text-main)] z-60 transform transition-transform duration-300 ease-in-out border-r border-[var(--border)] flex flex-col ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-6 bg-[var(--card-bg)] border-b border-[var(--border)]'>
          <div className='w-14 h-14 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center text-xl font-bold text-[var(--accent)] mb-4 shadow-lg'>
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className='flex justify-between items-center'>
            <div className='min-w-0'>
              <h3 className='font-bold text-[var(--text-main)] text-base truncate'>{user.fullName}</h3>
              <p className='text-[11px] text-[var(--text-muted)] font-medium truncate'>
                {user.username}
              </p>
            </div>
            <button className='p-1.5 hover:bg-[var(--surface-muted)] rounded-lg transition-colors'>
              <ChevronDown size={16} className='text-[var(--text-muted)]' />
            </button>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto p-3 space-y-0.5 custom-scrollbar'>
          {[
            { icon: User, label: 'My Profile' },
            { icon: Users, label: 'New Group' },
            { icon: Megaphone, label: 'New Channel' },
            { icon: Bookmark, label: 'Saved Messages' },
            { icon: Settings, label: 'Settings' },
          ].map((item, idx) => (
            <button
              key={idx}
              className='w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[var(--surface-muted)] transition-all text-[var(--text-muted)] hover:text-[var(--text-main)] group'
              onClick={() => {
                if (item.label === 'New Group') {
                  setShowNewGroup(true)
                  setShowMenu(false)
                } else if (item.label === 'New Channel') {
                  setShowNewChannel(true)
                  setShowMenu(false)
                } else if (item.label === 'Settings') {
                  alert('Sozlamalar ochildi!')
                } else {
                  console.log(`${item.label} bosildi!`)
                }
              }}
            >
              <item.icon
                size={19}
                strokeWidth={1.5}
                className='group-hover:text-[#ac7dfa]'
              />
              <span className='text-sm font-semibold'>{item.label}</span>
            </button>
          ))}
          <div className='h-px bg-[var(--border)] my-3 mx-4' />
          <div className='flex items-center justify-between px-4 py-3 text-[var(--text-muted)]'>
            <div className='flex items-center gap-4 font-semibold text-sm'>
              <Moon size={19} strokeWidth={1.5} />
              <span>Night Mode</span>
            </div>
            <div
              role='button'
              aria-pressed={nightMode}
              onClick={() => setNightMode(prev => !prev)}
              className={`w-10 h-[22px] rounded-full relative cursor-pointer border transition-colors ${nightMode ? 'bg-indigo-500/80 border-indigo-200' : 'bg-slate-400/20 border-slate-300'}`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all ${nightMode ? 'right-0.5' : 'left-0.5'}`}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sessionStorage.clear()
            router.push('/')
          }}
          className='m-3 p-4 flex items-center gap-4 rounded-xl text-red-400/80 hover:bg-red-500/5 transition-colors font-bold text-xs uppercase tracking-widest'
        >
          <LogOut size={16} /> Logout Session
        </button>
      </div>
    </>
  )
}

export default Menu
