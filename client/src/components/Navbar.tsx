
import { useNavigate } from 'react-router-dom'
import { Logo } from '../assets/Logo'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='flex items-center justify-between w-screen h-20 bg-transparent text-white border-b-1 border-gray-800 backdrop-blur-2xl shadow-2xl px-4 lg:px-8'>
        <div className='flex items-center gap-2 text-gray-400'>
        <Logo /> <h2 className='text-lg lg:text-xl'>MINDOS</h2>
        </div>
        
        {/* Desktop Menu */}
        <div className='hidden lg:flex gap-10 text-gray-400'>
            <button className='hover:text-white transition-colors'>Features</button>
            <button className='hover:text-white transition-colors'>About us</button>
            <button className='hover:text-white transition-colors'>Contact us</button>
        </div>
        
        {/* Desktop Get Started Button */}
        <div className='hidden lg:block'>
            <button onClick={()=>navigate('/signup')}
             className='bg-gradient-to-l from-blue-900 via-black to-blue-900 p-2 rounded-xl text-gray-400 shadow-2xl hover:scale-105 transition-transform' >Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <div className='lg:hidden'>
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='text-gray-400 hover:text-white transition-colors'
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className='absolute top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-gray-800 lg:hidden z-50'>
                <div className='flex flex-col p-4 space-y-4'>
                    <button className='text-gray-400 hover:text-white transition-colors text-left py-2'>Features</button>
                    <button className='text-gray-400 hover:text-white transition-colors text-left py-2'>About us</button>
                    <button className='text-gray-400 hover:text-white transition-colors text-left py-2'>Contact us</button>
                    <button 
                        onClick={() => {
                            navigate('/signup');
                            setIsMenuOpen(false);
                        }}
                        className='bg-gradient-to-l from-blue-900 via-black to-blue-900 p-3 rounded-xl text-gray-400 shadow-2xl hover:scale-105 transition-transform w-full text-center'
                    >
                        Get Started
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}
