'use client'
import { Search, Wifi } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const Header = () => {
  return (
    <div className='w-full px-10 py-2.25 h-18 bg-[#0f1421] border-b-2 border-b-white/10 flex justify-between items-center'>
      <form className="w-full h-full max-w-180 flex items-center px-4 gap-4 border rounded-full border-white/10 bg-[#08080e]">
        <Search className="text-white/70" />
        <input type="text" placeholder="Search anyone" className="h-full text-[18px] w-full outline-none text-white/80" />
      </form>

      <div className="h-full py-1 flex gap-7 items-center">
        <div className="flex bg-[#141219] h-full w-max px-5 gap-2.5 items-center rounded-full border border-white/5">
          <div className="w-3 h-3 bg-[#00fcfe] rounded-full animate-pulse"></div>
          <span className="uppercase font-medium text-[14px] text-[#00fcfe] pr-5 border-r-2 border-white/10 leading-5">Online</span>
          <Wifi className="text-white/80 h-5 ml-1" />
        </div>

        <Link href="/profile" className="h-9.5 w-9.5 p-0.5 border border-[#00fcfe] rounded-full flex items-center">
          <Image
            src="https://www.tubefilter.com/wp-content/uploads/2023/10/i-show-speed.jpg"
            alt="Profile"
            width={120}
            height={120}
            className="w-full h-full rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  )
}

export default Header