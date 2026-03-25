'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, AtSign, ArrowRight } from 'lucide-react'

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', fullName: '' })
  const router = useRouter()

  useEffect(() => {
    const storedUser = sessionStorage.getItem('aether_user')
    if (storedUser) {
      router.push('/chats')
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.username && formData.fullName) {
      sessionStorage.setItem('aether_user', JSON.stringify(formData))
      router.push('/chats')
    }
  }

  return (
    <div
      className='min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-purple-500/30 font-sans relative overflow-hidden'
      style={{
        background: `
          radial-gradient(circle at 15% 15%, rgba(68, 30, 120, 0.4) 0%, rgba(0,0,0,0) 40%),
          radial-gradient(circle at 85% 85%, rgba(20, 60, 60, 0.3) 0%, rgba(0,0,0,0) 40%),
          #070709
        `,
      }}
    >
      <div className='w-full max-w-[420px] p-px rounded-[32px] relative group'>
        <div className='absolute inset-0 rounded-[32px] bg-linear-to-b from-purple-500/10 to-cyan-500/5 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500'></div>
        <div className='absolute inset-0 rounded-[32px] p-px bg-linear-to-b from-white/10 via-white/5 to-transparent'></div>

        <div className='relative bg-[#101014]/90 backdrop-blur-2xl rounded-[31px] p-10 md:p-12 shadow-2xl border border-white/5'>
          <div className='flex flex-col items-center mb-10'>
            <div className='w-14 h-14 mb-5 text-[#ac7dfa]'>
              <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-full h-full drop-shadow-[0_0_8px_rgba(172,125,250,0.5)]'
              >
                <circle cx='12' cy='12' r='3' />
                <circle cx='12' cy='4' r='2' />
                <circle cx='4' cy='12' r='2' />
                <circle cx='20' cy='12' r='2' />
                <circle cx='8' cy='19' r='2' />
                <circle cx='16' cy='19' r='2' />
              </svg>
            </div>
            <h1 className='text-4xl font-extrabold tracking-tighter mb-1.5 bg-linear-to-r from-white via-[#ac7dfa] to-[#79c4f5] bg-clip-text text-transparent'>
              AetherChat
            </h1>
            <p className='text-[11px] uppercase tracking-[0.25em] text-slate-500 font-semibold mt-1'>
              PREMIUM MESSAGING
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-2.5'>
              <label className='text-[11px] uppercase tracking-[0.15em] font-bold text-slate-500 ml-1'>
                Username
              </label>
              <div className='relative group/input'>
                <AtSign className='absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-600 group-focus-within/input:text-[#ac7dfa] transition-colors' />
                <input
                  required
                  type='text'
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder='@username'
                  className='w-full bg-[#08080a]/60 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-slate-200 outline-none focus:border-[#ac7dfa]/50 focus:ring-1 focus:ring-[#ac7dfa]/20 transition-all placeholder:text-slate-700'
                />
              </div>
            </div>

            <div className='space-y-2.5'>
              <label className='text-[11px] uppercase tracking-[0.15em] font-bold text-slate-500 ml-1'>
                Full Name
              </label>
              <div className='relative group/input'>
                <User className='absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-600 group-focus-within/input:text-[#ac7dfa] transition-colors' />
                <input
                  required
                  type='text'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder='John Doe'
                  className='w-full bg-[#08080a]/60 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-slate-200 outline-none focus:border-[#ac7dfa]/50 focus:ring-1 focus:ring-[#ac7dfa]/20 transition-all placeholder:text-slate-700'
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full mt-8 bg-linear-to-r from-[#9857fa] via-[#ac7dfa] to-[#79c4f5] hover:from-[#8a44f9] hover:to-[#68b8f2] text-[#070709] font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-[0_4px_20px_rgba(172,125,250,0.4)]'
            >
              Enter Aether <ArrowRight className='w-5 h-5' />
            </button>
          </form>

          <div className='mt-12 flex flex-col items-center space-y-7'>
            <div className='w-full flex items-center gap-4'>
              <div className='h-px flex-1 bg-linear-to-r from-transparent via-white/5 to-white/10'></div>
              <span className='text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold whitespace-nowrap'>
                Secure Access
              </span>
              <div className='h-px flex-1 bg-linear-to-l from-transparent via-white/5 to-white/10'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
