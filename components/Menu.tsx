'use client'

import React from 'react'
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

  return (
    <>
      <div
        className={`absolute inset-0 bg-black/60 z-50 backdrop-blur-[2px] transition-opacity duration-300 ${
          showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowMenu(false)}
      />

      <div
        className={`absolute left-0 top-0 h-full w-[300px] bg-[#0b0b0f] z-60 transform transition-transform duration-300 ease-in-out border-r border-white/5 flex flex-col ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-6 bg-[#0e0e13] border-b border-white/5'>
          <div className='w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-[#ac7dfa] mb-4 shadow-xl'>
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className='flex justify-between items-center'>
            <div className='min-w-0'>
              <h3 className='font-bold text-white text-base truncate'>{user.fullName}</h3>
              <p className='text-[11px] text-slate-500 font-medium truncate'>
                {user.username}
              </p>
            </div>
            <button className='p-1.5 hover:bg-white/5 rounded-lg transition-colors'>
              <ChevronDown size={16} className='text-slate-600' />
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
              className='w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-white group'
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
          <div className='h-px bg-white/5 my-3 mx-4' />
          <div className='flex items-center justify-between px-4 py-3 text-slate-400'>
            <div className='flex items-center gap-4 font-semibold text-sm'>
              <Moon size={19} strokeWidth={1.5} />
              <span>Night Mode</span>
            </div>
            <div className='w-8 h-4 bg-[#ac7dfa]/20 rounded-full relative cursor-pointer border border-[#ac7dfa]/30'>
              <div className='absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-[#ac7dfa] rounded-full' />
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
