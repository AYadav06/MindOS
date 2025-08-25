import React from 'react'
import { Logo } from '../assets/Logo'

export const Navbar = () => {
  return (
    <div className='flex items-center justify-around w-screen h-20 bg-transparent text-white border-b-1 border-gray-800'>
        <div className='flex items-center gap-2'>
        <Logo /> <h2>MINDOS</h2>
        </div>
        <div className='flex gap-8'>
            <button >Features</button>
            <button >About us </button>
            <button>Contact us</button>
        </div>
        <div>
            <button className='bg-gradient-to-l from-blue-900 via-black to-blue-900 p-2 rounded-xl text-gray-400 shadow-2xl' >Get Started</button>
        </div>
    
    </div>
  )
}
