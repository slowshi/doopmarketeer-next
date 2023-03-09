import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const callHello = async () => {
    const res = await fetch('/api/history')
  }

  useEffect(() => {
    callHello()
  }, [])

  return <>Hi</>
}
