'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UserData {
  username: string
  fullName: string
}

const ChatsPage = () => {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('aether_user')

    if (!storedUser) {
      router.replace('/')
    } else {
      setUser(JSON.parse(storedUser))
      setLoading(false)
    }
  }, [router])

  return (
    <div>
      ChatsPage
    </div>
  )
}

export default ChatsPage
