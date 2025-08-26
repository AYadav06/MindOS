
import { useNavigate } from 'react-router-dom'
import { Logo } from '../assets/Logo'

export const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className='flex items-center justify-around w-screen h-20 bg-transparent text-white border-b-1 border-gray-800 backdrop-blur-2xl shadow-2xl'>
        <div className='flex items-center gap-2 text-gray-400'>
        <Logo /> <h2>MINDOS</h2>
        </div>
        <div className='flex gap-10 text-gray-400'>
            <button >Features</button>
            <button >About us </button>
            <button>Contact us</button>
        </div>
        <div>
            <button onClick={()=>navigate('/signup')}
             className='bg-gradient-to-l from-blue-900 via-black to-blue-900 p-2 rounded-xl text-gray-400 shadow-2xl' >Get Started</button>
        </div>
    
    </div>
  )
}
