'use client'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { FaBell } from 'react-icons/fa'
import { MdRssFeed } from 'react-icons/md'


const Header = () => {
  return (
    <div className='w-full px-12 py-2 h-18 bg-[#0f1421] border-b-2 border-b-white/10 flex gap-10'>
      <div>
        <div className="relative w-full max-w-lg">

  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>


  <input 
    type="text" 
    className="block p-5 h-12 w-130 rounded-full bg-gray-950 text-white border-b-gray-900 active:border-indigo-950 border border-gray-800   pl-10  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm mt-1" 
    placeholder="Search across dimensions..."
  />

  
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
    <kbd className="cursor-pointer hover:shadow-2xs hover:shadow-gray-700 px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-900 border border-gray-700 rounded">⌘</kbd>
    <kbd className="cursor-pointer hover:shadow-2xs hover:shadow-gray-700 px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-900 border border-gray-700 rounded">K</kbd>
  </div>
</div>
      </div>

      <div>
        <div className='font-serif h-11 w-65 border rounded-full bg-gray-900 border-b-gray-900 border-gray-800 flex gap-5 items-center mt-1 '>
          <div className='flex gap-2 items-center  pl-4'>
            <div className=' bg-cyan-300 w-3 h-3  rounded-full animate-pulse'></div>
            <h1 className='text-cyan-300 text-[12px]'>QUANTUM SYNC</h1>
          </div>
        <div className=' h-5 w-0.5 bg-gray-800  '></div>
        <div className='flex gap-3'>
          <h1 className='cursor-pointer text-xl text-gray-300'><FaBell/></h1>
          <h1 className='cursor-pointer text-xl text-gray-300'><MdRssFeed/></h1>
        </div>
        </div>
      </div>

      <Link href='./profile' className='text-5xl text-gray-400 rounded-full mt-1 border-2   border-gray-700'>
        <CgProfile/>
      </Link>
    </div>
  )
  {/* <input  className='p-5 h-12 w-120 rounded-full bg-gray-950 text-white border-b-gray-900 active:border-indigo-950' type='search' placeholder='Search across dimensions'/> */}
}

export default Header