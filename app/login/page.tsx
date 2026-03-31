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
      className='min-h-screen fixed top-0 left-0 w-full flex flex-col items-center justify-center p-4 selection:bg-purple-500/30 font-sans overflow-hidden'
      style={{
        background: 'var(--login-bg)',
      }}
    >
      <div className='w-full max-w-[420px] p-px rounded-[32px] relative group'>
        <div className='absolute inset-0 rounded-[32px] bg-linear-to-b from-purple-500/10 to-cyan-500/5 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500'></div>
        <div className='absolute inset-0 rounded-[32px] p-px bg-linear-to-b from-white/10 via-white/5 to-transparent'></div>

        <div className='relative bg-[var(--card-bg)]/90 dark:bg-[var(--card-bg)]/90 backdrop-blur-2xl rounded-[31px] p-10 md:p-12 shadow-2xl border border-[var(--border)]'>
          <div className='flex flex-col items-center mb-10'>
            <div className='w-14 h-14 mb-5 text-[var(--accent)]'>
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
            <p className='text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-semibold mt-1'>
              PREMIUM MESSAGING
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-2.5'>
              <label className='text-[11px] uppercase tracking-[0.15em] font-bold text-[var(--text-muted)] ml-1'>
                Username
              </label>
              <div className='relative group/input'>
                <AtSign className='absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--text-muted)] group-focus-within/input:text-[var(--accent)] transition-colors' />
                <input
                  required
                  type='text'
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder='@username'
                  className='w-full bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl py-4 pl-12 pr-4 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all placeholder:text-[var(--text-muted)]'
                />
              </div>
            </div>

            <div className='space-y-2.5'>
              <label className='text-[11px] uppercase tracking-[0.15em] font-bold text-[var(--text-muted)] ml-1'>
                Full Name
              </label>
              <div className='relative group/input'>
                <User className='absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--text-muted)] group-focus-within/input:text-[var(--accent)] transition-colors' />
                <input
                  required
                  type='text'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder='John Doe'
                  className='w-full bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl py-4 pl-12 pr-4 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all placeholder:text-[var(--text-muted)]'
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
              <span className='text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-bold whitespace-nowrap'>
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
